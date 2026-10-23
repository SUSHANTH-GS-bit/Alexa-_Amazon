import React, { useState } from 'react';
import {
  Car,
  BatteryCharging,
  Fuel,
  ShieldAlert,
  FileCheck,
  Wrench,
  Plus,
  AlertTriangle,
  Clock,
  CheckCircle,
  X,
  Gauge
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function VehiclesScreen() {
  const { vehicles, addVehicleMaintenance } = useNexa();
  const [selectedVehId, setSelectedVehId] = useState(vehicles[0]?.id || 'veh-1');
  const [showAddLogModal, setShowAddLogModal] = useState(false);

  const [logForm, setLogForm] = useState({
    description: '',
    cost: '',
    facility: 'Tata Motors Authorized Workshop'
  });

  const currentVehicle = vehicles.find(v => v.id === selectedVehId) || vehicles[0];

  const handleAddLogSubmit = (e) => {
    e.preventDefault();
    if (!logForm.description) return;
    addVehicleMaintenance(currentVehicle.id, logForm);
    setLogForm({ description: '', cost: '', facility: 'Authorized Service Center' });
    setShowAddLogModal(false);
  };

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
        <AlertTriangle size={16} color="var(--color-electric-cyan)" />
        <span style={{ color: 'var(--color-soft-white)' }}>
          <strong>Vehicle Telemetry Notice:</strong> NEXA stores vehicle documentation, service schedules, and simulated onboard telemetry. Live OBD-II tracking depends on supported OEM cloud API connections.
        </span>
      </div>

      {/* Vehicle Selector Tabs */}
      <div
        className="glass-panel"
        style={{
          padding: '12px 16px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}
      >
        {vehicles.map(v => {
          const isSelected = v.id === currentVehicle.id;
          return (
            <button
              key={v.id}
              onClick={() => setSelectedVehId(v.id)}
              style={{
                padding: '10px 18px',
                borderRadius: 'var(--radius-sm)',
                background: isSelected ? 'rgba(84, 231, 255, 0.2)' : 'rgba(16, 40, 71, 0.4)',
                border: isSelected ? '1px solid var(--color-electric-cyan)' : '1px solid var(--glass-border)',
                color: isSelected ? 'var(--color-electric-cyan)' : 'var(--color-soft-white)',
                fontWeight: isSelected ? 600 : 400,
                fontSize: '13.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Car size={16} />
              <span>{v.name}</span>
              <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
                {v.registrationNumber}
              </span>
            </button>
          );
        })}
      </div>

      {/* Vehicle Hero Dossier Card */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-violet">{currentVehicle.type}</span>
            <span className="badge badge-cyan">{currentVehicle.variant}</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800 }}>{currentVehicle.name}</h2>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            Registration: <strong style={{ color: 'var(--color-soft-white)' }}>{currentVehicle.registrationNumber}</strong> • Odometer: {currentVehicle.odometerKm?.toLocaleString()} km
          </div>

          {/* Insurance Alert Pill */}
          <div
            style={{
              marginTop: '18px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 181, 71, 0.1)',
              border: '1px solid rgba(255, 181, 71, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '13px'
            }}
          >
            <ShieldAlert size={18} color="var(--color-amber)" />
            <div>
              <strong style={{ color: 'var(--color-amber)' }}>Insurance Policy Renewal Due: {currentVehicle.insuranceExpiry}</strong>
              <div style={{ fontSize: '11.5px', color: 'var(--color-text-muted)' }}>
                Zero-Depreciation policy renewal quote available. Contact Tata AIG agent.
              </div>
            </div>
          </div>
        </div>

        {/* Battery / Energy Status HUD */}
        <div
          style={{
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 40, 71, 0.5)',
            border: '1px solid var(--glass-border)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BatteryCharging size={18} color="var(--color-emerald)" />
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Energy & Range Telemetry</span>
            </div>
            <span className="badge badge-emerald">LEVEL 2 DOCKED</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '38px', fontWeight: 800, color: 'var(--color-emerald)' }}>
              {currentVehicle.batteryFuelLevel}%
            </span>
            <span style={{ fontSize: '16px', color: 'var(--color-text-muted)' }}>
              (~{currentVehicle.rangeRemainingKm} km remaining)
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
            <div style={{ width: `${currentVehicle.batteryFuelLevel}%`, height: '100%', background: 'linear-gradient(90deg, #00e5a3 0%, #54e7ff 100%)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            <div>PUC Status: <strong style={{ color: 'var(--color-soft-white)' }}>{currentVehicle.pucStatus}</strong></div>
            <div>Next Service Due: <strong style={{ color: 'var(--color-soft-white)' }}>{currentVehicle.nextServiceDueKm?.toLocaleString()} km</strong></div>
          </div>
        </div>
      </div>

      {/* Service History & Maintenance Timeline */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Wrench size={18} color="var(--color-electric-cyan)" />
            <h3 style={{ fontSize: '16px' }}>Service History & Workshop Records</h3>
          </div>

          <button
            onClick={() => setShowAddLogModal(true)}
            className="btn-primary"
            style={{ padding: '7px 14px', fontSize: '12.5px' }}
          >
            <Plus size={14} />
            <span>Add Maintenance Record</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentVehicle.serviceHistory?.map((log, idx) => (
            <div
              key={idx}
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
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{log.description}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {log.facility} • {log.date}
                </div>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-soft-white)' }}>
                ₹{log.cost?.toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Maintenance Modal */}
      {showAddLogModal && (
        <div className="modal-overlay" onClick={() => setShowAddLogModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '22px 26px', borderBottom: '1px solid rgba(84, 231, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '18px' }}>Add Maintenance Log for {currentVehicle.name}</h2>
              <button onClick={() => setShowAddLogModal(false)} style={{ color: 'var(--color-text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddLogSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Work Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. 25,000 km Periodic Inspection & Tyre Rotation"
                  value={logForm.description}
                  onChange={e => setLogForm({ ...logForm, description: e.target.value })}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Cost (₹ INR)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 4200"
                    value={logForm.cost}
                    onChange={e => setLogForm({ ...logForm, cost: e.target.value })}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Authorized Center
                  </label>
                  <input
                    type="text"
                    value={logForm.facility}
                    onChange={e => setLogForm({ ...logForm, facility: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddLogModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Service Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
