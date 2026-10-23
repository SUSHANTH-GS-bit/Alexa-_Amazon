import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  CheckCircle,
  Clock,
  Trash2,
  FileText,
  AlertCircle,
  Eye,
  Filter,
  DollarSign,
  TrendingDown,
  X
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function BillsScreen() {
  const {
    bills,
    toggleBillPaid,
    addBill,
    deleteBill
  } = useNexa();

  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'unpaid', 'paid'
  const [showAddModal, setShowAddModal] = useState(false);
  const [inspectedReceipt, setInspectedReceipt] = useState(null);

  const [newBillForm, setNewBillForm] = useState({
    title: '',
    category: 'Electricity',
    amount: '',
    dueDate: new Date().toISOString().split('T')[0],
    accountNumber: '',
    notes: '',
    frequency: 'Monthly'
  });

  const filteredBills = bills.filter(b => {
    if (statusFilter === 'unpaid') return b.status === 'unpaid';
    if (statusFilter === 'paid') return b.status === 'paid';
    return true;
  });

  const unpaidTotal = bills.filter(b => b.status === 'unpaid').reduce((acc, b) => acc + b.amount, 0);
  const paidTotal = bills.filter(b => b.status === 'paid').reduce((acc, b) => acc + b.amount, 0);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newBillForm.title || !newBillForm.amount) return;
    addBill(newBillForm);
    setNewBillForm({
      title: '',
      category: 'Electricity',
      amount: '',
      dueDate: new Date().toISOString().split('T')[0],
      accountNumber: '',
      notes: '',
      frequency: 'Monthly'
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
          background: 'rgba(84, 231, 255, 0.08)',
          border: '1px solid rgba(84, 231, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '12.5px'
        }}
      >
        <AlertCircle size={16} color="var(--color-electric-cyan)" />
        <span style={{ color: 'var(--color-soft-white)' }}>
          <strong>Household Financial Protocol:</strong> Marking a bill as paid records internal household settlement and updates budget projections. External payment transmission requires linking verified banking APIs.
        </span>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid-cols-auto-fit">
        {/* Pending Obligations */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Pending Household Obligations
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-amber)' }}>
            ₹{unpaidTotal.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {bills.filter(b => b.status === 'unpaid').length} bill(s) requiring payment this billing cycle
          </div>
        </div>

        {/* Settled Obligations */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Settled / Paid This Month
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-emerald)' }}>
            ₹{paidTotal.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {bills.filter(b => b.status === 'paid').length} bill(s) settled via UPI & Auto-debit
          </div>
        </div>

        {/* Solar Net Credit */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Solar Generation Offset
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-electric-cyan)' }}>
            -₹1,840
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Net metering credit applied directly on Bescom invoice
          </div>
        </div>
      </div>

      {/* Filter and Action Header */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'all', label: 'All Bills', count: bills.length },
            { id: 'unpaid', label: 'Unpaid / Due', count: bills.filter(b => b.status === 'unpaid').length },
            { id: 'paid', label: 'Settled / Paid', count: bills.filter(b => b.status === 'paid').length }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                background: statusFilter === f.id ? 'rgba(84, 231, 255, 0.18)' : 'rgba(16, 40, 71, 0.4)',
                border: statusFilter === f.id ? '1px solid var(--color-electric-cyan)' : '1px solid var(--glass-border)',
                color: statusFilter === f.id ? 'var(--color-electric-cyan)' : 'var(--color-soft-white)',
                fontSize: '13px',
                fontWeight: statusFilter === f.id ? 600 : 400,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{f.label}</span>
              <span className="badge badge-cyan" style={{ fontSize: '9px', padding: '1px 5px' }}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
          style={{ padding: '8px 18px', fontSize: '13px' }}
        >
          <Plus size={15} />
          <span>Add Household Bill</span>
        </button>
      </div>

      {/* Bills Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredBills.map(bill => {
          const isPaid = bill.status === 'paid';
          return (
            <div
              key={bill.id}
              className="glass-panel"
              style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                borderLeft: isPaid
                  ? '4px solid var(--color-emerald)'
                  : '4px solid var(--color-amber)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: isPaid ? 'rgba(0, 229, 163, 0.12)' : 'rgba(255, 181, 71, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Receipt size={20} color={isPaid ? 'var(--color-emerald)' : 'var(--color-amber)'} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '16.5px', fontWeight: 700 }}>{bill.title}</h3>
                    <span className="badge badge-cyan">{bill.category}</span>
                    <span className={`badge ${isPaid ? 'badge-emerald' : 'badge-amber'}`}>
                      {isPaid ? 'PAID' : 'DUE SOON'}
                    </span>
                  </div>

                  <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Due Date: <strong style={{ color: isPaid ? 'var(--color-text-muted)' : 'var(--color-amber)' }}>{bill.dueDate}</strong> • Account: {bill.accountNumber || 'BES-AUTO-99'}
                  </div>

                  {bill.notes && (
                    <div style={{ fontSize: '12px', color: 'rgba(142, 156, 178, 0.85)', marginTop: '2px' }}>
                      {bill.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Amount & Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: isPaid ? 'var(--color-soft-white)' : 'var(--color-amber)' }}>
                    ₹{bill.amount.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    {bill.frequency || 'Monthly'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => toggleBillPaid(bill.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: 600,
                      background: isPaid ? 'rgba(0, 229, 163, 0.15)' : 'rgba(255, 181, 71, 0.15)',
                      border: isPaid ? '1px solid var(--color-emerald)' : '1px solid var(--color-amber)',
                      color: isPaid ? 'var(--color-emerald)' : 'var(--color-amber)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <CheckCircle size={15} />
                    <span>{isPaid ? 'Mark as Unpaid' : 'Mark as Paid'}</span>
                  </button>

                  {bill.receiptUrl && (
                    <button
                      onClick={() => setInspectedReceipt(bill)}
                      title="View Stored Invoice Metadata"
                      style={{ color: 'var(--color-text-muted)', padding: '6px' }}
                    >
                      <Eye size={16} />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete bill record for "${bill.title}"?`)) {
                        deleteBill(bill.id);
                      }
                    }}
                    title="Delete Bill"
                    style={{ color: 'var(--color-coral)', padding: '6px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Bill Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '22px 26px', borderBottom: '1px solid rgba(84, 231, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '18px' }}>Add Household Utility / Expense</h2>
              <button onClick={() => setShowAddModal(false)} style={{ color: 'var(--color-text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Bill Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. BESCOM Domestic Solar Grid"
                  value={newBillForm.title}
                  onChange={e => setNewBillForm({ ...newBillForm, title: e.target.value })}
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
                    value={newBillForm.category}
                    onChange={e => setNewBillForm({ ...newBillForm, category: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    <option value="Electricity">Electricity</option>
                    <option value="Water">Water</option>
                    <option value="Gas">Gas</option>
                    <option value="Internet">Internet</option>
                    <option value="Society">Society</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Amount (₹ INR)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 4250"
                    value={newBillForm.amount}
                    onChange={e => setNewBillForm({ ...newBillForm, amount: e.target.value })}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newBillForm.dueDate}
                    onChange={e => setNewBillForm({ ...newBillForm, dueDate: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Account / Consumer ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BES-9021-N"
                    value={newBillForm.accountNumber}
                    onChange={e => setNewBillForm({ ...newBillForm, accountNumber: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Notes / Rebates
                </label>
                <input
                  type="text"
                  placeholder="e.g. Solar credit applied"
                  value={newBillForm.notes}
                  onChange={e => setNewBillForm({ ...newBillForm, notes: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Bill Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Metadata Inspection Modal */}
      {inspectedReceipt && (
        <div className="modal-overlay" onClick={() => setInspectedReceipt(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '22px 26px', borderBottom: '1px solid rgba(84, 231, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '18px' }}>Invoice Metadata: {inspectedReceipt.title}</h2>
              <button onClick={() => setInspectedReceipt(null)} style={{ color: 'var(--color-text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ padding: '14px', background: 'rgba(16, 40, 71, 0.5)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                <div>Document Identifier: {inspectedReceipt.receiptUrl}</div>
                <div style={{ marginTop: '6px' }}>Billing Provider: {inspectedReceipt.category} Authority</div>
                <div style={{ marginTop: '6px' }}>Account ID: {inspectedReceipt.accountNumber}</div>
                <div style={{ marginTop: '6px' }}>Amount: ₹{inspectedReceipt.amount.toLocaleString('en-IN')}</div>
                <div style={{ marginTop: '6px' }}>Due Date: {inspectedReceipt.dueDate}</div>
                <div style={{ marginTop: '6px', color: 'var(--color-emerald)' }}>Checksum: SHA256-VFD-99421A</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button className="btn-secondary" onClick={() => setInspectedReceipt(null)}>
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
