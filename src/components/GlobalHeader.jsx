import React, { useState } from 'react';
import {
  Search,
  Bell,
  Mic,
  Plus,
  User,
  Shield,
  Sun,
  Activity,
  X,
  FileText,
  CheckCircle,
  HelpCircle,
  Film
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function GlobalHeader({ onOpenQuickAction, onOpenSearchModal, onOpenVideoModal }) {
  const {
    activeScreen,
    selectedMemberId,
    setSelectedMemberId,
    familyMembers,
    notifications,
    setActiveScreen,
    devices
  } = useNexa();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const titlesMap = {
    overview: { title: 'Household Command Center', subtitle: 'Integrated overview of home, family vitals, bills and energy' },
    smarthome: { title: 'Smart Home & Architectural Automation', subtitle: 'Real-time room lighting, environmental telemetry and controls' },
    family: { title: 'Family Directory & Access Controls', subtitle: 'Connected profiles, relationships and privacy boundaries' },
    health: { title: 'Family Health Intelligence', subtitle: 'Biometric vitals, trends, clinical records and doctor appointments' },
    medicines: { title: 'Medicine Management & Reminders', subtitle: 'Dose schedules, verified acknowledgments and refill alerts' },
    bills: { title: 'Household Bills & Financial Obligations', subtitle: 'Utility tracking, scheduled payments and budget distribution' },
    vehicles: { title: 'Family Vehicle Intelligence', subtitle: 'EV battery telemetry, insurance countdowns and service history' },
    security: { title: 'CCTV & Perimeter Security Center', subtitle: 'Live demonstration camera feeds, motion detection and privacy shutters' },
    assistant: { title: 'NEXA AI Holographic Assistant', subtitle: 'Context-aware intelligence with unified household memory access' },
    briefing: { title: 'Daily Family Briefing', subtitle: 'Chronological priority agenda synthesized from all live records' },
    notifications: { title: 'Central Notification Stream', subtitle: 'System-wide event alerts, priority warnings and action triggers' },
    memory: { title: 'Household Digital Memory', subtitle: 'Searchable relational archive connecting devices, warranties and receipts' },
    investigator: { title: 'Home Problem Investigator', subtitle: 'Root-cause diagnostic separating verified telemetry from possibilities' },
    whatif: { title: 'What-If Action Rehearsal Simulator', subtitle: 'Safely preview outcome and automation impacts before execution' },
    settings: { title: 'System Settings & Privacy Architecture', subtitle: 'Family privacy partitions, telemetry policies and backup controls' }
  };

  const currentInfo = titlesMap[activeScreen] || { title: 'NEXA Intelligence', subtitle: 'Connected household management' };

  return (
    <header
      style={{
        height: '74px',
        background: 'rgba(7, 16, 31, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        gap: '20px'
      }}
    >
      {/* Title & Section Subtitle */}
      <div>
        <h1
          style={{
            fontSize: '18px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span>{currentInfo.title}</span>
          <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
            LIVE
          </span>
        </h1>
        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            marginTop: '1px'
          }}
        >
          {currentInfo.subtitle}
        </p>
      </div>

      {/* Center / Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Global Search trigger */}
        <button
          onClick={onOpenSearchModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(16, 40, 71, 0.45)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '7px 14px',
            color: 'var(--color-text-muted)',
            fontSize: '13px',
            minWidth: '220px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--color-electric-cyan)';
            e.currentTarget.style.color = 'var(--color-soft-white)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--glass-border)';
            e.currentTarget.style.color = 'var(--color-text-muted)';
          }}
        >
          <Search size={15} color="var(--color-electric-cyan)" />
          <span style={{ flex: 1, textAlign: 'left' }}>Search Home Memory...</span>
          <span
            style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '1px 5px',
              borderRadius: '4px'
            }}
          >
            ⌘K
          </span>
        </button>

        {/* Family Member Filter dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <User size={15} color="var(--color-text-muted)" />
          <select
            value={selectedMemberId}
            onChange={e => setSelectedMemberId(e.target.value)}
            style={{
              padding: '7px 12px',
              fontSize: '12.5px',
              fontWeight: 500,
              background: 'rgba(16, 40, 71, 0.65)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-soft-white)'
            }}
          >
            <option value="all">Household (All Members)</option>
            {familyMembers.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.relation})
              </option>
            ))}
          </select>
        </div>

        {/* AI Voice Assistant Quick Trigger */}
        <button
          onClick={() => setActiveScreen('assistant')}
          title="Open NEXA AI Voice Assistant"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(154, 134, 255, 0.15)',
            border: '1px solid rgba(154, 134, 255, 0.4)',
            color: 'var(--color-violet)',
            padding: '7px 12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12.5px',
            fontWeight: 600,
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 16px rgba(154, 134, 255, 0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Mic size={15} />
          <span>Ask NEXA</span>
        </button>

        {/* Notifications Icon Button */}
        <button
          onClick={() => setActiveScreen('notifications')}
          title="Notifications"
          style={{
            position: 'relative',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(16, 40, 71, 0.5)',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-soft-white)'
          }}
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--color-coral)',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 8px rgba(255, 77, 106, 0.6)'
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>

        {/* 3-Minute Video Showcase Button */}
        <button
          onClick={onOpenVideoModal}
          title="Watch 3-Minute Cinematic NEXA Video"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, rgba(84, 231, 255, 0.2) 0%, rgba(154, 134, 255, 0.2) 100%)',
            border: '1px solid var(--color-electric-cyan)',
            color: 'var(--color-electric-cyan)',
            padding: '7px 13px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12.5px',
            fontWeight: 600,
            transition: 'all 0.25s ease',
            boxShadow: '0 0 12px rgba(84, 231, 255, 0.25)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(84, 231, 255, 0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 0 12px rgba(84, 231, 255, 0.25)';
          }}
        >
          <Film size={15} />
          <span>3-Min Film</span>
        </button>

        {/* Quick Action Button */}
        <button
          onClick={onOpenQuickAction}
          className="btn-primary"
          style={{ padding: '7px 14px', fontSize: '13px' }}
        >
          <Plus size={15} />
          <span>Quick Action</span>
        </button>
      </div>
    </header>
  );
}
