"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function UserSystem() {
  const [appSettings, setAppSettings] = useState({
    brandName: 'Loading...',
    themeColor: '#00ff00',
    appVersion: '...'
  });

  const [terminalOutput, setTerminalOutput] = useState(['[SYSTEM] INITIALIZED...', 'Awaiting command...']);
  const [targetNumber, setTargetNumber] = useState('');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setAppSettings(data);
        document.title = data.brandName;
        setTerminalOutput([`[SYSTEM] ${data.brandName} v${data.appVersion} INITIALIZED...`, 'Awaiting command...']);
      });
  }, []);

  const addLog = (msg) => setTerminalOutput(prev => [...prev, `> ${msg}`]);

  const handleSearch = () => {
    if (targetNumber.length < 10) return addLog('[ERROR] Invalid target.');
    addLog(`[PROBE] Scanning databases for: ${targetNumber}...`);
    setTimeout(() => addLog(`[SUCCESS] Data decrypted. Status: ACTIVE`), 1500);
  };

  const dynamicStyle = { color: appSettings.themeColor, borderColor: appSettings.themeColor, boxShadow: `0 0 10px ${appSettings.themeColor}33` };

  return (
    <div className="min-h-screen p-6 relative z-10" style={dynamicStyle}>
      {appSettings.topBannerBroadcast && (
        <div className="w-full text-white text-center py-1 text-sm font-bold tracking-widest animate-pulse border-b mb-4" style={{ backgroundColor: '#220000', borderColor: appSettings.themeColor }}>
          {appSettings.topBannerBroadcast}
        </div>
      )}

      <header className="border-b pb-4 mb-6" style={{ borderColor: appSettings.themeColor }}>
        <h1 className="text-3xl font-bold tracking-widest text-center md:text-left flex items-baseline gap-2">
          {appSettings.brandName} <span className="text-sm opacity-70 animate-pulse">v{appSettings.appVersion}</span>
        </h1>
      </header>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="border p-4 bg-black/80 backdrop-blur-sm" style={dynamicStyle}>
            <h2 className="text-xl mb-4 border-b pb-2" style={{ borderColor: appSettings.themeColor }}>TARGET_SCANNER</h2>
            <div className="flex gap-2">
              <input type="text" value={targetNumber} onChange={(e) => setTargetNumber(e.target.value)} placeholder="Enter 10-digit target..." className="bg-transparent border p-2 w-full focus:outline-none" style={dynamicStyle} />
              <button onClick={handleSearch} className="px-6 font-bold bg-opacity-20 hover:bg-opacity-40 transition-all border" style={{ backgroundColor: appSettings.themeColor, color: '#000', borderColor: appSettings.themeColor }}>EXECUTE</button>
            </div>
          </div>

          <div className="border p-4 h-64 overflow-y-auto bg-gray-900/30 backdrop-blur-sm" style={dynamicStyle}>
            {terminalOutput.map((log, idx) => <div key={idx}>{log}</div>)}
            <span className="animate-pulse">_</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border p-4 space-y-3 bg-black/80 backdrop-blur-sm" style={dynamicStyle}>
            <h3 className="text-lg border-b pb-2" style={{ borderColor: appSettings.themeColor }}>OPERATOR_PROFILE</h3>
            <p>STATUS: <span className="font-bold">FREE_TIER</span></p>
            <p>WALLET: ₹0</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
