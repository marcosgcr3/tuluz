import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, TrendingUp, Mail, Phone, Calendar, Download, 
  RefreshCw, Search, Filter, CheckCircle2, Clock, 
  AlertCircle, ExternalLink, Lock, LogOut, MessageSquare, 
  FileText, Sparkles, ChevronRight, Eye, X, ArrowLeft,
  Check, ShieldCheck, Trash2, Globe, UserPlus, BookOpen,
  CalendarClock, Save
} from 'lucide-react';

// Official Meta SVG Icon
const MetaIcon = ({ size = 16, color = "currentColor", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path d="M12.001 8.167c-1.895 0-3.418 1.488-3.418 3.321 0 1.833 1.523 3.321 3.418 3.321 1.894 0 3.417-1.488 3.417-3.321 0-1.833-1.523-3.321-3.417-3.321zm0 5.438c-1.22 0-2.181-.96-2.181-2.117s.961-2.117 2.181-2.117 2.18 1.007 2.18 2.117c0 1.157-.96 2.117-2.18 2.117zm8.175-5.918c-.85-.85-2.022-1.325-3.268-1.325-1.574 0-3.037.76-4.041 2.03-1.004-1.27-2.467-2.03-4.04-2.03-1.246 0-2.418.475-3.268 1.325C4.697 8.528 4.2 9.712 4.2 11.002c0 1.289.497 2.474 1.359 3.349.85.85 2.022 1.325 3.268 1.325 1.573 0 3.036-.76 4.04-2.03 1.004 1.27 2.467 2.03 4.041 2.03 1.246 0 2.418-.475 3.268-1.325.862-.875 1.359-2.06 1.359-3.349 0-1.29-.497-2.474-1.359-3.349zm-1.026 5.673c-.584.584-1.385.908-2.242.908-1.355 0-2.613-.746-3.364-1.996l-.544-.9-.544.9c-.751 1.25-2.009 1.996-3.364 1.996-.857 0-1.658-.324-2.242-.908-.592-.6-.917-1.408-.917-2.28 0-.872.325-1.68.917-2.28.584-.584 1.385-.908 2.242-.908 1.355 0 2.613.746 3.364 1.996l.544.9.544-.9c.751-1.25 2.009-1.996 3.364-1.996.857 0 1.658.324 2.242.908.592.6.917 1.408.917 2.28 0 .872-.325 1.68-.917 2.28z"/>
  </svg>
);

// Official WhatsApp SVG Icon
const WhatsAppIcon = ({ size = 16, color = "currentColor", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15s-.778.98-.954 1.18c-.176.2-.351.226-.652.075s-1.272-.469-2.423-1.496c-.896-.799-1.5-1.786-1.676-2.087s-.019-.464.132-.614c.135-.135.301-.351.451-.527.151-.176.201-.301.301-.502.101-.201.05-.376-.025-.527s-.678-1.634-.929-2.238c-.244-.588-.493-.508-.678-.518-.175-.009-.376-.011-.577-.011s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.511s1.079 2.913 1.23 3.114c.15.201 2.124 3.243 5.146 4.549.719.311 1.28.497 1.718.636.722.229 1.378.197 1.898.119.579-.087 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351z"/>
    <path d="M12.004 2C6.48 2 2 6.478 2 12c0 1.95.56 3.77 1.53 5.31L2 22l4.83-1.49A9.957 9.957 0 0 0 12.004 22C17.525 22 22 17.522 22 12S17.525 2 12.004 2zm0 18.17c-1.64 0-3.17-.46-4.49-1.26l-.32-.2-2.87.89.89-2.8-.21-.34A8.147 8.147 0 0 1 3.834 12c0-4.5 3.66-8.17 8.17-8.17 4.51 0 8.17 3.67 8.17 8.17 0 4.5-3.66 8.17-8.17 8.17z"/>
  </svg>
);

// Helper function to calculate clean word count without HTML or markdown markup
export function getGuideWordCount(guide) {
  if (!guide) return 0;
  let rawText = [guide.title || '', guide.excerpt || '', guide.author || ''].join(' ');
  if (Array.isArray(guide.sections)) {
    guide.sections.forEach(sec => {
      if (sec.heading) rawText += ' ' + sec.heading;
      if (sec.content) rawText += ' ' + sec.content;
      if (Array.isArray(sec.bullets)) rawText += ' ' + sec.bullets.join(' ');
      if (sec.callout) {
        if (typeof sec.callout === 'string') rawText += ' ' + sec.callout;
        else if (sec.callout.title || sec.callout.text) rawText += ' ' + (sec.callout.title || '') + ' ' + (sec.callout.text || '');
      }
      if (sec.table) {
        if (Array.isArray(sec.table.headers)) rawText += ' ' + sec.table.headers.join(' ');
        if (Array.isArray(sec.table.rows)) {
          sec.table.rows.forEach(row => { if (Array.isArray(row)) rawText += ' ' + row.join(' '); });
        }
      }
    });
  }
  if (Array.isArray(guide.faqs)) {
    guide.faqs.forEach(faq => {
      if (faq.q) rawText += ' ' + faq.q;
      if (faq.a) rawText += ' ' + faq.a;
    });
  }
  const clean = rawText
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return clean ? clean.split(/\s+/).length : 0;
}

const BUSINESS_GROUPS = {
  restauracion: { label: 'Bares, cafeterías y restauración', terms: ['bar', 'cafeteria', 'cafe', 'restaurante', 'taperia', 'taberna', 'bistro', 'cerveceria', 'gastrobar', 'pizzeria', 'asador'] },
  alojamientos: { label: 'Hoteles y alojamientos', terms: ['hotel', 'hostal', 'alojamiento', 'apartamento turistico', 'apartamentos turisticos', 'casa rural', 'pension', 'resort', 'guest house', 'bed breakfast', 'camping'] }
};

const normalizeBusinessText = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const matchesBusinessGroup = (group, prospect) => {
  const text = normalizeBusinessText(`${prospect.sector} ${prospect.companyName}`);
  return group.terms.some(term => term === 'bar' ? /(^|[^a-z])bar([^a-z]|$)/.test(text) : text.includes(term));
};

export default function AdminDashboard({ navigate }) {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem('tuluz_admin_key') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Data state
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [updatingLeadId, setUpdatingLeadId] = useState(null);
  const [savingBenefitLeadId, setSavingBenefitLeadId] = useState(null);

  // Navigation Tab
  const [adminTab, setAdminTab] = useState('leads'); // 'leads' | 'guides' | 'prospects'
  const [prospects, setProspects] = useState([]);
  const [prospectsLoaded, setProspectsLoaded] = useState(false);
  const [prospectsLoading, setProspectsLoading] = useState(false);
  const [prospectFile, setProspectFile] = useState(null);
  const [prospectSearch, setProspectSearch] = useState('');
  const [prospectSector, setProspectSector] = useState('all');
  const [prospectSentFilter, setProspectSentFilter] = useState('all');
  const [selectedProspectIds, setSelectedProspectIds] = useState([]);
  const [prospectSubject, setProspectSubject] = useState('Asesoramiento energético gratuito para {empresa}');
  const [prospectBody, setProspectBody] = useState('Hola,\n\nSoy David, fundador y responsable de tuLuz, una agencia de asesoría energética especializada en pymes y autónomos.\n\nAyudamos a empresas como la vuestra a revisar y optimizar sus costes de luz y gas. Si quieres, puedes responder a este correo adjuntando una factura reciente de luz o gas y la analizaremos gratuitamente para indicarte si detectamos posibles ahorros.\n\nY no nos limitamos a revisar la factura: si te interesa, también nos encargamos gratuitamente de todo el proceso, incluido el cambio de compañía, la búsqueda de una opción más adecuada y toda la gestión necesaria, sin coste y sin compromiso.\n\nUn saludo,');
  const [savingProspectTemplate, setSavingProspectTemplate] = useState(false);
  const [prospectNotice, setProspectNotice] = useState('');
  const [gmailStatus, setGmailStatus] = useState({ configured: false, connected: false, email: null });
  const [gmailSyncing, setGmailSyncing] = useState(false);

  // Guides Management State
  const [guidesConfigMap, setGuidesConfigMap] = useState({});
  const [guides, setGuides] = useState([]);
  const [guidesLoading, setGuidesLoading] = useState(false);
  const [savingGuideSlug, setSavingGuideSlug] = useState(null);
  const [guideSuccessToast, setGuideSuccessToast] = useState(null);
  const [guideSearchTerm, setGuideSearchTerm] = useState('');
  const [guideCategoryFilter, setGuideCategoryFilter] = useState('all');
  const [guideStatusFilter, setGuideStatusFilter] = useState('all');
  const [guideForms, setGuideForms] = useState({});
  const [autoScheduling, setAutoScheduling] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Detail Modal
  const [selectedLead, setSelectedLead] = useState(null);
  const [newLeadToast, setNewLeadToast] = useState(null);

  // Manual Lead Modal & Form
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addingLead, setAddingLead] = useState(false);
  const [addLeadError, setAddLeadError] = useState('');
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    clientType: 'particular',
    source: 'WhatsApp Directo',
    status: 'nuevo',
    monthlyBill: '',
    notes: ''
  });

  // Status configuration
  const STATUS_CONFIG = {
    nuevo: { label: 'Nuevo', color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
    contactado: { label: 'Contactado', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
    en_estudio: { label: 'En estudio', color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe' },
    ganado: { label: 'Ganado / Cliente', color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
    descartado: { label: 'Descartado', color: '#64748b', bg: '#f8fafc', border: '#e2e8f0' }
  };

  const fetchDashboardData = async (keyToUse, isBackground = false) => {
    const key = keyToUse || adminKey;
    if (!key) return;

    if (!isBackground) setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/leads-summary?key=${encodeURIComponent(key)}`);
      if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('tuluz_admin_key');
        setAuthError('Clave de administración incorrecta. Por favor verifícala.');
        if (!isBackground) setLoading(false);
        return;
      }
      if (!res.ok) {
        throw new Error(`Error en el servidor (${res.status})`);
      }
      const data = await res.json();
      setDashboardData(prev => {
        if (isBackground && prev && data.totalLeads > prev.totalLeads) {
          const newest = data.leads && data.leads[0] ? data.leads[0].name : 'Nuevo contacto';
          setNewLeadToast(`🎯 ¡Nuevo cliente recibido! ${newest}`);
          setTimeout(() => setNewLeadToast(null), 8000);
        }
        return data;
      });
      setIsAuthenticated(true);
      sessionStorage.setItem('tuluz_admin_key', key);
    } catch (err) {
      console.error(err);
      if (!isBackground) setError(err.message || 'No se pudo conectar con el servidor.');
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  const fetchGuidesConfig = async (keyToUse) => {
    const key = keyToUse || adminKey;
    if (!key) return;
    setGuidesLoading(true);
    try {
      const [res, guidesRes] = await Promise.all([
        fetch(`/api/admin/guides-config?key=${encodeURIComponent(key)}`),
        fetch('/api/admin/guides', { headers: { 'x-api-key': key } })
      ]);
      if (res.ok && guidesRes.ok) {
        const [data, guidesData] = await Promise.all([res.json(), guidesRes.json()]);
        const configs = data.configs || {};
        const guideList = guidesData.guides || [];
        setGuides(guideList);
        setGuidesConfigMap(configs);

        // Inicializar formularios editables por cada guía
        const forms = {};
        guideList.forEach(g => {
          const c = configs[g.slug] || { status: g.status || 'borrador', publishAt: null };
          let dateStr = '';
          if (c.publishAt) {
            try {
              const d = new Date(c.publishAt);
              // Format for datetime-local: YYYY-MM-DDTHH:mm
              const pad = n => String(n).padStart(2, '0');
              dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
            } catch (e) {}
          }
          forms[g.slug] = {
            status: c.status || g.status || 'borrador',
            publishAt: dateStr
          };
        });
        setGuideForms(forms);
      }
    } catch (err) {
      console.error('Error cargando configuración de guías:', err);
    } finally {
      setGuidesLoading(false);
    }
  };

  const fetchProspectTemplate = async (keyToUse) => {
    const key = keyToUse || adminKey;
    if (!key) return;
    try {
      const res = await fetch(`/api/admin/prospects/template?key=${encodeURIComponent(key)}`);
      const data = await res.json();
      if (res.ok && data.template) {
        setProspectSubject(data.template.subject);
        setProspectBody(data.template.body);
      }
    } catch (err) { console.error('Error cargando plantilla de prospección:', err); }
  };

  const handleSaveProspectTemplate = async () => {
    setSavingProspectTemplate(true);
    try {
      const res = await fetch('/api/admin/prospects/template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': adminKey },
        body: JSON.stringify({ subject: prospectSubject, body: prospectBody })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'No se pudo guardar la plantilla');
      setProspectNotice('✅ Plantilla guardada. Los próximos envíos usarán este texto.');
    } catch (err) { setProspectNotice(`❌ ${err.message}`); }
    finally { setSavingProspectTemplate(false); }
  };

  const handleSaveGuide = async (slug) => {
    const form = guideForms[slug] || { status: 'publicada', publishAt: '' };
    
    // Validación para fecha de publicación programada
    if (form.status === 'programada' && !form.publishAt) {
      alert('Para programar una publicación, debes seleccionar la fecha y hora en la que se publicará.');
      return;
    }

    setSavingGuideSlug(slug);
    try {
      const isoDate = form.publishAt ? new Date(form.publishAt).toISOString() : null;
      const res = await fetch('/api/admin/guides-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': adminKey
        },
        body: JSON.stringify({
          slug,
          status: form.status,
          publishAt: isoDate
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Error al guardar');
      }

      setGuidesConfigMap(prev => ({
        ...prev,
        [slug]: data.guide
      }));

      const guideItem = guides.find(g => g.slug === slug);
      const title = guideItem ? guideItem.title : slug;
      setGuideSuccessToast(`✓ Guía "${title.slice(0, 35)}..." guardada como ${form.status.toUpperCase()}`);
      setTimeout(() => setGuideSuccessToast(null), 4000);
    } catch (err) {
      alert('Error al guardar la guía: ' + err.message);
    } finally {
      setSavingGuideSlug(null);
    }
  };

  const handleAutoScheduleGuides = async () => {
    if (!window.confirm('¿Deseas programar automáticamente todos los artículos en borrador para que se publiquen 2 veces por semana (lunes y jueves) entre las 9:00 y las 12:00 (hora de España)?')) {
      return;
    }

    setAutoScheduling(true);
    try {
      const res = await fetch('/api/admin/guides/auto-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': adminKey
        }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Error al auto-programar');
      }

      await fetchGuidesConfig(adminKey);
      setGuideSuccessToast(`✓ ${data.message || 'Artículos programados exitosamente'}`);
      setTimeout(() => setGuideSuccessToast(null), 6000);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setAutoScheduling(false);
    }
  };

  useEffect(() => {
    if (adminKey) {
      fetchDashboardData(adminKey);
      fetchGuidesConfig(adminKey);
      fetchProspects();
      fetchProspectTemplate(adminKey);
      fetchGmailStatus();

      // Auto-refresco silencioso cada 15 segundos para mantener el panel siempre al día
      const timer = setInterval(() => {
        fetchDashboardData(adminKey, true);
      }, 15000);

      return () => clearInterval(timer);
    }
  }, [adminKey]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;
    setAuthError('');
    setAdminKey(passwordInput.trim());
    fetchDashboardData(passwordInput.trim());
    fetchGuidesConfig(passwordInput.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tuluz_admin_key');
    setAdminKey('');
    setIsAuthenticated(false);
    setDashboardData(null);
    setGuidesConfigMap({});
    setProspects([]);
    setProspectsLoaded(false);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingLeadId(leadId);
    try {
      const res = await fetch('/api/leads/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': adminKey
        },
        body: JSON.stringify({ leadId, status: newStatus })
      });

      if (!res.ok) throw new Error('Error al actualizar estado');

      // Update local state smoothly
      setDashboardData(prev => {
        if (!prev) return prev;
        const updatedLeads = prev.leads.map(l => 
          String(l.id) === String(leadId) ? { ...l, status: newStatus } : l
        );
        return { ...prev, leads: updatedLeads };
      });

      if (selectedLead && String(selectedLead.id) === String(leadId)) {
        setSelectedLead(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert('No se pudo actualizar el estado: ' + err.message);
    } finally {
      setUpdatingLeadId(null);
    }
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    if (!newLeadForm.name.trim() && !newLeadForm.phone.trim() && !newLeadForm.email.trim()) {
      setAddLeadError('Por favor introduce al menos el nombre, teléfono o correo del contacto.');
      return;
    }

    setAddingLead(true);
    setAddLeadError('');
    try {
      const res = await fetch('/api/leads/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': adminKey
        },
        body: JSON.stringify(newLeadForm)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Error al guardar el nuevo contacto');
      }

      const { lead: createdLead } = await res.json();

      // Update dashboard state smoothly
      setDashboardData(prev => {
        if (!prev) return prev;
        const leads = [createdLead, ...(prev.leads || [])];
        const bySource = { ...(prev.bySource || {}) };
        bySource[createdLead.source] = (bySource[createdLead.source] || 0) + 1;
        const byStatus = { ...(prev.byStatus || {}) };
        byStatus[createdLead.status] = (byStatus[createdLead.status] || 0) + 1;

        return {
          ...prev,
          totalLeads: (prev.totalLeads || 0) + 1,
          todayLeads: (prev.todayLeads || 0) + 1,
          weekLeads: (prev.weekLeads || 0) + 1,
          bySource,
          byStatus,
          leads
        };
      });

      setIsAddModalOpen(false);
      setNewLeadForm({
        name: '',
        phone: '',
        email: '',
        clientType: 'particular',
        source: 'WhatsApp Directo',
        status: 'nuevo',
        monthlyBill: '',
        notes: ''
      });

      setNewLeadToast(`✅ ¡Lead añadido correctamente! (${createdLead.name})`);
      setTimeout(() => setNewLeadToast(null), 6000);
    } catch (err) {
      setAddLeadError(err.message || 'Error al crear el lead.');
    } finally {
      setAddingLead(false);
    }
  };

  const [syncingMeta, setSyncingMeta] = useState(false);

  const handleSyncMeta = async () => {
    setSyncingMeta(true);
    try {
      const res = await fetch('/api/leads/sync-meta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': adminKey
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al sincronizar');
      fetchDashboardData();
    } catch (err) {
      alert('Error al sincronizar con Meta: ' + err.message);
    } finally {
      setSyncingMeta(false);
    }
  };

  const [testingEmail, setTestingEmail] = useState(false);

  const handleTestEmail = async () => {
    setTestingEmail(true);
    try {
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': adminKey
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error enviando email de prueba');
      alert(`✅ ${data.message}`);
    } catch (err) {
      alert(`❌ Error enviando email de prueba: ${err.message}`);
    } finally {
      setTestingEmail(false);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este contacto del panel?')) return;
    try {
      const res = await fetch('/api/leads/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': adminKey
        },
        body: JSON.stringify({ leadId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al eliminar');

      // Actualizar estado local
      setDashboardData(prev => {
        if (!prev) return prev;
        const newLeads = prev.leads.filter(l => String(l.id) !== String(leadId));
        return {
          ...prev,
          leads: newLeads,
          totalLeads: Math.max(0, prev.totalLeads - 1)
        };
      });

      if (selectedLead && String(selectedLead.id) === String(leadId)) {
        setSelectedLead(null);
      }
    } catch (err) {
      alert('No se pudo eliminar el contacto: ' + err.message);
    }
  };

  const handleExportCsv = () => {
    const url = `/api/leads/export-csv?key=${encodeURIComponent(adminKey)}`;
    window.open(url, '_blank');
  };

  const handleBenefitChange = (leadId, value) => {
    setDashboardData(prev => {
      if (!prev) return prev;
      return { ...prev, leads: prev.leads.map(lead => String(lead.id) === String(leadId) ? { ...lead, benefit: value } : lead) };
    });
    if (selectedLead && String(selectedLead.id) === String(leadId)) {
      setSelectedLead(prev => ({ ...prev, benefit: value }));
    }
  };

  const handleBenefitSave = async (leadId, benefit) => {
    setSavingBenefitLeadId(leadId);
    try {
      const res = await fetch('/api/leads/update-benefit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': adminKey },
        body: JSON.stringify({ leadId, benefit })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Error al guardar el beneficio');
      const savedBenefit = data.lead.benefit;
      setDashboardData(prev => !prev ? prev : { ...prev, leads: prev.leads.map(lead => String(lead.id) === String(leadId) ? { ...lead, benefit: savedBenefit } : lead) });
      if (selectedLead && String(selectedLead.id) === String(leadId)) {
        setSelectedLead(prev => ({ ...prev, benefit: savedBenefit }));
      }
    } catch (err) {
      alert('No se pudo guardar el beneficio: ' + err.message);
      fetchDashboardData(adminKey, true);
    } finally {
      setSavingBenefitLeadId(null);
    }
  };

  const fetchProspects = async () => {
    setProspectsLoading(true);
    try {
      const res = await fetch(`/api/admin/prospects?key=${encodeURIComponent(adminKey)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudieron cargar los posibles clientes');
      setProspects(data.prospects || []);
      setProspectsLoaded(true);
    } catch (err) { setProspectNotice(`❌ ${err.message}`); }
    finally { setProspectsLoading(false); }
  };

  // Mantiene el contador del menú y la tabla actualizados, incluso si está en otra pestaña.
  useEffect(() => {
    if (!adminKey) return undefined;
    const timer = setInterval(() => { fetchProspects(); }, 30 * 1000);
    return () => clearInterval(timer);
  }, [adminKey]);

  const fetchGmailStatus = async () => {
    try {
      const res = await fetch(`/api/admin/gmail/status?key=${encodeURIComponent(adminKey)}`);
      const data = await res.json();
      if (res.ok) setGmailStatus(data);
    } catch (err) { console.error('Error consultando Gmail:', err); }
  };

  const handleConnectGmail = () => {
    window.location.href = `/api/admin/gmail/connect?key=${encodeURIComponent(adminKey)}`;
  };

  const handleGmailSync = async () => {
    setGmailSyncing(true);
    try {
      const res = await fetch('/api/admin/gmail/sync', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': adminKey }, body: JSON.stringify({ historical: true }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo revisar Gmail');
      setProspectNotice(`✅ Bandeja revisada: ${data.scanned} mensajes · ${data.updated} prospectos actualizados · ${data.converted || 0} convertidos en lead.`);
      await fetchProspects();
    } catch (err) { setProspectNotice(`❌ ${err.message}`); }
    finally { setGmailSyncing(false); }
  };

  const handleImportProspects = async () => {
    if (!prospectFile) return setProspectNotice('Selecciona un archivo CSV.');
    const formData = new FormData(); formData.append('file', prospectFile);
    setProspectsLoading(true); setProspectNotice('Importando CSV...');
    try {
      const res = await fetch('/api/admin/prospects/import', { method: 'POST', headers: { 'x-api-key': adminKey }, body: formData });
      const data = await res.json(); if (!res.ok) throw new Error(data.error || 'Error importando');
      setProspectFile(null); setProspectNotice(`✅ ${data.imported} importados · ${data.skipped} omitidos (duplicados o sin email)`); await fetchProspects();
    } catch (err) { setProspectNotice(`❌ ${err.message}`); } finally { setProspectsLoading(false); }
  };

  const handleSendProspects = async () => {
    if (!selectedProspectIds.length) return setProspectNotice('Selecciona al menos un posible cliente.');
    if (!window.confirm(`¿Enviar ${selectedProspectIds.length} correo(s)? Los enviados quedarán marcados y no se repetirán.`)) return;
    setProspectsLoading(true); setProspectNotice('Enviando correos...');
    try {
      const res = await fetch('/api/admin/prospects/send', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': adminKey }, body: JSON.stringify({ ids: selectedProspectIds, subject: prospectSubject, body: prospectBody }) });
      const data = await res.json(); if (!res.ok) throw new Error(data.error || 'Error enviando');
      setSelectedProspectIds([]); setProspectNotice(`✅ Enviados: ${data.sent} · Fallidos: ${data.failed?.length || 0} · Ya enviados: ${data.skippedAlreadySent || 0}`); await fetchProspects();
    } catch (err) { setProspectNotice(`❌ ${err.message}`); } finally { setProspectsLoading(false); }
  };

  const handleConvertProspect = async (prospect) => {
    if (prospect.converted) return;
    if (!window.confirm(`¿Convertir "${prospect.companyName || prospect.email}" en lead?`)) return;
    try {
      const res = await fetch(`/api/admin/prospects/${encodeURIComponent(prospect.id)}/convert`, { method: 'POST', headers: { 'x-api-key': adminKey } });
      const data = await res.json(); if (!res.ok) throw new Error(data.error || 'No se pudo convertir');
      setProspects(prev => prev.map(p => String(p.id) === String(prospect.id) ? { ...p, ...data.prospect, converted: true } : p));
      setProspectNotice(`✅ ${prospect.companyName || prospect.email} ya está en Leads & Clientes.`);
    } catch (err) { setProspectNotice(`❌ ${err.message}`); }
  };

  const handleCopyErrorEmails = async () => {
    const emails = [...new Set(filteredProspects
      .filter(p => p.emailStatus === 'error_envio' && !p.invalidEmail)
      .map(p => String(p.email || '').trim().toLowerCase())
      .filter(Boolean))];
    if (!emails.length) return setProspectNotice('No hay correos con error de envío en el filtro actual.');
    const text = emails.join('\n');
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
      else {
        const area = document.createElement('textarea');
        area.value = text; area.style.position = 'fixed'; area.style.opacity = '0';
        document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove();
      }
      setProspectNotice(`✅ ${emails.length} correos con error copiados, uno por línea.`);
    } catch (err) { setProspectNotice('❌ No se pudieron copiar los correos.'); }
  };

  const filteredProspects = useMemo(() => {
    const q = prospectSearch.toLowerCase().trim();
    return prospects.filter(p => {
      const matchesSearch = !q || [p.companyName, p.email, p.phone, p.city, p.sector].some(v => String(v || '').toLowerCase().includes(q));
      const group = prospectSector.startsWith('group:') ? BUSINESS_GROUPS[prospectSector.slice(6)] : null;
      const matchesSector = prospectSector === 'all' || (group ? matchesBusinessGroup(group, p) : p.sector === prospectSector);
      const matchesSent = prospectSentFilter === 'all' || (prospectSentFilter === 'pending' ? !p.emailSent && !p.invalidEmail && !['descartado', 'error_envio'].includes(p.emailStatus) : prospectSentFilter === 'error' ? p.emailStatus === 'error_envio' : prospectSentFilter === 'invalid' ? p.invalidEmail : prospectSentFilter === 'discarded' ? p.emailStatus === 'descartado' : p.emailSent);
      return matchesSearch && matchesSector && matchesSent;
    });
  }, [prospects, prospectSearch, prospectSector, prospectSentFilter]);
  const prospectSectors = useMemo(() => [...new Set(prospects.map(p => p.sector).filter(Boolean))].sort(), [prospects]);
  const uniqueProspectEmails = useMemo(
    () => new Set(prospects.map(p => String(p.email || '').trim().toLowerCase()).filter(Boolean)).size,
    [prospects]
  );

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    if (!dashboardData || !dashboardData.leads) return [];
    return dashboardData.leads.filter(lead => {
      // Search
      const term = searchTerm.toLowerCase();
      const matchSearch = !term || 
        (lead.name && lead.name.toLowerCase().includes(term)) ||
        (lead.phone && lead.phone.toLowerCase().includes(term)) ||
        (lead.email && lead.email.toLowerCase().includes(term)) ||
        (lead.notes && lead.notes.toLowerCase().includes(term));

      // Source Filter
      let matchSource = true;
      if (sourceFilter === 'meta') {
        matchSource = (lead.source || '').toLowerCase().includes('meta') || 
                      (lead.source || '').toLowerCase().includes('facebook') || 
                      (lead.source || '').toLowerCase().includes('instagram');
      } else if (sourceFilter === 'whatsapp') {
        matchSource = (lead.source || '').toLowerCase().includes('whatsapp');
      } else if (sourceFilter === 'web') {
        matchSource = !(lead.source || '').toLowerCase().includes('meta') && 
                      !(lead.source || '').toLowerCase().includes('facebook') && 
                      !(lead.source || '').toLowerCase().includes('instagram') &&
                      !(lead.source || '').toLowerCase().includes('whatsapp');
      }

      // Status Filter
      const leadStatus = lead.status || 'nuevo';
      const matchStatus = statusFilter === 'all' || leadStatus === statusFilter;

      // Type Filter
      const leadType = (lead.clientType || 'particular').toLowerCase();
      const matchType = typeFilter === 'all' || leadType === typeFilter.toLowerCase();

      return matchSearch && matchSource && matchStatus && matchType;
    }).sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : (Number(a.id) || 0);
      const timeB = b.date ? new Date(b.date).getTime() : (Number(b.id) || 0);
      return timeB - timeA; // Más reciente primero (arriba del todo)
    });
  }, [dashboardData, searchTerm, sourceFilter, statusFilter, typeFilter]);

  const hasWonLead = useMemo(
    () => (dashboardData?.leads || []).some(lead => lead.status === 'ganado'),
    [dashboardData]
  );

  // Métricas y filtrado de Guías (deben estar en el nivel superior antes de cualquier return temprano)
  const guidesStats = useMemo(() => {
    let publicadas = 0;
    let borradores = 0;
    let programadas = 0;
    const now = Date.now();

    guides.forEach(g => {
      const cfg = guidesConfigMap[g.slug] || { status: g.status || 'borrador' };
      if (cfg.status === 'borrador') {
        borradores++;
      } else if (cfg.status === 'programada') {
        const schedTime = cfg.publishAt ? new Date(cfg.publishAt).getTime() : NaN;
        if (!isNaN(schedTime) && schedTime <= now) {
          publicadas++;
        } else {
          programadas++;
        }
      } else {
        publicadas++;
      }
    });

    return { total: guides.length, publicadas, borradores, programadas };
  }, [guides, guidesConfigMap]);

  const filteredGuidesList = useMemo(() => {
    const now = Date.now();
    return guides.filter(g => {
      const cfg = guidesConfigMap[g.slug] || { status: g.status || 'borrador' };

      // Filtro por estado
      if (guideStatusFilter !== 'all') {
        if (guideStatusFilter === 'publicada') {
          const isActuallyPub = cfg.status === 'publicada' || (cfg.status === 'programada' && cfg.publishAt && new Date(cfg.publishAt).getTime() <= now);
          if (!isActuallyPub) return false;
        } else if (guideStatusFilter === 'borrador') {
          if (cfg.status !== 'borrador') return false;
        } else if (guideStatusFilter === 'programada') {
          const isFutSched = cfg.status === 'programada' && (!cfg.publishAt || new Date(cfg.publishAt).getTime() > now);
          if (!isFutSched) return false;
        }
      }

      // Filtro por búsqueda
      if (guideSearchTerm.trim() !== '') {
        const q = guideSearchTerm.toLowerCase();
        const matchTitle = g.title.toLowerCase().includes(q);
        const matchCat = g.category.toLowerCase().includes(q);
        const matchSlug = g.slug.toLowerCase().includes(q);
        if (!matchTitle && !matchCat && !matchSlug) return false;
      }

      return true;
    });
  }, [guides, guidesConfigMap, guideStatusFilter, guideSearchTerm]);

  // Clean phone for WhatsApp
  const formatWhatsappUrl = (phone, name) => {
    if (!phone) return '#';
    let clean = phone.replace(/[^0-9]/g, '');
    if (clean.length === 9 && (clean.startsWith('6') || clean.startsWith('7'))) {
      clean = '34' + clean;
    }
    const greeting = encodeURIComponent(`Hola ${name || ''}, te contacto de TúLuz Asesoramiento Energético respecto a tu solicitud de estudio de factura de luz.`);
    return `https://wa.me/${clean}?text=${greeting}`;
  };

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '20px',
        color: '#f8fafc'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(30, 41, 59, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '40px 32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #4CAF4F 0%, #2e6931 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 8px 20px rgba(76, 175, 79, 0.35)'
          }}>
            <Lock size={28} color="#ffffff" />
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
            TúLuz Admin
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 28px 0' }}>
            Panel de control, analítica y gestión de clientes potenciales
          </p>

          {authError && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textAlign: 'left'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Clave de Administración
              </label>
              <input 
                type="password"
                placeholder="Introduce tu clave secreta..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border 0.2s'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4CAF4F 0%, #3d8b3f 100%)',
                color: '#ffffff',
                border: 'none',
                fontSize: '15px',
                fontWeight: '700',
                cursor: loading ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(76, 175, 79, 0.3)',
                transition: 'transform 0.15s, opacity 0.15s'
              }}
            >
              {loading ? (
                <>
                  <RefreshCw size={18} className="spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span>Entrar al Panel</span>
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              type="button"
              onClick={() => navigate ? navigate('/') : window.location.href = '/'}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowLeft size={14} />
              <span>Volver a la web pública</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN DASHBOARD VIEW
  // ----------------------------------------------------
  const total = dashboardData?.totalLeads || 0;
  const metaTotal = dashboardData?.metaAdsLeads || 0;
  const webTotal = total - metaTotal;
  const metaPercentage = total > 0 ? Math.round((metaTotal / total) * 100) : 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      color: '#0f172a',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      {/* Top Navigation Bar */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #4CAF4F 0%, #2e6931 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(76, 175, 79, 0.25)'
          }}>
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '800', letterSpacing: '-0.3px', color: '#0f172a' }}>
                TúLuz • Panel de Métricas & Leads
              </h1>
              <span style={{
                background: '#dcfce7',
                color: '#15803d',
                fontSize: '11px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }} />
                En Vivo
              </span>
            </div>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>
              Gestión comercial unificada (Meta Ads + Web)
            </p>
          </div>
        </div>

        {/* Action Buttons Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Button: Add Manual Lead */}
          <button
            onClick={() => {
              setAddLeadError('');
              setIsAddModalOpen(true);
            }}
            title="Añadir un nuevo contacto recibido por WhatsApp, llamada, recomendación o presencial"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #16a34a',
              background: '#16a34a',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(22, 163, 74, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            <UserPlus size={16} />
            <span>+ Añadir Lead Manual</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={() => fetchDashboardData()}
            disabled={loading}
            title="Recargar datos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#334155',
              fontSize: '13px',
              fontWeight: '600',
              cursor: loading ? 'wait' : 'pointer'
            }}
          >
            <RefreshCw size={15} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            <span>{loading ? 'Actualizando...' : 'Refrescar'}</span>
          </button>

          {/* Auto-Sync Meta Ads Indicator & Force Button */}
          <button
            onClick={handleSyncMeta}
            disabled={syncingMeta || loading}
            title="Sincronización automática con Meta Ads activa. Pulsa si deseas forzar una sincronización manual inmediata."
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #bae6fd',
              background: '#e0f2fe',
              color: '#0284c7',
              fontSize: '13px',
              fontWeight: '700',
              cursor: syncingMeta ? 'wait' : 'pointer'
            }}
          >
            <MetaIcon size={15} color="#0284c7" style={{ animation: syncingMeta ? 'spin 1s linear infinite' : 'none' }} />
            <span>{syncingMeta ? 'Sincronizando...' : 'Auto-Sync Meta Activo'}</span>
          </button>

          {/* Test Email Button */}
          <button
            onClick={handleTestEmail}
            disabled={testingEmail}
            title="Enviar un correo de prueba para verificar la conexión SMTP con Google Workspace"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#334155',
              fontSize: '13px',
              fontWeight: '600',
              cursor: testingEmail ? 'wait' : 'pointer'
            }}
          >
            <Mail size={15} color="#4CAF4F" />
            <span>{testingEmail ? 'Enviando prueba...' : 'Probar Correo'}</span>
          </button>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCsv}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #4CAF4F',
              background: '#4CAF4F',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(76, 175, 79, 0.2)'
            }}
          >
            <Download size={15} />
            <span>Exportar Excel (CSV)</span>
          </button>

          {/* Web view button */}
          <button
            onClick={() => navigate ? navigate('/') : window.location.href = '/'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: '#f1f5f9',
              color: '#475569',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <ExternalLink size={15} />
            <span>Ver Web</span>
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid #fee2e2',
              background: '#fef2f2',
              color: '#ef4444',
              cursor: 'pointer'
            }}
          >
            <LogOut size={16} />
          </button>

        </div>
      </header>

      {/* Sub-Header Tabs Navigation */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        position: 'sticky',
        top: '73px',
        zIndex: 35
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setAdminTab('leads')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 18px',
              fontSize: '14px',
              fontWeight: adminTab === 'leads' ? '700' : '600',
              color: adminTab === 'leads' ? '#16a34a' : '#64748b',
              background: 'none',
              border: 'none',
              borderBottom: adminTab === 'leads' ? '3px solid #16a34a' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Users size={18} />
            <span>Leads & Clientes</span>
            <span style={{
              background: adminTab === 'leads' ? '#dcfce7' : '#f1f5f9',
              color: adminTab === 'leads' ? '#15803d' : '#64748b',
              fontSize: '11px',
              fontWeight: '700',
              padding: '2px 8px',
              borderRadius: '12px'
            }}>
              {total}
            </span>
          </button>

          <button
            onClick={() => {
              setAdminTab('guides');
              if (Object.keys(guidesConfigMap).length === 0) {
                fetchGuidesConfig();
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 18px',
              fontSize: '14px',
              fontWeight: adminTab === 'guides' ? '700' : '600',
              color: adminTab === 'guides' ? '#16a34a' : '#64748b',
              background: 'none',
              border: 'none',
              borderBottom: adminTab === 'guides' ? '3px solid #16a34a' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <BookOpen size={18} />
            <span>Gestión de Guías</span>
            <span style={{
              background: adminTab === 'guides' ? '#dcfce7' : '#f1f5f9',
              color: adminTab === 'guides' ? '#15803d' : '#64748b',
              fontSize: '11px',
              fontWeight: '700',
              padding: '2px 8px',
              borderRadius: '12px'
            }}>
              {guides.length}
            </span>
          </button>

          <button
            onClick={() => { setAdminTab('prospects'); if (!prospects.length) fetchProspects(); }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 18px', fontSize: '14px', fontWeight: adminTab === 'prospects' ? '700' : '600', color: adminTab === 'prospects' ? '#16a34a' : '#64748b', background: 'none', border: 'none', borderBottom: adminTab === 'prospects' ? '3px solid #16a34a' : '3px solid transparent', cursor: 'pointer' }}
          >
            <Mail size={18} /><span>Prospección por email</span>
            <span title={prospectsLoaded ? `${prospects.length} empresas en prospección` : 'Cargando empresas de prospección'} style={{ background: adminTab === 'prospects' ? '#dcfce7' : '#f1f5f9', color: adminTab === 'prospects' ? '#15803d' : '#64748b', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '12px' }}>{prospectsLoaded ? prospects.length : '…'}</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            {adminTab === 'leads' 
              ? 'Panel de contactos y rendimiento comercial' 
            : adminTab === 'guides' ? 'Publicación, borradores y programación de artículos' : 'Importa, segmenta y contacta empresas desde un CSV'}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '24px' }}>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: LEADS & MÉTRICAS COMERCIALES */}
        {/* ---------------------------------------------------- */}
        {adminTab === 'leads' && (
          <>
            {/* System Health Indicators */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '8px 14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#475569'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: dashboardData?.systemStatus?.databaseReady ? '#10b981' : '#3b82f6'
            }} />
            <strong>Base de Datos:</strong> {dashboardData?.systemStatus?.databaseReady ? 'PostgreSQL Conectado' : 'Almacenamiento Local'}
          </div>
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '8px 14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#475569'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: dashboardData?.systemStatus?.metaReady ? '#10b981' : '#f59e0b'
            }} />
            <strong>Meta Ads Webhook:</strong> {dashboardData?.systemStatus?.metaReady ? 'Listo & Conectado' : 'Pendiente de Token'}
          </div>

          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '8px 14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#475569'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: dashboardData?.systemStatus?.smtpReady ? '#10b981' : '#ef4444'
            }} />
            <strong>Notificaciones Email:</strong> {dashboardData?.systemStatus?.smtpReady ? 'Google Workspace Activo' : 'Sin Configurar'}
          </div>

          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '8px 14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#475569'
          }}>
            <ShieldCheck size={14} color="#0284c7" />
            <strong>Destino de Avisos:</strong> {dashboardData?.systemStatus?.smtpRecipient || 'davidad@tu-luz.es'}
          </div>
        </div>

        {/* Banner de Aviso de Error en Meta Ads si aplica */}
        {dashboardData?.systemStatus?.metaError && (
          <div style={{
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '10px',
            padding: '14px 18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            color: '#92400e',
            fontSize: '13px',
            boxShadow: '0 2px 8px rgba(217, 119, 6, 0.08)'
          }}>
            <AlertCircle size={20} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '3px', fontSize: '14px' }}>
                Aviso de Sincronización con Meta Ads (Facebook / Instagram):
              </strong>
              <div>{dashboardData.systemStatus.metaError}</div>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#b45309', lineHeight: 1.5 }}>
                💡 <strong>Motivo frecuente:</strong> El <code>META_PAGE_ACCESS_TOKEN</code> no tiene asignados los permisos necesarios en Meta for Developers. Requiere: <code>leads_retrieval</code>, <code>pages_read_engagement</code> y <code>pages_manage_ads</code> al generar el token.
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* KPI CARDS GRID */}
        {/* ---------------------------------------------------- */}
        <div className="tuluz-kpi-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '28px'
        }}>
          {/* Card 1: Total Leads */}
          <div className="tuluz-kpi-card" style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '20px 24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>TOTAL CONTACTOS</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={20} color="#16a34a" />
              </div>
            </div>
            <div className="tuluz-kpi-num" style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', letterSpacing: '-1px' }}>
              {total}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
              Clientes potenciales captados en total
            </div>
          </div>

          {/* Card 2: Meta Ads Leads */}
          <div className="tuluz-kpi-card" style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '20px 24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#0284c7' }}>META ADS (FB/IG)</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MetaIcon size={20} color="#0284c7" />
              </div>
            </div>
            <div className="tuluz-kpi-num" style={{ fontSize: '32px', fontWeight: '800', color: '#0284c7', letterSpacing: '-1px' }}>
              {metaTotal}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
              <strong>{metaPercentage}%</strong> del total de captaciones
            </div>
          </div>

          {/* Card 3: Leads Recientes (Hoy / 7 Días) */}
          <div className="tuluz-kpi-card" style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '20px 24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>ACTIVIDAD RECIENTE</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={20} color="#d97706" />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span className="tuluz-kpi-num" style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', letterSpacing: '-1px' }}>
                {dashboardData?.todayLeads || 0}
              </span>
              <span style={{ fontSize: '14px', color: '#64748b' }}>hoy</span>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>•</span>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#475569' }}>
                {dashboardData?.weekLeads || 0}
              </span>
              <span style={{ fontSize: '13px', color: '#64748b' }}>esta semana</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
              Tráfico de conversiones en curso
            </div>
          </div>

          {/* Card 4: Estado Comercial */}
          <div className="tuluz-kpi-card" style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '20px 24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>ESTADO COMERCIAL</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={20} color="#10b981" />
              </div>
            </div>
            <div className="tuluz-kpi-num" style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', letterSpacing: '-1px' }}>
              {dashboardData?.byStatus?.ganado || 0}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
              {dashboardData?.byStatus?.contactado || 0} en contacto • {dashboardData?.byStatus?.nuevo || 0} nuevos sin atender
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* CHARTS / BREAKDOWN SECTION */}
        {/* ---------------------------------------------------- */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          marginBottom: '28px'
        }}>
          {/* Canales de Captación */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0', color: '#0f172a' }}>
              Distribución por Canal de Captación
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {Object.entries(dashboardData?.bySource || {}).map(([source, count]) => {
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                const isMeta = source.toLowerCase().includes('meta') || source.toLowerCase().includes('facebook');
                const isWhatsApp = source.toLowerCase().includes('whatsapp');
                return (
                  <div key={source}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '600', color: isMeta ? '#0284c7' : isWhatsApp ? '#16a34a' : '#334155', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {isMeta ? <MetaIcon size={14} color="#0284c7" /> : isWhatsApp ? <WhatsAppIcon size={14} color="#16a34a" /> : <Globe size={14} color="#4CAF4F" />}
                        <span>{source}</span>
                      </span>
                      <span style={{ color: '#64748b' }}>
                        <strong>{count}</strong> ({pct}%)
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${pct}%`,
                        height: '100%',
                        background: isMeta ? 'linear-gradient(90deg, #0284c7, #38bdf8)' : isWhatsApp ? 'linear-gradient(90deg, #16a34a, #4ade80)' : 'linear-gradient(90deg, #4CAF4F, #81c784)',
                        borderRadius: '4px'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tipo de Cliente */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0', color: '#0f172a' }}>
              Perfil de Cliente Solicitante
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {Object.entries(dashboardData?.byType || {}).map(([type, count]) => {
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={type}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '600', textTransform: 'capitalize', color: '#334155' }}>
                        {type}
                      </span>
                      <span style={{ color: '#64748b' }}>
                        <strong>{count}</strong> ({pct}%)
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${pct}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                        borderRadius: '4px'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Embudo Comercial / Estado */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0', color: '#0f172a' }}>
              Pipeline Comercial
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.entries(STATUS_CONFIG).map(([key, config]) => {
                const count = dashboardData?.byStatus?.[key] || 0;
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={key} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: config.bg,
                    border: `1px solid ${config.border}`
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: config.color }}>
                      {config.label}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                      {count} <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>({pct}%)</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* LEADS MANAGEMENT TABLE & CONTROLS */}
        {/* ---------------------------------------------------- */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden'
        }}>
          {/* Controls Bar */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Search Input */}
            <div style={{
              position: 'relative',
              flex: '1 1 260px',
              maxWidth: '400px'
            }}>
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text"
                placeholder="Buscar por nombre, teléfono, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '10px 14px 10px 36px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  background: '#f8fafc'
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8'
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Channel Filter */}
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  background: '#ffffff',
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                <option value="all">Canal: Todos</option>
                <option value="whatsapp">💬 WhatsApp Directo</option>
                <option value="meta">Meta Ads (FB/IG)</option>
                <option value="web">Web Directa</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  background: '#ffffff',
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                <option value="all">Estado: Todos</option>
                <option value="nuevo">Nuevo</option>
                <option value="contactado">Contactado</option>
                <option value="en_estudio">En estudio</option>
                <option value="ganado">Ganado</option>
                <option value="descartado">Descartado</option>
              </select>

              {/* Counter badge */}
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#64748b',
                background: '#f1f5f9',
                padding: '8px 12px',
                borderRadius: '8px'
              }}>
                {filteredLeads.length} de {total} contactos
              </span>
            </div>
          </div>

          {/* Desktop Table (Oculta en móvil) */}
          <div className="tuluz-desktop-table" style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
              textAlign: 'left'
            }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Cliente</th>
                  <th style={{ padding: '14px 16px', fontWeight: '600' }}>Teléfono</th>
                  <th style={{ padding: '14px 16px', fontWeight: '600' }}>Canal / Origen</th>
                  <th style={{ padding: '14px 16px', fontWeight: '600' }}>Perfil</th>
                  <th style={{ padding: '14px 16px', fontWeight: '600' }}>Fecha</th>
                  <th style={{ padding: '14px 16px', fontWeight: '600' }}>Estado Comercial</th>
                  {hasWonLead && <th style={{ padding: '14px 16px', fontWeight: '600' }}>Beneficio</th>}
                  <th style={{ padding: '14px 20px', fontWeight: '600', textAlign: 'center' }}>Acciones Rápidas</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={hasWonLead ? 8 : 7} style={{ padding: '48px 20px', textAlign: 'center', color: '#94a3b8' }}>
                      <Users size={32} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
                      <p style={{ margin: 0, fontWeight: '600' }}>No se encontraron clientes potenciales</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Prueba a modificar los filtros de búsqueda</p>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const statusKey = lead.status || 'nuevo';
                    const statusStyle = STATUS_CONFIG[statusKey] || STATUS_CONFIG.nuevo;
                    const isMeta = (lead.source || '').toLowerCase().includes('meta') || (lead.source || '').toLowerCase().includes('facebook');
                    const isWhatsApp = (lead.source || '').toLowerCase().includes('whatsapp');
                    const leadDate = lead.date ? new Date(lead.date).toLocaleDateString('es-ES', {
                      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                    }) : 'N/D';

                    return (
                      <tr 
                        key={lead.id}
                        style={{
                          borderBottom: '1px solid #f1f5f9',
                          transition: 'background 0.15s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#fafafa'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        {/* Name & Email */}
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '50%',
                              background: isMeta ? '#e0f2fe' : isWhatsApp ? '#dcfce7' : '#f1f5f9',
                              color: isMeta ? '#0284c7' : isWhatsApp ? '#16a34a' : '#15803d',
                              fontWeight: '700',
                              fontSize: '13px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              {(lead.name || 'C').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                                {lead.name || 'Cliente sin nombre'}
                              </div>
                              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                                {lead.email || 'Sin correo especificado'}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Phone */}
                        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                          {lead.phone ? (
                            <a 
                              href={`tel:${lead.phone}`}
                              style={{ color: '#0f172a', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                              <Phone size={13} color="#4CAF4F" />
                              <span>{lead.phone}</span>
                            </a>
                          ) : (
                            <span style={{ color: '#94a3b8' }}>-</span>
                          )}
                        </td>

                        {/* Source Badge */}
                        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            background: isMeta ? '#e0f2fe' : isWhatsApp ? '#dcfce7' : '#f1f5f9',
                            color: isMeta ? '#0369a1' : isWhatsApp ? '#15803d' : '#475569',
                            fontWeight: '700',
                            fontSize: '11px',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            {isMeta ? <MetaIcon size={12} color="#0369a1" /> : isWhatsApp ? <WhatsAppIcon size={12} color="#15803d" /> : <Globe size={12} color="#475569" />}
                            <span>{lead.source || 'Web Directa'}</span>
                          </span>
                        </td>

                        {/* Client Type */}
                        <td style={{ padding: '14px 16px', textTransform: 'capitalize', color: '#475569', whiteSpace: 'nowrap' }}>
                          {lead.clientType || 'Particular'}
                        </td>

                        {/* Date */}
                        <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '12px', whiteSpace: 'nowrap' }}>
                          {leadDate}
                        </td>

                        {/* Status Select */}
                        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                          <select
                            value={statusKey}
                            disabled={updatingLeadId === lead.id}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            style={{
                              background: statusStyle.bg,
                              color: statusStyle.color,
                              border: `1px solid ${statusStyle.border}`,
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '12px',
                              fontWeight: '700',
                              cursor: 'pointer',
                              outline: 'none'
                            }}
                          >
                            <option value="nuevo">Nuevo</option>
                            <option value="contactado">Contactado</option>
                            <option value="en_estudio">En estudio</option>
                            <option value="ganado">Ganado</option>
                            <option value="descartado">Descartado</option>
                          </select>
                        </td>

                        {hasWonLead && (
                          <td style={{ padding: '14px 16px', minWidth: '132px' }}>
                            {statusKey === 'ganado' ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#15803d', fontWeight: '700' }}>
                                <span aria-hidden="true">€</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  inputMode="decimal"
                                  aria-label={`Beneficio de ${lead.name || 'cliente'}`}
                                  placeholder="0,00"
                                  value={lead.benefit ?? ''}
                                  disabled={savingBenefitLeadId === lead.id}
                                  onChange={(e) => handleBenefitChange(lead.id, e.target.value)}
                                  onBlur={(e) => handleBenefitSave(lead.id, e.target.value)}
                                  onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
                                  style={{ width: '82px', padding: '6px 7px', borderRadius: '6px', border: '1px solid #a7f3d0', background: '#f0fdf4', color: '#166534', fontSize: '12px', fontWeight: '700', outline: 'none' }}
                                />
                              </div>
                            ) : <span style={{ color: '#cbd5e1' }}>—</span>}
                          </td>
                        )}

                        {/* Direct Action Buttons */}
                        <td style={{ padding: '14px 20px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                            {/* Call */}
                            {lead.phone && (
                              <a
                                href={`tel:${lead.phone}`}
                                title="Llamar"
                                style={{
                                  padding: '6px',
                                  borderRadius: '6px',
                                  background: '#f0fdf4',
                                  color: '#16a34a',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: '1px solid #bbf7d0',
                                  textDecoration: 'none'
                                }}
                              >
                                <Phone size={14} />
                              </a>
                            )}

                            {/* WhatsApp */}
                            {lead.phone && (
                              <a
                                href={formatWhatsappUrl(lead.phone, lead.name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Enviar WhatsApp"
                                style={{
                                  padding: '6px',
                                  borderRadius: '6px',
                                  background: '#dcfce7',
                                  color: '#15803d',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: '1px solid #86efac',
                                  textDecoration: 'none'
                                }}
                              >
                                <WhatsAppIcon size={14} color="#15803d" />
                              </a>
                            )}

                            {/* Email */}
                            {lead.email && (
                              <a
                                href={`mailto:${lead.email}?subject=Estudio%20Energ%C3%A9tico%20T%C3%BA%20Luz%20para%20${encodeURIComponent(lead.name || '')}`}
                                title="Enviar Correo"
                                style={{
                                  padding: '6px',
                                  borderRadius: '6px',
                                  background: '#e0f2fe',
                                  color: '#0284c7',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: '1px solid #bae6fd',
                                  textDecoration: 'none'
                                }}
                              >
                                <Mail size={14} />
                              </a>
                            )}

                            {/* Details Modal Trigger */}
                            <button
                              onClick={() => setSelectedLead(lead)}
                              title="Ver ficha completa"
                              style={{
                                padding: '6px',
                                borderRadius: '6px',
                                background: '#f1f5f9',
                                color: '#475569',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #cbd5e1',
                                cursor: 'pointer'
                              }}
                            >
                              <Eye size={14} />
                            </button>

                            {/* Delete Lead Button */}
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              title="Eliminar contacto"
                              style={{
                                padding: '6px',
                                borderRadius: '6px',
                                background: '#fee2e2',
                                color: '#dc2626',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #fca5a5',
                                cursor: 'pointer'
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View (< 768px) */}
          <div className="tuluz-mobile-cards" style={{ display: 'none', flexDirection: 'column', gap: '12px', padding: '16px' }}>
            {filteredLeads.length === 0 ? (
              <div style={{ padding: '32px 16px', textAlign: 'center', color: '#94a3b8' }}>
                <Users size={28} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
                <p style={{ margin: 0, fontWeight: '600', fontSize: '14px' }}>No hay contactos</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Prueba a modificar los filtros</p>
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const statusKey = lead.status || 'nuevo';
                const statusStyle = STATUS_CONFIG[statusKey] || STATUS_CONFIG.nuevo;
                const isMeta = (lead.source || '').toLowerCase().includes('meta') || (lead.source || '').toLowerCase().includes('facebook');
                const isWhatsApp = (lead.source || '').toLowerCase().includes('whatsapp');
                const leadDate = lead.date ? new Date(lead.date).toLocaleDateString('es-ES', {
                  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                }) : 'N/D';

                return (
                  <div 
                    key={lead.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '16px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    {/* Header: Avatar, Name, Source Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: isMeta ? '#e0f2fe' : isWhatsApp ? '#dcfce7' : '#f1f5f9',
                          color: isMeta ? '#0284c7' : isWhatsApp ? '#16a34a' : '#15803d',
                          fontWeight: '800',
                          fontSize: '15px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {(lead.name || 'C').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: '800', fontSize: '15px', color: '#0f172a' }}>
                            {lead.name || 'Sin nombre'}
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>
                            {leadDate} • <span style={{ textTransform: 'capitalize' }}>{lead.clientType || 'Particular'}</span>
                          </div>
                        </div>
                      </div>

                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: isMeta ? '#e0f2fe' : '#f1f5f9',
                        color: isMeta ? '#0369a1' : '#475569',
                        fontWeight: '700',
                        fontSize: '11px',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        flexShrink: 0
                      }}>
                        {isMeta ? <MetaIcon size={12} color="#0369a1" /> : <Globe size={12} color="#475569" />}
                        <span>{isMeta ? 'Meta Ads' : 'Web'}</span>
                      </span>
                    </div>

                    {/* Contact data */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                      {lead.phone && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#64748b' }}>Teléfono:</span>
                          <strong style={{ color: '#0f172a' }}>{lead.phone}</strong>
                        </div>
                      )}
                      {lead.email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#64748b' }}>Email:</span>
                          <span style={{ color: '#334155', wordBreak: 'break-all' }}>{lead.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Status Dropdown */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Estado comercial:</span>
                      <select
                        value={statusKey}
                        disabled={updatingLeadId === lead.id}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          border: `1px solid ${statusStyle.border}`,
                          borderRadius: '8px',
                          padding: '6px 10px',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="nuevo">Nuevo</option>
                        <option value="contactado">Contactado</option>
                        <option value="en_estudio">En estudio</option>
                        <option value="ganado">Ganado</option>
                        <option value="descartado">Descartado</option>
                      </select>
                    </div>

                    {statusKey === 'ganado' && (
                      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '10px 0', borderTop: '1px solid #ecfdf5', color: '#166534', fontSize: '13px', fontWeight: '700' }}>
                        <span>Beneficio (€)</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          inputMode="decimal"
                          placeholder="0,00"
                          value={lead.benefit ?? ''}
                          disabled={savingBenefitLeadId === lead.id}
                          onChange={(e) => handleBenefitChange(lead.id, e.target.value)}
                          onBlur={(e) => handleBenefitSave(lead.id, e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
                          style={{ width: '105px', padding: '7px 9px', borderRadius: '8px', border: '1px solid #a7f3d0', background: '#f0fdf4', color: '#166534', fontSize: '13px', fontWeight: '700', outline: 'none' }}
                        />
                      </label>
                    )}

                    {/* Touch Action Buttons for Mobile */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: lead.phone ? '1fr 1fr auto' : '1fr auto',
                      gap: '8px',
                      paddingTop: '8px',
                      borderTop: '1px solid #f1f5f9'
                    }}>
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          style={{
                            padding: '11px',
                            borderRadius: '8px',
                            background: '#4CAF4F',
                            color: '#ffffff',
                            fontWeight: '700',
                            fontSize: '13px',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <Phone size={15} />
                          <span>Llamar</span>
                        </a>
                      )}
                      {lead.phone && (
                        <a
                          href={formatWhatsappUrl(lead.phone, lead.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '11px',
                            borderRadius: '8px',
                            background: '#25D366',
                            color: '#ffffff',
                            fontWeight: '700',
                            fontSize: '13px',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <WhatsAppIcon size={16} color="#ffffff" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                      <button
                        onClick={() => setSelectedLead(lead)}
                        title="Ver ficha completa"
                        style={{
                          padding: '11px 16px',
                          borderRadius: '8px',
                          background: '#f1f5f9',
                          color: '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #cbd5e1',
                          cursor: 'pointer'
                        }}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        title="Eliminar contacto"
                        style={{
                          padding: '11px 16px',
                          borderRadius: '8px',
                          background: '#fee2e2',
                          color: '#dc2626',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #fca5a5',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        </>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB: PROSPECCIÓN Y CAMPAÑAS DE EMAIL */}
      {/* ---------------------------------------------------- */}
      {adminTab === 'prospects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg,#14532d,#166534)', color: '#fff', borderRadius: '16px', padding: '24px 28px' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: '23px' }}>Prospección por email</h2>
            <p style={{ margin: '0 0 16px', color: '#dcfce7', lineHeight: 1.5 }}>Importa empresas desde un CSV, segmenta por sector y envía una presentación personalizada ofreciendo asesoramiento energético gratuito.</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button type="button" onClick={() => setAdminTab('leads')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 14px', border: '1px solid rgba(255,255,255,.45)', borderRadius: '8px', background: 'rgba(255,255,255,.12)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}><Users size={16} />Ir a Leads & Clientes</button>
              {gmailStatus.connected ? <button type="button" onClick={handleGmailSync} disabled={gmailSyncing} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 14px', border: '1px solid rgba(255,255,255,.45)', borderRadius: '8px', background: '#fff', color: '#166534', fontWeight: 700, cursor: gmailSyncing ? 'wait' : 'pointer' }}><RefreshCw size={16} />{gmailSyncing ? 'Revisando...' : 'Revisar bandeja'}</button> : gmailStatus.configured ? <button type="button" onClick={handleConnectGmail} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 14px', border: '1px solid rgba(255,255,255,.45)', borderRadius: '8px', background: '#fff', color: '#166534', fontWeight: 700, cursor: 'pointer' }}><Mail size={16} />Conectar Gmail</button> : <span style={{ fontSize: '12px', color: '#bbf7d0' }}>Configura Google OAuth en Dokploy</span>}
            </div>
            {gmailStatus.connected && <div style={{ marginTop: '12px', fontSize: '12px', color: '#bbf7d0' }}>Gmail conectado: {gmailStatus.email}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 0.8fr) minmax(320px, 1.2fr)', gap: '20px' }}>
            <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
              <h3 style={{ margin: '0 0 6px' }}>1. Importar empresas</h3>
              <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.5 }}>Admite las columnas del CSV maestro, incluyendo <code>title</code>, <code>category</code> y <code>emails</code>. Si un local tiene varias direcciones, se crea un destinatario por cada email válido. Los correos repetidos se omiten.</p>
              <input type="file" accept=".csv,text/csv" onChange={e => setProspectFile(e.target.files?.[0] || null)} style={{ width: '100%', margin: '12px 0' }} />
              <button className="btn btn-primary" type="button" onClick={handleImportProspects} disabled={prospectsLoading || !prospectFile}><Download size={16} />{prospectsLoading ? 'Procesando...' : 'Procesar CSV'}</button>
              {prospectNotice && <p style={{ margin: '14px 0 0', fontSize: '13px', color: prospectNotice.startsWith('❌') ? '#b91c1c' : '#166534' }}>{prospectNotice}</p>}
            </section>

            <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
              <h3 style={{ margin: '0 0 12px' }}>2. Plantilla personalizada</h3>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569' }}>Asunto</label>
              <input value={prospectSubject} onChange={e => setProspectSubject(e.target.value)} placeholder="Usa {empresa} y {sector}" style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', margin: '5px 0 12px', boxSizing: 'border-box' }} />
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569' }}>Mensaje</label>
              <textarea value={prospectBody} onChange={e => setProspectBody(e.target.value)} rows={8} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', marginTop: '5px', boxSizing: 'border-box', resize: 'vertical' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: '10px', flexWrap: 'wrap' }}>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>El texto actual se usa al pulsar “Enviar seleccionados”, así que puedes cambiarlo para cada sector. Variables: <code>{'{empresa}'}</code> y <code>{'{sector}'}</code>. La firma de David se añade automáticamente.</p>
                <button type="button" className="btn btn-secondary" onClick={handleSaveProspectTemplate} disabled={savingProspectTemplate}>{savingProspectTemplate ? 'Guardando...' : 'Guardar plantilla'}</button>
              </div>
            </section>
          </div>

          <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <input
                  type="checkbox"
                  aria-label="Seleccionar todos los contactos disponibles visibles"
                  checked={filteredProspects.filter(p => !p.emailSent && !p.invalidEmail && p.emailStatus !== 'descartado').length > 0 && filteredProspects.filter(p => !p.emailSent && !p.invalidEmail && p.emailStatus !== 'descartado').every(p => selectedProspectIds.includes(p.id))}
                  onChange={e => setSelectedProspectIds(e.target.checked ? filteredProspects.filter(p => !p.emailSent && !p.invalidEmail && p.emailStatus !== 'descartado').map(p => p.id) : [])}
                  style={{ marginTop: '4px' }}
                />
              <div><h3 style={{ margin: 0 }}>3. Contactos importados ({uniqueProspectEmails} correos únicos)</h3><span style={{ color: '#64748b', fontSize: '12px' }}>Mostrando {filteredProspects.length} de {uniqueProspectEmails} · {prospects.filter(p => !p.emailSent && !p.invalidEmail && !['descartado', 'error_envio'].includes(p.emailStatus)).length} pendientes · {prospects.filter(p => p.emailSent && !p.invalidEmail).length} enviados · {prospects.filter(p => p.emailStatus === 'error_envio').length} con error · {prospects.filter(p => p.invalidEmail).length} no válidos · {prospects.filter(p => p.emailStatus === 'descartado').length} descartados</span></div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input value={prospectSearch} onChange={e => setProspectSearch(e.target.value)} placeholder="Buscar empresa, email..." style={{ padding: '9px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                <select value={prospectSector} onChange={e => setProspectSector(e.target.value)} style={{ padding: '9px', border: '1px solid #cbd5e1', borderRadius: '8px' }}><option value="all">Todos los sectores</option><optgroup label="Categorías amplias">{Object.entries(BUSINESS_GROUPS).map(([key, group]) => <option key={key} value={`group:${key}`}>{group.label}</option>)}</optgroup><optgroup label="Sectores exactos">{prospectSectors.map(s => <option key={s} value={s}>{s}</option>)}</optgroup></select>
                <select value={prospectSentFilter} onChange={e => setProspectSentFilter(e.target.value)} style={{ padding: '9px', border: '1px solid #cbd5e1', borderRadius: '8px' }}><option value="pending">Pendientes</option><option value="error">Errores de envío</option><option value="invalid">Correos no válidos</option><option value="sent">Enviados</option><option value="discarded">Descartados</option><option value="all">Todos</option></select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedProspectIds(filteredProspects.filter(p => !p.emailSent && !p.invalidEmail && p.emailStatus !== 'descartado').map(p => p.id))}>Seleccionar contactos disponibles</button>
              <button type="button" className="btn btn-secondary" onClick={handleCopyErrorEmails} disabled={!filteredProspects.some(p => p.emailStatus === 'error_envio' && !p.invalidEmail)}><FileText size={16} />Copiar correos con error</button>
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedProspectIds([])}>Limpiar selección</button>
              <button type="button" className="btn btn-primary" onClick={handleSendProspects} disabled={prospectsLoading || !selectedProspectIds.length}><Mail size={16} />Enviar seleccionados ({selectedProspectIds.length})</button>
              <button type="button" className="btn btn-secondary" onClick={fetchProspects}><RefreshCw size={16} />Actualizar</button>
            </div>
            <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}><thead><tr style={{ textAlign: 'left', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}><th style={{ padding: '10px' }}></th><th style={{ padding: '10px' }}>Empresa</th><th style={{ padding: '10px' }}>Sector</th><th style={{ padding: '10px' }}>Email</th><th style={{ padding: '10px' }}>Estado</th><th style={{ padding: '10px' }}>CRM</th></tr></thead><tbody>{filteredProspects.map(p => <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}><td style={{ padding: '10px' }}><input type="checkbox" checked={selectedProspectIds.includes(p.id)} disabled={p.emailSent || p.invalidEmail || p.emailStatus === 'descartado'} onChange={e => setSelectedProspectIds(prev => e.target.checked ? [...prev, p.id] : prev.filter(id => id !== p.id))} /></td><td style={{ padding: '10px', fontWeight: 700 }}>{p.companyName || 'Sin nombre'}<br /><span style={{ fontWeight: 400, color: '#64748b' }}>{p.city || p.address || ''}</span></td><td style={{ padding: '10px' }}>{p.sector || '—'}</td><td style={{ padding: '10px' }}>{p.email}</td><td title={p.invalidEmail ? 'Parece una ruta o extensión de archivo, no una dirección de correo.' : p.emailStatus === 'error_envio' ? (p.emailError || 'No se pudo completar el envío.') : undefined} style={{ padding: '10px', color: p.invalidEmail || p.emailStatus === 'descartado' ? '#b91c1c' : p.emailStatus === 'error_envio' ? '#ea580c' : p.emailSent ? '#15803d' : '#d97706', fontWeight: 700 }}>{p.invalidEmail ? '✕ Correo no válido' : p.emailStatus === 'descartado' ? '✕ Descartado' : p.emailStatus === 'error_envio' ? <><div>⚠ Error de envío</div><div style={{ marginTop: '3px', maxWidth: '260px', color: '#9a3412', fontSize: '11px', fontWeight: '500', lineHeight: 1.35, whiteSpace: 'normal', wordBreak: 'break-word' }}>{p.emailError || 'No se guardó el detalle de este error anterior.'}</div></> : p.emailSent ? '✓ Enviado' : p.emailStatus === 'respuesta_automatica' ? '↩ Respuesta automática' : p.emailStatus === 'respondido' ? '💬 Respondido' : 'Pendiente'}</td><td style={{ padding: '10px' }}>{p.converted ? <span style={{ color: '#15803d', fontWeight: 700 }}>✓ En lead</span> : <button type="button" className="btn btn-secondary" style={{ padding: '6px 10px', minHeight: '32px', fontSize: '12px' }} onClick={() => handleConvertProspect(p)}>Convertir en lead</button>}</td></tr>)}</tbody></table></div>
            {!filteredProspects.length && <p style={{ textAlign: 'center', color: '#64748b', padding: '24px' }}>{prospectsLoading ? 'Cargando...' : 'No hay registros para este filtro.'}</p>}
          </section>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 2: GESTIÓN Y PUBLICACIÓN DE GUÍAS */}
      {/* ---------------------------------------------------- */}
      {adminTab === 'guides' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Header Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '24px 28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: '0 4px 20px rgba(15, 23, 42, 0.12)'
          }}>
            <div style={{ maxWidth: '780px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{
                  background: 'rgba(76, 175, 79, 0.2)',
                  color: '#4CAF4F',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '700',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Sparkles size={14} /> Centro de Contenidos
                </span>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>
                  Motor editorial SEO de tuLuz
                </span>
              </div>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: '800', color: '#ffffff' }}>
                Gestión de Publicación & Borradores de Guías
              </h2>
              <p style={{ margin: 0, fontSize: '14px', color: '#cbd5e1', lineHeight: 1.55 }}>
                Decide qué guías están visibles en la web. Puedes poner artículos en <strong>Borrador</strong> para revisarlos privadamente, dejarlos <strong>Publicados</strong> en vivo o <strong>Programar</strong> una fecha y hora para que se activen de forma 100% automática.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleAutoScheduleGuides}
                disabled={autoScheduling}
                title="Distribuye todos los artículos en borrador para publicarse automáticamente 2 veces por semana (lunes y jueves) entre las 9:00 y las 12:00 (hora española)"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  background: '#7c3aed',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: autoScheduling ? 'wait' : 'pointer',
                  boxShadow: '0 2px 8px rgba(124, 58, 237, 0.35)',
                  transition: 'all 0.2s'
                }}
              >
                <CalendarClock size={16} />
                <span>{autoScheduling ? 'Programando...' : 'Auto-Programar (2/sem: Lun y Jue)'}</span>
              </button>

              <button
                onClick={() => window.open('/guias', '_blank')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                <ExternalLink size={15} />
                <span>Ver Hub Público (/guias)</span>
              </button>
            </div>
          </div>

          {/* Guide KPI Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            {/* Total */}
            <div style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Total de Artículos</span>
                <BookOpen size={20} color="#3b82f6" />
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>
                {guidesStats.total}
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
                Artículos registrados en la plataforma
              </p>
            </div>

            {/* Publicadas */}
            <div style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '20px',
              border: '1px solid #bbf7d0',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#166534' }}>Publicadas (En Vivo)</span>
                <CheckCircle2 size={20} color="#16a34a" />
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#15803d' }}>
                {guidesStats.publicadas}
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#16a34a' }}>
                Visibles para visitantes y buscadores
              </p>
            </div>

            {/* Borradores */}
            <div style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '20px',
              border: '1px solid #fef08a',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#854d0e' }}>En Borrador</span>
                <Clock size={20} color="#ca8a04" />
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#a16207' }}>
                {guidesStats.borradores}
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#a16207' }}>
                Ocultas al público (solo vista admin)
              </p>
            </div>

            {/* Programadas */}
            <div style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '20px',
              border: '1px solid #ddd6fe',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#5b21b6' }}>Programadas</span>
                <CalendarClock size={20} color="#7c3aed" />
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#6d28d9' }}>
                {guidesStats.programadas}
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6d28d9' }}>
                Se publicarán en la fecha elegida
              </p>
            </div>
          </div>

          {/* Filters & Search Toolbar */}
          <div style={{
            background: '#ffffff',
            borderRadius: '14px',
            padding: '16px 20px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '420px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Buscar por título, categoría o slug..."
                value={guideSearchTerm}
                onChange={(e) => setGuideSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              {guideSearchTerm && (
                <button
                  onClick={() => setGuideSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Status Filter Tabs */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: `Todos (${guidesStats.total})` },
                { id: 'publicada', label: `🟢 Publicadas (${guidesStats.publicadas})` },
                { id: 'borrador', label: `🟡 Borradores (${guidesStats.borradores})` },
                { id: 'programada', label: `⏰ Programadas (${guidesStats.programadas})` }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setGuideStatusFilter(tab.id)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    border: guideStatusFilter === tab.id ? '1px solid #16a34a' : '1px solid #e2e8f0',
                    background: guideStatusFilter === tab.id ? '#16a34a' : '#f8fafc',
                    color: guideStatusFilter === tab.id ? '#ffffff' : '#475569',
                    fontSize: '13px',
                    fontWeight: guideStatusFilter === tab.id ? '700' : '500',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Guides Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredGuidesList.length === 0 ? (
              <div style={{
                background: '#ffffff',
                borderRadius: '14px',
                padding: '40px',
                textAlign: 'center',
                color: '#64748b',
                border: '1px dashed #cbd5e1'
              }}>
                <BookOpen size={36} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>No se encontraron artículos</h4>
                <p style={{ margin: 0, fontSize: '13px' }}>Prueba con otros términos de búsqueda o elimina el filtro de estado.</p>
              </div>
            ) : (
              filteredGuidesList.map(guide => {
                const cfg = guidesConfigMap[guide.slug] || { status: guide.status || 'borrador', publishAt: null };
                const form = guideForms[guide.slug] || { status: cfg.status || guide.status || 'borrador', publishAt: '' };
                const isSaving = savingGuideSlug === guide.slug;

                // Determinar estado actual real del servidor
                const now = Date.now();
                const isActuallyScheduled = cfg.status === 'programada';
                const isSchedReached = isActuallyScheduled && cfg.publishAt && new Date(cfg.publishAt).getTime() <= now;
                const isEffectivePublic = cfg.status === 'publicada' || isSchedReached;

                return (
                  <div
                    key={guide.slug}
                    style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      padding: '22px 26px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                  >
                    {/* Header Row: Category, Read Time, Slug and Server Status Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          background: 'rgba(76, 175, 79, 0.1)',
                          color: '#15803d',
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em'
                        }}>
                          {guide.category}
                        </span>

                        <span style={{ fontSize: '12px', color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={13} color="#94a3b8" /> {guide.readTime}
                        </span>

                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>•</span>

                        <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
                          /guias/{guide.slug}
                        </span>

                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>•</span>

                        <span style={{ 
                          fontSize: '12px', 
                          color: '#334155', 
                          fontWeight: '600',
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '5px',
                          background: '#f1f5f9',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0'
                        }} title="Número total de palabras del artículo (excluyendo etiquetas HTML y markdown)">
                          <FileText size={13} color="#64748b" /> {getGuideWordCount(guide).toLocaleString('es-ES')} palabras
                        </span>
                      </div>

                      {/* Actual Server Status Badge */}
                      <div>
                        {cfg.status === 'publicada' && (
                          <span style={{
                            background: '#dcfce7',
                            color: '#15803d',
                            border: '1px solid #86efac',
                            fontSize: '12px',
                            fontWeight: '700',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a' }} />
                            Publicada (En Vivo)
                          </span>
                        )}

                        {cfg.status === 'borrador' && (
                          <span style={{
                            background: '#fef3c7',
                            color: '#b45309',
                            border: '1px solid #fde68a',
                            fontSize: '12px',
                            fontWeight: '700',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#d97706' }} />
                            Borrador (Oculta)
                          </span>
                        )}

                        {cfg.status === 'programada' && (
                          <span style={{
                            background: isSchedReached ? '#dcfce7' : '#f3e8ff',
                            color: isSchedReached ? '#15803d' : '#7e22ce',
                            border: `1px solid ${isSchedReached ? '#86efac' : '#d8b4fe'}`,
                            fontSize: '12px',
                            fontWeight: '700',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <CalendarClock size={13} />
                            {isSchedReached 
                              ? 'Publicada automáticamente (Fecha alcanzada)'
                              : `Programada: ${cfg.publishAt ? new Date(cfg.publishAt).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' }) : 'Sin fecha'}`}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Article Title */}
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a', lineHeight: 1.35 }}>
                      {guide.title}
                    </h3>

                    {/* Article Excerpt */}
                    <p style={{ margin: '0 0 18px 0', fontSize: '13.5px', color: '#475569', lineHeight: 1.55 }}>
                      {guide.excerpt}
                    </p>

                    {/* Action & Configuration Panel */}
                    <div style={{
                      background: '#f8fafc',
                      borderRadius: '12px',
                      padding: '14px 18px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}>
                      {/* Left: State Selector Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#334155' }}>
                          Estado de publicación:
                        </span>

                        <div style={{ display: 'inline-flex', background: '#e2e8f0', borderRadius: '8px', padding: '3px', gap: '3px' }}>
                          {/* Publicada */}
                          <button
                            type="button"
                            onClick={() => {
                              setGuideForms(prev => ({
                                ...prev,
                                [guide.slug]: { ...form, status: 'publicada' }
                              }));
                            }}
                            style={{
                              border: 'none',
                              padding: '6px 14px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: form.status === 'publicada' ? '700' : '600',
                              background: form.status === 'publicada' ? '#16a34a' : 'transparent',
                              color: form.status === 'publicada' ? '#ffffff' : '#475569',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: form.status === 'publicada' ? '#ffffff' : '#16a34a' }} />
                            Publicada
                          </button>

                          {/* Borrador */}
                          <button
                            type="button"
                            onClick={() => {
                              setGuideForms(prev => ({
                                ...prev,
                                [guide.slug]: { ...form, status: 'borrador' }
                              }));
                            }}
                            style={{
                              border: 'none',
                              padding: '6px 14px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: form.status === 'borrador' ? '700' : '600',
                              background: form.status === 'borrador' ? '#d97706' : 'transparent',
                              color: form.status === 'borrador' ? '#ffffff' : '#475569',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: form.status === 'borrador' ? '#ffffff' : '#d97706' }} />
                            Borrador
                          </button>

                          {/* Programada */}
                          <button
                            type="button"
                            onClick={() => {
                              // Si aún no tenía fecha seleccionada, fijar por defecto mañana a las 10:00
                              let defaultDate = form.publishAt;
                              if (!defaultDate) {
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                tomorrow.setHours(10, 0, 0, 0);
                                const pad = n => String(n).padStart(2, '0');
                                defaultDate = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}T${pad(tomorrow.getHours())}:${pad(tomorrow.getMinutes())}`;
                              }
                              setGuideForms(prev => ({
                                ...prev,
                                [guide.slug]: { ...form, status: 'programada', publishAt: defaultDate }
                              }));
                            }}
                            style={{
                              border: 'none',
                              padding: '6px 14px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: form.status === 'programada' ? '700' : '600',
                              background: form.status === 'programada' ? '#7c3aed' : 'transparent',
                              color: form.status === 'programada' ? '#ffffff' : '#475569',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <CalendarClock size={13} />
                            Programada
                          </button>
                        </div>

                        {/* Date Picker if Programada is selected */}
                        {form.status === 'programada' && (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="datetime-local"
                              value={form.publishAt || ''}
                              onChange={(e) => {
                                setGuideForms(prev => ({
                                  ...prev,
                                  [guide.slug]: { ...form, publishAt: e.target.value }
                                }));
                              }}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                fontSize: '12px',
                                outline: 'none',
                                background: '#ffffff',
                                color: '#0f172a'
                              }}
                            />
                            <span style={{ fontSize: '11px', color: '#64748b' }}>
                              (Automática)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Actions (Save Button & Preview) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {/* Save Button */}
                        <button
                          type="button"
                          onClick={() => handleSaveGuide(guide.slug)}
                          disabled={isSaving}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            background: '#0f172a',
                            color: '#ffffff',
                            border: 'none',
                            fontSize: '13px',
                            fontWeight: '700',
                            cursor: isSaving ? 'wait' : 'pointer',
                            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.2)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {isSaving ? (
                            <>
                              <RefreshCw size={14} className="spin" />
                              <span>Guardando...</span>
                            </>
                          ) : (
                            <>
                              <Save size={14} />
                              <span>Guardar Estado</span>
                            </>
                          )}
                        </button>

                        {/* Preview Button */}
                        <button
                          type="button"
                          onClick={() => window.open(`/guias/${guide.slug}`, '_blank')}
                          title="Abrir artículo con tu sesión de administrador para previsualizarlo tal y como lo verán los visitantes"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            background: '#ffffff',
                            color: '#334155',
                            border: '1px solid #cbd5e1',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          <Eye size={14} color="#64748b" />
                          <span>Vista Previa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* LEAD DETAIL MODAL */}
      {/* ---------------------------------------------------- */}
      {selectedLead && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 50
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            maxWidth: '540px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  background: '#e0f2fe',
                  color: '#0284c7',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  marginBottom: '6px'
                }}>
                  {selectedLead.source || 'Web Directa'}
                </span>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                  {selectedLead.name || 'Sin Nombre'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Information Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Teléfono:</span>
                <strong>{selectedLead.phone || 'No especificado'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Email:</span>
                <strong>{selectedLead.email || 'No especificado'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Perfil:</span>
                <strong style={{ textTransform: 'capitalize' }}>{selectedLead.clientType || 'Particular'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Fecha de Captación:</span>
                <span>{selectedLead.date ? new Date(selectedLead.date).toLocaleString('es-ES') : 'N/D'}</span>
              </div>
              {selectedLead.monthlyBill && (
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Gasto Mensual Estimado:</span>
                  <strong>{selectedLead.monthlyBill} €/mes</strong>
                </div>
              )}
              {selectedLead.pageUrl && (
                <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Página / Formulario / Anuncio:</span>
                  <span style={{ fontSize: '12px', wordBreak: 'break-all', color: '#334155' }}>{selectedLead.pageUrl}</span>
                </div>
              )}
              {selectedLead.notes && (
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    Notas o Respuestas del Formulario:
                  </span>
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '13px', color: '#0f172a' }}>
                    {selectedLead.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Status Change in Modal */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>
                Cambiar Estado Comercial:
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => handleStatusChange(selectedLead.id, key)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${selectedLead.status === key ? cfg.color : '#e2e8f0'}`,
                      background: selectedLead.status === key ? cfg.color : '#ffffff',
                      color: selectedLead.status === key ? '#ffffff' : '#334155',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {cfg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Actions in Modal */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              {selectedLead.phone && (
                <a
                  href={`tel:${selectedLead.phone}`}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    background: '#4CAF4F',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: '13px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Phone size={15} />
                  <span>Llamar</span>
                </a>
              )}
              {selectedLead.phone && (
                <a
                  href={formatWhatsappUrl(selectedLead.phone, selectedLead.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    background: '#25D366',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: '13px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <WhatsAppIcon size={16} color="#ffffff" />
                  <span>WhatsApp</span>
                </a>
              )}
              {selectedLead.email && (
                <a
                  href={`mailto:${selectedLead.email}`}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    background: '#0284c7',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: '13px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Mail size={15} />
                  <span>Email</span>
                </a>
              )}
              <button
                onClick={() => handleDeleteLead(selectedLead.id)}
                title="Eliminar contacto"
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#fee2e2',
                  color: '#dc2626',
                  fontWeight: '700',
                  fontSize: '13px',
                  border: '1px solid #fca5a5',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Trash2 size={15} />
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* ADD MANUAL LEAD MODAL */}
      {/* ---------------------------------------------------- */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 60
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            maxWidth: '560px',
            width: '100%',
            maxHeight: '92vh',
            overflowY: 'auto',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserPlus size={18} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '19px', fontWeight: '800', color: '#0f172a' }}>
                    Añadir Lead Manual
                  </h3>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                  Registra contactos que te escriban por WhatsApp, llamadas o recomendaciones.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {addLeadError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
                ⚠️ {addLeadError}
              </div>
            )}

            <form onSubmit={handleCreateLead} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Canal de Origen */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Canal de Origen *
                </label>
                <select
                  value={newLeadForm.source}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    background: '#f8fafc',
                    fontWeight: '600'
                  }}
                >
                  <option value="WhatsApp Directo">💬 WhatsApp Directo</option>
                  <option value="Llamada Telefónica">📞 Llamada Telefónica</option>
                  <option value="Recomendación / Boca a boca">🤝 Recomendación / Boca a boca</option>
                  <option value="Visita Presencial / Oficina">🏢 Visita Presencial / Oficina</option>
                  <option value="Meta Ads (Facebook / Instagram)">🎯 Meta Ads (Facebook / Instagram)</option>
                  <option value="Web Directa">🌐 Web Directa</option>
                  <option value="Otro">📌 Otro canal</option>
                </select>
              </div>

              {/* Nombre */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Nombre y Apellidos o Razón Social *
                </label>
                <input
                  type="text"
                  placeholder="ej: Carlos Romero / Frutería Los Ángeles"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px'
                  }}
                />
              </div>

              {/* Teléfono y Email (Grid 2 columnas) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder="ej: 620 061 560"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Email (Opcional)
                  </label>
                  <input
                    type="email"
                    placeholder="ej: cliente@correo.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>

              {/* Tipo de cliente y Estado (Grid 2 columnas) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Tipo de Perfil
                  </label>
                  <select
                    value={newLeadForm.clientType}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, clientType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px'
                    }}
                  >
                    <option value="particular">Hogar / Particular</option>
                    <option value="empresa">Empresa / Negocio</option>
                    <option value="comunidad">Comunidad de Vecinos</option>
                    <option value="autoconsumo">Placas Solares</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Estado Inicial
                  </label>
                  <select
                    value={newLeadForm.status}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, status: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px'
                    }}
                  >
                    <option value="nuevo">Nuevo</option>
                    <option value="contactado">Contactado</option>
                    <option value="en_estudio">En estudio</option>
                    <option value="ganado">Ganado / Cliente</option>
                    <option value="descartado">Descartado</option>
                  </select>
                </div>
              </div>

              {/* Gasto mensual estimado */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Gasto Mensual Estimado (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="ej: 95 €/mes o 320 €"
                  value={newLeadForm.monthlyBill}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, monthlyBill: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px'
                  }}
                />
              </div>

              {/* Notas */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Notas / Detalles de la conversación (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="ej: Ha escrito por WhatsApp preguntando por optimización de potencia y tarifa fija 2.0TD. Le hemos solicitado la última factura para hacerle la comparativa."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#475569',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={addingLead}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '8px',
                    border: '1px solid #16a34a',
                    background: '#16a34a',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: addingLead ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(22, 163, 74, 0.25)'
                  }}
                >
                  {addingLead ? 'Guardando...' : 'Guardar Lead'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Global & Responsive CSS */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .tuluz-desktop-table {
            display: none !important;
          }
          .tuluz-mobile-cards {
            display: flex !important;
          }
          .tuluz-kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            margin-bottom: 20px !important;
          }
          .tuluz-kpi-card {
            padding: 14px 16px !important;
            border-radius: 12px !important;
          }
          .tuluz-kpi-num {
            font-size: 24px !important;
          }
        }
        @media (min-width: 769px) {
          .tuluz-mobile-cards {
            display: none !important;
          }
        }
      `}</style>

      {/* Notificación flotante emergente cuando entra un lead nuevo en tiempo real */}
      {newLeadToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#0f172a',
          color: '#ffffff',
          padding: '14px 20px',
          borderRadius: '14px',
          boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999,
          border: '1px solid #4CAF4F'
        }}>
          <Sparkles size={20} color="#4CAF4F" />
          <span style={{ fontSize: '14px', fontWeight: '700' }}>{newLeadToast}</span>
          <button
            onClick={() => setNewLeadToast(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              marginLeft: '8px',
              padding: '2px',
              display: 'flex'
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Notificación flotante cuando se actualiza el estado de una guía */}
      {guideSuccessToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          background: '#0f172a',
          color: '#ffffff',
          padding: '14px 22px',
          borderRadius: '14px',
          boxShadow: '0 12px 35px rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999,
          border: '1px solid #22c55e'
        }}>
          <CheckCircle2 size={20} color="#22c55e" />
          <span style={{ fontSize: '14px', fontWeight: '700' }}>{guideSuccessToast}</span>
          <button
            onClick={() => setGuideSuccessToast(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              marginLeft: '8px',
              padding: '2px',
              display: 'flex'
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
