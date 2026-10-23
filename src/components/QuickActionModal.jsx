import React, { useState } from 'react';
import { X, Receipt, Pill, HeartPulse, Cpu } from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function QuickActionModal({ onClose }) {
  const {
    familyMembers,
    rooms,
    addBill,
    addMedicine,
    addHealthMetric,
    addDevice,
    setActiveScreen
  } = useNexa();

  const [activeTab, setActiveTab] = useState('bill'); // 'bill', 'med', 'vitals', 'device'

  // Bill Form state
  const [billForm, setBillForm] = useState({
    title: '',
    category: 'Electricity',
    amount: '',
    dueDate: new Date().toISOString().split('T')[0],
    frequency: 'Monthly'
  });

  // Medicine Form state
  const [medForm, setMedForm] = useState({
    name: '',
    familyMemberId: familyMembers[0]?.id || 'anita',
    dosage: '1 tablet once daily',
    time: '08:00 AM',
    instructions: 'Take with food and water'
  });

  // Vitals Form state
  const [vitalsForm, setVitalsForm] = useState({
    memberId: familyMembers[0]?.id || 'anita',
    bpSystolic: 120,
    bpDiastolic: 80,
    hr: 72,
    glucose: 100,
    spo2: 98,
    temp: 98.4
  });

  // Device Form state
  const [deviceForm, setDeviceForm] = useState({
    name: '',
    room: rooms[0]?.id || 'living-room',
    category: 'light',
    brand: 'NEXA IoT Verified',
    model: 'NX-2026'
  });

  const handleBillSubmit = (e) => {
    e.preventDefault();
    if (!billForm.title || !billForm.amount) return;
    addBill(billForm);
    setActiveScreen('bills');
    onClose();
  };

  const handleMedSubmit = (e) => {
    e.preventDefault();
    if (!medForm.name) return;
    addMedicine({
      name: medForm.name,
      familyMemberId: medForm.familyMemberId,
      dosage: medForm.dosage,
      scheduleTimes: [medForm.time],
      instructions: medForm.instructions,
      nextReminder: `Today, ${medForm.time}`
    });
    setActiveScreen('medicines');
    onClose();
  };

  const handleVitalsSubmit = (e) => {
    e.preventDefault();
    addHealthMetric(vitalsForm.memberId, {
      bpSystolic: Number(vitalsForm.bpSystolic),
      bpDiastolic: Number(vitalsForm.bpDiastolic),
      hr: Number(vitalsForm.hr),
      glucose: Number(vitalsForm.glucose),
      spo2: Number(vitalsForm.spo2),
      temp: Number(vitalsForm.temp)
    });
    setActiveScreen('health');
    onClose();
  };

  const handleDeviceSubmit = (e) => {
    e.preventDefault();
    if (!deviceForm.name) return;
    addDevice(deviceForm);
    setActiveScreen('smarthome');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(84, 231, 255, 0.14)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h2 style={{ fontSize: '18px' }}>Execute Household Action</h2>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Quickly create records and sync across family nodes
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ color: 'var(--color-text-muted)', padding: '6px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid rgba(84, 231, 255, 0.1)',
            background: 'rgba(7, 16, 31, 0.6)'
          }}
        >
          {[
            { id: 'bill', label: 'Add Bill', icon: Receipt },
            { id: 'med', label: 'Add Medicine', icon: Pill },
            { id: 'vitals', label: 'Log Vitals', icon: HeartPulse },
            { id: 'device', label: 'Add Device', icon: Cpu }
          ].map(tab => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: isTabActive ? 'var(--color-electric-cyan)' : 'var(--color-text-muted)',
                  borderBottom: isTabActive ? '2px solid var(--color-electric-cyan)' : 'none',
                  background: isTabActive ? 'rgba(84, 231, 255, 0.08)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <div style={{ padding: '24px' }}>
          {activeTab === 'bill' && (
            <form onSubmit={handleBillSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Bill Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. BESCOM Domestic Solar Grid"
                  value={billForm.title}
                  onChange={e => setBillForm({ ...billForm, title: e.target.value })}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={billForm.category}
                    onChange={e => setBillForm({ ...billForm, category: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    <option value="Electricity">Electricity</option>
                    <option value="Water">Water</option>
                    <option value="Gas">Piped Gas</option>
                    <option value="Internet">Internet & Fiber</option>
                    <option value="Society">Society Maintenance</option>
                    <option value="Insurance">Home Insurance</option>
                    <option value="Other">Other Obligation</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Amount (₹ INR)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 4250"
                    value={billForm.amount}
                    onChange={e => setBillForm({ ...billForm, amount: e.target.value })}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Due Date
                </label>
                <input
                  type="date"
                  value={billForm.dueDate}
                  onChange={e => setBillForm({ ...billForm, dueDate: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Bill Record
                </button>
              </div>
            </form>
          )}

          {activeTab === 'med' && (
            <form onSubmit={handleMedSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Family Member
                </label>
                <select
                  value={medForm.familyMemberId}
                  onChange={e => setMedForm({ ...medForm, familyMemberId: e.target.value })}
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
                  Medicine Name & Strength
                </label>
                <input
                  type="text"
                  placeholder="e.g. Metformin Hydrochloride 500mg"
                  value={medForm.name}
                  onChange={e => setMedForm({ ...medForm, name: e.target.value })}
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
                    placeholder="e.g. 1 tablet after meals"
                    value={medForm.dosage}
                    onChange={e => setMedForm({ ...medForm, dosage: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Reminder Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 08:00 PM"
                    value={medForm.time}
                    onChange={e => setMedForm({ ...medForm, time: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Schedule
                </button>
              </div>
            </form>
          )}

          {activeTab === 'vitals' && (
            <form onSubmit={handleVitalsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Select Family Member
                </label>
                <select
                  value={vitalsForm.memberId}
                  onChange={e => setVitalsForm({ ...vitalsForm, memberId: e.target.value })}
                  style={{ width: '100%' }}
                >
                  {familyMembers.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.relation})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Blood Pressure Systolic (mmHg)
                  </label>
                  <input
                    type="number"
                    value={vitalsForm.bpSystolic}
                    onChange={e => setVitalsForm({ ...vitalsForm, bpSystolic: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Blood Pressure Diastolic (mmHg)
                  </label>
                  <input
                    type="number"
                    value={vitalsForm.bpDiastolic}
                    onChange={e => setVitalsForm({ ...vitalsForm, bpDiastolic: e.target.value })}
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
                    value={vitalsForm.hr}
                    onChange={e => setVitalsForm({ ...vitalsForm, hr: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Blood Glucose (mg/dL)
                  </label>
                  <input
                    type="number"
                    value={vitalsForm.glucose}
                    onChange={e => setVitalsForm({ ...vitalsForm, glucose: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Log Biometric Vitals
                </button>
              </div>
            </form>
          )}

          {activeTab === 'device' && (
            <form onSubmit={handleDeviceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Device Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Study Ambient Floor Lamp"
                  value={deviceForm.name}
                  onChange={e => setDeviceForm({ ...deviceForm, name: e.target.value })}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Assigned Room
                  </label>
                  <select
                    value={deviceForm.room}
                    onChange={e => setDeviceForm({ ...deviceForm, room: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    {rooms.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Device Category
                  </label>
                  <select
                    value={deviceForm.category}
                    onChange={e => setDeviceForm({ ...deviceForm, category: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    <option value="light">Smart Light</option>
                    <option value="thermostat">HVAC / Thermostat</option>
                    <option value="appliance">Smart Appliance</option>
                    <option value="lock">Security Lock</option>
                    <option value="sensor">Sensor / Energy</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Simulate Device Add
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
