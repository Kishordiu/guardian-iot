import { useState } from 'react';
import { devices, IoTDevice } from '@/data/mockData';
import { SectionHeader } from '@/components/SecurityWidgets';
import { ShieldCheck, ShieldX, Key, Hash, Clock, ArrowRight } from 'lucide-react';

function TrustGauge({ score }: { score: number }) {
  const angle = (score / 100) * 180;
  const color = score > 70 ? 'hsl(152, 69%, 41%)' : score > 0 ? 'hsl(38, 92%, 50%)' : 'hsl(0, 72%, 51%)';
  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="90" viewBox="0 0 160 90">
        <path d="M 10 80 A 70 70 0 0 1 150 80" fill="none" stroke="hsl(220, 30%, 18%)" strokeWidth="12" strokeLinecap="round" />
        <path
          d="M 10 80 A 70 70 0 0 1 150 80"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${(angle / 180) * 220} 220`}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
        <text x="80" y="75" textAnchor="middle" fill={color} fontSize="28" fontWeight="bold" fontFamily="Inter">
          {score}
        </text>
      </svg>
      <span className="text-xs text-muted-foreground mt-1">Trust Score</span>
    </div>
  );
}

function AuthFlowDiagram({ compromised }: { compromised: boolean }) {
  const steps = [
    { label: 'Server', sub: 'Generate Challenge' },
    { label: 'Device', sub: 'Sign with Private Key' },
    { label: 'Server', sub: 'Verify Signature' },
    { label: 'Result', sub: compromised ? 'REJECTED' : 'Trusted' },
  ];
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`px-4 py-3 rounded-lg border text-center ${
            i === 3 && compromised
              ? 'border-destructive/50 bg-destructive/10'
              : 'border-border bg-card'
          }`}>
            <p className="text-xs font-semibold text-foreground">{s.label}</p>
            <p className={`text-[10px] mt-0.5 ${i === 3 && compromised ? 'text-destructive font-bold' : 'text-muted-foreground'}`}>
              {s.sub}
            </p>
          </div>
          {i < steps.length - 1 && <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />}
        </div>
      ))}
    </div>
  );
}

export default function AuthenticationPage() {
  const [selected, setSelected] = useState<IoTDevice>(devices[0]);
  const isCompromised = selected.trustState === 'compromised' || selected.trustState === 'revoked';

  return (
    <div className="space-y-6 max-w-5xl">
      <SectionHeader title="Authentication & Zero-Trust Verification" subtitle="Challenge-response device identity verification" />

      {/* Device selector */}
      <div className="card-cyber">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Select Device</label>
        <select
          value={selected.uid}
          onChange={(e) => setSelected(devices.find(d => d.uid === e.target.value)!)}
          className="bg-muted border border-border rounded px-3 py-2 text-sm text-foreground w-full max-w-md"
        >
          {devices.map(d => (
            <option key={d.uid} value={d.uid}>{d.uid} — {d.name}</option>
          ))}
        </select>
      </div>

      {/* Auth Flow */}
      <div className="card-cyber">
        <h3 className="text-sm font-semibold text-foreground mb-4">Authentication Flow</h3>
        <AuthFlowDiagram compromised={isCompromised} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Trust Gauge */}
        <div className="card-cyber flex flex-col items-center justify-center py-6">
          <TrustGauge score={selected.trustScore} />
          {isCompromised && (
            <div className="mt-4 px-4 py-2 bg-destructive/10 border border-destructive/30 rounded text-xs text-destructive font-semibold text-center">
              <ShieldX className="w-4 h-4 inline mr-1" />
              Authentication Disabled — Device Compromised
            </div>
          )}
        </div>

        {/* Details */}
        <div className="card-cyber space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Identity Details</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2">
              <Key className="w-3.5 h-3.5 text-primary mt-0.5" />
              <div>
                <span className="text-muted-foreground">Public Key</span>
                <p className="font-mono text-foreground break-all">{selected.publicKey}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Hash className="w-3.5 h-3.5 text-primary mt-0.5" />
              <div>
                <span className="text-muted-foreground">Identity Hash</span>
                <p className="font-mono text-foreground break-all">{selected.identityHash}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-primary mt-0.5" />
              <div>
                <span className="text-muted-foreground">Last Auth</span>
                <p className="text-foreground">{new Date(selected.lastAuthTimestamp).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-primary mt-0.5" />
              <div>
                <span className="text-muted-foreground">Signature Verification</span>
                <p className={selected.signatureValid ? 'text-success font-semibold' : 'text-destructive font-semibold'}>
                  {selected.signatureValid ? '✓ Valid' : '✗ Invalid'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
