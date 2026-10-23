import React, { useState } from 'react';
import {
  Home,
  Zap,
  Power,
  Sliders,
  Shield,
  Trash2,
  Info,
  FileText,
  Wrench,
  Plus,
  X,
  CheckCircle,
  Thermometer,
  Lock,
  Cpu
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function SmartHomeScreen() {
  const {
    rooms,
    selectedRoomId,
    setSelectedRoomId,
    devices,
    toggleDevicePower,
    deleteDevice,
    addDevice
  } = useNexa();

  const [inspectedDevice, setInspectedDevice] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDeviceForm, setNewDeviceForm] = useState({
    name: '',
    category: 'light',
    brand: 'NEXA Verified IoT',
    model: 'NX-402'
  });

  const activeRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];
  const roomDevices = devices.filter(d => d.room === selectedRoomId);

  const handleAddDevice = (e) => {
    e.preventDefault();
    if (!newDeviceForm.name) return;
    addDevice({
      ...newDeviceForm,
      room: selectedRoomId,
      warrantyExpiry: '2028-10-23',
      maintenanceNotes: 'Initial calibration verified on commissioning.'
    });
    setNewDeviceForm({ name: '', category: 'light', brand: 'NEXA Verified IoT', model: 'NX-402' });
    setShowAddModal(false);
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
        <Info size={16} color="var(--color-electric-cyan)" />
        <span style={{ color: 'var(--color-soft-white)' }}>
          <strong>Interactive 3D Architectural Sync:</strong> Selecting rooms shifts the 3D camera angle behind this panel. Toggling light fixtures illuminates or dims that room in the real-time villa model.
        </span>
      </div>

      {/* Room Selector Strip */}
      <div
        className="glass-panel"
        style={{
          padding: '12px 16px',
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          alignItems: 'center'
        }}
      >
        {rooms.map(room => {
          const isSelected = room.id === selectedRoomId;
          const devCount = devices.filter(d => d.room === room.id).length;
          return (
            <button
              key={room.id}
              onClick={() => setSelectedRoomId(room.id)}
              style={{
                padding: '10px 18px',
                borderRadius: 'var(--radius-sm)',
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(84, 231, 255, 0.25) 0%, rgba(16, 40, 71, 0.5) 100%)'
                  : 'rgba(16, 40, 71, 0.35)',
                border: isSelected
                  ? '1px solid var(--color-electric-cyan)'
                  : '1px solid var(--glass-border)',
                color: isSelected ? 'var(--color-soft-white)' : 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 0 16px rgba(84, 231, 255, 0.2)' : 'none'
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: room.isLit ? room.color : 'rgba(255,255,255,0.2)',
                  boxShadow: room.isLit ? `0 0 8px ${room.color}` : 'none'
                }}
              />
              <span style={{ fontSize: '13.5px', fontWeight: isSelected ? 600 : 400 }}>{room.name}</span>
              <span className="badge badge-cyan" style={{ fontSize: '9px', padding: '1px 5px' }}>
                {devCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Room Header & Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>{activeRoom?.name}</span>
            <span className={`badge ${activeRoom?.isLit ? 'badge-cyan' : 'badge-amber'}`}>
              {activeRoom?.isLit ? 'Room Illuminated' : 'Low Power / Standby'}
            </span>
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            Floor {activeRoom?.floor} • {roomDevices.length} connected appliances and lighting fixtures
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
          style={{ fontSize: '13px', padding: '8px 16px' }}
        >
          <Plus size={15} />
          <span>Add Device to {activeRoom?.name}</span>
        </button>
      </div>

      {/* Device Cards Grid */}
      <div className="grid-cols-auto-fit">
        {roomDevices.map(dev => {
          const isPowerOn = dev.state?.power !== false;
          return (
            <div
              key={dev.id}
              className="glass-panel-interactive"
              style={{
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderColor: isPowerOn ? 'rgba(84, 231, 255, 0.35)' : 'var(--glass-border)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span className={`badge ${isPowerOn ? 'badge-cyan' : 'badge-amber'}`}>
                    {dev.category.toUpperCase()} • {dev.status}
                  </span>
                  <button
                    onClick={() => setInspectedDevice(dev)}
                    title="View Technical Dossier & Warranty"
                    style={{ color: 'var(--color-text-muted)', padding: '4px' }}
                  >
                    <Info size={16} />
                  </button>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '4px' }}>{dev.name}</h3>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {dev.brand} • {dev.model}
                </div>

                {/* State specific metrics */}
                <div style={{ marginTop: '16px', padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 40, 71, 0.4)', fontSize: '12.5px' }}>
                  {dev.category === 'light' && (
                    <div>Brightness: {isPowerOn ? `${dev.state?.brightness || 80}%` : 'Off'}</div>
                  )}
                  {dev.category === 'thermostat' && (
                    <div>Target Temp: {dev.state?.targetTemp}°C (Room: {dev.state?.currentTemp}°C)</div>
                  )}
                  {dev.category === 'lock' && (
                    <div>State: {dev.state?.locked ? 'Locked & Armed' : 'Unlocked'} (Battery: {dev.state?.battery}%)</div>
                  )}
                  {dev.category === 'appliance' && (
                    <div>Mode: {dev.state?.mode || dev.state?.fanSpeed || (isPowerOn ? 'Active' : 'Standby')}</div>
                  )}
                  {dev.category === 'sensor' && (
                    <div>Generation: {dev.state?.currentGeneration || '4.6 kW'}</div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <button
                  onClick={() => toggleDevicePower(dev.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: isPowerOn ? 'rgba(84, 231, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    border: isPowerOn ? '1px solid var(--color-electric-cyan)' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isPowerOn ? 'var(--color-electric-cyan)' : 'var(--color-text-muted)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Power size={15} />
                  <span>{isPowerOn ? 'Turn OFF' : 'Turn ON'}</span>
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setInspectedDevice(dev)}
                    className="btn-ghost"
                    style={{ fontSize: '12px' }}
                  >
                    Specs
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Remove simulated device "${dev.name}"?`)) {
                        deleteDevice(dev.id);
                      }
                    }}
                    title="Delete device"
                    style={{ color: 'var(--color-coral)', padding: '6px' }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Device Technical Dossier Modal */}
      {inspectedDevice && (
        <div className="modal-overlay" onClick={() => setInspectedDevice(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '22px 26px', borderBottom: '1px solid rgba(84, 231, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '18px' }}>{inspectedDevice.name}</h2>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  Hardware Specification & Warranty Dossier
                </p>
              </div>
              <button onClick={() => setInspectedDevice(null)} style={{ color: 'var(--color-text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ padding: '12px', background: 'rgba(16, 40, 71, 0.4)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Brand & Manufacturer</div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{inspectedDevice.brand}</div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(16, 40, 71, 0.4)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Model Identifier</div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{inspectedDevice.model}</div>
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(16, 40, 71, 0.4)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Warranty Status</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-emerald)' }}>
                  Active until {inspectedDevice.warrantyExpiry || '2027-08-15'}
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(16, 40, 71, 0.4)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                  Maintenance & Service History Log
                </div>
                <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--color-soft-white)' }}>
                  {inspectedDevice.maintenanceNotes || 'No anomalies logged. Self-diagnostic verified.'}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button className="btn-secondary" onClick={() => setInspectedDevice(null)}>
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '22px 26px', borderBottom: '1px solid rgba(84, 231, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '18px' }}>Add Simulated Device to {activeRoom?.name}</h2>
              <button onClick={() => setShowAddModal(false)} style={{ color: 'var(--color-text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddDevice} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Device Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Architectural Accent Strip"
                  value={newDeviceForm.name}
                  onChange={e => setNewDeviceForm({ ...newDeviceForm, name: e.target.value })}
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
                    value={newDeviceForm.category}
                    onChange={e => setNewDeviceForm({ ...newDeviceForm, category: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    <option value="light">Smart Light</option>
                    <option value="thermostat">HVAC / Thermostat</option>
                    <option value="appliance">Smart Appliance</option>
                    <option value="lock">Security Lock</option>
                    <option value="sensor">Sensor / Energy</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Brand
                  </label>
                  <input
                    type="text"
                    value={newDeviceForm.brand}
                    onChange={e => setNewDeviceForm({ ...newDeviceForm, brand: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Deploy Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
