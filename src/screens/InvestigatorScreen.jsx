import React, { useState } from 'react';
import {
  Wrench,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  AlertOctagon,
  ChevronRight,
  Info,
  PhoneCall
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function InvestigatorScreen() {
  const { troubleshootingGuides } = useNexa();
  const [selectedGuideId, setSelectedGuideId] = useState(troubleshootingGuides[0]?.id || 'tb-1');

  const currentGuide = troubleshootingGuides.find(g => g.id === selectedGuideId) || troubleshootingGuides[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingBottom: '40px' }}>
      {/* Notice Banner */}
      <div
        style={{
          padding: '12px 18px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(84, 231, 255, 0.08)',
          border: '1px solid rgba(84, 231, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '12.5px'
        }}
      >
        <Info size={16} color="var(--color-electric-cyan)" />
        <span style={{ color: 'var(--color-soft-white)' }}>
          <strong>Factual Diagnostic Separation:</strong> NEXA separates verified hardware telemetry from hypothetical causes. The system never recommends hazardous high-voltage repairs or uncertified electrical tampering.
        </span>
      </div>

      {/* Equipment Selector */}
      <div
        className="glass-panel"
        style={{
          padding: '14px 18px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          overflowX: 'auto'
        }}
      >
        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginRight: '6px' }}>
          Select Appliance / Symptom:
        </span>
        {troubleshootingGuides.map(g => {
          const isSelected = g.id === currentGuide.id;
          return (
            <button
              key={g.id}
              onClick={() => setSelectedGuideId(g.id)}
              style={{
                padding: '9px 18px',
                borderRadius: 'var(--radius-sm)',
                background: isSelected ? 'rgba(84, 231, 255, 0.2)' : 'rgba(16, 40, 71, 0.4)',
                border: isSelected ? '1px solid var(--color-electric-cyan)' : '1px solid var(--glass-border)',
                color: isSelected ? 'var(--color-electric-cyan)' : 'var(--color-soft-white)',
                fontWeight: isSelected ? 600 : 400,
                fontSize: '13px'
              }}
            >
              {g.deviceName}
            </button>
          );
        })}
      </div>

      {/* Main Diagnostic Dossier */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        <div>
          <span className="badge badge-amber" style={{ marginBottom: '8px' }}>
            REPORTED SYMPTOM
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>{currentGuide.issueTitle}</h2>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Diagnostic Target: {currentGuide.deviceName}
          </div>
        </div>

        {/* 4 Structured Diagnostic Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Pillar 1: Verified Telemetry Facts */}
          <div
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0, 229, 163, 0.05)',
              border: '1px solid rgba(0, 229, 163, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-emerald)', marginBottom: '14px' }}>
              <CheckCircle2 size={18} />
              <h3 style={{ fontSize: '15px', fontWeight: 700 }}>1. Verified System Facts</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentGuide.verifiedFacts.map((fact, idx) => (
                <li key={idx} style={{ fontSize: '12.5px', lineHeight: 1.5, color: 'var(--color-soft-white)', display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-emerald)' }}>✓</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 2: Possible Hypotheses */}
          <div
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(84, 231, 255, 0.05)',
              border: '1px solid rgba(84, 231, 255, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-electric-cyan)', marginBottom: '14px' }}>
              <HelpCircle size={18} />
              <h3 style={{ fontSize: '15px', fontWeight: 700 }}>2. Potential Explanations</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentGuide.possibleExplanations.map((exp, idx) => (
                <li key={idx} style={{ fontSize: '12.5px', lineHeight: 1.5, color: 'var(--color-soft-white)', display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-electric-cyan)' }}>?</span>
                  <span>{exp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 3: Safe User Checks */}
          <div
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(154, 134, 255, 0.05)',
              border: '1px solid rgba(154, 134, 255, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-violet)', marginBottom: '14px' }}>
              <ShieldCheck size={18} />
              <h3 style={{ fontSize: '15px', fontWeight: 700 }}>3. Safe Step-by-Step Checks</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentGuide.safeChecks.map((chk, idx) => (
                <li key={idx} style={{ fontSize: '12.5px', lineHeight: 1.5, color: 'var(--color-soft-white)', display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-violet)' }}>→</span>
                  <span>{chk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 4: Authorized Escalation */}
          <div
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 181, 71, 0.05)',
              border: '1px solid rgba(255, 181, 71, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-amber)', marginBottom: '14px' }}>
              <AlertOctagon size={18} />
              <h3 style={{ fontSize: '15px', fontWeight: 700 }}>4. Authorized Technician Escalation</h3>
            </div>
            <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: 'var(--color-soft-white)' }}>
              {currentGuide.professionalHelpRecommended}
            </p>

            <div style={{ marginTop: '16px' }}>
              <button
                className="btn-secondary"
                style={{ width: '100%', fontSize: '12px', padding: '8px' }}
                onClick={() => alert(`Connecting to verified warranty provider for ${currentGuide.deviceName}. Service token logged in Home Memory.`)}
              >
                <PhoneCall size={14} />
                <span>Request Authorized Service Visit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
