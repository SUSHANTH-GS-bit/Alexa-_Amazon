// NEXA Master Seed Data — Connected Living Ecosystem

export const INITIAL_FAMILY_MEMBERS = [
  {
    id: 'rahul',
    name: 'Rahul Sharma',
    role: 'Father • Tech Consultant',
    relation: 'Father',
    age: 41,
    bloodGroup: 'O+',
    initials: 'RS',
    avatarColor: '#54E7FF',
    phone: '+91 98450 12345',
    allergies: 'Penicillin',
    notes: 'Mild hypertension in family history, regular runner',
    vitalsHistory: [
      { date: '2026-10-18', bpSystolic: 124, bpDiastolic: 82, hr: 74, spo2: 98, glucose: 106, temp: 98.4, weight: 74.5 },
      { date: '2026-10-21', bpSystolic: 122, bpDiastolic: 80, hr: 71, spo2: 98, glucose: 102, temp: 98.6, weight: 74.2 },
      { date: '2026-10-23', bpSystolic: 120, bpDiastolic: 78, hr: 72, spo2: 99, glucose: 101, temp: 98.4, weight: 74.0 },
    ],
    upcomingAppointments: [
      { id: 'apt-1', title: 'Dentist Routine Cleaning', doctor: 'Dr. Radhika Rao', facility: 'Clove Dental, Indiranagar', date: '2026-10-27', time: '10:30 AM' }
    ]
  },
  {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'Mother • Senior Architect',
    relation: 'Mother',
    age: 39,
    bloodGroup: 'B+',
    initials: 'PS',
    avatarColor: '#9A86FF',
    phone: '+91 98450 12346',
    allergies: 'Dust, Shellfish',
    notes: 'Cervical posture ergonomics care, Vitamin D supplement',
    vitalsHistory: [
      { date: '2026-10-15', bpSystolic: 116, bpDiastolic: 74, hr: 68, spo2: 99, glucose: 94, temp: 98.6, weight: 58.4 },
      { date: '2026-10-19', bpSystolic: 118, bpDiastolic: 76, hr: 70, spo2: 99, glucose: 96, temp: 98.4, weight: 58.2 },
      { date: '2026-10-23', bpSystolic: 115, bpDiastolic: 75, hr: 67, spo2: 99, glucose: 93, temp: 98.5, weight: 58.0 },
    ],
    upcomingAppointments: [
      { id: 'apt-2', title: 'Orthopedic Posture Review', doctor: 'Dr. Suresh Kumar', facility: 'Manipal Hospital', date: '2026-11-04', time: '04:00 PM' }
    ]
  },
  {
    id: 'aarav',
    name: 'Aarav Sharma',
    role: 'Son • 7th Grade Student',
    relation: 'Son',
    age: 12,
    bloodGroup: 'O+',
    initials: 'AS',
    avatarColor: '#00E5A3',
    phone: '+91 98450 99881',
    allergies: 'Peanuts, Pollen',
    notes: 'Seasonal allergic rhinitis, football academy training',
    vitalsHistory: [
      { date: '2026-10-10', bpSystolic: 112, bpDiastolic: 70, hr: 82, spo2: 99, glucose: 88, temp: 98.4, weight: 41.5 },
      { date: '2026-10-18', bpSystolic: 110, bpDiastolic: 68, hr: 80, spo2: 100, glucose: 90, temp: 98.2, weight: 42.0 },
      { date: '2026-10-23', bpSystolic: 108, bpDiastolic: 70, hr: 78, spo2: 99, glucose: 89, temp: 98.4, weight: 42.1 },
    ],
    upcomingAppointments: [
      { id: 'apt-3', title: 'Pediatric Annual Vision Check', doctor: 'Dr. Anand Vineet', facility: 'Narayana Nethralaya', date: '2026-11-12', time: '11:00 AM' }
    ]
  },
  {
    id: 'anita',
    name: 'Anita Sharma',
    role: 'Grandmother • Retired Educator',
    relation: 'Grandmother',
    age: 68,
    bloodGroup: 'A+',
    initials: 'AS',
    avatarColor: '#FFB547',
    phone: '+91 98450 55442',
    allergies: 'None reported',
    notes: 'Type 2 diabetes managed with oral meds, mild osteopenia',
    vitalsHistory: [
      { date: '2026-10-19', bpSystolic: 138, bpDiastolic: 88, hr: 78, spo2: 96, glucose: 142, temp: 98.6, weight: 65.5 },
      { date: '2026-10-21', bpSystolic: 134, bpDiastolic: 86, hr: 76, spo2: 97, glucose: 136, temp: 98.4, weight: 65.2 },
      { date: '2026-10-23', bpSystolic: 130, bpDiastolic: 84, hr: 74, spo2: 97, glucose: 128, temp: 98.5, weight: 65.0 },
    ],
    upcomingAppointments: [
      { id: 'apt-4', title: 'Endocrinology Follow-up (HbA1c)', doctor: 'Dr. Meenakshi S.', facility: 'Apollo Clinic', date: '2026-10-29', time: '09:15 AM' }
    ]
  }
];

