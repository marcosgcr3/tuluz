import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ContactFormModal from './components/ContactFormModal';
import SEOHead from './components/SEOHead';

// Pages
import Home from './pages/Home';
import Empresas from './pages/Empresas';
import Comunidades from './pages/Comunidades';
import Particulares from './pages/Particulares';
import Presupuesto from './pages/Presupuesto';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';

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

  const openContactModal = (initialData = {}) => {
    setModalInitialData(initialData);
    setContactModalOpen(true);
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
  };

  // Render active page component based on route path
  const renderPageComponent = () => {
    const cleanPath = currentPath.replace(/\/$/, '') || '/';

    switch (cleanPath) {
      case '/':
        return <Home onOpenModal={openContactModal} navigate={navigate} />;
      case '/empresas':
        return <Empresas onOpenModal={openContactModal} navigate={navigate} />;
      case '/comunidades-de-vecinos':
        return <Comunidades onOpenModal={openContactModal} navigate={navigate} />;
      case '/particulares':
        return <Particulares onOpenModal={openContactModal} navigate={navigate} />;
      case '/solicita-un-presupuesto':
      case '/presupuesto':
        return <Presupuesto />;
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
        {renderPageComponent()}
      </main>

      {/* Footer */}
      <Footer navigate={navigate} />

      {/* Floating Action Buttons */}
      <FloatingActions onOpenModal={openContactModal} />

      {/* Global Lead Modal */}
      <ContactFormModal 
        isOpen={contactModalOpen} 
        onClose={closeContactModal} 
        initialData={modalInitialData}
      />

    </div>
  );
}
