import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Timer, 
  BookOpen, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Download, 
  Clock, 
  AlertTriangle, 
  Check, 
  Activity, 
  X, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  Moon,
  Compass,
  FileText
} from 'lucide-react';

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const INITIAL_START_DATE = Date.now(); 

const INITIAL_TIMELINE = [
  { id: 't1', category: 'University Assignments / Projects', desc: 'Focused intensely for 4 hours without breaking attention.', timestamp: Date.now() - 3600000, day: 0 },
  { id: 't2', category: 'Web Development Practice Focus', desc: 'Completed a deep meditation session to rest the brain and restore clarity.', timestamp: Date.now() - 7200000, day: 0 }
];

export default function App() {
  // --- Core & Navigation State ---
  const [startDate, setStartDate] = useState(() => parseInt(localStorage.getItem('focus_startDate'), 10) || INITIAL_START_DATE);
  const [timeline, setTimeline] = useState(() => JSON.parse(localStorage.getItem('focus_timeline')) || INITIAL_TIMELINE);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Consolidated Form & Modal States ---
  const [form, setForm] = useState({ category: 'University Assignments / Projects', desc: '' });
  const [resetModal, setResetModal] = useState({ isOpen: false, date: '', time: '' });

  // --- Continuity Telemetry ---
  const [telemetry, setTelemetry] = useState({ days: 0, fractional: '0.00000' });

  // --- Focus Timer State ---
  const [timerMode, setTimerMode] = useState('pomodoro'); // pomodoro, ultradian, stopwatch
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [stopwatchElapsed, setStopwatchElapsed] = useState(0);
  const [audioHumEnabled, setAudioHumEnabled] = useState(false);

  // --- Filter State ---
  const [filters, setFilters] = useState({ search: '', category: 'All' });

  // --- Audio Synthesizer Refs ---
  const audioCtxRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);

  // --- Sync Engine ---
  useEffect(() => { localStorage.setItem('focus_startDate', startDate.toString()); }, [startDate]);
  useEffect(() => { localStorage.setItem('focus_timeline', JSON.stringify(timeline)); }, [timeline]);

  // --- Telemetry Clock Interval ---
  useEffect(() => {
    const updateEngine = () => {
      const diff = Date.now() - startDate;
      if (diff <= 0) {
        setTelemetry({ days: 0, fractional: '0.00000' });
        return;
      }
      const totalDays = diff / MS_PER_DAY;
      setTelemetry({ days: Math.floor(totalDays), fractional: totalDays.toFixed(5) });
    };
    updateEngine();
    const interval = setInterval(updateEngine, 100);
    return () => clearInterval(interval);
  }, [startDate]);

  // --- Core Timer Engine ---
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        if (timerMode === 'stopwatch') {
          setStopwatchElapsed(p => p + 1);
        } else {
          setTimeLeft(p => {
            if (p <= 1) {
              setTimerActive(false);
              triggerSessionComplete(timerMode === 'pomodoro' ? 25 : 90);
              return 0;
            }
            return p - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerMode]);

  // --- Default Duration Synchronizer ---
  useEffect(() => {
    if (!timerActive) {
      if (timerMode === 'pomodoro') setTimeLeft(25 * 60);
      if (timerMode === 'ultradian') setTimeLeft(90 * 60);
      if (timerMode === 'stopwatch') setStopwatchElapsed(0);
    }
  }, [timerMode, timerActive]);

  // --- Audio Web Engine ---
  useEffect(() => {
    if (audioHumEnabled && timerActive) {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = osc2.type = 'sine';
        osc1.frequency.setValueAtTime(100, ctx.currentTime);
        osc2.frequency.setValueAtTime(104, ctx.currentTime);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.5);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
      } catch (e) {
        console.error('Audio synthesizer fault:', e);
      }
    } else {
      killAudioHum();
    }
    return () => killAudioHum();
  }, [audioHumEnabled, timerActive]);

  const killAudioHum = () => {
    [osc1Ref, osc2Ref].forEach(ref => {
      if (ref.current) {
        try { ref.current.stop(); } catch {}
        ref.current = null;
      }
    });
  };

  // --- Event Calculators & Dynamic Handlers ---
  const getCurrentDay = () => Math.max(0, Math.floor((Date.now() - startDate) / MS_PER_DAY));

  const handleManualLogSubmit = (e) => {
    e.preventDefault();
    if (!form.desc.trim()) return;

    setTimeline(prev => [{
      id: `t-${Date.now()}`,
      category: form.category,
      desc: form.desc,
      timestamp: Date.now(),
      day: getCurrentDay()
    }, ...prev]);

    setForm(p => ({ ...p, desc: '' }));
    setActiveTab('overview');
  };

  const triggerSessionComplete = (minutes) => {
    setTimeline(prev => [{
      id: `t-${Date.now()}`,
      category: 'University Assignments / Projects',
      desc: `Great job! You have successfully completed your ${minutes}-minute focus session.`,
      timestamp: Date.now(),
      day: getCurrentDay()
    }, ...prev]);
  };

  const handleStopwatchFinish = () => {
    setTimerActive(false);
    const mins = Math.max(1, Math.round(stopwatchElapsed / 60));
    setTimeline(prev => [{
      id: `t-${Date.now()}`,
      category: 'University Assignments / Projects',
      desc: `Finished an open focus session lasting ${mins} minute(s) monitored via live stopwatch.`,
      timestamp: Date.now(),
      day: getCurrentDay()
    }, ...prev]);
    setStopwatchElapsed(0);
  };

  const handleCustomAnchorReset = (e) => {
    e.preventDefault();
    const parsedTs = Date.parse(`${resetModal.date}T${resetModal.time || '00:00:00'}`);
    
    if (isNaN(parsedTs) || parsedTs > Date.now()) {
      alert('You have entered an invalid date or time.');
      return;
    }

    setStartDate(parsedTs);
    localStorage.setItem('focus_startDate', parsedTs.toString());
    const calculatedDays = Math.floor((Date.now() - parsedTs) / MS_PER_DAY);
    
    setTimeline(prev => [{
      id: `t-anchor-${Date.now()}`,
      category: 'Milestone Achieved',
      desc: `You changed the streak starting time to ${new Date(parsedTs).toLocaleString()}. Your streak is now set to ${calculatedDays} Days.`,
      timestamp: Date.now(),
      day: calculatedDays
    }, ...prev]);

    setResetModal({ isOpen: false, date: '', time: '' });
  };

  const handleSystemRelapse = () => {
    const now = Date.now();
    
    setStartDate(now);
    localStorage.setItem('focus_startDate', now.toString());
    
    setTimeline(prev => [{
      id: `t-reset-${now}`,
      category: 'Milestone Achieved',
      desc: `Streak broken. The system has been reset back to zero (0). Your next full day will complete in exactly 24 hours. STAY FOCUSED`,
      timestamp: now,
      day: 0
    }, ...prev]);
    
    setResetModal({ isOpen: false, date: '', time: '' });
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(timeline, null, 2));
    const anchor = document.createElement('a');
    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", `focus_flow_telemetry_${Date.now()}.json`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  // --- Memoized Analytics Matrices ---
  const filteredTimeline = useMemo(() => {
    return timeline.filter(item => {
      const matchSearch = item.desc.toLowerCase().includes(filters.search.toLowerCase()) || item.category.toLowerCase().includes(filters.search.toLowerCase());
      return filters.category === 'All' ? matchSearch : matchSearch && item.category === filters.category;
    });
  }, [timeline, filters]);

  const stats = useMemo(() => {
    const logs = (cat) => timeline.filter(i => i.category === cat).length;
    const elapsedDays = Math.max(1, getCurrentDay());
    return {
      deepSessions: logs('University Assignments / Projects'),
      deepHours: (logs('University Assignments / Projects') * 1.5).toFixed(1),
      meditativeHours: (logs('Web Development Practice Focus') * 0.5).toFixed(1),
      screenFree: logs('Screen-Free Hour'),
      milestones: logs('Milestone Achieved'),
      consistency: Math.max(30, Math.min(100, Math.round((timeline.length / (elapsedDays * 1.2)) * 100)))
    };
  }, [timeline, startDate]);

  // --- Time Matrix Formatters ---
  const formatTimer = (sec) => `${Math.floor(sec / 60).toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`;
  const formatStopwatch = (sec) => `${Math.floor(sec / 3600).toString().padStart(2, '0')}:${Math.floor((sec % 3600) / 60).toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`;
  const formatEventTime = (ts) => {
    const diffDays = Math.floor((Date.now() - ts) / MS_PER_DAY);
    const timeStr = new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return diffDays === 0 ? `TODAY, ${timeStr}` : diffDays === 1 ? `YESTERDAY, ${timeStr}` : `${diffDays} DAYS AGO (${new Date(ts).toLocaleDateString()})`;
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#09090b] text-[#e5e1e4] font-sans antialiased overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* ================= NAVIGATION INTERFACE ================= */}
      <aside className={`fixed top-0 bottom-0 left-0 w-64 bg-[#131315] border-r border-zinc-800 py-6 px-4 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:block'}`}>
        <div className="flex items-center justify-between mb-10 px-2">
          <div>
            <h1 className="text-xl font-extrabold tracking-tighter text-indigo-400">FOCUS_FLOW</h1>
            <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase tracking-[0.2em] font-semibold">NEURAL INTERFACE v1.4</p>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden p-1 hover:bg-zinc-800 text-zinc-400 rounded"><X size={18} /></button>
        </div>

        <nav className="flex-grow space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={15} /> },
            { id: 'deepwork', label: 'Deep Work', icon: <Timer size={15} /> },
            { id: 'timeline', label: 'Timeline', icon: <Activity size={15} /> },
            { id: 'resources', label: 'Resources', icon: <BookOpen size={15} /> },
            { id: 'reports', label: 'Reports', icon: <TrendingUp size={15} /> }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold tracking-wider uppercase border-l-2 transition-all ${activeTab === tab.id ? 'text-indigo-400 bg-zinc-800/60 border-indigo-500 font-bold' : 'text-zinc-400 border-transparent hover:bg-zinc-800/40 hover:text-zinc-100'}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-800/80 space-y-3 px-1">
          <button 
            onClick={() => { setActiveTab('deepwork'); setTimerActive(true); }}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold tracking-widest uppercase rounded-sm border border-indigo-500/30 flex items-center justify-center gap-2"
          >
            <Play size={12} className="fill-current" />
            <span>START SPRINT</span>
          </button>
        </div>
      </aside>

      {mobileMenuOpen && <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 z-40 md:hidden" />}

      {/* ================= MAIN MONITOR CONSOLE ================= */}
      <main className="flex-grow md:ml-64 bg-[#09090b] px-4 sm:px-6 lg:px-10 py-6 flex flex-col min-h-screen">
        
        <div className="flex items-center justify-between md:hidden bg-[#131315] border border-zinc-800 px-4 py-3 rounded-md mb-6">
          <h1 className="text-md font-extrabold tracking-tighter text-indigo-400">FOCUS_FLOW</h1>
          <button onClick={() => setMobileMenuOpen(true)} className="px-3 py-1.5 border border-zinc-800 text-xs text-zinc-300 font-mono rounded">MENU</button>
        </div>

        <header className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-zinc-900 pb-5">
          <div>
            <h2 className="text-[#fafafa] font-extrabold text-2xl sm:text-3xl tracking-tight uppercase">
              {activeTab === 'overview' && 'Focus Flow Tracker'}
              {activeTab === 'deepwork' && 'Deep Work Cockpit'}
              {activeTab === 'timeline' && 'Growth History Feed'}
              {activeTab === 'resources' && 'Neuro-Restoration Library'}
              {activeTab === 'reports' && 'Analytical Performance Telemetry'}
            </h2>
          </div>
          <span className="px-3 py-1 bg-[#131315] border border-zinc-800 font-mono text-[10px] text-zinc-400 flex items-center gap-2 rounded-sm">

          </span>
        </header>

        {/* ================= VIEWPORT ROUTING ================= */}

        {activeTab === 'overview' && (
          <div className="space-y-6 flex-grow">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <section className="lg:col-span-8 bg-[#131315] border border-zinc-800 p-6 rounded-sm flex flex-col justify-between min-h-[250px]">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] font-semibold uppercase">CURRENT STREAK</span>
                  <div className="flex items-baseline gap-4 mt-1">
                    <span className="font-mono text-6xl sm:text-7xl font-extrabold text-indigo-400 tracking-tighter tabular-nums">{telemetry.days}</span>
                    <span className="text-lg sm:text-xl font-extrabold text-zinc-500 uppercase">DAYS ACTIVE</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="px-4 py-2 bg-zinc-950 border border-zinc-800 font-mono text-xs">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mr-3">LIVE</span>
                    <span className="text-zinc-100 font-bold tracking-widest tabular-nums">{telemetry.fractional}</span>
                  </div>
                  <button onClick={() => setResetModal(p => ({ ...p, isOpen: true }))} className="text-[10px] font-semibold text-zinc-400 hover:text-red-400 uppercase tracking-widest font-mono">
                    Adjust Anchors / Relapse
                  </button>
                </div>
              </section>

              <section className="lg:col-span-4 bg-[#131315] border border-zinc-800 p-6 rounded-sm flex flex-col justify-between">
                <form onSubmit={handleManualLogSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">Metric Category</label>
                    <select 
                      value={form.category}
                      onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}
                      className="w-full bg-[#09090b] border border-zinc-800 text-zinc-200 text-xs px-3 py-2.5 focus:border-indigo-500 focus:outline-none rounded-sm font-mono"
                    >
                      <option value="University Assignments / Projects">University Assignments / Projects</option>
                      <option value="Web Development Practice Focus">Web Development Practice Focus</option>
                      <option value="Screen-Free Hour">Screen-Free Hour</option>
                      <option value="Milestone Achieved">Milestone Achieved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">Session Description</label>
                    <textarea 
                      value={form.desc}
                      onChange={(e) => setForm(p => ({ ...p, desc: e.target.value }))}
                      placeholder="Describe what you achieved..."
                      rows={3}
                      className="w-full bg-[#09090b] border border-zinc-800 text-zinc-200 text-xs px-3 py-2.5 focus:border-indigo-500 focus:outline-none rounded-sm resize-none"
                    />
                  </div>
                  <button type="submit" disabled={!form.desc.trim()} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-45 text-white font-mono text-xs font-bold py-2.5 uppercase tracking-widest rounded-sm transition-all">
                    Record Progress
                  </button>
                </form>
              </section>
            </div>

            <section className="bg-[#131315] border border-zinc-800 rounded-sm">
              <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] font-semibold uppercase">GROWTH TIMELINE TELEMETRY</span>
                <button onClick={handleExportData} className="p-1.5 border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-100 rounded-sm"><Download size={14} /></button>
              </div>
              <div className="divide-y divide-zinc-800/60 max-h-[400px] overflow-y-auto">
                {timeline.slice(0, 5).map((item) => (
                  <div key={item.id} className="p-6 hover:bg-zinc-900/40 flex justify-between items-start gap-4">
                    <div className="flex items-start gap-4">
                      <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 text-indigo-400 font-mono text-[10px] font-bold rounded-sm shrink-0">DAY {item.day}</span>
                      <div>
                        <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-zinc-800 text-zinc-400 border border-zinc-700/50 rounded-sm uppercase tracking-wide inline-block mb-1">{item.category}</span>
                        <p className="text-zinc-200 text-sm">{item.desc}</p>
                        <p className="text-[10px] font-mono text-zinc-500 mt-1">{formatEventTime(item.timestamp)}</p>
                      </div>
                    </div>
                    <button onClick={() => setTimeline(timeline.filter(i => i.id !== item.id))} className="text-zinc-500 hover:text-red-400 p-1"><Trash2 size={13} /></button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'deepwork' && (
          <div className="space-y-6 flex-grow">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-[#131315] border border-zinc-800 p-8 rounded-sm flex flex-col justify-between relative min-h-[450px]">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
                  <div className="flex gap-2">
                    {['Short Session', 'Long Session', 'stopwatch'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => !timerActive && setTimerMode(mode)}
                        disabled={timerActive}
                        className={`px-3 py-1.5 border font-mono text-[10px] uppercase tracking-wider rounded-sm transition-all ${timerMode === mode ? 'border-indigo-500 bg-indigo-950/20 text-indigo-400 font-bold' : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200 disabled:opacity-30'}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setAudioHumEnabled(!audioHumEnabled)} className={`px-3 py-1.5 border font-mono text-[10px] uppercase tracking-wider rounded-sm flex items-center gap-2 transition-all ${audioHumEnabled ? 'border-indigo-500 bg-indigo-950/20 text-indigo-400 font-bold' : 'border-zinc-800 bg-zinc-900 text-zinc-500'}`}>
                    {audioHumEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
                    <span>Ambient Drone {audioHumEnabled ? 'ON' : 'OFF'}</span>
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center my-auto py-8">
                  <span className="text-zinc-600 font-mono text-xs tracking-widest uppercase mb-2">{timerActive ? 'DEEP COGNITIVE INTEGRATION ACTIVE' : 'SYSTEM IDLE'}</span>
                  <div className="font-mono text-7xl sm:text-8xl font-black text-[#fafafa] tracking-tight tabular-nums select-none">
                    {timerMode === 'stopwatch' ? formatStopwatch(stopwatchElapsed) : formatTimer(timeLeft)}
                  </div>
                  <div className="w-full max-w-sm h-1 bg-zinc-950 border border-zinc-900 mt-8 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 transition-all duration-1000" 
                      style={{ width: timerMode === 'stopwatch' ? '100%' : `${((timerMode === 'Short Session' ? 25 * 60 : 90 * 60) - timeLeft) / ((timerMode === 'Short Session' ? 25 : 90) * 60) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 border-t border-zinc-800/50 pt-6">
                  {timerActive ? (
                    <>
                      <button onClick={() => setTimerActive(false)} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 font-mono text-xs font-bold uppercase rounded-sm flex items-center gap-2"><Pause size={14} /><span>PAUSE</span></button>
                      {timerMode === 'stopwatch' ? (
                        <button onClick={handleStopwatchFinish} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-mono text-xs font-bold uppercase rounded-sm flex items-center gap-2"><Check size={14} /><span>FINISH & LOG</span></button>
                      ) : (
                        <button onClick={() => { setTimerActive(false); setTimeLeft(timerMode === 'Short Session' ? 25 * 60 : 90 * 60); }} className="px-6 py-2.5 bg-red-950 border border-red-900 text-red-400 text-xs font-mono font-bold uppercase rounded-sm">ABANDON</button>
                      )}
                    </>
                  ) : (
                    <button onClick={() => setTimerActive(true)} className="px-10 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold tracking-widest uppercase rounded-sm flex items-center gap-2.5"><Play size={14} className="fill-current" /><span>START COGNITIVE BLOCK</span></button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <section className="bg-[#131315] border border-zinc-800 p-6 rounded-sm">
                  <div className="flex items-center gap-2 text-indigo-400 mb-3"><Compass size={16} /><h3 className="font-mono text-xs font-bold uppercase tracking-wider">40Hz Binaural Hum</h3></div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">Binaural beats play slightly offset audio signals to stimulate a 4Hz Delta-Theta wave. This stimulates active prefrontal cortex focus without causing caffeine-like jitters.</p>
                </section>
                <section className="bg-[#131315] border border-zinc-800 p-6 rounded-sm">
                  <div className="flex items-center gap-2 text-indigo-400 mb-3"><Clock size={16} /><h3 className="font-mono text-xs font-bold uppercase tracking-wider">The 90-Min Ultradian Block</h3></div>
                  <p className="text-xs text-zinc-400 leading-relaxed">Our brains naturally run on 90-minute Long Session cycles. Deep work is most efficient when scheduled in a single unbroken block.</p>
                </section>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-6 flex-grow">
            <div className="bg-[#131315] border border-zinc-800 p-4 rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {['All', 'University Assignments / Projects', 'Web Development Practice Focus', 'Screen-Free Hour', 'Milestone Achieved'].map((cat) => (
                  <button key={cat} onClick={() => setFilters(p => ({ ...p, category: cat }))} className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider border rounded-sm transition-all ${filters.category === cat ? 'border-indigo-500 bg-indigo-950/20 text-indigo-400 font-bold' : 'border-zinc-800 bg-zinc-900 text-zinc-400'}`}>{cat}</button>
                ))}
              </div>
              <input 
                type="text" 
                value={filters.search} 
                onChange={(e) => setFilters(p => ({ ...p, search: e.target.value }))} 
                placeholder="Search logs..." 
                className="bg-[#09090b] border border-zinc-800 text-zinc-200 text-xs px-3 py-2 focus:border-indigo-500 focus:outline-none rounded-sm w-full md:w-64" 
              />
            </div>

            <section className="bg-[#131315] border border-zinc-800 rounded-sm">
              <div className="divide-y divide-zinc-800/60">
                {filteredTimeline.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-zinc-900/40 flex justify-between items-start gap-4">
                    <div className="flex items-start gap-4">
                      <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 text-indigo-400 font-mono text-[10px] font-bold rounded-sm shrink-0">DAY {item.day}</span>
                      <div>
                        <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-zinc-800 text-zinc-400 border border-zinc-700/50 rounded-sm uppercase tracking-wide inline-block mb-1">{item.category}</span>
                        <p className="text-zinc-200 text-sm">{item.desc}</p>
                        <p className="text-[10px] font-mono text-zinc-500 mt-1">{formatEventTime(item.timestamp)}</p>
                      </div>
                    </div>
                    <button onClick={() => setTimeline(timeline.filter(i => i.id !== item.id))} className="text-zinc-500 hover:text-red-400 p-1"><Trash2 size={13} /></button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
            {[
              { id: 'A', title: 'Prefrontal Cortex Stabilization', desc: 'Stabilizing neural connections in the prefrontal cortex is crucial for long-term attention shifts. Avoid immediate dopamine triggers upon waking to maintain cognitive stability.', icon: <Activity size={15} /> },
              { id: 'B', title: 'Ultradian Recovery (NSDR)', desc: 'Non-Sleep Deep Rest (NSDR) resets cognitive exhaustion levels by 50% compared to typical unstructured screen browsing. Use this immediately following focus sprints.', icon: <Moon size={15} /> },
              { id: 'C', title: 'Dopamine Fasting Ratios', desc: 'High-stimulating environments weaken neural attention pathways. By forcing structural boredom blocks daily, focus pathways recover deep resilience.', icon: <FileText size={15} /> }
            ].map(protocol => (
              <article key={protocol.id} className="bg-[#131315] border border-zinc-800 p-6 rounded-sm flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4"><span className="text-[10px] font-mono text-indigo-400 font-bold uppercase">PROTOCOL {protocol.id}</span>{protocol.icon}</div>
                  <h3 className="text-zinc-100 font-bold text-base mb-2">{protocol.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">{protocol.desc}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6 flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#131315] border border-zinc-800 p-5 rounded-sm">
                <p className="text-[10px] font-mono text-zinc-500 uppercase">DEEP WORK SESSIONS</p>
                <p className="text-2xl font-bold font-mono text-[#fafafa] mt-2 tabular-nums">{stats.deepSessions}</p>
                <p className="text-[9px] font-mono text-zinc-500 mt-1 uppercase">EST. {stats.deepHours} TOTAL FOCUS HOURS</p>
              </div>
              <div className="bg-[#131315] border border-zinc-800 p-5 rounded-sm">
                <p className="text-[10px] font-mono text-zinc-500 uppercase">MEDITATION METRICS</p>
                <p className="text-2xl font-bold font-mono text-[#fafafa] mt-2 tabular-nums">{stats.meditativeHours} hrs</p>
                <p className="text-[9px] font-mono text-zinc-500 mt-1 uppercase">PREFRONTAL CORTEX STABILITY</p>
              </div>
              <div className="bg-[#131315] border border-zinc-800 p-5 rounded-sm">
                <p className="text-[10px] font-mono text-zinc-500 uppercase">DOPAMINE RESETS</p>
                <p className="text-2xl font-bold font-mono text-[#fafafa] mt-2 tabular-nums">{stats.screenFree}</p>
                <p className="text-[9px] font-mono text-zinc-500 mt-1 uppercase">60M UNPLUGGED CORES COMPLETED</p>
              </div>
              <div className="bg-[#131315] border border-zinc-800 p-5 rounded-sm">
                <p className="text-[10px] font-mono text-zinc-500 uppercase">STABILITY FACTOR</p>
                <p className="text-2xl font-bold font-mono text-indigo-400 mt-2 tabular-nums">{stats.consistency}%</p>
                <p className="text-[9px] font-mono text-zinc-500 mt-1 uppercase">COGNITIVE SPRINT RATIO</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-[#131315] border border-zinc-800 p-6 rounded-sm">
                <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] font-semibold uppercase block mb-6">FOCUS DENSITY DISTRIBUTIONS</span>
                <div className="h-64 flex items-end justify-between gap-3 border-b border-zinc-800 pb-3">
                  {[
                    { label: 'Deep Work', value: stats.deepSessions, max: 12, color: '#4f46e5' },
                    { label: 'Web Development Practice', value: Math.round(stats.meditativeHours * 2), max: 12, color: '#6366f1' },
                    { label: 'Dopamine Resets', value: stats.screenFree, max: 12, color: '#818cf8' },
                    { label: 'Milestones', value: stats.milestones, max: 12, color: '#a5b4fc' },
                  ].map((bar, idx) => {
                    const percentage = Math.min(100, Math.max(10, Math.round((bar.value / bar.max) * 100)));
                    return (
                      <div key={idx} className="flex-grow flex flex-col items-center h-full justify-end group">
                        <div className="w-full max-w-16 bg-zinc-950 border border-zinc-900 h-full rounded-sm overflow-hidden flex items-end">
                          <div className="w-full transition-all duration-1000" style={{ height: `${percentage}%`, backgroundColor: bar.color }} />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 mt-3 uppercase tracking-wider text-center truncate w-full select-none">{bar.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-auto pt-6 border-t border-zinc-900/80 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 opacity-50 text-[10px] font-mono tracking-tight text-zinc-500">
          <p>© {new Date().getFullYear()} FOCUS_FLOW NEURAL INTERFACE. ALL RIGHTS RESERVED.</p>
        </footer>
      </main>

      {/* ================= CRITICAL ANCHOR / RELAPSE MODAL ================= */}
      {resetModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
          <div className="bg-[#131315] border border-zinc-800 w-full max-w-md rounded-sm p-6 relative">
            <button onClick={() => setResetModal(p => ({ ...p, isOpen: false }))} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200"><X size={18} /></button>
            <h3 className="text-zinc-100 font-extrabold text-lg uppercase mb-1 flex items-center gap-2"><AlertTriangle className="text-red-500" size={18} /><span>COGNITIVE CONTINUITY REGISTRY</span></h3>
            <p className="text-xs text-zinc-500 font-mono mb-6 uppercase tracking-wider">Manage streak start-points & anchors</p>

            <form onSubmit={handleCustomAnchorReset} className="space-y-4 border-t border-zinc-800/80 pt-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Option A: Set Custom Start Date/Time (Adjust Anchor)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" required value={resetModal.date} onChange={(e) => setResetModal(p => ({ ...p, date: e.target.value }))} className="bg-[#09090b] border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-indigo-500" />
                  <input type="time" value={resetModal.time} onChange={(e) => setResetModal(p => ({ ...p, time: e.target.value }))} className="bg-[#09090b] border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
              <button type="submit" className="w-full py-2 bg-zinc-900 border border-zinc-800 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest rounded-sm">Apply Adjusted Anchor</button>
            </form>

            <div className="my-5 border-t border-zinc-800/80 pt-5">
              <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Option B: Strict Relapse Reset (Reset to Zero)</label>
              <button onClick={handleSystemRelapse} className="w-full py-2.5 bg-red-950 border border-red-900 text-red-300 font-mono text-xs font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-2">
                <span>Reset Continuance to Zero (Now)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