export const INITIAL_ROOMS = [
  { id: 'living-room', name: 'Living Room', floor: 1, lightIntensity: 0.85, isLit: true, color: '#54E7FF' },
  { id: 'master-bedroom', name: 'Master Bedroom', floor: 2, lightIntensity: 0.2, isLit: false, color: '#9A86FF' },
  { id: 'kitchen', name: 'Kitchen & Dining', floor: 1, lightIntensity: 0.9, isLit: true, color: '#FFB547' },
  { id: 'study', name: 'Study & Office', floor: 2, lightIntensity: 0.75, isLit: true, color: '#00E5A3' },
  { id: 'entrance', name: 'Entrance & Garage', floor: 1, lightIntensity: 0.4, isLit: true, color: '#54E7FF' }
];

export const INITIAL_DEVICES = [
  {
    id: 'dev-1',
    name: 'Architectural Chandelier',
    room: 'living-room',
    category: 'light',
    status: 'online',
    state: { power: true, brightness: 80, colorTemp: 'Warm White 3200K' },
    brand: 'Philips Hue Ensis',
    model: 'PH-ENS-88',
    warrantyExpiry: '2027-08-15',
    manualUrl: '#manual-hue',
    maintenanceNotes: 'Firmware v2.4.1 installed Sep 2026. LED array 100% health.'
  },
  {
    id: 'dev-2',
    name: 'Living Room Climate HVAC',
    room: 'living-room',
    category: 'thermostat',
    status: 'online',
    state: { power: true, targetTemp: 23.5, currentTemp: 23.8, mode: 'eco-cool' },
    brand: 'Daikin Alira Inverter',
    model: 'FTKM50TV',
    warrantyExpiry: '2028-04-10',
    manualUrl: '#manual-daikin',
    maintenanceNotes: 'Filter cleaned 22 Sep 2026. Refrigerant pressure optimal.'
  },
  {
    id: 'dev-3',
    name: 'Master Bedroom Bedside Glow',
    room: 'master-bedroom',
    category: 'light',
    status: 'online',
    state: { power: false, brightness: 10, colorTemp: 'Amber 2200K' },
    brand: 'Yeelight Pro Dual',
    model: 'YP-DL09',
    warrantyExpiry: '2026-12-10',
    manualUrl: '#manual-yeelight',
    maintenanceNotes: 'Auto-sleep schedule enabled at 22:30.'
  },
  {
    id: 'dev-4',
    name: 'Medical HEPA Air Purifier',
    room: 'master-bedroom',
    category: 'appliance',
    status: 'online',
    state: { power: true, aqi: 18, fanSpeed: 'Auto Whisper', filterLife: 84 },
    brand: 'Dyson Purifier Hot+Cool',
    model: 'HP09 Krypto',
    warrantyExpiry: '2027-02-18',
    manualUrl: '#manual-dyson',
    maintenanceNotes: 'Catalytic filter active. PM2.5 and formaldehyde scrubbed.'
  },
  {
    id: 'dev-5',
    name: 'Induction Island Cooktop',
    room: 'kitchen',
    category: 'appliance',
    status: 'standby',
    state: { power: false, childLock: true, surfaceTemp: 'Ambient' },
    brand: 'Bosch Serie 8 FlexInduction',
    model: 'PXX875D67E',
    warrantyExpiry: '2027-11-20',
    manualUrl: '#manual-bosch',
    maintenanceNotes: 'Auto-shutoff sensor tested 10 Oct 2026.'
  },
  {
    id: 'dev-6',
    name: 'Kitchen Track Downlights',
    room: 'kitchen',
    category: 'light',
    status: 'online',
    state: { power: true, brightness: 90, colorTemp: 'Neutral 4000K' },
    brand: 'Wipro Lumis Smart Track',
    model: 'WP-LUM-40',
    warrantyExpiry: '2026-11-30',
    manualUrl: '#manual-wipro',
    maintenanceNotes: 'All 6 spotlights reporting 100% operational.'
  },
  {
    id: 'dev-7',
    name: 'Study Dual Focus Desk Lamp',
    room: 'study',
    category: 'light',
    status: 'online',
    state: { power: true, brightness: 75, colorTemp: 'Daylight 5000K' },
    brand: 'BenQ WiT e-Reading Lamp',
    model: 'BQ-WIT-9',
    warrantyExpiry: '2027-05-14',
    manualUrl: '#manual-benq',
    maintenanceNotes: 'Ambient light sensor calibrated.'
  },
  {
    id: 'dev-8',
    name: 'Main Entrance Biometric Smart Lock',
    room: 'entrance',
    category: 'lock',
    status: 'online',
    state: { locked: true, battery: 91, tamperSensor: 'Armed' },
    brand: 'Yale Assure Lock 2 Bio',
    model: 'YRD450-BIO',
    warrantyExpiry: '2028-09-01',
    manualUrl: '#manual-yale',
    maintenanceNotes: 'Dual encryption token refreshed. Auto-re-lock active at 30s.'
  },
  {
    id: 'dev-9',
    name: 'Rooftop Hybrid Solar Inverter 8kW',
    room: 'entrance',
    category: 'sensor',
    status: 'online',
    state: { power: true, currentGeneration: '4.6 kW', todayExport: '21.4 kWh', gridSync: 'Stable' },
    brand: 'Enphase IQ8 Microinverter Array',
    model: 'ENPH-IQ8M-8KW',
    warrantyExpiry: '2036-05-01',
    manualUrl: '#manual-enphase',
    maintenanceNotes: 'Bi-annual panel cleaning logged 15 Oct 2026. Generation +12%.'
  }
];

