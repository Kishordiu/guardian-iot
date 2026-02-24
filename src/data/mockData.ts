export type TrustState = 'trusted' | 'compromised' | 'revoked' | 'offline';

export interface IoTDevice {
  uid: string;
  name: string;
  trustState: TrustState;
  firmwareIntegrity: boolean;
  lastSeen: string;
  signalStrength: number;
  publicKey: string;
  identityHash: string;
  trustScore: number;
  lastAuthTimestamp: string;
  signatureValid: boolean;
  cpuUsage: number;
  memoryUsage: number;
  temperature: number;
  uptime: string;
  firmwareVersion: string;
  location: string;
}

export interface TamperEvent {
  id: string;
  deviceUid: string;
  type: 'Case Open' | 'Light Intrusion' | 'Vibration' | 'Firmware Mismatch';
  timestamp: string;
  keyDestroyed: boolean;
  lockdownActive: boolean;
  alertLevel: 'High' | 'Critical';
}

export const devices: IoTDevice[] = [
  {
    uid: 'IOT-7A3F-001',
    name: 'Gateway Node Alpha',
    trustState: 'trusted',
    firmwareIntegrity: true,
    lastSeen: '2026-02-24T14:32:10Z',
    signalStrength: 92,
    publicKey: '04:a1:b2:c3:d4:e5:f6:07:08:09:0a:0b:0c:0d:0e:0f',
    identityHash: 'sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    trustScore: 98,
    lastAuthTimestamp: '2026-02-24T14:30:00Z',
    signatureValid: true,
    cpuUsage: 34,
    memoryUsage: 52,
    temperature: 42,
    uptime: '47d 12h 33m',
    firmwareVersion: 'v3.2.1',
    location: 'Sector A - Industrial Zone',
  },
  {
    uid: 'IOT-9B1E-002',
    name: 'Sensor Hub Beta',
    trustState: 'trusted',
    firmwareIntegrity: true,
    lastSeen: '2026-02-24T14:31:55Z',
    signalStrength: 87,
    publicKey: '04:f1:e2:d3:c4:b5:a6:97:88:79:6a:5b:4c:3d:2e:1f',
    identityHash: 'sha256:2c624232cdd221771294dfbb310aca000a0df6ac8b166669b6c2578b1e5aa38c',
    trustScore: 95,
    lastAuthTimestamp: '2026-02-24T14:29:30Z',
    signatureValid: true,
    cpuUsage: 28,
    memoryUsage: 41,
    temperature: 38,
    uptime: '23d 8h 12m',
    firmwareVersion: 'v3.2.1',
    location: 'Sector B - Water Treatment',
  },
  {
    uid: 'IOT-4C8D-003',
    name: 'Edge Controller Gamma',
    trustState: 'compromised',
    firmwareIntegrity: false,
    lastSeen: '2026-02-24T13:15:42Z',
    signalStrength: 0,
    publicKey: 'DESTROYED',
    identityHash: 'sha256:INVALIDATED',
    trustScore: 0,
    lastAuthTimestamp: '2026-02-24T13:14:00Z',
    signatureValid: false,
    cpuUsage: 0,
    memoryUsage: 0,
    temperature: 0,
    uptime: 'LOCKDOWN',
    firmwareVersion: 'v3.1.9 (MISMATCH)',
    location: 'Sector C - Power Grid',
  },
  {
    uid: 'IOT-2F5A-004',
    name: 'Monitor Node Delta',
    trustState: 'trusted',
    firmwareIntegrity: true,
    lastSeen: '2026-02-24T14:32:05Z',
    signalStrength: 95,
    publicKey: '04:11:22:33:44:55:66:77:88:99:aa:bb:cc:dd:ee:ff',
    identityHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    trustScore: 100,
    lastAuthTimestamp: '2026-02-24T14:31:00Z',
    signatureValid: true,
    cpuUsage: 18,
    memoryUsage: 35,
    temperature: 36,
    uptime: '89d 4h 22m',
    firmwareVersion: 'v3.2.1',
    location: 'Sector A - Industrial Zone',
  },
  {
    uid: 'IOT-6E9C-005',
    name: 'Relay Station Epsilon',
    trustState: 'offline',
    firmwareIntegrity: true,
    lastSeen: '2026-02-23T22:10:30Z',
    signalStrength: 0,
    publicKey: '04:ab:cd:ef:01:23:45:67:89:ab:cd:ef:01:23:45:67',
    identityHash: 'sha256:d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592',
    trustScore: 72,
    lastAuthTimestamp: '2026-02-23T22:08:00Z',
    signatureValid: true,
    cpuUsage: 0,
    memoryUsage: 0,
    temperature: 0,
    uptime: 'OFFLINE',
    firmwareVersion: 'v3.2.0',
    location: 'Sector D - Communications',
  },
  {
    uid: 'IOT-1A3B-006',
    name: 'Perimeter Sensor Zeta',
    trustState: 'revoked',
    firmwareIntegrity: false,
    lastSeen: '2026-02-22T08:45:12Z',
    signalStrength: 0,
    publicKey: 'REVOKED',
    identityHash: 'sha256:REVOKED',
    trustScore: 0,
    lastAuthTimestamp: '2026-02-22T08:44:00Z',
    signatureValid: false,
    cpuUsage: 0,
    memoryUsage: 0,
    temperature: 0,
    uptime: 'REVOKED',
    firmwareVersion: 'v3.0.5 (OUTDATED)',
    location: 'Sector E - Perimeter',
  },
  {
    uid: 'IOT-8D2F-007',
    name: 'Smart Valve Controller',
    trustState: 'trusted',
    firmwareIntegrity: true,
    lastSeen: '2026-02-24T14:31:48Z',
    signalStrength: 78,
    publicKey: '04:fe:dc:ba:98:76:54:32:10:fe:dc:ba:98:76:54:32',
    identityHash: 'sha256:6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
    trustScore: 91,
    lastAuthTimestamp: '2026-02-24T14:30:30Z',
    signatureValid: true,
    cpuUsage: 45,
    memoryUsage: 62,
    temperature: 48,
    uptime: '15d 19h 44m',
    firmwareVersion: 'v3.2.1',
    location: 'Sector B - Water Treatment',
  },
  {
    uid: 'IOT-5G7H-008',
    name: 'Thermal Monitor Eta',
    trustState: 'trusted',
    firmwareIntegrity: true,
    lastSeen: '2026-02-24T14:32:12Z',
    signalStrength: 88,
    publicKey: '04:12:34:56:78:9a:bc:de:f0:12:34:56:78:9a:bc:de',
    identityHash: 'sha256:4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce',
    trustScore: 96,
    lastAuthTimestamp: '2026-02-24T14:31:45Z',
    signatureValid: true,
    cpuUsage: 22,
    memoryUsage: 38,
    temperature: 40,
    uptime: '62d 7h 15m',
    firmwareVersion: 'v3.2.1',
    location: 'Sector C - Power Grid',
  },
];

