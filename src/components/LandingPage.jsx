import React, { useState } from 'react';
import {
  ArrowRight,
  Shield,
  HeartPulse,
  Receipt,
  Cpu,
  HardDrive,
  Bot,
  Sparkles,
  ChevronDown,
  Activity,
  Zap,
  CheckCircle2,
  Lock,
  Film
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function LandingPage({ onOpenVideoModal }) {
  const { setIsLandingMode, setActiveScreen, rooms, toggleDevicePower, devices } = useNexa();
  const [activeInteractiveRoom, setActiveInteractiveRoom] = useState('living-room');

  const livingRoomLight = devices.find(d => d.id === 'dev-1');

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        color: 'var(--color-soft-white)',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      {/* Top Floating Mini-Nav */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '70px',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(3, 6, 11, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(84, 231, 255, 0.12)',
          zIndex: 100
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(84, 231, 255, 0.25) 0%, rgba(154, 134, 255, 0.25) 100%)',
              border: '1px solid var(--color-electric-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 14px rgba(84, 231, 255, 0.4)'
            }}
          >
            <Zap size={18} color="var(--color-electric-cyan)" />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '0.08em'
              }}
            >
              NEXA
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => {
              setIsLandingMode(false);
              setActiveScreen('overview');
            }}
            className="btn-secondary"
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            Skip Intro
          </button>
          <button
            onClick={() => {
              setIsLandingMode(false);
              setActiveScreen('overview');
            }}
            className="btn-primary"
            style={{ fontSize: '13px', padding: '8px 18px' }}
          >
            <span>Open Dashboard</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 24px 60px',
          position: 'relative'
        }}
      >
        <div
          className="badge badge-cyan"
          style={{
            marginBottom: '20px',
            padding: '6px 14px',
            fontSize: '11px',
            animation: 'fadeIn 1s ease'
          }}
        >
          <Sparkles size={13} />
          <span>AUTONOMOUS HOUSEHOLD OPERATING SYSTEM</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(44px, 7vw, 84px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: '1000px',
            margin: '0 auto 18px',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #B0C8E8 60%, #54E7FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 60px rgba(84, 231, 255, 0.25)'
          }}
        >
          Your Home. Your Health. Your Life. Connected.
        </h1>

        <p
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--color-text-muted)',
            maxWidth: '720px',
            margin: '0 auto 36px',
            lineHeight: 1.6
          }}
        >
          NEXA unifies your physical living space, family healthcare, medicine reminders,
          utility expenses, vehicles, and digital memory into one intelligent, self-synchronizing ecosystem.
        </p>

        {/* Hero CTAs */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => {
              setIsLandingMode(false);
              setActiveScreen('overview');
            }}
            className="btn-primary"
            style={{ fontSize: '15px', padding: '14px 32px', borderRadius: 'var(--radius-sm)' }}
          >
            <span>Open Connected Dashboard</span>
            <ArrowRight size={17} />
          </button>

          <button
            onClick={onOpenVideoModal}
            className="btn-secondary"
            style={{
              fontSize: '15px',
              padding: '14px 28px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-electric-cyan)',
              color: 'var(--color-electric-cyan)',
              boxShadow: '0 0 20px rgba(84, 231, 255, 0.25)'
            }}
          >
            <Film size={17} />
            <span>Watch 3-Min Film</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('architectural-tour');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary"
            style={{ fontSize: '15px', padding: '14px 28px', borderRadius: 'var(--radius-sm)' }}
          >
            <span>Explore 3D Living Home</span>
            <ChevronDown size={17} />
          </button>
        </div>

        {/* Live System Telemetry Strip */}
        <div
          style={{
            marginTop: '64px',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '14px 28px',
            background: 'rgba(7, 16, 31, 0.65)',
            border: '1px solid rgba(84, 231, 255, 0.16)',
            borderRadius: 'var(--radius-full)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-emerald)', boxShadow: '0 0 8px #00e5a3' }} />
            <span style={{ color: 'var(--color-text-muted)' }}>Living Villa:</span>
            <span style={{ fontWeight: 600, color: 'var(--color-soft-white)' }}>4.6 kW Solar Active</span>
          </div>
          <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <HeartPulse size={15} color="var(--color-electric-cyan)" />
            <span style={{ color: 'var(--color-text-muted)' }}>Family Health:</span>
            <span style={{ fontWeight: 600, color: 'var(--color-soft-white)' }}>4 Profiles Monitored</span>
          </div>
          <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <Receipt size={15} color="var(--color-amber)" />
            <span style={{ color: 'var(--color-text-muted)' }}>Monthly Bills:</span>
            <span style={{ fontWeight: 600, color: 'var(--color-soft-white)' }}>₹11,420 Obligations</span>
          </div>
        </div>
      </section>

      {/* Feature Section 1: The Architectural Living Home */}
      <section
        id="architectural-tour"
        style={{
          padding: '100px 32px',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>01 • ARCHITECTURAL CUTAWAY</span>
          <h2 style={{ fontSize: '38px', fontWeight: 800 }}>The Living Home as an Intelligence Node</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '640px', margin: '12px auto 0' }}>
            Experience your home as a real-time responsive 3D structure. Interior illumination, environmental
            sensors, solar generation, and smart locks communicate with each other continuously.
          </p>
        </div>

        {/* Interactive Living Room Lighting Demonstration */}
        <div
          className="glass-panel"
          style={{
            padding: '32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            alignItems: 'center'
          }}
        >
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>
              DIRECT 3D SCENE SYNC
            </span>
            <h3 style={{ fontSize: '24px', marginBottom: '14px' }}>
              Try toggling the Living Room chandelier now
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
              When you toggle a smart device here, NEXA illuminates or dims the corresponding room in the persistent
              3D architectural model behind the interface in real time.
            </p>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={() => livingRoomLight && toggleDevicePower(livingRoomLight.id)}
                className={livingRoomLight?.state.power ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '12px 24px', fontSize: '14px' }}
              >
                <Zap size={16} />
                <span>
                  {livingRoomLight?.state.power ? 'Chandelier is ON • Click to Turn OFF' : 'Chandelier is OFF • Click to Turn ON'}
                </span>
              </button>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '16px', fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
              <div>• Daikin HVAC: 23.5°C Eco</div>
              <div>• Yale Smart Lock: 91% Locked</div>
              <div>• Solar: 4.6 kW Grid Export</div>
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16, 40, 71, 0.4)',
              border: '1px solid var(--glass-border)'
            }}
          >
            <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-electric-cyan)', marginBottom: '12px' }}>
              ACTIVE ROOM TELEMETRY
            </div>
            {rooms.map(room => (
              <div
                key={room.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '8px',
                  background: room.isLit ? 'rgba(84, 231, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: room.isLit ? '1px solid rgba(84, 231, 255, 0.3)' : '1px solid transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: room.isLit ? room.color : 'rgba(255, 255, 255, 0.2)',
                      boxShadow: room.isLit ? `0 0 10px ${room.color}` : 'none'
                    }}
                  />
                  <span style={{ fontSize: '13.5px', fontWeight: 500 }}>{room.name}</span>
                </div>
                <span className={`badge ${room.isLit ? 'badge-cyan' : 'badge-amber'}`} style={{ fontSize: '10px' }}>
                  {room.isLit ? 'ILLUMINATED' : 'STANDBY'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section 2: Connected Ecosystem Grid */}
      <section
        style={{
          padding: '80px 32px 140px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge badge-violet" style={{ marginBottom: '10px' }}>02 • INTEGRATED ECOSYSTEM</span>
          <h2 style={{ fontSize: '38px', fontWeight: 800 }}>Unified Pillars of Connected Living</h2>
        </div>

        <div className="grid-cols-auto-fit">
          {/* Card 1 */}
          <div
            className="glass-panel-interactive"
            style={{ padding: '28px', cursor: 'pointer' }}
            onClick={() => {
              setIsLandingMode(false);
              setActiveScreen('health');
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(84, 231, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px'
              }}
            >
              <HeartPulse size={22} color="var(--color-electric-cyan)" />
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Family Health & Vitals</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Continuous vitals tracking (BP, SpO2, Heart Rate, Glucose) separated securely by family member,
              integrated with clinical records and doctor appointments.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-electric-cyan)', fontSize: '13px', fontWeight: 600 }}>
              <span>Explore Health Profiles</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="glass-panel-interactive"
            style={{ padding: '28px', cursor: 'pointer' }}
            onClick={() => {
              setIsLandingMode(false);
              setActiveScreen('medicines');
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(255, 77, 106, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px'
              }}
            >
              <Sparkles size={22} color="var(--color-coral)" />
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Medicine Schedules</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Never miss a dose. Timed reminders with timestamped acknowledgment logs, refill countdowns, and prescription linkages.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-coral)', fontSize: '13px', fontWeight: 600 }}>
              <span>View Active Doses</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="glass-panel-interactive"
            style={{ padding: '28px', cursor: 'pointer' }}
            onClick={() => {
              setIsLandingMode(false);
              setActiveScreen('bills');
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(255, 181, 71, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px'
              }}
            >
              <Receipt size={22} color="var(--color-amber)" />
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Bills & Utility Intelligence</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Track BESCOM electricity, BWSSB water, piped gas, society maintenance, and solar net metering credits in Indian Rupee format.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-amber)', fontSize: '13px', fontWeight: 600 }}>
              <span>Manage Obligations</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Card 4 */}
          <div
            className="glass-panel-interactive"
            style={{ padding: '28px', cursor: 'pointer' }}
            onClick={() => {
              setIsLandingMode(false);
              setActiveScreen('memory');
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(154, 134, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px'
              }}
            >
              <HardDrive size={22} color="var(--color-violet)" />
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Unified Home Memory</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              A searchable relational archive connecting devices with purchase dates, warranty certificates, filter replacements, and service invoices.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-violet)', fontSize: '13px', fontWeight: 600 }}>
              <span>Search Digital Memory</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>

        {/* Final CTA Bar */}
        <div
          style={{
            marginTop: '60px',
            textAlign: 'center',
            padding: '48px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, rgba(7, 16, 31, 0.9) 0%, rgba(16, 40, 71, 0.7) 100%)',
            border: '1px solid rgba(84, 231, 255, 0.25)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}
        >
          <h2 style={{ fontSize: '32px', marginBottom: '14px' }}>Ready to enter your connected home?</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '580px', margin: '0 auto 28px' }}>
            Explore the complete prototype with all 15 functional modules, live state persistence,
            AI voice assistant, and 3D architectural cutaway.
          </p>
          <button
            onClick={() => {
              setIsLandingMode(false);
              setActiveScreen('overview');
            }}
            className="btn-primary"
            style={{ fontSize: '16px', padding: '14px 36px' }}
          >
            <span>Enter NEXA OS</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
