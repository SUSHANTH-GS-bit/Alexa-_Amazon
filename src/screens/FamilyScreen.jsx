import React, { useState } from 'react';
import {
  Users,
  User,
  HeartPulse,
  Pill,
  Calendar,
  Shield,
  Phone,
  Plus,
  ArrowRight,
  Lock,
  X
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function FamilyScreen() {
  const {
    familyMembers,
    setSelectedMemberId,
    setActiveScreen,
    medicines
  } = useNexa();

  const [inspectedMember, setInspectedMember] = useState(null);

  const handleSelectMember = (memberId) => {
    setSelectedMemberId(memberId);
    setActiveScreen('health');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      {/* Overview Header */}
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
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Family Members & Health Nodes</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '2px' }}>
            Individual privacy partitions, linked biometric records, and medical schedules.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--color-emerald)' }}>
          <Shield size={16} />
          <span>Biometric Privacy Encryption Active</span>
        </div>
      </div>

      {/* Family Profiles Grid */}
      <div className="grid-cols-auto-fit">
        {familyMembers.map(member => {
          const memberMeds = medicines.filter(m => m.familyMemberId === member.id);
          const latestVitals = member.vitalsHistory[member.vitalsHistory.length - 1];

          return (
            <div
              key={member.id}
              className="glass-panel-interactive"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header with avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: `${member.avatarColor}20`,
                      border: `2px solid ${member.avatarColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: member.avatarColor,
                      boxShadow: `0 0 16px ${member.avatarColor}40`
                    }}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{member.name}</h3>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      {member.role}
                    </div>
                  </div>
                </div>

                {/* Details pill tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <span className="badge badge-cyan" style={{ fontSize: '10px' }}>
                    {member.age} YRS
                  </span>
                  <span className="badge badge-violet" style={{ fontSize: '10px' }}>
                    BLOOD {member.bloodGroup}
                  </span>
                  <span className="badge badge-amber" style={{ fontSize: '10px' }}>
                    {member.relation}
                  </span>
                </div>

                {/* Vitals & Notes preview */}
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(16, 40, 71, 0.4)',
                    border: '1px solid var(--glass-border)',
                    marginBottom: '16px',
                    fontSize: '12.5px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Blood Pressure:</span>
                    <span style={{ fontWeight: 600 }}>{latestVitals.bpSystolic}/{latestVitals.bpDiastolic} mmHg</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Heart Rate / SpO2:</span>
                    <span style={{ fontWeight: 600 }}>{latestVitals.hr} bpm • {latestVitals.spo2}%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Active Medicines:</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-electric-cyan)' }}>
                      {memberMeds.length} scheduled
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <button
                  onClick={() => handleSelectMember(member.id)}
                  className="btn-primary"
                  style={{ flex: 1, padding: '9px', fontSize: '13px' }}
                >
                  <HeartPulse size={15} />
                  <span>Health Records</span>
                </button>
                <button
                  onClick={() => setInspectedMember(member)}
                  className="btn-secondary"
                  style={{ padding: '9px 12px', fontSize: '13px' }}
                >
                  Dossier
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Member Details Modal */}
      {inspectedMember && (
        <div className="modal-overlay" onClick={() => setInspectedMember(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '22px 26px', borderBottom: '1px solid rgba(84, 231, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: `${inspectedMember.avatarColor}20`,
                    border: `2px solid ${inspectedMember.avatarColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: inspectedMember.avatarColor
                  }}
                >
                  {inspectedMember.initials}
                </div>
                <div>
                  <h2 style={{ fontSize: '18px' }}>{inspectedMember.name}</h2>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Personal Profile & Health Profile
                  </p>
                </div>
              </div>
              <button onClick={() => setInspectedMember(null)} style={{ color: 'var(--color-text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ padding: '12px', background: 'rgba(16, 40, 71, 0.4)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Emergency Contact</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600 }}>{inspectedMember.phone}</div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(16, 40, 71, 0.4)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Known Allergies</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-coral)' }}>{inspectedMember.allergies}</div>
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(16, 40, 71, 0.4)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                  Clinical & Wellness Notes
                </div>
                <div style={{ fontSize: '13px', lineHeight: 1.5 }}>
                  {inspectedMember.notes}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  className="btn-primary"
                  onClick={() => {
                    handleSelectMember(inspectedMember.id);
                    setInspectedMember(null);
                  }}
                >
                  Open Full Health Suite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
