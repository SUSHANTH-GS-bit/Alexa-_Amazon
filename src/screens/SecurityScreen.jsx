import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Video,
  Eye,
  EyeOff,
  Radio,
  Lock,
  Unlock,
  AlertTriangle,
  Clock,
  Scan,
  Maximize2
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function SecurityScreen() {
  const {
    securityCameras,
    securityEvents,
    toggleCameraPrivacy
  } = useNexa();

  const [systemArmed, setSystemArmed] = useState(true);
  const [activeCamId, setActiveCamId] = useState('cam-1');

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
        <Radio size={16} color="var(--color-electric-cyan)" />
        <span style={{ color: 'var(--color-soft-white)' }}>
          <strong>Demonstration Video Pipeline:</strong> These simulated high-resolution camera streams demonstrate computer-vision object classification and physical privacy shutter states without accessing your local webcam.
        </span>
      </div>

      {/* Security Status Header */}
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
            <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Perimeter Security & Vision Center</h2>
            <span className={`badge ${systemArmed ? 'badge-emerald' : 'badge-amber'}`}>
              {systemArmed ? 'SYSTEM ARMED & MONITORING' : 'DISARMED • HOME MODE'}
            </span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '2px' }}>
            4 Optical Sensors Active • Biometric Yale Smart Lock Verified • AI Object Classification
          </p>
        </div>

        <button
          onClick={() => setSystemArmed(!systemArmed)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13.5px',
            fontWeight: 600,
            background: systemArmed
              ? 'rgba(0, 229, 163, 0.15)'
              : 'rgba(255, 181, 71, 0.15)',
            border: systemArmed
              ? '1px solid var(--color-emerald)'
              : '1px solid var(--color-amber)',
            color: systemArmed ? 'var(--color-emerald)' : 'var(--color-amber)',
            transition: 'all 0.2s'
          }}
        >
          {systemArmed ? <Lock size={16} /> : <Unlock size={16} />}
          <span>{systemArmed ? 'Perimeter Armed (Click to Disarm)' : 'System Disarmed (Click to Arm)'}</span>
        </button>
      </div>

      {/* Camera Video Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '18px' }}>
        {securityCameras.map(cam => {
          const isShielded = cam.privacyMask;
          return (
            <div
              key={cam.id}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: isShielded ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid var(--glass-border)'
              }}
            >
              {/* Simulated Feed Viewport */}
              <div
                style={{
                  height: '220px',
                  position: 'relative',
                  background: isShielded
                    ? '#050a14'
                    : 'radial-gradient(ellipse at center, #0b1f3a 0%, #040914 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                {/* Scanline overlay */}
                {!isShielded && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'repeating-linear-gradient(0deg, rgba(84, 231, 255, 0.03) 0px, rgba(84, 231, 255, 0.03) 1px, transparent 1px, transparent 4px)',
                      pointerEvents: 'none',
                      zIndex: 2
                    }}
                  />
                )}

                {/* Simulated Feed HUD */}
                {isShielded ? (
                  <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    <EyeOff size={32} color="var(--color-amber)" style={{ margin: '0 auto 8px', opacity: 0.8 }} />
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-soft-white)' }}>
                      Physical Privacy Shutter Engaged
                    </div>
                    <div style={{ fontSize: '11px', marginTop: '2px' }}>
                      Optical aperture physically occluded for family privacy
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Simulated architectural wireframe grid inside feed */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 20,
                        border: '1px dashed rgba(84, 231, 255, 0.25)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        padding: '12px',
                        zIndex: 3
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-coral)', animation: 'pulseGlow 1.5s infinite' }} />
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-electric-cyan)' }}>
                          REC • {cam.resolution}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.6)' }}>
                        23-OCT-2026 20:46:12 IST
                      </div>
                    </div>

                    {/* AI Bounding box simulation */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '36px',
                        left: '40px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid var(--color-electric-cyan)',
                        background: 'rgba(84, 231, 255, 0.15)',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-electric-cyan)',
                        zIndex: 4
                      }}
                    >
                      {cam.aiDetections[0]} • 98.4% Confidence
                    </div>
                  </>
                )}
              </div>

              {/* Feed Controls Footer */}
              <div
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(7, 16, 31, 0.85)'
                }}
              >
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600 }}>{cam.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Location: {cam.location} • {cam.nightVision}
                  </div>
                </div>

                <button
                  onClick={() => toggleCameraPrivacy(cam.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: isShielded ? 'rgba(84, 231, 255, 0.15)' : 'rgba(255, 181, 71, 0.15)',
                    border: isShielded ? '1px solid var(--color-electric-cyan)' : '1px solid var(--color-amber)',
                    color: isShielded ? 'var(--color-electric-cyan)' : 'var(--color-amber)',
                    transition: 'all 0.2s'
                  }}
                >
                  {isShielded ? <Eye size={14} /> : <EyeOff size={14} />}
                  <span>{isShielded ? 'Open Lens' : 'Close Shutter'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Event Log Timeline */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={18} color="var(--color-electric-cyan)" />
            <h3 style={{ fontSize: '16px' }}>Perimeter Activity & Motion Logs</h3>
          </div>
          <span className="badge badge-cyan">{securityEvents.length} EVENTS RECORDED</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {securityEvents.map(ev => (
            <div
              key={ev.id}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{ev.type}</span>
                  <span className="badge badge-cyan" style={{ fontSize: '9px' }}>{ev.camera}</span>
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {ev.details}
                </div>
              </div>

              <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-electric-cyan)' }}>
                {ev.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
