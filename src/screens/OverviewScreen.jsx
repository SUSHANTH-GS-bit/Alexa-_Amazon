import React from 'react';
import {
  Zap,
  Home,
  Receipt,
  Pill,
  Car,
  ShieldCheck,
  HeartPulse,
  Calendar,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function OverviewScreen() {
  const {
    familyMembers,
    devices,
    bills,
    medicines,
    vehicles,
    securityCameras,
    acknowledgeMedicine,
    toggleBillPaid,
    toggleDevicePower,
    setActiveScreen
  } = useNexa();

  const unpaidBills = bills.filter(b => b.status === 'unpaid');
  const totalUnpaidAmount = unpaidBills.reduce((acc, b) => acc + b.amount, 0);
  const nextMedicine = medicines.find(m => !m.isAcknowledged) || medicines[0];
  const primaryVehicle = vehicles[0];
  const activeCameras = securityCameras.filter(c => c.status === 'online');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      {/* Top Greeting & Status Strip */}
      <div
        className="glass-panel"
        style={{
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          background: 'linear-gradient(135deg, rgba(7, 16, 31, 0.85) 0%, rgba(16, 40, 71, 0.75) 100%)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span className="badge badge-cyan">AUTONOMOUS RESIDENCE</span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Bengaluru, KA • Friday, 23 Oct 2026
            </span>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800 }}>
            Good Evening, Sharma Household
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13.5px', marginTop: '2px' }}>
            NEXA unified intelligence active. All 4 family profiles synchronized, solar export stable at 4.6 kW.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(84, 231, 255, 0.08)',
              border: '1px solid rgba(84, 231, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Zap size={18} color="var(--color-electric-cyan)" />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                SOLAR EXPORT
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-electric-cyan)' }}>
                4.6 kW Active
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(0, 229, 163, 0.08)',
              border: '1px solid rgba(0, 229, 163, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <ShieldCheck size={18} color="var(--color-emerald)" />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                SECURITY PERIMETER
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-emerald)' }}>
                Armed & Guarded
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Grid Cards */}
      <div className="grid-cols-auto-fit">
        {/* Card 1: Smart Home */}
        <div
          className="glass-panel-interactive"
          style={{ padding: '22px', cursor: 'pointer' }}
          onClick={() => setActiveScreen('smarthome')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(84, 231, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Home size={20} color="var(--color-electric-cyan)" />
            </div>
            <span className="badge badge-cyan">3D LIVING SCENE</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Living Villa Telemetry</div>
          <div style={{ fontSize: '24px', fontWeight: 700, margin: '4px 0 10px' }}>
            {devices.filter(d => d.status === 'online').length} / {devices.length} Devices
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Living Chandelier: ON</span>
            <ArrowRight size={14} color="var(--color-electric-cyan)" />
          </div>
        </div>

        {/* Card 2: Household Bills */}
        <div
          className="glass-panel-interactive"
          style={{ padding: '22px', cursor: 'pointer' }}
          onClick={() => setActiveScreen('bills')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255, 181, 71, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Receipt size={20} color="var(--color-amber)" />
            </div>
            <span className="badge badge-amber">{unpaidBills.length} PENDING</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Household Obligations</div>
          <div style={{ fontSize: '24px', fontWeight: 700, margin: '4px 0 10px', color: 'var(--color-amber)' }}>
            ₹{totalUnpaidAmount.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Next: Bescom (₹4,250 on Oct 28)</span>
            <ArrowRight size={14} color="var(--color-amber)" />
          </div>
        </div>

        {/* Card 3: Medicine Alert */}
        <div
          className="glass-panel-interactive"
          style={{ padding: '22px', cursor: 'pointer' }}
          onClick={() => setActiveScreen('medicines')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255, 77, 106, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Pill size={20} color="var(--color-coral)" />
            </div>
            <span className={`badge ${nextMedicine?.isAcknowledged ? 'badge-emerald' : 'badge-coral'}`}>
              {nextMedicine?.isAcknowledged ? 'LOGGED' : 'PENDING DOSE'}
            </span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Next Medicine Schedule</div>
          <div style={{ fontSize: '18px', fontWeight: 700, margin: '4px 0 10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {nextMedicine?.name}
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{nextMedicine?.nextReminder}</span>
            <ArrowRight size={14} color="var(--color-coral)" />
          </div>
        </div>

        {/* Card 4: Vehicle Intelligence */}
        <div
          className="glass-panel-interactive"
          style={{ padding: '22px', cursor: 'pointer' }}
          onClick={() => setActiveScreen('vehicles')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(154, 134, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Car size={20} color="var(--color-violet)" />
            </div>
            <span className="badge badge-violet">KA-01-MJ-4092</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{primaryVehicle?.name}</div>
          <div style={{ fontSize: '24px', fontWeight: 700, margin: '4px 0 10px' }}>
            {primaryVehicle?.batteryFuelLevel}% • {primaryVehicle?.rangeRemainingKm} km
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--color-amber)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Insurance Due in 22 Days</span>
            <ArrowRight size={14} color="var(--color-violet)" />
          </div>
        </div>
      </div>

      {/* Middle Section: Urgent Action Row & Family Vitals Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Next Medicine Direct Acknowledgment Card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Pill size={18} color="var(--color-coral)" />
              <h3 style={{ fontSize: '16px' }}>Imminent Medicine Reminder</h3>
            </div>
            <span className="badge badge-coral">ACTION REQUIRED</span>
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(16, 40, 71, 0.5)',
              border: '1px solid var(--glass-border)',
              marginBottom: '16px'
            }}
          >
            <div style={{ fontSize: '15px', fontWeight: 600 }}>{nextMedicine?.name}</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Dosage: {nextMedicine?.dosage} • Scheduled: {nextMedicine?.nextReminder}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Instructions: {nextMedicine?.instructions}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => nextMedicine && acknowledgeMedicine(nextMedicine.id)}
              className={nextMedicine?.isAcknowledged ? 'btn-secondary' : 'btn-primary'}
              style={{ flex: 1, padding: '10px' }}
            >
              <CheckCircle size={15} />
              <span>
                {nextMedicine?.isAcknowledged ? 'Dose Acknowledged (Undo)' : 'Acknowledge Dose'}
              </span>
            </button>
            <button
              onClick={() => setActiveScreen('medicines')}
              className="btn-secondary"
              style={{ padding: '10px 14px' }}
            >
              All Medicines
            </button>
          </div>
        </div>

        {/* Upcoming Family Doctor & Dental Appointments */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <HeartPulse size={18} color="var(--color-electric-cyan)" />
              <h3 style={{ fontSize: '16px' }}>Family Clinical Appointments</h3>
            </div>
            <button
              onClick={() => setActiveScreen('health')}
              className="btn-ghost"
              style={{ fontSize: '12px' }}
            >
              <span>View All</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {familyMembers.flatMap(m => (m.upcomingAppointments || []).map(apt => ({ ...apt, memberName: m.name, memberColor: m.avatarColor }))).slice(0, 2).map(apt => (
              <div
                key={apt.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(16, 40, 71, 0.4)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 600 }}>{apt.title}</span>
                    <span className="badge badge-cyan" style={{ fontSize: '9px' }}>{apt.memberName}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {apt.doctor} • {apt.facility}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-electric-cyan)' }}>
                    {apt.date}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{apt.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts row */}
      <div
        className="glass-panel"
        style={{
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={18} color="var(--color-violet)" />
          <span style={{ fontSize: '14px', fontWeight: 600 }}>Quick Ecosystem Shortcuts:</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveScreen('bills')}
            className="btn-secondary"
            style={{ fontSize: '12.5px', padding: '6px 14px' }}
          >
            Pay Pending Bills
          </button>
          <button
            onClick={() => setActiveScreen('briefing')}
            className="btn-secondary"
            style={{ fontSize: '12.5px', padding: '6px 14px' }}
          >
            Read Today's Briefing
          </button>
          <button
            onClick={() => setActiveScreen('investigator')}
            className="btn-secondary"
            style={{ fontSize: '12.5px', padding: '6px 14px' }}
          >
            Diagnose Smart AC
          </button>
          <button
            onClick={() => setActiveScreen('whatif')}
            className="btn-secondary"
            style={{ fontSize: '12.5px', padding: '6px 14px' }}
          >
            Rehearse Vacation Mode
          </button>
        </div>
      </div>
    </div>
  );
}
