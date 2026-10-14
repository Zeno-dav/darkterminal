"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminSystem() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminTab, setAdminTab] = useState('general');

  const [appSettings, setAppSettings] = useState({
    brandName: 'Loading...',
    themeColor: '#ff003c',
    appVersion: '...',
    topBannerBroadcast: ''
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setAppSettings(data));
  }, []);

  const handleSaveSettings = async () => {
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appSettings)
    });
    alert('Settings Updated Successfully!');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminId === '5659051138' && adminPass === 'zeno123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('[ACCESS DENIED] Invalid Credentials.');
    }
  };

  const dynamicStyle = { color: appSettings.themeColor, borderColor: appSettings.themeColor, boxShadow: `0 0 10px ${appSettings.themeColor}33` };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-black" style={{ color: '#ff003c' }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="border border-red-500 p-8 bg-black max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center tracking-widest animate-pulse">ROOT_AUTH_REQUIRED</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" value={adminId} onChange={(e) => setAdminId(e.target.value)} placeholder="ADMIN_ID" className="w-full bg-transparent border border-red-500 p-2 focus:outline-none" />
            <input type="password" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} placeholder="PASSWORD" className="w-full bg-transparent border border-red-500 p-2 focus:outline-none" />
            {loginError && <p className="text-sm font-bold animate-pulse text-red-500">{loginError}</p>}
            <button type="submit" className="w-full bg-red-900/30 border border-red-500 py-2 hover:bg-red-500 hover:text-black font-bold">INITIALIZE_SESSION</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 relative z-10 bg-black" style={dynamicStyle}>
      <header className="flex justify-between items-center border-b pb-4 mb-6" style={{ borderColor: appSettings.themeColor }}>
        <h1 className="text-3xl font-bold tracking-widest">ZENO_ROOT_ACCESS</h1>
        <button onClick={() => setIsAuthenticated(false)} className="px-4 py-1 border hover:bg-white/10" style={dynamicStyle}>LOGOUT</button>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-48 flex flex-col gap-2 border-r pr-4" style={{ borderColor: appSettings.themeColor }}>
          {['general', 'users', 'apis'].map(tab => (
            <button key={tab} onClick={() => setAdminTab(tab)} className={`text-left p-2 border hover:bg-white/10 ${adminTab === tab ? 'bg-white/20' : ''}`} style={dynamicStyle}>
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex-grow border p-6 bg-black/80" style={dynamicStyle}>
          {adminTab === 'general' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-2xl border-b pb-2 mb-4" style={{ borderColor: appSettings.themeColor }}>GENERAL_SETTINGS</h2>
              
              <div>
                <label className="block text-sm mb-1">Web App Name (Brand)</label>
                <input type="text" value={appSettings.brandName} onChange={e => setAppSettings({...appSettings, brandName: e.target.value})} className="bg-transparent border p-2 w-full focus:outline-none" style={dynamicStyle} />
              </div>
              
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm mb-1">System Version</label>
                  <input type="text" value={appSettings.appVersion} onChange={e => setAppSettings({...appSettings, appVersion: e.target.value})} className="bg-transparent border p-2 w-full focus:outline-none" style={dynamicStyle} />
                </div>
                <div>
                  <label className="block text-sm mb-1">Theme Color (Hex)</label>
                  <input type="color" value={appSettings.themeColor} onChange={e => setAppSettings({...appSettings, themeColor: e.target.value})} className="h-10 w-20 bg-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">24x7 Broadcast Banner</label>
                <input type="text" value={appSettings.topBannerBroadcast} onChange={e => setAppSettings({...appSettings, topBannerBroadcast: e.target.value})} className="bg-transparent border p-2 w-full focus:outline-none" style={dynamicStyle} />
              </div>

              <button onClick={handleSaveSettings} className="px-6 py-2 border font-bold hover:bg-white/10" style={dynamicStyle}>SAVE SETTINGS TO DATABASE</button>
            </motion.div>
          )}

          {adminTab !== 'general' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl mb-4 border-b pb-2" style={{ borderColor: appSettings.themeColor }}>{adminTab.toUpperCase()}_PANEL</h2>
              <p>Module loaded. Ready for input.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