export const INITIAL_BILLS = [
  {
    id: 'bill-1',
    title: 'Bescom Domestic Electricity',
    category: 'Electricity',
    amount: 4250,
    dueDate: '2026-10-28',
    status: 'unpaid',
    accountNumber: 'BES-0882194-N',
    notes: 'Includes rooftop solar net metering credit of -₹1,840',
    receiptUrl: 'BESCOM-OCT-2026-INVOICE.pdf',
    frequency: 'Monthly'
  },
  {
    id: 'bill-2',
    title: 'BWSSB Piped Water & Sanitation',
    category: 'Water',
    amount: 820,
    dueDate: '2026-11-02',
    status: 'unpaid',
    accountNumber: 'BWSSB-774-41',
    notes: 'Rainwater harvesting rebate reflected',
    receiptUrl: 'BWSSB-OCT-2026.pdf',
    frequency: 'Monthly'
  },
  {
    id: 'bill-3',
    title: 'Adani Piped Natural Gas',
    category: 'Gas',
    amount: 1150,
    dueDate: '2026-10-30',
    status: 'unpaid',
    accountNumber: 'ADANI-GAS-9011',
    notes: 'Bi-monthly meter reading auto-synced',
    receiptUrl: 'ADANI-OCT-2026.pdf',
    frequency: 'Bi-Monthly'
  },
  {
    id: 'bill-4',
    title: 'Airtel Xstream Fiber 1Gbps + Mesh',
    category: 'Internet',
    amount: 1499,
    dueDate: '2026-11-05',
    status: 'paid',
    accountNumber: 'AIRTEL-080-492109',
    notes: 'Auto-debit processed via UPI Autopay on Oct 20',
    receiptUrl: 'AIRTEL-RECEIPT-OCT20.pdf',
    frequency: 'Monthly'
  },
  {
    id: 'bill-5',
    title: 'Prestige Ozone Society Maintenance',
    category: 'Society',
    amount: 5200,
    dueDate: '2026-11-01',
    status: 'unpaid',
    accountNumber: 'OZONE-VILLA-44',
    notes: 'Clubhouse, security, common DG and STP maintenance',
    receiptUrl: 'SOCIETY-NOV-DUES.pdf',
    frequency: 'Monthly'
  },
  {
    id: 'bill-6',
    title: 'HDFC Ergo Comprehensive Home Protection',
    category: 'Insurance',
    amount: 18500,
    dueDate: '2026-12-15',
    status: 'unpaid',
    accountNumber: 'HDFC-ERGO-HM-88421',
    notes: 'Annual building structure and contents sum insured ₹2.5 Cr',
    receiptUrl: 'HDFC-POLICY-RENEWAL.pdf',
    frequency: 'Annual'
  }
];