export const tamperEvents: TamperEvent[] = [
  {
    id: 'EVT-001',
    deviceUid: 'IOT-4C8D-003',
    type: 'Firmware Mismatch',
    timestamp: '2026-02-24T13:14:22Z',
    keyDestroyed: true,
    lockdownActive: true,
    alertLevel: 'Critical',
  },
  {
    id: 'EVT-002',
    deviceUid: 'IOT-4C8D-003',
    type: 'Case Open',
    timestamp: '2026-02-24T13:14:18Z',
    keyDestroyed: true,
    lockdownActive: true,
    alertLevel: 'Critical',
  },
  {
    id: 'EVT-003',
    deviceUid: 'IOT-1A3B-006',
    type: 'Vibration',
    timestamp: '2026-02-22T08:44:30Z',
    keyDestroyed: true,
    lockdownActive: true,
    alertLevel: 'High',
  },
  {
    id: 'EVT-004',
    deviceUid: 'IOT-1A3B-006',
    type: 'Light Intrusion',
    timestamp: '2026-02-22T08:44:15Z',
    keyDestroyed: true,
    lockdownActive: true,
    alertLevel: 'Critical',
  },
  {
    id: 'EVT-005',
    deviceUid: 'IOT-7A3F-001',
    type: 'Vibration',
    timestamp: '2026-02-20T06:12:44Z',
    keyDestroyed: false,
    lockdownActive: false,
    alertLevel: 'High',
  },
];

export const getDeviceStats = () => {
  const total = devices.length;
  const trusted = devices.filter(d => d.trustState === 'trusted').length;
  const compromised = devices.filter(d => d.trustState === 'compromised').length;
  const offline = devices.filter(d => d.trustState === 'offline').length;
  const revoked = devices.filter(d => d.trustState === 'revoked').length;
  const activeAlerts = tamperEvents.filter(e => e.lockdownActive).length;
  return { total, trusted, compromised, offline, revoked, activeAlerts };
};
