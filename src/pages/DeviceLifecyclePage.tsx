import { useState } from 'react';
import { devices, IoTDevice, TrustState } from '@/data/mockData';
import { SectionHeader, TrustBadge } from '@/components/SecurityWidgets';
import { RotateCcw, KeyRound, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function DeviceLifecyclePage() {
  const [deviceList, setDeviceList] = useState<IoTDevice[]>([...devices]);
  const [modal, setModal] = useState<IoTDevice | null>(null);
  const [recovered, setRecovered] = useState<Set<string>>(new Set());

  const compromisedOrRevoked = deviceList.filter(d => d.trustState === 'compromised' || d.trustState === 'revoked');

  const handleRecover = (uid: string) => {
    setDeviceList(prev =>
      prev.map(d =>
        d.uid === uid
          ? { ...d, trustState: 'trusted' as TrustState, trustScore: 85, firmwareIntegrity: true, publicKey: '04:NEW:KEY:GENERATED', identityHash: 'sha256:REGENERATED', signatureValid: true }
          : d
      )
    );
    setRecovered(prev => new Set(prev).add(uid));
    setModal(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <SectionHeader title="Device Recovery & Lifecycle Management" subtitle="Admin-only secure device re-registration and trust restoration" />

      <div className="card-cyber border-warning/20">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <h3 className="text-sm font-semibold text-foreground">Admin Recovery Console</h3>
        </div>
        <p className="text-xs text-muted-foreground">Only authorized administrators can perform trust state recovery. This action regenerates cryptographic identity.</p>
      </div>

      {compromisedOrRevoked.length === 0 && recovered.size > 0 ? (
        <div className="card-cyber border-success/30 glow-success flex items-center gap-3 py-8 justify-center">
          <CheckCircle2 className="w-8 h-8 text-success" />
          <div>
            <p className="text-sm font-bold text-success">All Devices Recovered</p>
            <p className="text-xs text-muted-foreground">All previously compromised devices have been restored to trusted state.</p>
          </div>
        </div>
      ) : compromisedOrRevoked.length === 0 ? (
        <div className="card-cyber flex items-center gap-3 py-8 justify-center">
          <ShieldCheck className="w-8 h-8 text-success" />
          <p className="text-sm text-muted-foreground">No devices require recovery at this time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {compromisedOrRevoked.map(d => (
            <div key={d.uid} className="card-cyber border-destructive/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{d.uid}</p>
                  <p className="text-sm font-semibold text-foreground">{d.name}</p>
                </div>
                <TrustBadge state={d.trustState} />
              </div>
              <button
                onClick={() => setModal(d)}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Recover Device
              </button>
            </div>
          ))}
        </div>
      )}

      {recovered.size > 0 && (
        <div className="card-cyber">
          <h3 className="text-sm font-semibold text-foreground mb-3">Recovery Log</h3>
          <div className="space-y-2">
            {Array.from(recovered).map(uid => (
              <div key={uid} className="flex items-center gap-2 text-xs text-success">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="font-mono">{uid}</span> — Trust state restored, new keys generated
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-cyber border-warning/40 max-w-md w-full space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <h3 className="text-sm font-bold text-foreground">Confirm Device Recovery</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              This action will regenerate the cryptographic identity for <strong className="text-foreground">{modal.name}</strong> ({modal.uid}).
              New key pairs will be generated and the device will be re-registered with the trust authority.
            </p>
            <div className="bg-warning/5 border border-warning/20 rounded p-3 text-xs text-warning">
              <KeyRound className="w-3.5 h-3.5 inline mr-1" />
              Warning: This regenerates cryptographic identity and restores trust state.
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                Cancel
              </button>
              <button
                onClick={() => handleRecover(modal.uid)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-xs font-semibold hover:bg-primary/90 transition-colors"
              >
                Confirm Recovery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
