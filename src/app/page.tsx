'use client';

import { useState } from 'react';
import { LanguageProvider, useLanguage, Language } from '@/lib/LanguageContext';
import LoginPage from '@/components/LoginPage';
import ElectronicsLab from '@/components/ElectronicsLab';

function ExperimentPlaceholder({ experiment, onBack }: { experiment: string; onBack: () => void }) {
  const { t } = useLanguage();

  const expNames: Record<string, string> = {
    'motor-battery': 'exp.motor',
    'series-resistor': 'exp.series',
    'buzzer-alarm': 'exp.buzzer',
  };

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0a0a1a 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: '"Outfit", sans-serif', color: '#fff',
    }}>
      <div style={{
        textAlign: 'center', padding: '60px 40px',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(40px)',
        borderRadius: 28, border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
        maxWidth: 480,
      }}>
        <div style={{ fontSize: '4rem', marginBottom: 20 }}>🔧</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0 0 8px 0' }}>
          {t(expNames[experiment] || 'placeholder.title')}
        </h1>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#00bbee', margin: '0 0 16px 0' }}>
          {t('placeholder.title')}
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 32px 0', lineHeight: 1.6 }}>
          {t('placeholder.desc')}
        </p>
        <button
          onClick={onBack}
          style={{
            padding: '12px 24px', background: 'rgba(0,187,238,0.15)',
            border: '1px solid rgba(0,187,238,0.4)', borderRadius: '14px', color: '#fff',
            fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,187,238,0.2)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            transition: 'all 0.2s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,187,238,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,187,238,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {t('placeholder.back')}
        </button>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800;900&display=swap');
        body { margin: 0; }
      `}</style>
    </div>
  );
}

function ExperimentSelectionPage({ onSelect, onLogout }: { onSelect: (id: string) => void; onLogout?: () => void }) {
  const { t, language, setLanguage } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const experiments = [
    { id: 'led-battery', icon: '💡', title: 'exp.led', fallbackName: 'LED Battery Connection', color: '#00bbee', category: 'circuits', desc: 'Basic circuit connecting an LED to a 9V battery with a resistor.' },
    { id: 'motor-battery', icon: '⚙️', title: 'exp.motor', fallbackName: 'Motor Battery Connection', color: '#ff4444', category: 'motors', desc: 'Power a DC motor using a switch and battery to create motion.' },
    { id: 'series-resistor', icon: '🔋', title: 'exp.series', fallbackName: 'Series Resistor Circuit', color: '#ffa500', category: 'circuits', desc: 'Connect resistors in series to limit the current flowing to an LED.' },
    { id: 'buzzer-alarm', icon: '🔔', title: 'exp.buzzer', fallbackName: 'Buzzer Alarm Circuit', color: '#22cc44', category: 'audio', desc: 'Create a simple sound alarm circuit using a buzzer and switch.' },
    { id: 'pot-motor', icon: '🌀', title: 'exp.pot-motor', fallbackName: 'Fan Speed Control', color: '#8844ff', category: 'motors', desc: 'Use a potentiometer to control the speed of a DC fan horizontally.' },
    { id: 'pot-led', icon: '🔆', title: 'exp.pot-led', fallbackName: 'LED Brightness Control', color: '#eab308', category: 'circuits', desc: 'Control the brightness of an LED using a variable resistor.' },
    { id: 'parallel-led', icon: '🚦', title: 'exp.parallel-led', fallbackName: 'Parallel LED Circuit', color: '#06b6d4', category: 'circuits', desc: 'Wire two LEDs in parallel so they share the same voltage.' },
    { id: 'switch-motor', icon: '⚡', title: 'exp.switch-motor', fallbackName: 'Switch Controlled Motor', color: '#ec4899', category: 'motors', desc: 'Operate a DC motor with direct toggle control using a switch.' },
    { id: 'series-circuit', icon: '🔗', title: 'exp.series-combined', fallbackName: 'Combined Series Circuit', color: '#6366f1', category: 'circuits', desc: 'Combine multiple components in series.' },
    { id: 'smart-doorbell', icon: '🚪', title: 'exp.smart-doorbell', fallbackName: 'Smart Doorbell Circuit', color: '#a855f7', category: 'audio', desc: 'Build a doorbell circuit that triggers both light and sound simultaneously.' },
  ];

  const categories = [
    { id: 'all', label: 'All Labs', count: experiments.length },
    { id: 'circuits', label: 'Circuits & LEDs', count: experiments.filter(e => e.category === 'circuits').length },
    { id: 'motors', label: 'Motors & Motion', count: experiments.filter(e => e.category === 'motors').length },
    { id: 'audio', label: 'Audio & Alarms', count: experiments.filter(e => e.category === 'audio').length },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'mr', label: 'मराठी' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'gu', label: 'ગુજરાતી' },
  ];

  const filteredExperiments = experiments.filter(exp => {
    const expTitle = t(exp.title) !== exp.title ? t(exp.title) : exp.fallbackName;
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    const matchesSearch = expTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exp.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
      fontFamily: '"Outfit", sans-serif',
      color: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 24px 80px 24px',
      boxSizing: 'border-box',
      position: 'relative',
      overflowX: 'hidden',
    }}>
      {/* Background ambient lighting */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '15%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(0,187,238,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(136,68,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '5%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, rgba(255,68,68,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* Top Navbar */}
      <header style={{
        width: '100%',
        maxWidth: '1280px',
        padding: '24px 0 16px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #00bbee, #0077cc)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem', color: '#fff',
            boxShadow: '0 8px 20px -4px rgba(0, 187, 238, 0.4)',
          }}>⚡</div>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, letterSpacing: '-0.3px', color: '#0f172a' }}>
              AR Electronics Lab
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Virtual Hands-On Platform
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Language Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '9px 16px',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '12px',
                color: '#334155',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>🌐</span>
              <span>{languages.find(l => l.code === language)?.label || 'Language'}</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>▼</span>
            </button>

            {showLangMenu && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '14px',
                padding: '8px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.12)',
                minWidth: '160px',
                zIndex: 100,
              }}>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setShowLangMenu(false); }}
                    style={{
                      display: 'block', width: '100%', padding: '8px 12px',
                      background: language === lang.code ? 'rgba(0,187,238,0.1)' : 'transparent',
                      border: 'none', borderRadius: '8px',
                      color: language === lang.code ? '#0099cc' : '#334155',
                      fontSize: '0.85rem', fontWeight: language === lang.code ? 800 : 500,
                      cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                      transition: 'background 0.15s',
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Logout / Back to Login button */}
          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '9px 16px',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '12px',
                color: '#64748b',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#ef4444';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#64748b';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
              }}
            >
              <span>←</span>
              <span>Logout</span>
            </button>
          )}
        </div>
      </header>

      {/* Hero / Title Section */}
      <div style={{ textAlign: 'center', margin: '32px 0 36px 0', position: 'relative', zIndex: 1, maxWidth: '800px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 14px', borderRadius: '20px',
          background: 'rgba(0, 187, 238, 0.08)',
          border: '1px solid rgba(0, 187, 238, 0.25)',
          color: '#0099cc', fontSize: '0.8rem', fontWeight: 800,
          textTransform: 'uppercase', letterSpacing: '1px',
          marginBottom: '16px'
        }}>
          <span>⚡</span>
          <span>10 Interactive Experiments</span>
        </div>
        <h1 style={{ 
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, margin: '0 0 12px 0', color: '#0a0a1a',
          fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          letterSpacing: '-1px', lineHeight: 1.15
        }}>
          {t('login.selectionTitle')}
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748b', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
          {t('login.selectionSubtitle')}
        </p>

        {/* Filter Pills */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '10px', marginTop: '28px', flexWrap: 'wrap'
        }}>
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '12px',
                  border: isActive ? '1px solid #00bbee' : '1px solid rgba(0, 0, 0, 0.08)',
                  background: isActive ? '#00bbee' : 'rgba(255, 255, 255, 0.75)',
                  color: isActive ? '#fff' : '#475569',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  boxShadow: isActive ? '0 4px 14px rgba(0, 187, 238, 0.3)' : '0 2px 6px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{cat.label}</span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.06)',
                  color: isActive ? '#fff' : '#64748b',
                }}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Experiments */}
      <div 
        className="lab-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
          width: '100%',
          maxWidth: '1280px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {filteredExperiments.map((exp, index) => {
          const expTitle = t(exp.title) !== exp.title ? t(exp.title) : exp.fallbackName;
          return (
            <div
              key={exp.id}
              onClick={() => onSelect(exp.id)}
              className="lab-card"
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '28px',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'left',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.borderColor = `${exp.color}70`;
                e.currentTarget.style.boxShadow = `0 20px 35px -10px ${exp.color}35, 0 8px 16px rgba(0,0,0,0.04)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)';
                e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.9)';
                e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)';
              }}
            >
              {/* Subtle top edge accent glow */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)`,
                opacity: 0.8,
              }} />

              {/* Card Header & Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '18px',
                    background: `${exp.color}15`,
                    border: `1.5px solid ${exp.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem',
                    boxShadow: `0 8px 20px -4px ${exp.color}25`,
                    flexShrink: 0,
                  }}>
                    {exp.icon}
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    <span style={{
                      fontSize: '0.75rem', fontWeight: 800,
                      color: '#64748b', background: 'rgba(0, 0, 0, 0.04)',
                      padding: '4px 10px', borderRadius: '20px',
                      letterSpacing: '0.5px', textTransform: 'uppercase',
                    }}>
                      Lab {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Card Title & Description */}
                <h3 style={{
                  fontSize: '1.25rem', fontWeight: 800, margin: '0 0 10px 0',
                  color: '#0f172a', lineHeight: 1.35, letterSpacing: '-0.3px',
                }}>
                  {expTitle}
                </h3>
                <p style={{
                  fontSize: '0.92rem', color: '#64748b', margin: '0 0 24px 0',
                  fontWeight: 450, lineHeight: 1.55, minHeight: '44px',
                }}>
                  {exp.desc}
                </p>
              </div>

              {/* Card Footer / Action Button */}
              <div 
                className="card-action-btn"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 18px',
                  borderRadius: '16px',
                  background: `${exp.color}12`,
                  color: exp.color,
                  border: `1.5px solid ${exp.color}30`,
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>Start Lab</span>
                <span style={{ fontSize: '1.1rem', transition: 'transform 0.2s ease' }} className="arrow-icon">→</span>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .lab-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        .lab-card:hover .arrow-icon {
          transform: translateX(4px);
        }
        .lab-card:hover .card-action-btn {
          filter: brightness(0.95);
        }
      `}</style>
    </div>
  );
}

function AppContent() {
  const [currentView, setCurrentView] = useState<'login' | 'selection' | 'lab' | 'placeholder'>('login');
  const [selectedExperiment, setSelectedExperiment] = useState('');

  const handleLogin = () => {
    setCurrentView('selection');
  };

  const handleSelectExperiment = (experiment: string) => {
    setSelectedExperiment(experiment);
    setCurrentView('lab');
  };

  const handleBack = () => {
    if (currentView === 'lab') {
      setCurrentView('selection');
    } else {
      setCurrentView('login');
      setSelectedExperiment('');
    }
  };

  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentView === 'selection') {
    return <ExperimentSelectionPage onSelect={handleSelectExperiment} onLogout={() => setCurrentView('login')} />;
  }

  if (currentView === 'lab') {
    return <ElectronicsLab onBack={handleBack} experimentId={selectedExperiment} />;
  }

  return <ExperimentPlaceholder experiment={selectedExperiment} onBack={handleBack} />;
}

export default function Home() {
  return (
    <LanguageProvider>
      <main>
        <AppContent />
      </main>
    </LanguageProvider>
  );
}
