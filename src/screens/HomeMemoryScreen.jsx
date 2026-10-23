import React, { useState } from 'react';
import {
  HardDrive,
  Search,
  Plus,
  Tag,
  Link2,
  FileText,
  Calendar,
  CheckCircle,
  X,
  FileCheck,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function HomeMemoryScreen() {
  const { homeMemory, addHomeMemory } = useNexa();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [inspectedEntry, setInspectedEntry] = useState(null);

  const [newMemForm, setNewMemForm] = useState({
    title: '',
    category: 'Warranty & Manual',
    tags: 'manual, maintenance',
    summary: '',
    linkedDocument: 'USER-NOTE-OCT2026.pdf'
  });

  // Extract unique tags
  const allTags = ['all', 'warranty', 'ac', 'hvac', 'solar', 'battery', 'health', 'maintenance', 'wifi'];

  const filteredMemories = homeMemory.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag =
      selectedTag === 'all' ||
      (item.tags && item.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newMemForm.title || !newMemForm.summary) return;
    addHomeMemory({
      title: newMemForm.title,
      category: newMemForm.category,
      tags: newMemForm.tags.split(',').map(t => t.trim().toLowerCase()),
      summary: newMemForm.summary,
      linkedDocument: newMemForm.linkedDocument
    });
    setNewMemForm({
      title: '',
      category: 'Warranty & Manual',
      tags: 'manual, maintenance',
      summary: '',
      linkedDocument: 'USER-NOTE-OCT2026.pdf'
    });
    setShowAddModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingBottom: '40px' }}>
      {/* Header Banner */}
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
            <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Searchable Household Memory</h2>
            <span className="badge badge-violet">RELATIONAL GRAPH</span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '2px' }}>
            A unified digital memory interconnecting warranties, repairs, receipts, vehicle histories, and medical screenings.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
          style={{ padding: '9px 18px', fontSize: '13px' }}
        >
          <Plus size={15} />
          <span>Archive Household Memory</span>
        </button>
      </div>

      {/* Search Bar & Tag Chips */}
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Search size={18} color="var(--color-electric-cyan)" />
          <input
            type="text"
            placeholder="Search memory records by device, appliance, provider, date, or component..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: '10px 14px', fontSize: '14px' }}
          />
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginRight: '4px' }}>
            TOPIC FILTERS:
          </span>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                background: selectedTag === tag ? 'rgba(84, 231, 255, 0.2)' : 'rgba(16, 40, 71, 0.4)',
                border: selectedTag === tag ? '1px solid var(--color-electric-cyan)' : '1px solid var(--glass-border)',
                color: selectedTag === tag ? 'var(--color-electric-cyan)' : 'var(--color-text-muted)',
                fontSize: '11.5px',
                fontWeight: 500,
                textTransform: 'capitalize'
              }}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Memory Nodes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '18px' }}>
        {filteredMemories.map(mem => (
          <div
            key={mem.id}
            className="glass-panel-interactive"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-cyan">{mem.category}</span>
                <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  {mem.date}
                </span>
              </div>

              <h3 style={{ fontSize: '16.5px', fontWeight: 700, marginBottom: '8px', color: 'var(--color-soft-white)' }}>
                {mem.title}
              </h3>

              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                {mem.summary}
              </p>

              {/* Tag pills */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {mem.tags?.map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '10.5px',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(84, 231, 255, 0.08)',
                      color: 'var(--color-electric-cyan)',
                      border: '1px solid rgba(84, 231, 255, 0.2)'
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Relational Link Footer */}
            <div
              style={{
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-emerald)' }}>
                <Link2 size={14} />
                <span>{mem.confidence}</span>
              </div>

              {mem.linkedDocument && (
                <button
                  onClick={() => setInspectedEntry(mem)}
                  className="btn-ghost"
                  style={{ fontSize: '12px' }}
                >
                  <Eye size={13} />
                  <span>Inspect</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Memory Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '22px 26px', borderBottom: '1px solid rgba(84, 231, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '18px' }}>Archive in Household Memory</h2>
              <button onClick={() => setShowAddModal(false)} style={{ color: 'var(--color-text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Record Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Havells Induction Cooktop Warranty Registration"
                  value={newMemForm.title}
                  onChange={e => setNewMemForm({ ...newMemForm, title: e.target.value })}
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
                    value={newMemForm.category}
                    onChange={e => setNewMemForm({ ...newMemForm, category: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    <option value="Warranty & Manual">Warranty & Manual</option>
                    <option value="Maintenance Log">Maintenance Log</option>
                    <option value="Energy & Solar">Energy & Solar</option>
                    <option value="Vehicle History">Vehicle History</option>
                    <option value="Health Document">Health Document</option>
                    <option value="Household Note">Household Note</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. kitchen, appliance, warranty"
                    value={newMemForm.tags}
                    onChange={e => setNewMemForm({ ...newMemForm, tags: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Factual Context & Memory Summary
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe serial number, terms, technician contact or warranty details..."
                  value={newMemForm.summary}
                  onChange={e => setNewMemForm({ ...newMemForm, summary: e.target.value })}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save to Home Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Memory Entry Modal */}
      {inspectedEntry && (
        <div className="modal-overlay" onClick={() => setInspectedEntry(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '22px 26px', borderBottom: '1px solid rgba(84, 231, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileCheck size={18} color="var(--color-emerald)" />
                <h2 style={{ fontSize: '17px' }}>{inspectedEntry.title}</h2>
              </div>
              <button onClick={() => setInspectedEntry(null)} style={{ color: 'var(--color-text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                Archived: {inspectedEntry.date} • {inspectedEntry.confidence}
              </div>

              <div style={{ padding: '16px', background: 'rgba(16, 40, 71, 0.5)', borderRadius: 'var(--radius-sm)', fontSize: '13.5px', lineHeight: 1.6 }}>
                {inspectedEntry.summary}
              </div>

              <div style={{ fontSize: '12px', color: 'var(--color-electric-cyan)' }}>
                Attached Document: {inspectedEntry.linkedDocument || 'Nexa-Memory-Asset.pdf'}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button className="btn-secondary" onClick={() => setInspectedEntry(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
