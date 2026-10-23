import React, { useState } from 'react';
import { Search, X, HardDrive, Cpu, Receipt, Pill, Car, ArrowRight } from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function SearchModal({ onClose }) {
  const {
    homeMemory,
    devices,
    bills,
    medicines,
    vehicles,
    setActiveScreen
  } = useNexa();

  const [query, setQuery] = useState('');

  // Collect and filter items
  const results = [];
  const q = query.toLowerCase().trim();

  if (q.length > 0) {
    // Search Home Memory
    homeMemory.forEach(mem => {
      if (
        mem.title.toLowerCase().includes(q) ||
        mem.summary.toLowerCase().includes(q) ||
        (mem.tags && mem.tags.some(t => t.toLowerCase().includes(q)))
      ) {
        results.push({
          id: mem.id,
          type: 'Home Memory',
          title: mem.title,
          subtitle: mem.summary,
          icon: HardDrive,
          screen: 'memory'
        });
      }
    });

    // Search Devices
    devices.forEach(dev => {
      if (
        dev.name.toLowerCase().includes(q) ||
        dev.brand?.toLowerCase().includes(q) ||
        dev.category?.toLowerCase().includes(q)
      ) {
        results.push({
          id: dev.id,
          type: 'Device',
          title: dev.name,
          subtitle: `${dev.brand} (${dev.category}) in ${dev.room}`,
          icon: Cpu,
          screen: 'smarthome'
        });
      }
    });

    // Search Bills
    bills.forEach(bill => {
      if (
        bill.title.toLowerCase().includes(q) ||
        bill.category.toLowerCase().includes(q)
      ) {
        results.push({
          id: bill.id,
          type: 'Bill',
          title: bill.title,
          subtitle: `₹${bill.amount.toLocaleString('en-IN')} • Due: ${bill.dueDate} (${bill.status})`,
          icon: Receipt,
          screen: 'bills'
        });
      }
    });

    // Search Medicines
    medicines.forEach(med => {
      if (
        med.name.toLowerCase().includes(q) ||
        med.dosage.toLowerCase().includes(q)
      ) {
        results.push({
          id: med.id,
          type: 'Medicine',
          title: med.name,
          subtitle: `${med.dosage} • Next: ${med.nextReminder}`,
          icon: Pill,
          screen: 'medicines'
        });
      }
    });

    // Search Vehicles
    vehicles.forEach(veh => {
      if (
        veh.name.toLowerCase().includes(q) ||
        veh.registrationNumber.toLowerCase().includes(q)
      ) {
        results.push({
          id: veh.id,
          type: 'Vehicle',
          title: veh.name,
          subtitle: `${veh.registrationNumber} • Insurance due: ${veh.insuranceExpiry}`,
          icon: Car,
          screen: 'vehicles'
        });
      }
    });
  }

  const handleSelect = (screen) => {
    setActiveScreen(screen);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Search Bar Input */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(84, 231, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(7, 16, 31, 0.9)'
          }}
        >
          <Search size={20} color="var(--color-electric-cyan)" />
          <input
            type="text"
            autoFocus
            placeholder="Search home memory, devices, warranties, bills, medicines..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              fontSize: '16px',
              padding: '6px 0',
              boxShadow: 'none'
            }}
          />
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Results Stream */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px 20px' }}>
          {q.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              <HardDrive size={32} color="var(--color-electric-cyan)" style={{ margin: '0 auto 12px', opacity: 0.6 }} />
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-soft-white)' }}>
                Unified Household Memory Search
              </div>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                Type keywords like "solar", "ac", "bescom", "metformin", "nexon", or "warranty"
              </div>
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No connected records matching "{query}" found in current home memory.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-electric-cyan)', marginBottom: '4px' }}>
                {results.length} RECORD(S) DISCOVERED
              </div>
              {results.map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleSelect(item.screen)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(16, 40, 71, 0.4)',
                      border: '1px solid var(--glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(84, 231, 255, 0.12)';
                      e.currentTarget.style.borderColor = 'var(--color-electric-cyan)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(16, 40, 71, 0.4)';
                      e.currentTarget.style.borderColor = 'var(--glass-border)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'rgba(84, 231, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Icon size={16} color="var(--color-electric-cyan)" />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-soft-white)' }}>
                            {item.title}
                          </span>
                          <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
                            {item.type}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={16} color="var(--color-electric-cyan)" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
