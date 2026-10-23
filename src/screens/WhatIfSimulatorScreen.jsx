import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Zap,
  TrendingDown,
  Shield,
  Activity
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function WhatIfSimulatorScreen() {
  const { whatIfScenarios, executeSimulationRehearsal, simulatedActionsLog } = useNexa();
  const [selectedScenarioId, setSelectedScenarioId] = useState(whatIfScenarios[0]?.id || 'scen-1');

  const currentScenario = whatIfScenarios.find(s => s.id === selectedScenarioId) || whatIfScenarios[0];

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
            <h2 style={{ fontSize: '22px', fontWeight: 800 }}>What-If Action Rehearsal Sandbox</h2>
            <span className="badge badge-cyan">LOCAL SIMULATION</span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '2px' }}>
            Preview compound automation outcomes, grid tariff adjustments, and security implications prior to execution.
          </p>
        </div>

        <button
          onClick={() => executeSimulationRehearsal(currentScenario)}
          className="btn-primary"
          style={{ padding: '10px 22px', fontSize: '13.5px' }}
        >
          <Play size={16} />
          <span>Execute Rehearsal Simulation</span>
        </button>
      </div>

      {/* Scenario Selector Pills */}
      <div
        className="glass-panel"
        style={{
          padding: '12px 16px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          overflowX: 'auto'
        }}
      >
        {whatIfScenarios.map(scen => {
          const isSelected = scen.id === currentScenario.id;
          return (
            <button
              key={scen.id}
              onClick={() => setSelectedScenarioId(scen.id)}
              style={{
                padding: '9px 18px',
                borderRadius: 'var(--radius-sm)',
                background: isSelected ? 'rgba(84, 231, 255, 0.2)' : 'rgba(16, 40, 71, 0.4)',
                border: isSelected ? '1px solid var(--color-electric-cyan)' : '1px solid var(--glass-border)',
                color: isSelected ? 'var(--color-electric-cyan)' : 'var(--color-soft-white)',
                fontWeight: isSelected ? 600 : 400,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={15} />
              <span>{scen.title}</span>
            </button>
          );
        })}
      </div>

      {/* Scenario Detail Sandbox */}
      <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <div>
          <span className="badge badge-violet">{currentScenario.category}</span>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px' }}>{currentScenario.title}</h2>
          <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {currentScenario.description}
          </p>
        </div>

        {/* Projected Actions Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-electric-cyan)' }}>
            PROJECTED SUB-SYSTEM ADJUSTMENTS:
          </div>
          {currentScenario.projectedActions.map((act, idx) => (
            <div
              key={idx}
              style={{
                padding: '14px 18px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(16, 40, 71, 0.4)',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-soft-white)' }}>
                {act.target}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--color-electric-cyan)' }}>
                {act.effect}
              </span>
            </div>
          ))}
        </div>

        {/* Required Permissions & Safety Notice */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '10px' }}>
          <div style={{ padding: '16px', background: 'rgba(16, 40, 71, 0.4)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
              Required Automation Entitlements
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {currentScenario.requiredPermissions.map((perm, idx) => (
                <span key={idx} className="badge badge-cyan" style={{ fontSize: '10px' }}>
                  {perm}
                </span>
              ))}
            </div>
          </div>

          <div style={{ padding: '16px', background: 'rgba(255, 181, 71, 0.08)', border: '1px solid rgba(255, 181, 71, 0.2)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '11px', color: 'var(--color-amber)', marginBottom: '4px' }}>
              Safety & Critical Circuit Protection
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--color-soft-white)' }}>
              {currentScenario.safetyNotice}
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Actions Rehearsal Audit Log */}
      {simulatedActionsLog.length > 0 && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '14px' }}>Rehearsal Execution Audit History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {simulatedActionsLog.map(log => (
              <div
                key={log.id}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(16, 40, 71, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '13px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={16} color="var(--color-emerald)" />
                  <span style={{ fontWeight: 600 }}>{log.title}</span>
                </div>
                <div style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  {log.executedAt} • {log.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
