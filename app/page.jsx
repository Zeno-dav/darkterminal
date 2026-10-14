"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserSystem() {
  const [appSettings, setAppSettings] = useState({
    brandName: 'ZENO_MAINFRAME',
    appVersion: '5.0.0',
    topBannerBroadcast: '⚠️ LIVE: NEW API NODES ADDED'
  });

  const [userTheme, setUserTheme] = useState('galaxy'); // 'hacker' or 'galaxy'
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner', 'vip', 'profile'
  
  const [targetNumber, setTargetNumber] = useState('');
  const [utrInput, setUtrInput] = useState('');
  
  // Search States
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [terminalLogs, setTerminalLogs] = useState([]);

  // Mock Fetching Settings
  useEffect(() => {
    fetch('/api/settings').then(res => res.json()).then(data => {
      if(data.brandName) setAppSettings(data);
    }).catch(() => {});
  }, []);

  const addLog = (msg) => {
    setTerminalLogs(prev => [...prev, msg]);
  };

  const handleSearch = () => {
    if (targetNumber.length < 10) return alert('Enter valid 10-digit number');
    
    setIsSearching(true);
    setSearchResult(null);
    setTerminalLogs([]);
    
    addLog(`> [INITIATING] Bypassing security protocols for ${targetNumber}...`);
    
    setTimeout(() => {
      addLog('> [EXTRACTING] Node 1 connected...');
    }, 800);

    setTimeout(() => {
      const data = {
        name: "Rahul Sharma",
        fatherName: "Suresh Sharma",
        number: targetNumber,
        circle: "Delhi",
        operator: "Jio - 5G",
        address: "Sector 9, New Delhi, India",
        status: "ACTIVE"
      };
      setSearchResult(data);
      setIsSearching(false);
      addLog('> [SUCCESS] Payload decrypted and ready.');
    }, 2000);
  };

  // ================= THEME STYLES =================
  const isHacker = userTheme === 'hacker';
  const bgColor = isHacker ? "bg-black text-[#00ff00]" : "bg-[#05020f] text-[#00f0ff]";
  const cardStyle = isHacker 
    ? "border border-[#00ff00] p-6 bg-black/90 font-mono" 
    : "bg-[#110826]/60 backdrop-blur-xl border border-[#ff00ff]/30 p-6 rounded-2xl shadow-[0_0_30px_rgba(255,0,255,0.15)] font-sans text-white";
  const inputStyle = isHacker 
    ? "bg-transparent border border-[#00ff00] p-3 w-full focus:outline-none text-[#00ff00] font-mono" 
    : "bg-[#000]/50 border-b-2 border-[#00f0ff]/50 p-3 w-full focus:outline-none focus:border-[#ff00ff] text-white rounded-t-lg transition-colors";
  const btnStyle = isHacker 
    ? "px-6 py-3 font-bold bg-[#00ff00]/20 hover:bg-[#00ff00]/40 border border-[#00ff00] text-[#00ff00] uppercase transition-all" 
    : "px-6 py-3 font-bold rounded-lg bg-gradient-to-r from-[#00f0ff]/20 to-[#ff00ff]/20 hover:from-[#00f0ff]/40 hover:to-[#ff00ff]/40 border border-[#ff00ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.4)] text-white transition-all";
  const tabStyle = (tab) => {
    if (isHacker) return `p-3 uppercase border ${activeTab === tab ? 'bg-[#00ff00]/30 font-bold' : 'hover:bg-[#00ff00]/10 border-[#00ff00]/50'}`;
    return `p-3 px-6 rounded-full font-bold transition-all ${activeTab === tab ? 'bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black shadow-[0_0_15px_rgba(255,0,255,0.6)]' : 'border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/10'}`;
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${bgColor}`}>
      {/* Galaxy Background Effect (Only in Galaxy Mode) */}
      {!isHacker && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 animate-pulse pointer-events-none"></div>}

      {/* Top Banner */}
      <div className={`relative z-10 w-full text-center py-2 text-sm font-bold tracking-widest ${isHacker ? 'bg-red-900/50 text-red-500 border-b border-red-500' : 'bg-gradient-to-r from-[#ff00ff]/30 to-[#00f0ff]/30 text-white backdrop-blur-md'}`}>
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          {appSettings.topBannerBroadcast}
        </motion.span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto p-4 md:p-8">
        
        {/* HEADER & THEME TOGGLE */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className={`text-3xl md:text-4xl font-extrabold tracking-widest ${isHacker ? 'drop-shadow-[0_0_10px_#00ff00]' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] drop-shadow-[0_0_15px_rgba(255,0,255,0.6)]'}`}
          >
            {appSettings.brandName} <span className="text-sm opacity-50">v{appSettings.appVersion}</span>
          </motion.h1>

          <button onClick={() => setUserTheme(isHacker ? 'galaxy' : 'hacker')} className={`mt-4 md:mt-0 ${btnStyle} py-2 px-4 rounded-full flex items-center gap-2`}>
            {isHacker ? '🌌 SWITCH TO GALAXY' : '💻 SWITCH TO HACKER'}
          </button>
        </header>

        {/* USER NAVIGATION TABS */}
        <div className="flex gap-2 md:gap-4 mb-8 overflow-x-auto pb-2">
          <button onClick={() => setActiveTab('scanner')} className={tabStyle('scanner')}>🎯 SCANNER</button>
          <button onClick={() => setActiveTab('vip')} className={tabStyle('vip')}>💎 VIP STORE</button>
          <button onClick={() => setActiveTab('profile')} className={tabStyle('profile')}>👤 PROFILE & WALLET</button>
        </div>

        {/* ================= TAB CONTENTS ================= */}
        <AnimatePresence mode="wait">
          
          {/* 1. SCANNER TAB */}
          {activeTab === 'scanner' && (
            <motion.div key="scanner" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
              
              <div className={cardStyle}>
                <h2 className={`text-xl mb-4 flex items-center gap-2 ${isHacker ? 'border-b border-[#00ff00] pb-2' : 'text-[#ff00ff] font-bold'}`}>
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>📡</motion.span>
                  TARGET_PROBE
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input type="number" value={targetNumber} onChange={e => setTargetNumber(e.target.value)} placeholder="Enter Target Identity Number..." className={inputStyle} />
                  <button onClick={handleSearch} disabled={isSearching} className={btnStyle}>
                    {isSearching ? <motion.span animate={{ opacity: [1,0.5,1] }} transition={{repeat:Infinity}}>SCANNING...</motion.span> : 'EXECUTE'}
                  </button>
                </div>
              </div>

              {/* DYNAMIC DATA PRESENTATION BASED ON THEME */}
              <div className={cardStyle}>
                
                {/* Searching Animation */}
                {isSearching && (
                  <div className="flex flex-col items-center justify-center py-8 opacity-70">
                    <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-4xl mb-4">
                      {isHacker ? '⚙️' : '🌀'}
                    </motion.div>
                    <p className="animate-pulse">{isHacker ? '> Decrypting hashes...' : 'Establishing neural link...'}</p>
                  </div>
                )}

                {/* HACKER THEME OUTPUT (Raw JSON & Terminal Logs) */}
                {isHacker && !isSearching && searchResult && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-sm space-y-2">
                    {terminalLogs.map((log, i) => <p key={i} className="opacity-70">{log}</p>)}
                    <div className="border border-[#00ff00]/50 p-4 mt-4 bg-black/50">
                      <p className="text-white mb-2">{'>'} INFILTRATION SUCCESSFUL. PAYLOAD DUMP:</p>
                      <pre className="text-[#00ff00] overflow-x-auto">
                        {JSON.stringify({
                          "status": 200,
                          "clearance": "ROOT",
                          "data": searchResult
                        }, null, 2)}
                      </pre>
                    </div>
                  </motion.div>
                )}

                {/* GALAXY THEME OUTPUT (Modern Glass Cards) */}
                {!isHacker && !isSearching && searchResult && (
                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
                    <div className="flex items-center gap-3 mb-6 border-b border-[#00f0ff]/30 pb-4">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-3xl">✅</motion.div>
                      <div>
                        <h3 className="text-xl text-[#00f0ff] font-bold">IDENTITY VERIFIED</h3>
                        <p className="text-sm opacity-70">Secure data extracted from neural net.</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#000]/40 p-4 rounded-xl border border-[#ff00ff]/20 flex items-center gap-3">
                        <span className="text-2xl">👤</span>
                        <div><p className="text-xs opacity-60">Name</p><p className="font-bold text-lg">{searchResult.name}</p></div>
                      </div>
                      <div className="bg-[#000]/40 p-4 rounded-xl border border-[#ff00ff]/20 flex items-center gap-3">
                        <span className="text-2xl">📱</span>
                        <div><p className="text-xs opacity-60">Comm-Link</p><p className="font-bold text-lg text-[#00f0ff]">{searchResult.number}</p></div>
                      </div>
                      <div className="bg-[#000]/40 p-4 rounded-xl border border-[#ff00ff]/20 flex items-center gap-3">
                        <span className="text-2xl">📡</span>
                        <div><p className="text-xs opacity-60">Network Node</p><p className="font-bold">{searchResult.operator} - {searchResult.circle}</p></div>
                      </div>
                      <div className="bg-[#000]/40 p-4 rounded-xl border border-[#ff00ff]/20 flex items-center gap-3">
                        <span className="text-2xl">📍</span>
                        <div><p className="text-xs opacity-60">Registered Coordinates</p><p className="font-bold text-sm">{searchResult.address}</p></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Idle State */}
                {!isSearching && !searchResult && (
                  <div className="py-8 text-center opacity-50">
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-4xl mb-2">🛰️</motion.div>
                    <p>{isHacker ? '> SYSTEM IDLE. WAITING FOR TARGET.' : 'Ready to scan the galaxy.'}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 2. VIP STORE TAB */}
          {activeTab === 'vip' && (
            <motion.div key="vip" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={cardStyle}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}>💎</motion.span>
                  ACCESS PASSES
                </h2>
                {[
                  { name: '7 Days Starter', price: 49 },
                  { name: '30 Days Pro', price: 120 },
                  { name: '365 Days Elite', price: 499 }
                ].map((plan, i) => (
                  <div key={i} className="flex justify-between items-center mb-4 bg-black/40 p-3 rounded-lg border border-white/10">
                    <span>{plan.name}</span>
                    <button className={btnStyle.replace('px-6 py-3', 'px-4 py-1 text-sm')}>₹{plan.price}</button>
                  </div>
                ))}
              </div>

              <div className={cardStyle}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">🎁 REDEEM VOUCHER</h2>
                <input type="text" placeholder="Enter Secret Code..." className={`${inputStyle} mb-4`} />
                <button className={`w-full ${btnStyle}`}>CLAIM REWARD</button>
              </div>
            </motion.div>
          )}

          {/* 3. PROFILE & WALLET TAB */}
          {activeTab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={cardStyle}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">🛡️ OPERATOR IDENTITY</h2>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/10 pb-2"><span>CLEARANCE:</span> <span className="font-bold text-red-500">FREE_TIER</span></div>
                  <div className="flex justify-between border-b border-white/10 pb-2"><span>VAULT CREDITS:</span> <span className="font-bold text-[#00f0ff]">₹0</span></div>
                  <div className="flex justify-between border-b border-white/10 pb-2"><span>UID:</span> <span>69686894</span></div>
                </div>
              </div>

              <div className={cardStyle}>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">💰 ADD CREDITS</h2>
                <div className="w-full h-32 mb-4 flex items-center justify-center bg-black/50 border border-white/20 rounded-lg">
                  <span className="opacity-50 flex flex-col items-center gap-2">
                    <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity }}>📷</motion.span>
                    [ SCAN UPI QR ]
                  </span>
                </div>
                <input type="text" value={utrInput} onChange={e => setUtrInput(e.target.value)} placeholder="Enter 12-digit UTR..." className={`${inputStyle} mb-4`} />
                <button className={`w-full ${btnStyle}`}>VERIFY PAYMENT</button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
