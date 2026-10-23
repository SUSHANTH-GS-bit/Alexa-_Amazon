import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  Trash2,
  AlertTriangle,
  Info,
  CheckCircle,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function NotificationsScreen() {
  const {
    notifications,
    markNotificationRead,
    clearAllNotifications,
    setActiveScreen
  } = useNexa();

  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredNotifs = categoryFilter === 'all'
    ? notifications
    : notifications.filter(n => n.category.toLowerCase() === categoryFilter.toLowerCase());

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Notification & Alert Hub</h2>
            <span className={`badge ${unreadCount > 0 ? 'badge-coral' : 'badge-emerald'}`}>
              {unreadCount > 0 ? `${unreadCount} UNREAD ALERTS` : 'ALL ALERTS READ'}
            </span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '2px' }}>
            Prioritized real-time alerts from household sub-systems and sensors.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => {
              notifications.forEach(n => markNotificationRead(n.id));
            }}
            className="btn-secondary"
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            <CheckCheck size={15} />
            <span>Mark All as Read</span>
          </button>
          <button
            onClick={clearAllNotifications}
            className="btn-ghost"
            style={{ fontSize: '13px', color: 'var(--color-coral)' }}
          >
            <Trash2 size={15} />
            <span>Clear Inbox</span>
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredNotifs.length === 0 ? (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            <CheckCircle size={36} color="var(--color-emerald)" style={{ margin: '0 auto 12px', opacity: 0.7 }} />
            <div style={{ fontSize: '15px', color: 'var(--color-soft-white)', fontWeight: 600 }}>All Caught Up</div>
            <div style={{ fontSize: '12.5px', marginTop: '4px' }}>No active alerts pending for this filter.</div>
          </div>
        ) : (
          filteredNotifs.map(n => {
            const isWarn = n.severity === 'warning';
            const isSuccess = n.severity === 'success';
            return (
              <div
                key={n.id}
                className="glass-panel"
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  background: n.isRead ? 'rgba(7, 16, 31, 0.5)' : 'rgba(16, 40, 71, 0.65)',
                  borderLeft: isWarn
                    ? '4px solid var(--color-amber)'
                    : isSuccess
                    ? '4px solid var(--color-emerald)'
                    : '4px solid var(--color-electric-cyan)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: isWarn
                        ? 'rgba(255, 181, 71, 0.15)'
                        : isSuccess
                        ? 'rgba(0, 229, 163, 0.15)'
                        : 'rgba(84, 231, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {isWarn ? (
                      <AlertTriangle size={18} color="var(--color-amber)" />
                    ) : isSuccess ? (
                      <CheckCircle size={18} color="var(--color-emerald)" />
                    ) : (
                      <Info size={18} color="var(--color-electric-cyan)" />
                    )}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ fontSize: '15.5px', fontWeight: 600 }}>{n.title}</h3>
                      <span className="badge badge-cyan">{n.category}</span>
                      {!n.isRead && <span className="badge badge-coral">NEW</span>}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                      {n.message}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                    {n.timestamp}
                  </span>

                  {n.targetScreen && (
                    <button
                      onClick={() => {
                        markNotificationRead(n.id);
                        setActiveScreen(n.targetScreen);
                      }}
                      className="btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '12px' }}
                    >
                      <span>Inspect</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
