import pg from 'pg';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LEADS_FILE = process.env.LEADS_FILE || path.join(__dirname, 'data', 'leads.json');
const GUIDES_FILE = path.join(__dirname, 'guides_config.json');
const PROSPECTS_FILE = process.env.PROSPECTS_FILE || path.join(__dirname, 'data', 'prospects.json');

fs.mkdirSync(path.dirname(LEADS_FILE), { recursive: true });
fs.mkdirSync(path.dirname(PROSPECTS_FILE), { recursive: true });

const { Pool } = pg;

let pool = null;
let dbReady = false;

export function initDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString || connectionString.trim() === '') {
    console.log('ℹ️ [DB] DATABASE_URL no configurado. Operando con almacenamiento local (leads.json y guides_config.json).');
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

          CREATE TABLE IF NOT EXISTS guides_config (
            slug VARCHAR(255) PRIMARY KEY,
            status VARCHAR(50) DEFAULT 'borrador',
            publish_at TIMESTAMPTZ,
            updated_at TIMESTAMPTZ DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS prospects (
            id BIGSERIAL PRIMARY KEY,
            company_name VARCHAR(255) NOT NULL DEFAULT '',
            sector VARCHAR(255) NOT NULL DEFAULT '',
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(100) DEFAULT '',
            address TEXT DEFAULT '',
            city VARCHAR(255) DEFAULT '',
            website TEXT DEFAULT '',
            source_data JSONB DEFAULT '{}'::jsonb,
            email_sent BOOLEAN NOT NULL DEFAULT false,
            email_sent_at TIMESTAMPTZ,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW(),
            UNIQUE(email)
          );
          CREATE INDEX IF NOT EXISTS idx_prospects_sector ON prospects(sector);
          CREATE INDEX IF NOT EXISTS idx_prospects_email_sent ON prospects(email_sent);
        `);

        // Sincronizar e inicializar las 55 guías en PostgreSQL si falta alguna
        if (fs.existsSync(GUIDES_FILE)) {
          try {
            const raw = fs.readFileSync(GUIDES_FILE, 'utf-8');
            const fileMap = JSON.parse(raw || '{}');
            for (const [slug, item] of Object.entries(fileMap)) {
              await pool.query(
                `INSERT INTO guides_config (slug, status, publish_at, updated_at)
                 VALUES ($1, $2, $3, NOW())
                 ON CONFLICT (slug) DO UPDATE
                 SET status = EXCLUDED.status,
                     publish_at = EXCLUDED.publish_at,
                     updated_at = NOW()
                 WHERE guides_config.status = 'borrador' AND EXCLUDED.status = 'programada'`,
                [slug, item.status || 'borrador', item.publishAt ? new Date(item.publishAt) : null]
              );
            }
            console.log('🐘 [DB] Base de datos PostgreSQL sincronizada con las 55 guías.');
          } catch (syncErr) {
            console.error('⚠️ [DB] Error sincronizando guías iniciales en PostgreSQL:', syncErr.message);
          }
        }

        client.release();
        dbReady = true;
        console.log('🐘 [DB] Conectado exitosamente a PostgreSQL. Tablas leads y guides_config activas.');
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

function mapProspect(row) {
  return {
    id: row.id,
    companyName: row.company_name,
    sector: row.sector,
    email: row.email,
    phone: row.phone,
    address: row.address,
    city: row.city,
    website: row.website,
    sourceData: row.source_data || {},
    emailSent: Boolean(row.email_sent),
    emailSentAt: row.email_sent_at ? new Date(row.email_sent_at).toISOString() : null,
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : null
  };
}

export async function getAllProspects() {
  if (isDbConnected()) {
    try {
      const res = await pool.query('SELECT * FROM prospects ORDER BY created_at DESC, id DESC');
      return res.rows.map(mapProspect);
    } catch (err) { console.warn('⚠️ [DB] Fallo leyendo prospects:', err.message); }
  }
  try {
    if (!fs.existsSync(PROSPECTS_FILE)) return [];
    return JSON.parse(fs.readFileSync(PROSPECTS_FILE, 'utf8') || '[]');
  } catch (err) { console.error('Error leyendo prospects.json:', err.message); return []; }
}

export async function importProspects(prospects) {
  const imported = [], skipped = [];
  let local = [];
  try { local = fs.existsSync(PROSPECTS_FILE) ? JSON.parse(fs.readFileSync(PROSPECTS_FILE, 'utf8') || '[]') : []; } catch {}
  for (const item of prospects) {
    const email = String(item.email || '').trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { skipped.push({ reason: 'email_invalido', item }); continue; }
    const record = { id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, companyName: String(item.companyName || '').trim(), sector: String(item.sector || '').trim(), email, phone: String(item.phone || '').trim(), address: String(item.address || '').trim(), city: String(item.city || '').trim(), website: String(item.website || '').trim(), sourceData: item.sourceData || {}, emailSent: false, emailSentAt: null, createdAt: new Date().toISOString() };
    if (isDbConnected()) {
      try {
        const result = await pool.query(`INSERT INTO prospects (company_name, sector, email, phone, address, city, website, source_data) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT (email) DO NOTHING RETURNING *`, [record.companyName, record.sector, record.email, record.phone, record.address, record.city, record.website, record.sourceData]);
        if (result.rowCount) imported.push(mapProspect(result.rows[0])); else skipped.push({ reason: 'email_duplicado', item });
      } catch (err) { skipped.push({ reason: err.message, item }); }
    } else if (local.some(p => p.email === email)) skipped.push({ reason: 'email_duplicado', item });
    else { local.unshift(record); imported.push(record); }
  }
  if (!isDbConnected()) fs.writeFileSync(PROSPECTS_FILE, JSON.stringify(local, null, 2), 'utf8');
  return { imported, skipped };
}

export async function markProspectsEmailSent(ids) {
  const wanted = new Set(ids.map(String));
  if (isDbConnected()) {
    const res = await pool.query('UPDATE prospects SET email_sent = true, email_sent_at = NOW(), updated_at = NOW() WHERE id = ANY($1::bigint[]) RETURNING *', [ids.map(Number).filter(Number.isFinite)]);
    return res.rows.map(mapProspect);
  }
  let local = [];
  try { local = fs.existsSync(PROSPECTS_FILE) ? JSON.parse(fs.readFileSync(PROSPECTS_FILE, 'utf8') || '[]') : []; } catch {}
  const now = new Date().toISOString();
  const updated = local.filter(p => wanted.has(String(p.id))).map(p => ({ ...p, emailSent: true, emailSentAt: now }));
  local = local.map(p => wanted.has(String(p.id)) ? { ...p, emailSent: true, emailSentAt: now } : p);
  fs.writeFileSync(PROSPECTS_FILE, JSON.stringify(local, null, 2), 'utf8');
  return updated;
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
          meta_lead_id = COALESCE(EXCLUDED.meta_lead_id, leads.meta_lead_id),
          name = EXCLUDED.name,
          phone = EXCLUDED.phone,
          email = EXCLUDED.email,
          client_type = EXCLUDED.client_type,
          source = EXCLUDED.source,
          page_url = EXCLUDED.page_url,
          monthly_bill = EXCLUDED.monthly_bill,
          notes = EXCLUDED.notes,
          status = EXCLUDED.status,
          notified = EXCLUDED.notified,
          has_file = EXCLUDED.has_file,
          file_name = EXCLUDED.file_name,
          file_size = EXCLUDED.file_size,
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

// ==========================================
// CONFIGURACIÓN DE GUÍAS (PUBLICADA / BORRADOR / PROGRAMADA)
// ==========================================

export async function getGuidesConfig() {
  const configs = {};

  // 1. Cargar desde guides_config.json primero (fallback / caché local)
  if (fs.existsSync(GUIDES_FILE)) {
    try {
      const raw = fs.readFileSync(GUIDES_FILE, 'utf-8');
      const jsonMap = JSON.parse(raw || '{}');
      Object.assign(configs, jsonMap);
    } catch (e) {
      console.error('Error leyendo guides_config.json:', e.message);
    }
  }

  // 2. Si PostgreSQL está activo, consultar y sobreescribir con datos frescos
  if (isDbConnected()) {
    try {
      const res = await pool.query('SELECT slug, status, publish_at, updated_at FROM guides_config');
      for (const row of res.rows) {
        configs[row.slug] = {
          status: row.status || 'borrador',
          publishAt: row.publish_at ? new Date(row.publish_at).toISOString() : null,
          updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString()
        };
      }
    } catch (err) {
      console.error('Error leyendo guides_config de PostgreSQL:', err.message);
    }
  }

  return configs;
}

export async function saveGuideConfig(slug, configData) {
  const { status = 'publicada', publishAt = null } = configData;
  const now = new Date().toISOString();

  // 1. Guardar en PostgreSQL si está disponible
  if (isDbConnected()) {
    try {
      await pool.query(
        `INSERT INTO guides_config (slug, status, publish_at, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (slug)
         DO UPDATE SET status = EXCLUDED.status, publish_at = EXCLUDED.publish_at, updated_at = NOW()`,
        [slug, status, publishAt ? new Date(publishAt) : null]
      );
    } catch (err) {
      console.error('Error guardando config de guía en PostgreSQL:', err.message);
    }
  }

  // 2. Guardar siempre en guides_config.json
  try {
    let configs = {};
    if (fs.existsSync(GUIDES_FILE)) {
      const raw = fs.readFileSync(GUIDES_FILE, 'utf-8');
      configs = JSON.parse(raw || '{}');
    }
    configs[slug] = {
      status,
      publishAt: publishAt ? new Date(publishAt).toISOString() : null,
      updatedAt: now
    };
    fs.writeFileSync(GUIDES_FILE, JSON.stringify(configs, null, 2), 'utf-8');
    return { success: true, config: configs[slug] };
  } catch (fileErr) {
    console.error('Error guardando guides_config.json:', fileErr.message);
    return { success: false, error: fileErr.message };
  }
}
