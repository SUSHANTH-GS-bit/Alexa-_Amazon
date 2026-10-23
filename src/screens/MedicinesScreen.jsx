import React, { useState } from 'react';
import {
  Pill,
  Clock,
  CheckCircle,
  Plus,
  AlertTriangle,
  RotateCcw,
  Calendar,
  User,
  X,
  Sparkles
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function MedicinesScreen() {
  const {
    medicines,
    acknowledgeMedicine,
    addMedicine,
    familyMembers
  } = useNexa();

  const [showAddModal, setShowAddModal] = useState(false);
  const [memberFilter, setMemberFilter] = useState('all');

  const [newMedForm, setNewMedForm] = useState({
    name: '',
    familyMemberId: familyMembers[0]?.id || 'anita',
    dosage: '1 tablet twice daily',
    time: '08:00 AM',
    instructions: 'Take immediately after meals with water',
    prescribedBy: 'Dr. Meenakshi S.',
    refillDue: '2026-11-25',
    tabletsRemaining: 30
  });

  const filteredMeds = memberFilter === 'all'
    ? medicines
    : medicines.filter(m => m.familyMemberId === memberFilter);

  const pendingCount = medicines.filter(m => !m.isAcknowledged).length;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newMedForm.name) return;
    addMedicine({
      name: newMedForm.name,
      familyMemberId: newMedForm.familyMemberId,
      dosage: newMedForm.dosage,
      scheduleTimes: [newMedForm.time],
      instructions: newMedForm.instructions,
      nextReminder: `Today, ${newMedForm.time}`,
      prescribedBy: newMedForm.prescribedBy,
      refillDue: newMedForm.refillDue,
      tabletsRemaining: Number(newMedForm.tabletsRemaining) || 30
    });
    setShowAddModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingBottom: '40px' }}>
      {/* Notice Banner */}
      <div
        style={{
          padding: '12px 18px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(255, 77, 106, 0.08)',
          border: '1px solid rgba(255, 77, 106, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '12.5px'
        }}
      >
        <AlertTriangle size={16} color="var(--color-coral)" />
        <span style={{ color: 'var(--color-soft-white)' }}>
          <strong>Reminder Acknowledgment Protocol:</strong> Marking a reminder as acknowledged logs a timestamp in the household audit log. It serves as an assistive family reminder, not clinical proof of ingestion.
        </span>
      </div>

      {/* Header with quick stats */}
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
            <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Family Medication Regimens</h2>
            <span className={`badge ${pendingCount > 0 ? 'badge-coral' : 'badge-emerald'}`}>
              {pendingCount > 0 ? `${pendingCount} REMINDERS PENDING` : 'ALL DOSES LOGGED'}
            </span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '2px' }}>
            Synchronized reminders, refill countdowns, and family member cross-linkage.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
          style={{ padding: '9px 18px', fontSize: '13px' }}
        >
          <Plus size={15} />
          <span>Add Medicine Schedule</span>
        </button>
      </div>

      {/* Member Filter tabs */}
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
        <button
          onClick={() => setMemberFilter('all')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-sm)',
            background: memberFilter === 'all' ? 'rgba(84, 231, 255, 0.2)' : 'rgba(16, 40, 71, 0.4)',
            border: memberFilter === 'all' ? '1px solid var(--color-electric-cyan)' : '1px solid var(--glass-border)',
            color: memberFilter === 'all' ? 'var(--color-electric-cyan)' : 'var(--color-soft-white)',
            fontSize: '13px',
            fontWeight: memberFilter === 'all' ? 600 : 400
          }}
        >
          All Household Members ({medicines.length})
        </button>

        {familyMembers.map(m => {
          const isSelected = memberFilter === m.id;
          const count = medicines.filter(med => med.familyMemberId === m.id).length;
          return (
            <button
              key={m.id}
              onClick={() => setMemberFilter(m.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                background: isSelected ? 'rgba(84, 231, 255, 0.2)' : 'rgba(16, 40, 71, 0.4)',
                border: isSelected ? '1px solid var(--color-electric-cyan)' : '1px solid var(--glass-border)',
                color: isSelected ? 'var(--color-electric-cyan)' : 'var(--color-soft-white)',
                fontSize: '13px',
                fontWeight: isSelected ? 600 : 400,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: m.avatarColor }} />
              <span>{m.name} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Medicine Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredMeds.map(med => {
          const member = familyMembers.find(m => m.id === med.familyMemberId);
          return (
            <div
              key={med.id}
              className="glass-panel"
              style={{
                padding: '22px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '18px',
                borderLeft: med.isAcknowledged
                  ? '4px solid var(--color-emerald)'
                  : '4px solid var(--color-coral)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: med.isAcknowledged ? 'rgba(0, 229, 163, 0.12)' : 'rgba(255, 77, 106, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px'
                  }}
                >
                  <Pill size={22} color={med.isAcknowledged ? 'var(--color-emerald)' : 'var(--color-coral)'} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 700 }}>{med.name}</h3>
                    <span
                      className="badge"
                      style={{
                        background: `${member?.avatarColor}20`,
                        color: member?.avatarColor,
                        border: `1px solid ${member?.avatarColor}50`
                      }}
                    >
                      {member?.name}
                    </span>
                    <span className={`badge ${med.isAcknowledged ? 'badge-emerald' : 'badge-coral'}`}>
                      {med.isAcknowledged ? 'DOSE ACKNOWLEDGED' : 'ACTION REQUIRED'}
                    </span>
                  </div>

                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Dosage: <strong style={{ color: 'var(--color-soft-white)' }}>{med.dosage}</strong> • Next: {med.nextReminder}
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Instructions: {med.instructions} • Prescribed by {med.prescribedBy}
                  </div>

                  {/* Refill pill */}
                  <div style={{ display: 'flex', gap: '14px', marginTop: '8px', fontSize: '11.5px', color: 'var(--color-text-muted)' }}>
                    <span>Refill Date: <strong style={{ color: 'var(--color-amber)' }}>{med.refillDue}</strong></span>
                    <span>Remaining Supply: <strong>{med.tabletsRemaining} units</strong></span>
                    <span>Last Acknowledged: <strong>{med.lastAcknowledgedAt}</strong></span>
                  </div>
                </div>
              </div>

              {/* Acknowledge Toggle Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => acknowledgeMedicine(med.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    background: med.isAcknowledged
                      ? 'rgba(0, 229, 163, 0.15)'
                      : 'linear-gradient(135deg, var(--color-coral) 0%, #e03250 100%)',
                    border: med.isAcknowledged
                      ? '1px solid var(--color-emerald)'
                      : 'none',
                    color: med.isAcknowledged ? 'var(--color-emerald)' : '#fff',
                    boxShadow: med.isAcknowledged
                      ? 'none'
                      : '0 4px 16px rgba(255, 77, 106, 0.4)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <CheckCircle size={16} />
                  <span>
                    {med.isAcknowledged ? 'Acknowledged (Click to Undo)' : 'Acknowledge Dose'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Medicine Schedule Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '22px 26px', borderBottom: '1px solid rgba(84, 231, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '18px' }}>Add Medicine Schedule</h2>
              <button onClick={() => setShowAddModal(false)} style={{ color: 'var(--color-text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Assign to Family Member
                </label>
                <select
                  value={newMedForm.familyMemberId}
                  onChange={e => setNewMedForm({ ...newMedForm, familyMemberId: e.target.value })}
                  style={{ width: '100%' }}
                >
                  {familyMembers.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.relation})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Medicine Name & Formulation
                </label>
                <input
                  type="text"
                  placeholder="e.g. Atorvastatin 10mg"
                  value={newMedForm.name}
                  onChange={e => setNewMedForm({ ...newMedForm, name: e.target.value })}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Dosage
                  </label>
                  <input
                    type="text"
                    value={newMedForm.dosage}
                    onChange={e => setNewMedForm({ ...newMedForm, dosage: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Reminder Time
                  </label>
                  <input
                    type="text"
                    value={newMedForm.time}
                    onChange={e => setNewMedForm({ ...newMedForm, time: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Instructions
                </label>
                <input
                  type="text"
                  value={newMedForm.instructions}
                  onChange={e => setNewMedForm({ ...newMedForm, instructions: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Refill Due Date
                  </label>
                  <input
                    type="date"
                    value={newMedForm.refillDue}
                    onChange={e => setNewMedForm({ ...newMedForm, refillDue: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Tablets in Stock
                  </label>
                  <input
                    type="number"
                    value={newMedForm.tabletsRemaining}
                    onChange={e => setNewMedForm({ ...newMedForm, tabletsRemaining: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
