import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  INITIAL_FAMILY_MEMBERS,
  INITIAL_ROOMS,
  INITIAL_DEVICES,
  INITIAL_BILLS,
  INITIAL_MEDICINES,
  INITIAL_VEHICLES,
  INITIAL_SECURITY_CAMERAS,
  INITIAL_SECURITY_EVENTS,
  INITIAL_HOME_MEMORY,
  INITIAL_NOTIFICATIONS,
  TROUBLESHOOTING_GUIDES,
  WHAT_IF_SCENARIOS
} from '../data/initialData';

const NexaContext = createContext(null);

const STORAGE_PREFIX = 'nexa_connected_living_v1_';

function loadFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn('Storage load failed for key', key, e);
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn('Storage save failed for key', key, e);
  }
}

export function NexaProvider({ children }) {
  // Navigation & View Mode
  const [activeScreen, setActiveScreen] = useState('overview'); // overview, smarthome, family, health, medicines, bills, vehicles, security, assistant, briefing, notifications, memory, investigator, whatif, settings
  const [isLandingMode, setIsLandingMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('all'); // 'all' or member ID

  // Persistent States
  const [familyMembers, setFamilyMembers] = useState(() => loadFromStorage('familyMembers', INITIAL_FAMILY_MEMBERS));
  const [rooms, setRooms] = useState(() => loadFromStorage('rooms', INITIAL_ROOMS));
  const [devices, setDevices] = useState(() => loadFromStorage('devices', INITIAL_DEVICES));
  const [bills, setBills] = useState(() => loadFromStorage('bills', INITIAL_BILLS));
  const [medicines, setMedicines] = useState(() => loadFromStorage('medicines', INITIAL_MEDICINES));
  const [vehicles, setVehicles] = useState(() => loadFromStorage('vehicles', INITIAL_VEHICLES));
  const [securityCameras, setSecurityCameras] = useState(() => loadFromStorage('securityCameras', INITIAL_SECURITY_CAMERAS));
  const [securityEvents, setSecurityEvents] = useState(() => loadFromStorage('securityEvents', INITIAL_SECURITY_EVENTS));
  const [homeMemory, setHomeMemory] = useState(() => loadFromStorage('homeMemory', INITIAL_HOME_MEMORY));
  const [notifications, setNotifications] = useState(() => loadFromStorage('notifications', INITIAL_NOTIFICATIONS));
  const [draftMessages, setDraftMessages] = useState(() => loadFromStorage('draftMessages', []));
  const [simulatedActionsLog, setSimulatedActionsLog] = useState(() => loadFromStorage('simulatedActionsLog', []));
  const [selectedRoomId, setSelectedRoomId] = useState('living-room');

  // AI Assistant Chat State
  const [aiChatHistory, setAiChatHistory] = useState(() => [
    {
      id: 'msg-0',
      sender: 'assistant',
      text: 'Greetings. I am NEXA, your unified home and family intelligence. All 14 household nodes are online, solar generation is active, and medical reminders are primed. How may I assist your home today?',
      timestamp: 'Just now'
    }
  ]);

  // Toast / System feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync to local storage
  useEffect(() => saveToStorage('familyMembers', familyMembers), [familyMembers]);
  useEffect(() => saveToStorage('rooms', rooms), [rooms]);
  useEffect(() => saveToStorage('devices', devices), [devices]);
  useEffect(() => saveToStorage('bills', bills), [bills]);
  useEffect(() => saveToStorage('medicines', medicines), [medicines]);
  useEffect(() => saveToStorage('vehicles', vehicles), [vehicles]);
  useEffect(() => saveToStorage('securityCameras', securityCameras), [securityCameras]);
  useEffect(() => saveToStorage('securityEvents', securityEvents), [securityEvents]);
  useEffect(() => saveToStorage('homeMemory', homeMemory), [homeMemory]);
  useEffect(() => saveToStorage('notifications', notifications), [notifications]);
  useEffect(() => saveToStorage('draftMessages', draftMessages), [draftMessages]);
  useEffect(() => saveToStorage('simulatedActionsLog', simulatedActionsLog), [simulatedActionsLog]);

  // Helper: toggle device state (updates 3D home lighting if device is a light!)
  const toggleDevicePower = (deviceId) => {
    setDevices(prev => prev.map(dev => {
      if (dev.id === deviceId) {
        const newPower = !dev.state.power;
        const updatedDev = {
          ...dev,
          state: { ...dev.state, power: newPower }
        };
        // If this device is a light in a room, reflect on room's lit status
        if (dev.category === 'light') {
          setRooms(rPrev => rPrev.map(room => {
            if (room.id === dev.room) {
              return { ...room, isLit: newPower, lightIntensity: newPower ? 0.85 : 0.15 };
            }
            return room;
          }));
        }
        showToast(`${dev.name} turned ${newPower ? 'ON' : 'OFF'}`, 'info');
        return updatedDev;
      }
      return dev;
    }));
  };

  const addDevice = (newDev) => {
    const dev = {
      ...newDev,
      id: 'dev-' + Date.now(),
      status: 'online',
      state: { power: true, brightness: 80 }
    };
    setDevices(prev => [dev, ...prev]);
    showToast(`Device "${dev.name}" connected to ${dev.room}`, 'success');
  };

  const deleteDevice = (deviceId) => {
    setDevices(prev => prev.filter(d => d.id !== deviceId));
    showToast('Device removed from household configuration', 'info');
  };

  // Bills management
  const toggleBillPaid = (billId) => {
    setBills(prev => prev.map(bill => {
      if (bill.id === billId) {
        const nextStatus = bill.status === 'paid' ? 'unpaid' : 'paid';
        showToast(`Bill "${bill.title}" marked as ${nextStatus.toUpperCase()}`, nextStatus === 'paid' ? 'success' : 'info');
        return { ...bill, status: nextStatus };
      }
      return bill;
    }));
  };

  const addBill = (newBill) => {
    const bill = {
      ...newBill,
      id: 'bill-' + Date.now(),
      amount: Number(newBill.amount) || 0,
      status: 'unpaid'
    };
    setBills(prev => [bill, ...prev]);
    showToast(`Bill for ₹${bill.amount.toLocaleString('en-IN')} added`, 'success');
  };

  const deleteBill = (billId) => {
    setBills(prev => prev.filter(b => b.id !== billId));
    showToast('Bill record deleted', 'info');
  };

  // Medicine management
  const acknowledgeMedicine = (medId) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString();
    setMedicines(prev => prev.map(m => {
      if (m.id === medId) {
        const nextAck = !m.isAcknowledged;
        showToast(
          nextAck ? `Acknowledged: ${m.name} dose recorded at ${timeString}` : `Reminder unacknowledged for ${m.name}`,
          nextAck ? 'success' : 'info'
        );
        return {
          ...m,
          isAcknowledged: nextAck,
          lastAcknowledgedAt: nextAck ? `${dateString} ${timeString}` : m.lastAcknowledgedAt
        };
      }
      return m;
    }));
  };

  const addMedicine = (newMed) => {
    const med = {
      ...newMed,
      id: 'med-' + Date.now(),
      isAcknowledged: false,
      lastAcknowledgedAt: 'None recorded'
    };
    setMedicines(prev => [med, ...prev]);
    showToast(`Medicine schedule created for ${med.name}`, 'success');
  };

  // Health Vitals update
  const addHealthMetric = (memberId, metricData) => {
    const today = new Date().toISOString().split('T')[0];
    setFamilyMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        const updatedHistory = [
          ...m.vitalsHistory,
          { date: today, ...metricData }
        ];
        return {
          ...m,
          vitalsHistory: updatedHistory
        };
      }
      return m;
    }));
    showToast(`Health measurements logged for member profile`, 'success');
  };

  // Vehicle maintenance log
  const addVehicleMaintenance = (vehicleId, record) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === vehicleId) {
        return {
          ...v,
          serviceHistory: [
            {
              date: new Date().toISOString().split('T')[0],
              description: record.description,
              cost: Number(record.cost) || 0,
              facility: record.facility || 'Authorized Service Center'
            },
            ...v.serviceHistory
          ]
        };
      }
      return v;
    }));
    showToast('Vehicle maintenance record added', 'success');
  };

  // Security
  const toggleCameraPrivacy = (camId) => {
    setSecurityCameras(prev => prev.map(c => {
      if (c.id === camId) {
        const newMask = !c.privacyMask;
        showToast(`${c.name} privacy shutter ${newMask ? 'ENGAGED' : 'OPENED'}`, 'info');
        return {
          ...c,
          privacyMask: newMask,
          status: newMask ? 'privacy-shielded' : 'online'
        };
      }
      return c;
    }));
  };

  // Notification management
  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, isRead: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('Notification inbox cleared', 'info');
  };

  // Memory management
  const addHomeMemory = (mem) => {
    const newEntry = {
      ...mem,
      id: 'mem-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      confidence: 'User-Entered Household Memory'
    };
    setHomeMemory(prev => [newEntry, ...prev]);
    showToast(`Archived in Home Memory: "${newEntry.title}"`, 'success');
  };

  // Draft Message Workflow (Journey G)
  const createDraftMessage = (recipientName, messageText) => {
    const draft = {
      id: 'draft-' + Date.now(),
      recipient: recipientName,
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Saved Locally as Draft (Not Sent)'
    };
    setDraftMessages(prev => [draft, ...prev]);
    showToast(`Draft for ${recipientName} saved. Note: External sending requires verified gateway.`, 'info');
    return draft;
  };

  // What-If rehearsal execution
  const executeSimulationRehearsal = (scenario) => {
    const record = {
      id: 'sim-' + Date.now(),
      title: scenario.title,
      executedAt: new Date().toLocaleString(),
      status: 'Simulation Rehearsal Completed'
    };
    setSimulatedActionsLog(prev => [record, ...prev]);
    showToast(`Action Rehearsal "${scenario.title}" simulated successfully!`, 'success');
  };

  // Dynamic Daily Briefing Generator (Synthesizes live data!)
  const dailyBriefingItems = useMemo(() => {
    const items = [];
    const today = new Date().toISOString().split('T')[0];

    // Bills due soon
    bills.forEach(b => {
      if (b.status === 'unpaid') {
        items.push({
          id: `br-bill-${b.id}`,
          category: 'Bills & Finance',
          title: `${b.title} due (${b.dueDate})`,
          detail: `Amount due: ₹${b.amount.toLocaleString('en-IN')}`,
          priority: 'High',
          time: b.dueDate,
          actionScreen: 'bills'
        });
      }
    });

    // Medicines due
    medicines.forEach(m => {
      items.push({
        id: `br-med-${m.id}`,
        category: 'Family Health',
        title: `${m.name} (${m.dosage})`,
        detail: `Next scheduled: ${m.nextReminder}. Status: ${m.isAcknowledged ? 'Acknowledged' : 'Pending acknowledgment'}`,
        priority: m.isAcknowledged ? 'Low' : 'Urgent',
        time: m.nextReminder,
        actionScreen: 'medicines'
      });
    });

    // Vehicle deadlines
    vehicles.forEach(v => {
      items.push({
        id: `br-veh-${v.id}`,
        category: 'Vehicle Intelligence',
        title: `${v.name} Insurance Expiry`,
        detail: `Policy expires on ${v.insuranceExpiry}. Range remaining: ${v.rangeRemainingKm} km`,
        priority: 'Medium',
        time: v.insuranceExpiry,
        actionScreen: 'vehicles'
      });
    });

    // Family appointments
    familyMembers.forEach(mem => {
      (mem.upcomingAppointments || []).forEach(apt => {
        items.push({
          id: `br-apt-${apt.id}`,
          category: 'Appointments',
          title: `${mem.name}: ${apt.title}`,
          detail: `With ${apt.doctor} at ${apt.facility} on ${apt.date} (${apt.time})`,
          priority: 'High',
          time: `${apt.date} ${apt.time}`,
          actionScreen: 'family'
        });
      });
    });

    return items;
  }, [bills, medicines, vehicles, familyMembers]);

  // AI Natural Language Query Processor (Queries LIVE state!)
  const askAiAssistant = (promptText) => {
    const lower = promptText.toLowerCase();

    // 1. Bills query
    if (lower.includes('bill') || lower.includes('expense') || lower.includes('cost') || lower.includes('due')) {
      const unpaid = bills.filter(b => b.status === 'unpaid');
      const totalUnpaid = unpaid.reduce((sum, b) => sum + b.amount, 0);
      if (unpaid.length === 0) {
        return 'All current household utility and maintenance bills are marked as PAID. Total outstanding obligations are ₹0.';
      }
      const details = unpaid.map(b => `• ${b.title}: ₹${b.amount.toLocaleString('en-IN')} (Due: ${b.dueDate})`).join('\n');
      return `You currently have ${unpaid.length} pending bill(s) totaling ₹${totalUnpaid.toLocaleString('en-IN')}:\n\n${details}\n\nWould you like me to open the Bills management console?`;
    }

    // 2. Medicine query
    if (lower.includes('medicine') || lower.includes('medication') || lower.includes('dose') || lower.includes('pill') || lower.includes('reminder')) {
      const unack = medicines.filter(m => !m.isAcknowledged);
      const list = medicines.map(m => `• ${m.name} (${m.dosage}) — Next: ${m.nextReminder} [${m.isAcknowledged ? 'Acknowledged' : 'PENDING'}]`).join('\n');
      return `Current family medication schedules:\n\n${list}\n\nNotice: ${unack.length} reminder(s) are awaiting acknowledgment today. NEXA records timestamps but does not replace professional medical supervision.`;
    }

    // 3. Smart Home & Devices
    if (lower.includes('device') || lower.includes('light') || lower.includes('smart') || lower.includes('connect')) {
      const onlineCount = devices.filter(d => d.status === 'online').length;
      const activeLights = devices.filter(d => d.category === 'light' && d.state.power).length;
      return `Smart Home Telemetry:\n• ${onlineCount} of ${devices.length} connected devices are online.\n• ${activeLights} interior lighting zones are currently illuminated.\n• Solar Inverter is producing 4.6 kW under current Bangalore sunlight.\n• Yale Smart Lock at the Entrance is secured with 91% battery remaining.`;
    }

    // 4. Vehicle query
    if (lower.includes('vehicle') || lower.includes('car') || lower.includes('insurance') || lower.includes('nexon') || lower.includes('puc')) {
      const ev = vehicles.find(v => v.id === 'veh-1');
      return `Vehicle Status:\n• ${ev?.name}: Battery at ${ev?.batteryFuelLevel}%, estimated range ${ev?.rangeRemainingKm} km. Caution: Insurance renewal is due on ${ev?.insuranceExpiry} (22 days remaining).\n• ${vehicles[1]?.name}: Fuel at ${vehicles[1]?.batteryFuelLevel}%, PUC certificate valid until ${vehicles[1]?.pucExpiry}.`;
    }

    // 5. Briefing query
    if (lower.includes('briefing') || lower.includes('today') || lower.includes('summary') || lower.includes('overview')) {
      const pendingBillsCount = bills.filter(b => b.status === 'unpaid').length;
      const pendingMedsCount = medicines.filter(m => !m.isAcknowledged).length;
      return `Here is your Unified Daily Briefing:\n• Finance: ${pendingBillsCount} unpaid bill(s) requiring attention.\n• Health: ${pendingMedsCount} pending medicine reminder(s), upcoming HbA1c review for Anita Sharma on 29 Oct.\n• Security: Perimeter perimeter scan clear. Delivery logged at Front Porch at 02:44 PM.\n• Energy: Solar generation normal (+21.4 kWh today).`;
    }

    // 6. Appointments query
    if (lower.includes('appointment') || lower.includes('doctor') || lower.includes('visit') || lower.includes('hospital')) {
      const allApts = [];
      familyMembers.forEach(m => {
        (m.upcomingAppointments || []).forEach(a => {
          allApts.push(`• ${m.name}: ${a.title} with ${a.doctor} at ${a.facility} (${a.date} at ${a.time})`);
        });
      });
      return allApts.length > 0
        ? `Upcoming scheduled family appointments:\n\n${allApts.join('\n')}`
        : 'There are no upcoming family doctor or dental appointments scheduled in the records.';
    }

    // Default conversational reply
    return `Understood. I checked the household records for "${promptText}". All systems are operational. You can ask me about bills, medicine schedules, vehicle insurance, device diagnostics, or to draft a message to a family member.`;
  };

  // Filtered members & data by selected member
  const currentMember = useMemo(() => {
    if (selectedMemberId === 'all') return null;
    return familyMembers.find(m => m.id === selectedMemberId) || null;
  }, [selectedMemberId, familyMembers]);

  const value = {
    activeScreen,
    setActiveScreen,
    isLandingMode,
    setIsLandingMode,
    searchQuery,
    setSearchQuery,
    selectedMemberId,
    setSelectedMemberId,
    currentMember,

    familyMembers,
    setFamilyMembers,
    rooms,
    selectedRoomId,
    setSelectedRoomId,
    devices,
    toggleDevicePower,
    addDevice,
    deleteDevice,

    bills,
    toggleBillPaid,
    addBill,
    deleteBill,

    medicines,
    acknowledgeMedicine,
    addMedicine,

    addHealthMetric,

    vehicles,
    addVehicleMaintenance,

    securityCameras,
    securityEvents,
    toggleCameraPrivacy,

    notifications,
    markNotificationRead,
    clearAllNotifications,

    homeMemory,
    addHomeMemory,

    dailyBriefingItems,

    aiChatHistory,
    setAiChatHistory,
    askAiAssistant,

    draftMessages,
    createDraftMessage,

    simulatedActionsLog,
    executeSimulationRehearsal,

    troubleshootingGuides: TROUBLESHOOTING_GUIDES,
    whatIfScenarios: WHAT_IF_SCENARIOS,

    toastMessage,
    showToast
  };

  return <NexaContext.Provider value={value}>{children}</NexaContext.Provider>;
}

export function useNexa() {
  const context = useContext(NexaContext);
  if (!context) {
    throw new Error('useNexa must be used within a NexaProvider');
  }
  return context;
}
