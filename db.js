import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LEADS_FILE = path.join(__dirname, 'leads.json');

const { Pool } = pg;

let pool = null;
let dbReady = false;

export function initDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString || connectionString.trim() === '') {
    console.log('ℹ️ [DB] DATABASE_URL no configurado. Operando con almacenamiento local (leads.json).');
    return null;
  }

  try {
    pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      max: 10
    });

    pool.on('error', (err) => {
      console.error('⚠️ [DB] Error inesperado en el pool de PostgreSQL:', err.message);
      dbReady = false;
    });

    // Crear tabla e índices si no existen
    (async () => {
      try {
        const client = await pool.connect();
        await client.query(`
          CREATE TABLE IF NOT EXISTS leads (
            id VARCHAR(100) PRIMARY KEY,
            meta_lead_id VARCHAR(100),
            date TIMESTAMPTZ DEFAULT NOW(),
            name VARCHAR(255),
            phone VARCHAR(100),
            email VARCHAR(255),
            client_type VARCHAR(100),
            source VARCHAR(255),
            page_url TEXT,
            monthly_bill VARCHAR(100),
            notes TEXT,
            status VARCHAR(50) DEFAULT 'nuevo',
            notified BOOLEAN DEFAULT false,
            has_file BOOLEAN DEFAULT false,
            file_name VARCHAR(255),
            file_size INTEGER,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
          );
          CREATE INDEX IF NOT EXISTS idx_leads_date ON leads(date DESC);
          CREATE INDEX IF NOT EXISTS idx_leads_meta_id ON leads(meta_lead_id);
        `);
        client.release();
        dbReady = true;
        console.log('🐘 [DB] Conectado exitosamente a PostgreSQL. Tabla leads activa.');
      } catch (e) {
        console.error('⚠️ [DB] No se pudo conectar a PostgreSQL al iniciar:', e.message);
        dbReady = false;
      }
    })();

    return pool;
  } catch (err) {
    console.error('⚠️ [DB] Error inicializando pool PostgreSQL:', err.message);
    dbReady = false;
    return null;
  }
}

export function isDbConnected() {
  return dbReady && !!pool;
}

// Guardar lead tanto en PostgreSQL (si disponible) como en leads.json (backup)
export async function saveLead(leadData) {
  // 1. Guardar en leads.json como respaldo inmediato
  try {
    let leads = [];
    if (fs.existsSync(LEADS_FILE)) {
      const content = fs.readFileSync(LEADS_FILE, 'utf-8');
      leads = JSON.parse(content || '[]');
    }
    const idx = leads.findIndex(l => String(l.id) === String(leadData.id));
    if (idx !== -1) {
      leads[idx] = { ...leads[idx], ...leadData };
    } else {
      leads.unshift(leadData);
    }
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (fileErr) {
    console.error('Error guardando lead en JSON:', fileErr.message);
  }

  // 2. Guardar en PostgreSQL
  if (isDbConnected()) {
    try {
      const id = String(leadData.id);
      const metaId = leadData.metaLeadId ? String(leadData.metaLeadId) : null;
      const date = leadData.date ? new Date(leadData.date) : new Date();

      await pool.query(`
        INSERT INTO leads (
          id, meta_lead_id, date, name, phone, email, client_type,
          source, page_url, monthly_bill, notes, status, notified,
          has_file, file_name, file_size
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          phone = EXCLUDED.phone,
          email = EXCLUDED.email,
          status = EXCLUDED.status,
          notified = EXCLUDED.notified,
          updated_at = NOW()
      `, [
        id, metaId, date, leadData.name || '', leadData.phone || '', leadData.email || '',
        leadData.clientType || 'particular', leadData.source || 'Web', leadData.pageUrl || '',
        leadData.monthlyBill || '', leadData.notes || '', leadData.status || 'nuevo',
        leadData.notified ?? false, leadData.hasFile ?? false, leadData.fileName || null,
        leadData.fileSize || null
      ]);
      console.log(`💾 Lead ${id} (${leadData.name}) guardado en PostgreSQL.`);
    } catch (dbErr) {
      console.error('Error guardando lead en PostgreSQL:', dbErr.message);
    }
  }
}

// Obtener todos los leads ordenados por fecha descendente
export async function getAllLeads() {
  if (isDbConnected()) {
    try {
      const res = await pool.query('SELECT * FROM leads ORDER BY date DESC');
      return res.rows.map(r => ({
        id: r.id,
        metaLeadId: r.meta_lead_id,
        date: r.date ? r.date.toISOString() : null,
        name: r.name,
        phone: r.phone,
        email: r.email,
        clientType: r.client_type,
        source: r.source,
        pageUrl: r.page_url,
        monthlyBill: r.monthly_bill,
        notes: r.notes,
        status: r.status || 'nuevo',
        notified: r.notified,
        hasFile: r.has_file,
        fileName: r.file_name,
        fileSize: r.file_size
      }));
    } catch (err) {
      console.warn('⚠️ [DB] Fallo leyendo de PostgreSQL, recurriendo a leads.json:', err.message);
    }
  }

  // Fallback a leads.json
  if (fs.existsSync(LEADS_FILE)) {
    try {
      const content = fs.readFileSync(LEADS_FILE, 'utf-8');
      const leads = JSON.parse(content || '[]');
      return leads.sort((a, b) => {
        const timeA = a.date ? new Date(a.date).getTime() : (Number(a.id) || 0);
        const timeB = b.date ? new Date(b.date).getTime() : (Number(b.id) || 0);
        return timeB - timeA;
      });
    } catch (e) {
      console.error('Error leyendo leads.json:', e.message);
    }
  }

  return [];
}

// Actualizar estado del lead
export async function updateLeadStatus(leadId, status) {
  let updated = false;

  if (isDbConnected()) {
    try {
      const res = await pool.query(
        'UPDATE leads SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [status, String(leadId)]
      );
      if (res.rowCount > 0) updated = true;
    } catch (err) {
      console.error('Error actualizando lead en PostgreSQL:', err.message);
    }
  }

  // Actualizar también en leads.json
  if (fs.existsSync(LEADS_FILE)) {
    try {
      const content = fs.readFileSync(LEADS_FILE, 'utf-8');
      let leads = JSON.parse(content || '[]');
      const idx = leads.findIndex(l => String(l.id) === String(leadId));
      if (idx !== -1) {
        leads[idx].status = status;
        leads[idx].updatedAt = new Date().toISOString();
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
        updated = true;
      }
    } catch (e) {
      console.error('Error actualizando leads.json:', e.message);
    }
  }

  return updated;
}

// Eliminar lead
export async function deleteLead(leadId) {
  let deleted = false;

  if (isDbConnected()) {
    try {
      const res = await pool.query('DELETE FROM leads WHERE id = $1', [String(leadId)]);
      if (res.rowCount > 0) deleted = true;
    } catch (err) {
      console.error('Error eliminando lead en PostgreSQL:', err.message);
    }
  }

  // Eliminar también en leads.json
  if (fs.existsSync(LEADS_FILE)) {
    try {
      const content = fs.readFileSync(LEADS_FILE, 'utf-8');
      let leads = JSON.parse(content || '[]');
      const initialCount = leads.length;
      leads = leads.filter(l => String(l.id) !== String(leadId));
      if (leads.length < initialCount) {
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
        deleted = true;
      }
    } catch (e) {
      console.error('Error eliminando de leads.json:', e.message);
    }
  }

  return deleted;
}
