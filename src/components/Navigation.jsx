import React from 'react';
import {
  LayoutDashboard,
  Home,
  Users,
  HeartPulse,
  Pill,
  Receipt,
  Car,
  ShieldCheck,
  Bot,
  CalendarCheck,
  Bell,
  HardDrive,
  Wrench,
  Sparkles,
  Settings,
  Compass,
  Zap
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function Navigation() {
  const {
    activeScreen,
    setActiveScreen,
    bills,
    medicines,
    notifications,
    setIsLandingMode
  } = useNexa();

  const unpaidBillsCount = bills.filter(b => b.status === 'unpaid').length;
  const pendingMedsCount = medicines.filter(m => !m.isAcknowledged).length;
  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;

  const navSections = [
    {
      group: 'COMMAND',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'smarthome', label: 'Smart Home', icon: Home, badge: '3D' },
        { id: 'briefing', label: 'Daily Briefing', icon: CalendarCheck },
        { id: 'assistant', label: 'NEXA AI Core', icon: Bot, highlight: true }
      ]
    },
    {
      group: 'FAMILY & HEALTH',
      items: [
        { id: 'family', label: 'Family Profiles', icon: Users },
        { id: 'health', label: 'Family Health', icon: HeartPulse },
        { id: 'medicines', label: 'Medicines', icon: Pill, badge: pendingMedsCount > 0 ? pendingMedsCount : null, badgeColor: 'coral' }
      ]
    },
    {
      group: 'HOUSEHOLD ASSETS',
      items: [
        { id: 'bills', label: 'Bills & Expenses', icon: Receipt, badge: unpaidBillsCount > 0 ? `₹${unpaidBillsCount}` : null, badgeColor: 'amber' },
        { id: 'vehicles', label: 'Vehicles', icon: Car },
        { id: 'security', label: 'Security Center', icon: ShieldCheck }
      ]
    },
    {
      group: 'INTELLIGENCE',
      items: [
        { id: 'memory', label: 'Home Memory', icon: HardDrive },
        { id: 'investigator', label: 'Problem Investigator', icon: Wrench },
        { id: 'whatif', label: 'What-If Simulator', icon: Sparkles },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifsCount > 0 ? unreadNotifsCount : null, badgeColor: 'cyan' },
        { id: 'settings', label: 'Settings & Privacy', icon: Settings }
      ]
    }
  ];

  return (
    <aside
      style={{
        width: '260px',
        height: '100vh',
        background: 'rgba(3, 6, 11, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 50,
        flexShrink: 0,
        userSelect: 'none'
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(84, 231, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(84, 231, 255, 0.2) 0%, rgba(154, 134, 255, 0.2) 100%)',
            border: '1px solid var(--color-electric-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(84, 231, 255, 0.35)'
          }}
        >
          <Zap size={20} color="var(--color-electric-cyan)" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: 'var(--color-soft-white)'
              }}
            >
              NEXA
            </span>
            <span className="badge badge-cyan" style={{ fontSize: '9px', padding: '2px 5px' }}>v2.4</span>
          </div>
          <div
            style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.04em'
            }}
          >
            CONNECTED LIVING OS
          </div>
        </div>
      </div>

      {/* Navigation Links Scroll Container */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        {navSections.map((sec, idx) => (
          <div key={idx}>
            <div
              style={{
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: 'rgba(142, 156, 178, 0.7)',
                letterSpacing: '0.1em',
                padding: '0 10px 8px'
              }}
            >
              {sec.group}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {sec.items.map(item => {
                const isActive = activeScreen === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveScreen(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive
                        ? 'linear-gradient(90deg, rgba(84, 231, 255, 0.15) 0%, rgba(16, 40, 71, 0.3) 100%)'
                        : 'transparent',
                      border: isActive
                        ? '1px solid rgba(84, 231, 255, 0.35)'
                        : '1px solid transparent',
                      color: isActive ? 'var(--color-electric-cyan)' : 'var(--color-soft-white)',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={e => {
                      if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                    onMouseLeave={e => {
                      if (!isActive) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon
                        size={17}
                        color={
                          isActive
                            ? 'var(--color-electric-cyan)'
                            : item.highlight
                            ? 'var(--color-violet)'
                            : 'var(--color-text-muted)'
                        }
                      />
                      <span
                        style={{
                          fontSize: '13.5px',
                          fontWeight: isActive ? 600 : 400,
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {item.label}
                      </span>
                    </div>

                    {item.badge && (
                      <span
                        className={`badge ${
                          item.badgeColor === 'coral'
                            ? 'badge-coral'
                            : item.badgeColor === 'amber'
                            ? 'badge-amber'
                            : 'badge-cyan'
                        }`}
                        style={{ fontSize: '10px', padding: '1px 6px' }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Skip / Return to Cinematic Intro */}
      <div
        style={{
          padding: '14px 16px',
          borderTop: '1px solid rgba(84, 231, 255, 0.1)',
          background: 'rgba(7, 16, 31, 0.5)'
        }}
      >
        <button
          onClick={() => setIsLandingMode(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '8px',
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--color-electric-cyan)';
            e.currentTarget.style.color = 'var(--color-electric-cyan)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = 'var(--color-text-muted)';
          }}
        >
          <Compass size={14} />
          <span>Cinematic Home Tour</span>
        </button>
      </div>
    </aside>
  );
}
