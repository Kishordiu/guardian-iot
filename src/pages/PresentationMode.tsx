import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardOverview from './DashboardOverview';
import DevicesPage from './DevicesPage';
import AuthenticationPage from './AuthenticationPage';
import TelemetryPage from './TelemetryPage';
import TamperEventsPage from './TamperEventsPage';
import DeviceLifecyclePage from './DeviceLifecyclePage';
import SecurityFlowPage from './SecurityFlowPage';

const slides = [
  { label: 'System Overview', component: DashboardOverview },
  { label: 'Device Registry', component: DevicesPage },
  { label: 'Authentication', component: AuthenticationPage },
  { label: 'Telemetry', component: TelemetryPage },
  { label: 'Tamper Events', component: TamperEventsPage },
  { label: 'Device Lifecycle', component: DeviceLifecyclePage },
  { label: 'Security Flow', component: SecurityFlowPage },
];

const CYCLE_INTERVAL = 12000; // 12s per slide

export default function PresentationMode() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [mouseTimer, setMouseTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [elapsed, setElapsed] = useState(0);

  // Fullscreen on mount
  useEffect(() => {
    document.documentElement.requestFullscreen?.().catch(() => {});
    return () => { document.exitFullscreen?.().catch(() => {}); };
  }, []);

  // Hide controls after inactivity
  const resetMouseTimer = useCallback(() => {
    setShowControls(true);
    if (mouseTimer) clearTimeout(mouseTimer);
    const t = setTimeout(() => setShowControls(false), 3000);
    setMouseTimer(t);
  }, [mouseTimer]);

  useEffect(() => {
    return () => { if (mouseTimer) clearTimeout(mouseTimer); };
  }, [mouseTimer]);

  // Transition helper
  const goTo = useCallback((index: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setElapsed(0);
      setTransitioning(false);
    }, 400);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  // Auto-cycle
  useEffect(() => {
    if (!playing) return;
    const tick = setInterval(() => {
      setElapsed(prev => {
        if (prev + 100 >= CYCLE_INTERVAL) {
          next();
          return 0;
        }
        return prev + 100;
      });
    }, 100);
    return () => clearInterval(tick);
  }, [playing, next]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { navigate('/'); return; }
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'p' || e.key === 'P') { setPlaying(p => !p); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, navigate]);

  // Listen for fullscreen exit
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) navigate('/');
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, [navigate]);

  const SlideComponent = slides[current].component;
  const progress = elapsed / CYCLE_INTERVAL;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-background overflow-hidden cursor-none"
      onMouseMove={resetMouseTimer}
      onClick={resetMouseTimer}
    >
      {/* Slide content with presentation scaling */}
      <div
        className={`absolute inset-0 overflow-y-auto p-8 lg:p-12 transition-all duration-400 ${
          transitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{ cursor: showControls ? 'default' : 'none' }}
      >
        <div className="presentation-scale">
          <SlideComponent />
        </div>
      </div>

      {/* Top bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-background via-background/80 to-transparent flex items-center justify-between px-6 transition-opacity duration-500 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-sm font-mono">ZT</span>
          </div>
          <span className="text-sm font-bold text-foreground">ZeroTrust IoT — Hackathon Demo</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">
            {current + 1} / {slides.length}
          </span>
          <button
            onClick={() => { navigate('/'); document.exitFullscreen?.().catch(() => {}); }}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 transition-opacity duration-500 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress bar */}
        <div className="h-1 bg-muted mx-6 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between px-6 pb-5">
          {/* Slide dots */}
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`group flex items-center gap-1.5 transition-all ${
                  i === current ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <div
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? 'w-8 bg-primary glow-primary'
                      : 'w-2 bg-muted-foreground group-hover:bg-foreground'
                  }`}
                />
                {i === current && (
                  <span className="text-[10px] font-semibold text-primary">{s.label}</span>
                )}
              </button>
            ))}
          </div>

          {/* Play / nav */}
          <div className="flex items-center gap-1">
            <button onClick={prev} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setPlaying(p => !p)}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button onClick={next} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