export const INITIAL_MEDICINES = [
  {
    id: 'med-1',
    name: 'Metformin Hydrochloride 500mg',
    familyMemberId: 'anita',
    dosage: '1 tablet twice daily',
    scheduleTimes: ['08:00 AM', '08:00 PM'],
    instructions: 'Take immediately after food with water',
    nextReminder: 'Today, 08:00 PM',
    isAcknowledged: false,
    lastAcknowledgedAt: '2026-10-23 08:14 AM',
    prescribedBy: 'Dr. Meenakshi S. (Apollo Clinic)',
    refillDue: '2026-11-10',
    tabletsRemaining: 34
  },
  {
    id: 'med-2',
    name: 'Telmisartan 40mg',
    familyMemberId: 'anita',
    dosage: '1 tablet once daily in morning',
    scheduleTimes: ['09:00 AM'],
    instructions: 'Blood pressure maintenance. Avoid skipping.',
    nextReminder: 'Tomorrow, 09:00 AM',
    isAcknowledged: true,
    lastAcknowledgedAt: '2026-10-23 09:05 AM',
    prescribedBy: 'Dr. Meenakshi S. (Apollo Clinic)',
    refillDue: '2026-11-20',
    tabletsRemaining: 48
  },
  {
    id: 'med-3',
    name: 'CoQ10 100mg + Omega-3',
    familyMemberId: 'rahul',
    dosage: '1 softgel after lunch',
    scheduleTimes: ['01:30 PM'],
    instructions: 'Cardiovascular wellness supplement',
    nextReminder: 'Tomorrow, 01:30 PM',
    isAcknowledged: true,
    lastAcknowledgedAt: '2026-10-23 01:42 PM',
    prescribedBy: 'Self-scheduled Wellness',
    refillDue: '2026-11-30',
    tabletsRemaining: 55
  },
  {
    id: 'med-4',
    name: 'Cetirizine 5mg (Aller-Relief)',
    familyMemberId: 'aarav',
    dosage: '1 tablet when symptoms appear',
    scheduleTimes: ['08:30 PM (PRN)'],
    instructions: 'For seasonal pollen/dust allergy flares',
    nextReminder: 'As Needed',
    isAcknowledged: false,
    lastAcknowledgedAt: '2026-10-18 08:30 PM',
    prescribedBy: 'Dr. Anand Vineet',
    refillDue: '2026-12-15',
    tabletsRemaining: 18
  },
  {
    id: 'med-5',
    name: 'Vitamin D3 60,000 IU Cholecalciferol',
    familyMemberId: 'priya',
    dosage: '1 chewable capsule weekly on Sundays',
    scheduleTimes: ['10:00 AM Sunday'],
    instructions: 'Take after milk/breakfast',
    nextReminder: 'Sunday, Oct 25, 10:00 AM',
    isAcknowledged: true,
    lastAcknowledgedAt: '2026-10-18 10:15 AM',
    prescribedBy: 'Dr. Suresh Kumar',
    refillDue: '2026-12-05',
    tabletsRemaining: 6
  }
];

