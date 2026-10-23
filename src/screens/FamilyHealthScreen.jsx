import React, { useState } from 'react';
import {
  HeartPulse,
  Activity,
  Calendar,
  FileText,
  Plus,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  X,
  FileCheck,
  Eye
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function FamilyHealthScreen() {
  const {
    familyMembers,
    selectedMemberId,
    setSelectedMemberId,
    addHealthMetric
  } = useNexa();

  const [activeTab, setActiveTab] = useState('vitals'); // 'vitals', 'reports', 'appointments'
  const [showLogModal, setShowLogModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  // Active member for health view (defaults to Anita or selected)
  const currentMember = familyMembers.find(m => m.id === selectedMemberId) || familyMembers[3]; // Anita by default
  const vitalsHistory = currentMember.vitalsHistory || [];
  const latest = vitalsHistory[vitalsHistory.length - 1] || {};

  // Form state for logging new measurement
  const [newMeasurement, setNewMeasurement] = useState({
    bpSystolic: 120,
    bpDiastolic: 80,
    hr: 72,
    glucose: 105,
    spo2: 98,
    temp: 98.4,
    weight: 65
  });

  const handleLogSubmit = (e) => {
    e.preventDefault();
    addHealthMetric(currentMember.id, {
      bpSystolic: Number(newMeasurement.bpSystolic),
      bpDiastolic: Number(newMeasurement.bpDiastolic),
      hr: Number(newMeasurement.hr),
      glucose: Number(newMeasurement.glucose),
      spo2: Number(newMeasurement.spo2),
      temp: Number(newMeasurement.temp),
      weight: Number(newMeasurement.weight)
    });
    setShowLogModal(false);
  };

  // Sample clinical reports
  const clinicalReports = [
    {
      id: 'rep-1',
      title: 'Comprehensive Metabolic Panel & HbA1c',
      doctor: 'Dr. Meenakshi S.',
      facility: 'Apollo Clinic, Indiranagar',
      date: '2026-10-14',
      status: 'Normal Control (6.4%)',
      content: 'Fasting Blood Sugar: 126 mg/dL. Postprandial: 148 mg/dL. HbA1c: 6.4%. Kidney and liver function parameters within standard reference ranges.'
    },
    {
      id: 'rep-2',
      title: 'Digital Echocardiogram & Resting ECG',
      doctor: 'Dr. Ramesh Babu',
      facility: 'Manipal Hospital Cardiology',
      date: '2026-08-10',
      status: 'Normal Sinus Rhythm',
      content: 'Ejection fraction 62%. Normal wall motion. No evidence of ischemia. Baseline comparison with 2025 verified stable.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingBottom: '40px' }}>
      {/* Medical Disclaimer Alert */}
      <div
        style={{
          padding: '12px 18px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(255, 181, 71, 0.08)',
          border: '1px solid rgba(255, 181, 71, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '12.5px'
        }}
      >
        <AlertCircle size={16} color="var(--color-amber)" />
        <span style={{ color: 'var(--color-soft-white)' }}>
          <strong>Medical Information Notice:</strong> NEXA securely aggregates family vitals and reminder schedules. NEXA does not diagnose conditions, interpret symptoms, or alter prescriptions. Always consult qualified healthcare professionals.
        </span>
      </div>

      {/* Member Filter Chips */}
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
        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginRight: '6px' }}>
          Select Patient Profile:
        </span>
        {familyMembers.map(m => {
          const isSelected = m.id === currentMember.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMemberId(m.id)}
              style={{
                padding: '8px 16px',
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
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: m.avatarColor
                }}
              />
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>

      {/* Patient Header Banner */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: `${currentMember.avatarColor}20`,
              border: `2px solid ${currentMember.avatarColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 700,
              color: currentMember.avatarColor
            }}
          >
            {currentMember.initials}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800 }}>{currentMember.name}</h2>
              <span className="badge badge-cyan">{currentMember.relation}</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              {currentMember.age} Years • Blood Group {currentMember.bloodGroup} • Allergies: {currentMember.allergies}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="btn-primary"
          style={{ padding: '9px 18px', fontSize: '13px' }}
        >
          <Plus size={15} />
          <span>Log New Measurement</span>
        </button>
      </div>

      {/* Biometric Vitals 6-Tile Grid */}
      <div className="grid-cols-auto-fit">
        {/* Blood Pressure */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Blood Pressure (Systolic / Diastolic)
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-electric-cyan)' }}>
            {latest.bpSystolic} / {latest.bpDiastolic} <span style={{ fontSize: '14px', fontWeight: 400 }}>mmHg</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-emerald)', marginTop: '6px' }}>
            Standard Range (Target: 120/80)
          </div>
        </div>

        {/* Heart Rate */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Resting Heart Rate
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-coral)' }}>
            {latest.hr} <span style={{ fontSize: '14px', fontWeight: 400 }}>BPM</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            Normal Sinus Range
          </div>
        </div>

        {/* Blood Glucose */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Blood Glucose (Fasting)
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-amber)' }}>
            {latest.glucose} <span style={{ fontSize: '14px', fontWeight: 400 }}>mg/dL</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-emerald)', marginTop: '6px' }}>
            Controlled (Post-Metformin)
          </div>
        </div>

        {/* SpO2 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Blood Oxygen Saturation (SpO2)
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-electric-cyan)' }}>
            {latest.spo2}%
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-emerald)', marginTop: '6px' }}>
            Optimal Oxygenation
          </div>
        </div>

        {/* Temperature */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Body Temperature
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700 }}>
            {latest.temp}°F
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            Afebrile
          </div>
        </div>

        {/* Weight */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Weight Tracking
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700 }}>
            {latest.weight || 65.0} <span style={{ fontSize: '14px', fontWeight: 400 }}>kg</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            Stable baseline
          </div>
        </div>
      </div>

      {/* Vitals History Trend Chart */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={18} color="var(--color-electric-cyan)" />
            <h3 style={{ fontSize: '16px' }}>Biometric Trend Timeline</h3>
          </div>
          <span className="badge badge-cyan">{vitalsHistory.length} ENTRIES LOGGED</span>
        </div>

        {/* Table of measurements */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(84, 231, 255, 0.15)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '10px 12px' }}>Date</th>
                <th style={{ padding: '10px 12px' }}>BP (Systolic/Diastolic)</th>
                <th style={{ padding: '10px 12px' }}>Heart Rate</th>
                <th style={{ padding: '10px 12px' }}>Blood Sugar</th>
                <th style={{ padding: '10px 12px' }}>SpO2</th>
                <th style={{ padding: '10px 12px' }}>Temp</th>
              </tr>
            </thead>
            <tbody>
              {vitalsHistory.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    background: idx === vitalsHistory.length - 1 ? 'rgba(84, 231, 255, 0.05)' : 'transparent'
                  }}
                >
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>{row.date}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-electric-cyan)' }}>
                    {row.bpSystolic} / {row.bpDiastolic} mmHg
                  </td>
                  <td style={{ padding: '12px' }}>{row.hr} bpm</td>
                  <td style={{ padding: '12px', color: 'var(--color-amber)' }}>{row.glucose} mg/dL</td>
                  <td style={{ padding: '12px' }}>{row.spo2}%</td>
                  <td style={{ padding: '12px' }}>{row.temp}°F</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinical Reports & Uploaded Records Section */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={18} color="var(--color-violet)" />
            <h3 style={{ fontSize: '16px' }}>Verified Clinical Records & Prescriptions</h3>
          </div>
          <span className="badge badge-violet">2 DOCUMENTS ARCHIVED</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {clinicalReports.map(rep => (
            <div
              key={rep.id}
              style={{
                padding: '16px',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '14.5px', fontWeight: 600 }}>{rep.title}</span>
                  <span className="badge badge-emerald">{rep.status}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  {rep.doctor} • {rep.facility} • {rep.date}
                </div>
              </div>

              <button
                onClick={() => setPreviewDoc(rep)}
                className="btn-secondary"
                style={{ padding: '7px 14px', fontSize: '12.5px' }}
              >
                <Eye size={14} />
                <span>Preview Document</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Log Measurement Modal */}
      {showLogModal && (
        <div className="modal-overlay" onClick={() => setShowLogModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '22px 26px', borderBottom: '1px solid rgba(84, 231, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '18px' }}>Log Vitals for {currentMember.name}</h2>
              <button onClick={() => setShowLogModal(false)} style={{ color: 'var(--color-text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleLogSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Systolic BP (mmHg)
                  </label>
                  <input
                    type="number"
                    value={newMeasurement.bpSystolic}
                    onChange={e => setNewMeasurement({ ...newMeasurement, bpSystolic: e.target.value })}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Diastolic BP (mmHg)
                  </label>
                  <input
                    type="number"
                    value={newMeasurement.bpDiastolic}
                    onChange={e => setNewMeasurement({ ...newMeasurement, bpDiastolic: e.target.value })}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Heart Rate (BPM)
                  </label>
                  <input
                    type="number"
                    value={newMeasurement.hr}
                    onChange={e => setNewMeasurement({ ...newMeasurement, hr: e.target.value })}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Blood Glucose (mg/dL)
                  </label>
                  <input
                    type="number"
                    value={newMeasurement.glucose}
                    onChange={e => setNewMeasurement({ ...newMeasurement, glucose: e.target.value })}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    SpO2 Oxygen (%)
                  </label>
                  <input
                    type="number"
                    value={newMeasurement.spo2}
                    onChange={e => setNewMeasurement({ ...newMeasurement, spo2: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Temperature (°F)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMeasurement.temp}
                    onChange={e => setNewMeasurement({ ...newMeasurement, temp: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowLogModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Vitals Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="modal-overlay" onClick={() => setPreviewDoc(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div style={{ padding: '22px 26px', borderBottom: '1px solid rgba(84, 231, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileCheck size={20} color="var(--color-emerald)" />
                <h2 style={{ fontSize: '17px' }}>{previewDoc.title}</h2>
              </div>
              <button onClick={() => setPreviewDoc(null)} style={{ color: 'var(--color-text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
                Issued by {previewDoc.doctor} at {previewDoc.facility} on {previewDoc.date}
              </div>

              <div
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(16, 40, 71, 0.5)',
                  border: '1px solid var(--glass-border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: 'var(--color-soft-white)'
                }}
              >
                {previewDoc.content}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button className="btn-secondary" onClick={() => setPreviewDoc(null)}>
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
