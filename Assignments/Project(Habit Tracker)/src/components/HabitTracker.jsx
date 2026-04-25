import React, { useState, useEffect } from 'react';

function HabitTracker() {
  const [startDate, setStartDate] = useState(localStorage.getItem('savedDate') || null);
  const [displayDays, setDisplayDays] = useState(0);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('logs')) || []);

  useEffect(() => {
    let interval;
    if (startDate) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const start = new Date(startDate).getTime();
        const diffInMs = now - start;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        setDisplayDays(diffInDays.toFixed(5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startDate]);

  const handleReset = () => {
    const confirmReset = window.confirm("Kya aap waqai reset karna chahte hain?");
    if (confirmReset) {
      const now = new Date().toISOString();
      localStorage.setItem('savedDate', now);
      setStartDate(now);
      setDisplayDays(0);
    }
  };

  const saveProgress = (e) => {
    e.preventDefault();
    if (!note) return;
    const newLog = {
      id: Date.now(), 
      text: note,
      time: new Date().toLocaleString(),
      dayAtThatTime: Math.floor(displayDays)
    };
    const updatedHistory = [newLog, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('logs', JSON.stringify(updatedHistory));
    setNote("");
  };

  //  Delete Functionality
  const deleteLog = (id) => {
    const confirmDelete = window.confirm("Do You Really Want To Restart Your Tracking Journey");
    if (confirmDelete) {
      const updatedHistory = history.filter(item => item.id !== id);
      setHistory(updatedHistory);
      localStorage.setItem('logs', JSON.stringify(updatedHistory));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 font-sans selection:bg-blue-500/30">
      <div className="max-w-xl mx-auto">
        
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Focus Flow Tracker
          </h1>
          <p className="text-gray-500 text-sm mt-2 tracking-wide uppercase">Rewiring the Brain • Building Focus</p>
        </header>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl mb-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          <h3 className="text-gray-400 font-medium mb-4 uppercase text-xs tracking-[0.2em]">Current Streak</h3>
          <div className="mb-2">
             <span className="text-7xl font-black text-white leading-none">
                {Math.floor(displayDays)}
             </span>
             <span className="text-xl text-blue-400 font-bold ml-2">DAYS</span>
          </div>
          <div className="font-mono text-[10px] text-gray-600 mb-8">LIVE: {displayDays}</div>
          <button onClick={handleReset} className="w-full py-4 rounded-xl font-bold transition-all duration-300 bg-gray-800 hover:bg-red-900/30 text-red-400 border border-red-900/50 hover:border-red-500">
            {startDate ? "RELAPSE / RESET" : "START NEW JOURNEY"}
          </button>
        </div>

        <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-10">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">LOG DAILY WIN</h3>
          <form onSubmit={saveProgress} className="flex flex-col gap-3">
            <input 
              type="text" 
              value={note} 
              onChange={(e) => setNote(e.target.value)} 
              placeholder="E.g. Daily Exercise, finished a MERN module..."
              className="bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all">
              RECORD PROGRESS
            </button>
          </form>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Growth Timeline</h3>
            <div className="h-[1px] w-full bg-gray-800"></div>
          </div>
          
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id || item.time} className="group bg-gray-900/30 border border-gray-800 p-5 rounded-2xl hover:border-gray-700 transition-all relative">
                {/* Delete Button */}
                <button 
                  onClick={() => deleteLog(item.id)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors"
                  title="Delete Entry"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>

                <div className="flex justify-between items-start mb-2 mr-6">
                  <span className="text-xs font-bold px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md">
                    DAY {item.dayAtThatTime}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-1">{item.text}</p>
                <span className="text-[10px] text-gray-600 font-mono italic">{item.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HabitTracker;