export const INITIAL_VEHICLES = [
  {
    id: 'veh-1',
    name: 'Tata Nexon EV Max',
    variant: 'Empowered Plus LR',
    registrationNumber: 'KA-01-MJ-4092',
    type: 'Electric SUV',
    batteryFuelLevel: 78,
    rangeRemainingKm: 312,
    odometerKm: 24350,
    insuranceExpiry: '2026-11-14',
    pucExpiry: '2030-01-01', // EV exempt
    pucStatus: 'Exempt (Zero Emission)',
    nextServiceDueKm: 30000,
    serviceHistory: [
      { date: '2026-06-12', description: '20,000 km Scheduled Service & Brake inspection', cost: 3200, facility: 'KHT Tata Motors Whitefield' },
      { date: '2025-11-04', description: 'Annual Wheel balancing, alignment & cabin air filter', cost: 2450, facility: 'KHT Tata Motors' }
    ],
    documents: [
      { name: 'Vehicle Registration RC Smart Card', type: 'Official' },
      { name: 'Tata AIG Zero-Dep Insurance Policy', expiry: '2026-11-14', type: 'Insurance' }
    ]
  },
  {
    id: 'veh-2',
    name: 'Honda City ZX i-VTEC',
    variant: 'ZX CVT Auto',
    registrationNumber: 'KA-03-NB-8821',
    type: 'Sedan (Petrol)',
    batteryFuelLevel: 62,
    rangeRemainingKm: 420,
    odometerKm: 48900,
    insuranceExpiry: '2027-04-20',
    pucExpiry: '2026-12-08',
    pucStatus: 'Valid until 08 Dec 2026',
    nextServiceDueKm: 50000,
    serviceHistory: [
      { date: '2026-04-18', description: 'Synthetic Engine Oil replace, Spark Plugs check', cost: 7850, facility: 'Dakshin Honda Bangalore' }
    ],
    documents: [
      { name: 'RC Smart Card', type: 'Official' },
      { name: 'ICICI Lombard Insurance', expiry: '2027-04-20', type: 'Insurance' },
      { name: 'Green Emission PUC Certificate', expiry: '2026-12-08', type: 'PUC' }
    ]
  }
];

export const INITIAL_SECURITY_CAMERAS = [
  {
    id: 'cam-1',
    name: 'Main Portico & Front Walkway',
    location: 'Entrance Gate',
    status: 'online',
    isRecording: true,
    resolution: '4K UltraHD • 30fps HDR',
    privacyMask: false,
    nightVision: 'Smart IR Active',
    aiDetections: ['Person', 'Courier Package', 'Vehicle']
  },
  {
    id: 'cam-2',
    name: 'Driveway & EV Fast Charger Bay',
    location: 'Garage East',
    status: 'online',
    isRecording: true,
    resolution: '2K QHD • 30fps',
    privacyMask: false,
    nightVision: 'Color Night Matrix',
    aiDetections: ['Vehicle KA-01-MJ-4092']
  },
  {
    id: 'cam-3',
    name: 'Backyard Garden & Patio Deck',
    location: 'Perimeter West',
    status: 'online',
    isRecording: true,
    resolution: '2K QHD • 30fps',
    privacyMask: false,
    nightVision: 'Smart IR Active',
    aiDetections: ['Perimeter Clear']
  },
  {
    id: 'cam-4',
    name: 'Indoor Living Lounge',
    location: 'Interior Ground Floor',
    status: 'privacy-shielded',
    isRecording: false,
    resolution: '1080p Standby',
    privacyMask: true,
    nightVision: 'Off',
    aiDetections: ['Privacy Mode Active']
  }
];

