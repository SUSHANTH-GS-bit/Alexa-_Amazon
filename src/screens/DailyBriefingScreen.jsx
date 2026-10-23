import React, { useState } from 'react';
import {
  CalendarCheck,
  Receipt,
  Pill,
  HeartPulse,
  Car,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Filter,
  Sparkles,
  Zap
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function DailyBriefingScreen() {
  const { dailyBriefingItems, setActiveScreen } = useNexa();
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'today', 'upcoming'

  const filteredItems = dailyBriefingItems.filter(item => {
    if (filterMode === 'today') {
      return item.time.toLowerCase().includes('today') || item.priority === 'Urgent';
    }
    if (filterMode === 'upcoming') {
      return !item.time.toLowerCase().includes('today');
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingBottom: '40px' }}>
      {/* Header Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Unified Daily Briefing</h2>
            <span className="badge badge-cyan">AUTONOMOUS SYNTHESIS</span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '2px' }}>
            Synthesized priorities cross-referenced from bills, clinical appointments, medicines, vehicles, and sensors.
          </p>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'all', label: `All Agenda (${dailyBriefingItems.length})` },
            { id: 'today', label: 'Imminent & Today' },
            { id: 'upcoming', label: 'Upcoming Week' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilterMode(btn.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                background: filterMode === btn.id ? 'rgba(84, 231, 255, 0.2)' : 'rgba(16, 40, 71, 0.4)',
                border: filterMode === btn.id ? '1px solid var(--color-electric-cyan)' : '1px solid var(--glass-border)',
                color: filterMode === btn.id ? 'var(--color-electric-cyan)' : 'var(--color-soft-white)',
                fontSize: '13px',
                fontWeight: filterMode === btn.id ? 600 : 400
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Agenda Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredItems.map(item => {
          const isHighPriority = item.priority === 'Urgent' || item.priority === 'High';
          return (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                borderLeft: isHighPriority
                  ? '4px solid var(--color-coral)'
                  : '4px solid var(--color-electric-cyan)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: isHighPriority ? 'rgba(255, 77, 106, 0.12)' : 'rgba(84, 231, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Sparkles size={18} color={isHighPriority ? 'var(--color-coral)' : 'var(--color-electric-cyan)'} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{item.title}</h3>
                    <span className="badge badge-cyan">{item.category}</span>
                    <span className={`badge ${isHighPriority ? 'badge-coral' : 'badge-emerald'}`}>
                      {item.priority}
                    </span>
                  </div>

                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    {item.detail}
                  </div>
                </div>
              </div>

              {/* Time & Action Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--color-electric-cyan)' }}>
                    {item.time}
                  </div>
                </div>

                <button
                  onClick={() => setActiveScreen(item.actionScreen)}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '12.5px' }}
                >
                  <span>Resolve in Module</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
