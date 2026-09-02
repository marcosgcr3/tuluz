import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import SEOHead from './components/SEOHead';
import Home from './pages/Home';

// Lazy Loaded Pages & Modals for Instant Initial Bundle Loading
const Empresas = lazy(() => import('./pages/Empresas'));
const Comunidades = lazy(() => import('./pages/Comunidades'));
const Particulares = lazy(() => import('./pages/Particulares'));
const Autoconsumo = lazy(() => import('./pages/Autoconsumo'));
const Presupuesto = lazy(() => import('./pages/Presupuesto'));
const Gracias = lazy(() => import('./pages/Gracias'));
const LegalNotice = lazy(() => import('./pages/LegalNotice'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const ContactFormModal = lazy(() => import('./components/ContactFormModal'));

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [theme, setTheme] = useState(() => localStorage.getItem('tuluz_theme') || 'light');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState({});

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tuluz_theme', theme);
  }, [theme]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Auto-open modal if landing on campaign routes or with ?modal=1
  useEffect(() => {
    const cleanPath = currentPath.replace(/\/$/, '') || '/';
    const params = new URLSearchParams(window.location.search);
    const modalRoutes = ['/google', '/meta', '/instagram', '/facebook', '/tiktok', '/promo', '/contacto'];
    const shouldOpenModal = modalRoutes.includes(cleanPath) || params.get('modal') === '1' || params.get('formulario') === '1';

    if (shouldOpenModal) {
      let defaultType = 'particular';
      const paramType = params.get('tipo') || params.get('type');
      const validTypes = ['particular', 'empresa', 'comunidad', 'autoconsumo'];
      if (validTypes.includes(paramType)) {
        defaultType = paramType;
      }
      setModalInitialData({ clientType: defaultType });
      setContactModalOpen(true);
    }
  }, [currentPath]);

  const openContactModal = (initialData = {}) => {
    const cleanPath = currentPath.replace(/\/$/, '') || '/';
    let defaultType = 'particular';
    if (cleanPath === '/empresas') {
      defaultType = 'empresa';
    } else if (cleanPath === '/comunidades-de-vecinos') {
      defaultType = 'comunidad';
    } else if (cleanPath === '/particulares') {
      defaultType = 'particular';
    } else if (cleanPath === '/autoconsumo') {
      defaultType = 'autoconsumo';
    }

    setModalInitialData({
      clientType: defaultType,
      ...initialData
    });
    setContactModalOpen(true);
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
    const cleanPath = currentPath.replace(/\/$/, '') || '/';
    const modalRoutes = ['/google', '/meta', '/instagram', '/facebook', '/tiktok', '/promo', '/contacto'];
    if (modalRoutes.includes(cleanPath)) {
      window.history.replaceState({}, '', '/');
      setCurrentPath('/');
    }
  };

  // Render active page component based on route path
  const renderPageComponent = () => {
    const cleanPath = currentPath.replace(/\/$/, '') || '/';

    switch (cleanPath) {
      case '/':
      case '/google':
      case '/meta':
      case '/instagram':
      case '/facebook':
      case '/tiktok':
      case '/promo':
      case '/contacto':
        return <Home onOpenModal={openContactModal} navigate={navigate} />;
      case '/empresas':
        return <Empresas onOpenModal={openContactModal} navigate={navigate} />;
      case '/comunidades-de-vecinos':
        return <Comunidades onOpenModal={openContactModal} navigate={navigate} />;
      case '/particulares':
        return <Particulares onOpenModal={openContactModal} navigate={navigate} />;
      case '/autoconsumo':
        return <Autoconsumo onOpenModal={openContactModal} navigate={navigate} />;
      case '/solicita-un-presupuesto':
      case '/presupuesto':
      case '/solicitar-estudio':
      case '/estudio-gratuito':
      case '/estudio':
        return <Presupuesto navigate={navigate} />;
      case '/solar':
        return <Autoconsumo onOpenModal={openContactModal} navigate={navigate} />;
      case '/gracias':
      case '/solicitud-enviada':
        return <Gracias navigate={navigate} />;
      case '/aviso-legal':
        return <LegalNotice />;
      case '/politica-de-privacidad':
        return <PrivacyPolicy />;
      default:
        return <Home onOpenModal={openContactModal} navigate={navigate} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Dynamic SEO & Meta Manager */}
      <SEOHead currentPath={currentPath} />
      
      {/* Navigation Header */}
      <Navbar 
        currentPath={currentPath} 
        navigate={navigate} 
        theme={theme} 
        toggleTheme={toggleTheme}
        openContactModal={openContactModal}
      />

      {/* Main Page Area */}
      <main style={{ flex: 1 }}>
        <Suspense fallback={
          <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '36px',
              height: '36px',
              border: '3px solid rgba(76, 175, 79, 0.2)',
              borderTopColor: 'var(--primary)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        }>
          {renderPageComponent()}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer navigate={navigate} />

      {/* Floating Action Buttons */}
      <FloatingActions onOpenModal={openContactModal} />

      {/* Global Lead Modal (Lazily Loaded) */}
      {contactModalOpen && (
        <Suspense fallback={null}>
          <ContactFormModal 
            isOpen={contactModalOpen} 
            onClose={closeContactModal} 
            initialData={modalInitialData}
            navigate={navigate}
          />
        </Suspense>
      )}

    </div>
  );
}