export const INITIAL_SECURITY_EVENTS = [
  {
    id: 'sec-ev-1',
    timestamp: 'Today, 02:44 PM',
    camera: 'Main Portico & Front Walkway',
    type: 'Delivery Detected',
    details: 'BlueDart Courier executive dropped parcel at porch drop-box. Verified contactless.',
    severity: 'info'
  },
  {
    id: 'sec-ev-2',
    timestamp: 'Today, 11:18 AM',
    camera: 'Driveway & EV Fast Charger Bay',
    type: 'Vehicle Arrival',
    details: 'Tata Nexon EV Max KA-01-MJ-4092 docked into Home Charger Level 2.',
    severity: 'info'
  },
  {
    id: 'sec-ev-3',
    timestamp: 'Yesterday, 11:45 PM',
    camera: 'Backyard Garden & Patio Deck',
    type: 'Perimeter Motion',
    details: 'Motion sensor activated. Filtered as friendly wildlife (domestic cat).',
    severity: 'low'
  },
  {
    id: 'sec-ev-4',
    timestamp: '21 Oct, 08:30 PM',
    camera: 'Indoor Living Lounge',
    type: 'Privacy Shutter Activated',
    details: 'Family evening routine initiated. Physical lens shutter closed automatically.',
    severity: 'info'
  }
];

export const INITIAL_HOME_MEMORY = [
  {
    id: 'mem-1',
    title: 'Daikin AC Master Bedroom Warranty & Serial',
    category: 'Warranty & Manual',
    date: '2023-04-10',
    relatedDeviceId: 'dev-2',
    tags: ['warranty', 'hvac', 'daikin', 'ac'],
    summary: 'Model FTKM50TV serial DK-882901-2023. 5-year comprehensive PCB warranty, 10-year compressor warranty registered with Daikin India.',
    linkedDocument: 'Daikin-Warranty-Certificate-2023.pdf',
    confidence: 'Verified Manufacturer Record'
  },
  {
    id: 'mem-2',
    title: 'Kent Grand Plus RO Water Purifier Annual Filter Cartridge Replace',
    category: 'Maintenance Log',
    date: '2026-08-20',
    relatedDeviceId: 'water-ro',
    tags: ['water', 'filter', 'maintenance', 'kent'],
    summary: 'Sediment, Carbon, and RO membrane replaced by Kent certified technician Mr. Ramesh (Mob: 98451 90022). TDS set to 95 ppm.',
    linkedDocument: 'Kent-Service-Invoice-Aug2026.pdf',
    confidence: 'User-Entered Record'
  },
  {
    id: 'mem-3',
    title: 'Enphase Solar Inverter Bi-Annual Array Inspection & Cleaning',
    category: 'Energy & Solar',
    date: '2026-10-15',
    relatedDeviceId: 'dev-9',
    tags: ['solar', 'clean', 'enphase', 'energy'],
    summary: 'Cleaned all 18 mono-perc bifacial modules. Measured peak generation increase from 4.1 kW to 4.8 kW under standard AM1.5 sun.',
    linkedDocument: 'Solar-Generation-Audit-Oct2026.pdf',
    confidence: 'Automated Telemetry Sync'
  },
  {
    id: 'mem-4',
    title: 'Tata Nexon EV Max Battery Health Certificate (20k km Checkup)',
    category: 'Vehicle History',
    date: '2026-06-12',
    relatedDeviceId: 'veh-1',
    tags: ['tata', 'ev', 'battery', 'warranty'],
    summary: 'High-voltage 40.5 kWh LFP pack State of Health (SoH) verified at 99.1%. Cell balance delta under 8 mV. 8-year / 160,000 km warranty intact.',
    linkedDocument: 'Tata-Motors-Battery-Diagnostic-Report.pdf',
    confidence: 'Verified Service Record'
  },
  {
    id: 'mem-5',
    title: 'Anita Sharma Diabetic Neuropathy Screening Report',
    category: 'Health Document',
    date: '2026-09-14',
    relatedMemberId: 'anita',
    tags: ['health', 'anita', 'diabetes', 'apollo'],
    summary: 'Vibration perception threshold test conducted at Apollo Indiranagar. Normal peripheral sensation. Continue current Metformin 500mg dose.',
    linkedDocument: 'Apollo-Neuro-Screening-Sep2026.pdf',
    confidence: 'Verified Clinical Document'
  },
  {
    id: 'mem-6',
    title: 'Home Fibre Network Architecture & Static IP Allocation',
    category: 'Network & Tech',
    date: '2026-05-02',
    relatedDeviceId: 'dev-net',
    tags: ['wifi', 'network', 'airtel', 'ip'],
    summary: 'Subnet 192.168.1.0/24 with IoT VLAN segregated on SSID Nexa_IoT (2.4GHz only). Static IPs assigned for Yale Lock and CCTV Hub.',
    linkedDocument: 'Nexa-Home-Network-Topology.md',
    confidence: 'System Configuration'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    category: 'Vehicles',
    title: 'Tata Nexon EV Insurance Renewal in 22 Days',
    message: 'Policy expires on 14 Nov 2026. Review zero-dep renewal quotes in the Vehicles module.',
    severity: 'warning',
    timestamp: '10 mins ago',
    isRead: false,
    targetScreen: 'vehicles'
  },
  {
    id: 'notif-2',
    category: 'Bills',
    title: 'Bescom Electricity Bill Due Soon',
    message: '₹4,250 due on 28 Oct 2026 (5 days remaining). Net metering credit applied.',
    severity: 'warning',
    timestamp: '2 hours ago',
    isRead: false,
    targetScreen: 'bills'
  },
  {
    id: 'notif-3',
    category: 'Medicines',
    title: 'Anita: Evening Metformin Reminder',
    message: 'Scheduled for 08:00 PM today. Remember to take with dinner.',
    severity: 'info',
    timestamp: 'Today, 04:00 PM',
    isRead: false,
    targetScreen: 'medicines'
  },
  {
    id: 'notif-4',
    category: 'Smart Home',
    title: 'Rooftop Solar Peak Efficiency Achieved',
    message: 'Solar array generated 21.4 kWh today. Grid export saved estimated ₹142.',
    severity: 'success',
    timestamp: 'Today, 05:30 PM',
    isRead: true,
    targetScreen: 'smarthome'
  }
];

