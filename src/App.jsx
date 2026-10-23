import React, { useState, useEffect } from 'react';
import { NexaProvider, useNexa } from './context/NexaContext';
import ThreeLivingHome from './components/ThreeLivingHome';
import Navigation from './components/Navigation';
import GlobalHeader from './components/GlobalHeader';
import LandingPage from './components/LandingPage';
import QuickActionModal from './components/QuickActionModal';
import SearchModal from './components/SearchModal';
import CinematicVideoPlayer from './components/CinematicVideoPlayer';

// Screens
import OverviewScreen from './screens/OverviewScreen';
import SmartHomeScreen from './screens/SmartHomeScreen';
import FamilyScreen from './screens/FamilyScreen';
import FamilyHealthScreen from './screens/FamilyHealthScreen';
import MedicinesScreen from './screens/MedicinesScreen';
import BillsScreen from './screens/BillsScreen';
import VehiclesScreen from './screens/VehiclesScreen';
import SecurityScreen from './screens/SecurityScreen';
import AiAssistantScreen from './screens/AiAssistantScreen';
import DailyBriefingScreen from './screens/DailyBriefingScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import HomeMemoryScreen from './screens/HomeMemoryScreen';
import InvestigatorScreen from './screens/InvestigatorScreen';
import WhatIfSimulatorScreen from './screens/WhatIfSimulatorScreen';
import SettingsScreen from './screens/SettingsScreen';

function NexaApp() {
  const {
    activeScreen,
    isLandingMode,
    toastMessage
  } = useNexa();

  const [showQuickAction, setShowQuickAction] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'overview':
        return <OverviewScreen />;
      case 'smarthome':
        return <SmartHomeScreen />;
      case 'family':
        return <FamilyScreen />;
      case 'health':
        return <FamilyHealthScreen />;
      case 'medicines':
        return <MedicinesScreen />;
      case 'bills':
        return <BillsScreen />;
      case 'vehicles':
        return <VehiclesScreen />;
      case 'security':
        return <SecurityScreen />;
      case 'assistant':
        return <AiAssistantScreen />;
      case 'briefing':
        return <DailyBriefingScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'memory':
        return <HomeMemoryScreen />;
      case 'investigator':
        return <InvestigatorScreen />;
      case 'whatif':
        return <WhatIfSimulatorScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <OverviewScreen />;
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Persistent 3D Living Home Scene */}
      <ThreeLivingHome />

      {/* Landing Experience or Dashboard Shell */}
      {isLandingMode ? (
        <LandingPage onOpenVideoModal={() => setShowVideoModal(true)} />
      ) : (
        <div style={{ display: 'flex', width: '100vw', height: '100vh', position: 'relative', zIndex: 10 }}>
          {/* Navigation Sidebar */}
          <Navigation />

          {/* Main Content Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <GlobalHeader
              onOpenQuickAction={() => setShowQuickAction(true)}
              onOpenSearchModal={() => setShowSearchModal(true)}
              onOpenVideoModal={() => setShowVideoModal(true)}
            />

            <main
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px 32px'
              }}
            >
              {renderActiveScreen()}
            </main>
          </div>
        </div>
      )}

      {/* Global Modals */}
      {showVideoModal && (
        <CinematicVideoPlayer onClose={() => setShowVideoModal(false)} />
      )}
      {showQuickAction && (
        <QuickActionModal onClose={() => setShowQuickAction(false)} />
      )}
      {showSearchModal && (
        <SearchModal onClose={() => setShowSearchModal(false)} />
      )}

      {/* Floating System Toast notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '28px',
            zIndex: 9999,
            padding: '12px 20px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(7, 16, 31, 0.95)',
            border: `1px solid ${
              toastMessage.type === 'success'
                ? 'var(--color-emerald)'
                : toastMessage.type === 'coral'
                ? 'var(--color-coral)'
                : 'var(--color-electric-cyan)'
            }`,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(84, 231, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--color-soft-white)',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background:
                toastMessage.type === 'success'
                  ? 'var(--color-emerald)'
                  : toastMessage.type === 'coral'
                  ? 'var(--color-coral)'
                  : 'var(--color-electric-cyan)'
            }}
          />
          <span>{toastMessage.message}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <NexaProvider>
      <NexaApp />
    </NexaProvider>
  );
}
