import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, TrendingUp, Mail, Phone, Calendar, Download, 
  RefreshCw, Search, Filter, CheckCircle2, Clock, 
  AlertCircle, ExternalLink, Lock, LogOut, MessageSquare, 
  FileText, Sparkles, ChevronRight, Eye, X, ArrowLeft,
  Check, ShieldCheck, Trash2, Globe
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

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Detail Modal
  const [selectedLead, setSelectedLead] = useState(null);

  // Status configuration
  const STATUS_CONFIG = {
    nuevo: { label: 'Nuevo', color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
    contactado: { label: 'Contactado', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
    en_estudio: { label: 'En estudio', color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe' },
    ganado: { label: 'Ganado / Cliente', color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
    descartado: { label: 'Descartado', color: '#64748b', bg: '#f8fafc', border: '#e2e8f0' }
  };

  const fetchDashboardData = async (keyToUse) => {
    const key = keyToUse || adminKey;
    if (!key) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/leads-summary?key=${encodeURIComponent(key)}`);
      if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('tuluz_admin_key');
        setAuthError('Clave de administración incorrecta. Por favor verifícala.');
        setLoading(false);
        return;
      }
      if (!res.ok) {
        throw new Error(`Error en el servidor (${res.status})`);
      }
      const data = await res.json();
      setDashboardData(data);
      setIsAuthenticated(true);
      sessionStorage.setItem('tuluz_admin_key', key);
    } catch (err) {
      console.error(err);
      setError(err.message || 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminKey) {
      fetchDashboardData(adminKey);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;
    setAuthError('');
    setAdminKey(passwordInput.trim());
    fetchDashboardData(passwordInput.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tuluz_admin_key');
    setAdminKey('');
    setIsAuthenticated(false);
    setDashboardData(null);
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
      } else if (sourceFilter === 'web') {
        matchSource = !(lead.source || '').toLowerCase().includes('meta') && 
                      !(lead.source || '').toLowerCase().includes('facebook') && 
                      !(lead.source || '').toLowerCase().includes('instagram');
      }

      // Status Filter
      const leadStatus = lead.status || 'nuevo';
      const matchStatus = statusFilter === 'all' || leadStatus === statusFilter;

      // Type Filter
      const leadType = (lead.clientType || 'particular').toLowerCase();
      const matchType = typeFilter === 'all' || leadType === typeFilter.toLowerCase();

      return matchSearch && matchSource && matchStatus && matchType;
    });
  }, [dashboardData, searchTerm, sourceFilter, statusFilter, typeFilter]);

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

          {/* Sync Meta Ads Button */}
          <button
            onClick={handleSyncMeta}
            disabled={syncingMeta || loading}
            title="Sincronizar clientes potenciales directamente de Meta Ads"
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
            <span>{syncingMeta ? 'Sincronizando...' : 'Sincronizar Meta Ads'}</span>
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

      {/* Main Container */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>

        {/* System Health Indicators */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
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
            <strong>Destino de Avisos:</strong> davidad@tu-luz.es
          </div>
        </div>

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
                return (
                  <div key={source}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '600', color: isMeta ? '#0284c7' : '#334155', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {isMeta ? <MetaIcon size={14} color="#0284c7" /> : <Globe size={14} color="#4CAF4F" />}
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
                        background: isMeta ? 'linear-gradient(90deg, #0284c7, #38bdf8)' : 'linear-gradient(90deg, #4CAF4F, #81c784)',
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
                  <th style={{ padding: '14px 20px', fontWeight: '600', textAlign: 'center' }}>Acciones Rápidas</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '48px 20px', textAlign: 'center', color: '#94a3b8' }}>
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
                              background: isMeta ? '#e0f2fe' : '#dcfce7',
                              color: isMeta ? '#0284c7' : '#15803d',
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
                              <div style={{ fontWeight: '700', color: '#0f172a' }}>
                                {lead.name || 'Sin nombre'}
                              </div>
                              <div style={{ fontSize: '12px', color: '#64748b' }}>
                                {lead.email || 'Sin correo'}
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
                            background: isMeta ? '#e0f2fe' : '#f1f5f9',
                            color: isMeta ? '#0369a1' : '#475569',
                            fontWeight: '700',
                            fontSize: '11px',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            {isMeta ? <MetaIcon size={12} color="#0369a1" /> : <Globe size={12} color="#475569" />}
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
                          background: isMeta ? '#e0f2fe' : '#dcfce7',
                          color: isMeta ? '#0284c7' : '#15803d',
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
    </div>
  );
}
