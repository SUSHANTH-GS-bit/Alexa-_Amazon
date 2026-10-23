import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Download,
  RotateCcw,
  Bell,
  Lock,
  User,
  CheckCircle,
  Eye,
  Sliders,
  Database
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function SettingsScreen() {
  const {
    familyMembers,
    devices,
    bills,
    medicines,
    vehicles,
    homeMemory,
    showToast
  } = useNexa();

  const [privacyToggles, setPrivacyToggles] = useState({
    encryptHealth: true,
    pediatricRestricted: true,
    localTelemetryOnly: true,
    guestNetworkIsolated: true
  });

  const [notifPreferences, setNotifPreferences] = useState({
    pushMedicineAlerts: true,
    billDueWarnings: true,
    securityMotionAlerts: true,
    solarExportSummaries: false
  });

  // Export full household JSON dataset
  const handleExportData = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      household: 'Sharma Residence, Bengaluru',
      familyMembers,
      devices,
      bills,
      medicines,
      vehicles,
      homeMemory
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `NEXA-Household-Backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Household data package exported successfully', 'success');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all prototype records to factory demonstration state?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingBottom: '40px' }}>
      {/* Header */}
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
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Settings & Privacy Architecture</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '2px' }}>
            Multi-profile privacy boundaries, automated notifications, and sovereign local data storage.
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="btn-primary"
          style={{ padding: '9px 18px', fontSize: '13px' }}
        >
          <Download size={15} />
          <span>Export Sovereign Data (JSON)</span>
        </button>
      </div>

      {/* Privacy Partition Controls */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Shield size={18} color="var(--color-emerald)" />
          <h3 style={{ fontSize: '16px' }}>Family Member Privacy Partitions</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { key: 'encryptHealth', label: 'E2E Encryption on Clinical Health Reports', desc: 'Medical records stored locally with client-side key encryption.' },
            { key: 'pediatricRestricted', label: 'Pediatric Medical Profile Isolation (Aarav, 12)', desc: 'Restricts smart device controls and sensitive clinical files for child profile.' },
            { key: 'localTelemetryOnly', label: 'Sovereign Telemetry (No External Cloud Exfiltration)', desc: 'CCTV and sensor events process inside local edge boundary without third-party tracking.' },
            { key: 'guestNetworkIsolated', label: 'IoT VLAN Network Isolation', desc: 'Smart appliances segmented on isolated 2.4GHz virtual LAN.' }
          ].map(item => (
            <div
              key={item.key}
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
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {item.desc}
                </div>
              </div>

              <input
                type="checkbox"
                checked={privacyToggles[item.key]}
                onChange={e => setPrivacyToggles({ ...privacyToggles, [item.key]: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-electric-cyan)' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Bell size={18} color="var(--color-electric-cyan)" />
          <h3 style={{ fontSize: '16px' }}>Automated Household Channels</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { key: 'pushMedicineAlerts', label: 'Urgent Medicine Dose Reminders', desc: 'Audio chime and desktop notifications for scheduled prescriptions.' },
            { key: 'billDueWarnings', label: 'Bill Due Date Proactive Alerts (48h advance)', desc: 'Notify before Bescom, water, and insurance deadlines.' },
            { key: 'securityMotionAlerts', label: 'Perimeter Motion & Optical Delivery Detection', desc: 'Alert when couriers or unrecognized visitors arrive at Portico.' },
            { key: 'solarExportSummaries', label: 'Daily Solar Generation & Grid Export Milestones', desc: 'Daily summary at 18:00 when generation surpasses 20 kWh.' }
          ].map(item => (
            <div
              key={item.key}
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
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {item.desc}
                </div>
              </div>

              <input
                type="checkbox"
                checked={notifPreferences[item.key]}
                onChange={e => setNotifPreferences({ ...notifPreferences, [item.key]: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-electric-cyan)' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Data Management & Factory Reset */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '16px', color: 'var(--color-coral)' }}>Reset Prototype Data</h3>
          <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            Clear local browser storage and re-initialize factory demonstration state.
          </p>
        </div>

        <button
          onClick={handleResetData}
          style={{
            padding: '9px 18px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(255, 77, 106, 0.15)',
            border: '1px solid var(--color-coral)',
            color: 'var(--color-coral)',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <RotateCcw size={15} />
          <span>Reset to Seed State</span>
        </button>
      </div>
    </div>
  );
}