export const TROUBLESHOOTING_GUIDES = [
  {
    id: 'tb-1',
    deviceId: 'dev-2',
    deviceName: 'Living Room Climate HVAC (Daikin)',
    issueTitle: 'Cooling takes longer than usual or airflow seems mild',
    verifiedFacts: [
      'Device status: Online on 2.4GHz mesh network',
      'Target temperature set to 23.5°C; Ambient temperature is 26.2°C',
      'Last filter maintenance recorded: 22 Sep 2026 (31 days ago)',
      'Power draw telemetry: Operating in standard eco inverter range (780 Watts)'
    ],
    possibleExplanations: [
      'Indoor blower dust filter may have accumulated fine particulate after recent dry weather',
      'Outdoor condenser unit fan intake may have partial obstruction or afternoon sun direct heat load',
      'Refrigerant level is unconfirmed by local telemetry but compressor run cycle is stable'
    ],
    safeChecks: [
      'Gently open the front panel and inspect the washable pre-filter mesh for dust buildup',
      'Verify that exterior balcony condenser unit vents are free of boxes or foliage',
      'Ensure room heavy curtains are drawn during direct afternoon sunlight hours'
    ],
    professionalHelpRecommended: 'If airflow remains warm after filter cleaning or compressor clicks off repeatedly with error code U0, contact Daikin authorized service center.'
  },
  {
    id: 'tb-2',
    deviceId: 'dev-9',
    deviceName: 'Rooftop Solar Inverter 8kW (Enphase)',
    issueTitle: 'Midday generation dipped below expected peak',
    verifiedFacts: [
      'Inverter microinverter array: 18 / 18 units reporting grid-synchronized',
      'Peak observed today: 4.6 kW (Standard seasonal estimate: 5.2 kW)',
      'Weather telemetry: Intermittent cirrus cloud cover recorded across Bangalore region'
    ],
    possibleExplanations: [
      'High-altitude cloud layer diffusing direct irradiance without obvious overcast shadows',
      'Surface dust accumulation on lower row panels from nearby road construction',
      'Grid voltage fluctuation on BESCOM feeder triggering temporary safety power de-rating'
    ],
    safeChecks: [
      'Check the BESCOM grid supply voltage in electrical panel (should stay between 220V–240V)',
      'Visually inspect panel surface from terrace walkway for visible dust coat or bird drops'
    ],
    professionalHelpRecommended: 'Never attempt high-voltage DC wiring checks yourself. Schedule solar technician for rooftop rinse or Enphase gateway reset.'
  },
  {
    id: 'tb-3',
    deviceId: 'dev-8',
    deviceName: 'Main Entrance Biometric Smart Lock (Yale)',
    issueTitle: 'Fingerprint scanner required second attempt',
    verifiedFacts: [
      'Lock battery level: 91% (Optimal condition)',
      'Tamper sensor: Clear, no forced entry alarms logged',
      'Last successful unlock: 18:20 by Rahul Sharma via Bio-scanner'
    ],
    possibleExplanations: [
      'Moisture, sanitizer residue, or dust on optical fingerprint prism',
      'Cold finger tip or partial angle placement on optical glass'
    ],
    safeChecks: [
      'Wipe optical glass with a dry microfiber cloth',
      'Test PIN code keypad or NFC tag as secondary verification',
      'Verify backup physical master key is accessible in emergency drawer'
    ],
    professionalHelpRecommended: 'If lock emits low battery beep code or fails mechanical bolt throw, replace AA alkaline batteries immediately.'
  }
];

export const WHAT_IF_SCENARIOS = [
  {
    id: 'scen-1',
    title: 'Simulate Vacation Mode (7-Day Absence)',
    category: 'Home & Energy Optimization',
    description: 'Preview household automation adjustments when all family members are traveling.',
    projectedActions: [
      { target: 'HVAC & Climate', effect: 'All indoor AC units set to standby / frost protection mode.' },
      { target: 'Water Heaters & Geysers', effect: 'Smart geyser plugs turned OFF completely.' },
      { target: 'Living Room Lights', effect: 'Randomized evening presence simulation between 19:30 and 22:15.' },
      { target: 'Security & CCTV', effect: 'Perimeter motion threshold set to High Sensitivity with instant push notifications.' },
      { target: 'Expected Savings', effect: 'Estimated 38 kWh reduction per week (~₹340 power saving).' }
    ],
    requiredPermissions: ['Lighting Control', 'Security Armed State', 'Thermostat Overwrite'],
    safetyNotice: 'Refrigerator and security cameras remain on dedicated uninterrupted power circuit.'
  },
  {
    id: 'scen-2',
    title: 'Simulate Solar Peak Load Shifting',
    category: 'Grid & Cost Optimization',
    description: 'Rehearse moving heavy electrical loads to 11:30 AM – 02:30 PM solar peak generation window.',
    projectedActions: [
      { target: 'Tata Nexon EV Charging', effect: 'Schedule charging start at 11:30 AM when solar export exceeds 3.5 kW.' },
      { target: 'Dishwasher & Washing Machine', effect: 'Send reminder to run heavy wash cycles at 01:00 PM.' },
      { target: 'Grid Impact', effect: 'Reduces peak tariff consumption from BESCOM grid to near zero.' }
    ],
    requiredPermissions: ['EV Charging Schedule', 'Notification Alerts'],
    safetyNotice: 'Local simulation only. Smart appliance auto-start requires active Matter/Home Connect bridge.'
  }
];
