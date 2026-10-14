"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminSystem() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminTab, setAdminTab] = useState('apis'); // Default tab

  // ==========================================
  // ALL ADMIN STATES (Will be saved to MongoDB)
  // ==========================================
  const [appSettings, setAppSettings] = useState({
    brandName: 'ZENO_GALAXY',
    themeColor: '#00f0ff',
    topBannerBroadcast: 'System Online',
    weeklyFreeLimit: 1, // /set_limit
    scanPrice: 2,       // /set_price
  });

  const [apis, setApis] = useState([
    { id: 1, name: 'Zeno_Main', url: 'https://zenonnumtoinfo2.vercel.app/api', key: 'zeno_premium_key', isActive: true },
    { id: 2, name: 'Zeno_Fallback', url: 'https://zenonnumtoinfo.vercel.app/api', key: 'zeno_premium_key', isActive: true }
  ]);

  const [vipPlans, setVipPlans] = useState([
    { id: 1, name: '7 Days Starter', days: 7, price: 49 },
    { id: 2, name: '30 Days Pro', days: 30, price: 120 },
    { id: 3, name: '365 Days Elite', days: 365, price: 499 }
  ]);

  const [channels, setChannels] = useState([
    { id: 1, name: 'Proof Channel', url: 'https://t.me/proofxy2' }
  ]);

  // Temporary States for Inputs
  const [newApi, setNewApi] = useState({ name: '', url: '', key: '' });
  const [targetUserId, setTargetUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [days, setDays] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');

  const neonBtn = "px-4 py-2 font-bold rounded bg-[#00f0ff]/20 hover:bg-[#00f0ff]/40 border border-[#00f0ff]/50 text-white transition-all text-sm";
  const neonInput = "bg-transparent border border-[#00f0ff]/50 p-2 text-white focus:outline-none focus:border-[#00f0ff] w-full rounded";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-[#00f0ff]">
        <div className="border border-[#00f0ff] p-8 bg-black/80 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center animate-pulse">ROOT_AUTH_REQUIRED</h2>
          <button onClick={() => setIsAuthenticated(true)} className={`w-full ${neonBtn}`}>BYPASS LOGIN (DEV MODE)</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <header className="flex justify-between items-center border-b border-[#00f0ff]/30 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-[#00f0ff]">ZENO_COMMAND_CENTER</h1>
        <button onClick={() => setIsAuthenticated(false)} className="text-red-500 border border-red-500 px-4 py-1 hover:bg-red-900/50">DISCONNECT</button>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* SIDEBAR TABS */}
        <div className="w-full lg:w-56 flex flex-col gap-2 border-r border-[#00f0ff]/30 pr-4">
          {['apis', 'users', 'pricing & limits', 'gift codes', 'branding', 'broadcast'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setAdminTab(tab)} 
              className={`text-left p-2 border border-[#00f0ff]/30 uppercase text-sm ${adminTab === tab ? 'bg-[#00f0ff]/30 font-bold text-[#00f0ff]' : 'hover:bg-[#00f0ff]/10'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-grow bg-[#110826]/60 border border-[#00f0ff]/30 p-6 rounded shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          
          {/* ========================================================
              1. API MANAGER (DYNAMIC APIs)
          ======================================================== */}
          {adminTab === 'apis' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#00f0ff] border-b border-[#00f0ff]/30 pb-2">API ENDPOINT CLUSTER</h2>
              <div className="flex flex-wrap gap-2">
                <input type="text" placeholder="Name (e.g. Server 1)" value={newApi.name} onChange={e => setNewApi({...newApi, name: e.target.value})} className={neonInput} style={{flex: '1 1 150px'}} />
                <input type="text" placeholder="URL (https://...)" value={newApi.url} onChange={e => setNewApi({...newApi, url: e.target.value})} className={neonInput} style={{flex: '2 1 300px'}} />
                <input type="text" placeholder="API Key" value={newApi.key} onChange={e => setNewApi({...newApi, key: e.target.value})} className={neonInput} style={{flex: '1 1 150px'}} />
                <button onClick={() => { setApis([...apis, { ...newApi, id: Date.now(), isActive: true }]); setNewApi({name:'', url:'', key:''}) }} className={neonBtn}>+ INJECT API</button>
              </div>
              
              <div className="space-y-2 mt-4">
                {apis.map(api => (
                  <div key={api.id} className="flex justify-between items-center border border-[#00f0ff]/20 p-3 bg-black/40">
                    <div>
                      <p className="font-bold text-[#00f0ff]">{api.name} <span className={`text-xs px-2 py-0.5 rounded ${api.isActive ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>{api.isActive ? 'ACTIVE' : 'DISABLED'}</span></p>
                      <p className="text-xs opacity-70">{api.url} | Key: {api.key}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setApis(apis.map(a => a.id === api.id ? {...a, isActive: !a.isActive} : a))} className="px-3 py-1 border border-yellow-500 text-yellow-500 hover:bg-yellow-900/30 text-xs">TOGGLE</button>
                      <button onClick={() => setApis(apis.filter(a => a.id !== api.id))} className="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-900/30 text-xs">REMOVE</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              2. USER MANAGEMENT (/uso, /addbalance, /ban, /addtime)
          ======================================================== */}
          {adminTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#00f0ff] border-b border-[#00f0ff]/30 pb-2">USER MANAGEMENT</h2>
              <div className="flex gap-2 max-w-md">
                <input type="text" placeholder="Enter User ID to manage..." value={targetUserId} onChange={e => setTargetUserId(e.target.value)} className={neonInput} />
                <button className={neonBtn}>FETCH</button>
              </div>

              {targetUserId && (
                <div className="border border-[#00f0ff]/50 p-4 bg-black/50 space-y-4">
                  <p>Targeting User: <span className="font-bold text-[#00f0ff]">{targetUserId}</span></p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#00f0ff]/20 pt-4">
                    {/* Wallet Actions */}
                    <div className="space-y-2">
                      <input type="number" placeholder="Amount (₹)" value={amount} onChange={e => setAmount(e.target.value)} className={neonInput} />
                      <div className="flex gap-2">
                        <button className="flex-1 px-2 py-2 border border-green-500 text-green-400 hover:bg-green-900/30 text-xs font-bold">+ ADD BALANCE</button>
                        <button className="flex-1 px-2 py-2 border border-red-500 text-red-400 hover:bg-red-900/30 text-xs font-bold">- DEDUCT BAL</button>
                      </div>
                    </div>
                    
                    {/* VIP Actions */}
                    <div className="space-y-2">
                      <input type="number" placeholder="VIP Days" value={days} onChange={e => setDays(e.target.value)} className={neonInput} />
                      <div className="flex gap-2">
                        <button className="flex-1 px-2 py-2 border border-blue-500 text-blue-400 hover:bg-blue-900/30 text-xs font-bold">+ ADD VIP TIME</button>
                        <button className="flex-1 px-2 py-2 border border-yellow-500 text-yellow-400 hover:bg-yellow-900/30 text-xs font-bold">- DEDUCT TIME</button>
                      </div>
                    </div>
                  </div>

                  {/* Security Actions */}
                  <div className="flex gap-2 pt-4 border-t border-[#00f0ff]/20">
                    <button className="flex-1 py-2 bg-red-900/30 border border-red-500 text-red-500 hover:bg-red-600 hover:text-white font-bold transition-all">🚫 BAN USER</button>
                    <button className="flex-1 py-2 bg-green-900/30 border border-green-500 text-green-500 hover:bg-green-600 hover:text-white font-bold transition-all">✅ UNBAN USER</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              3. PRICING & LIMITS (/set_price, /set_limit, /setplan)
          ======================================================== */}
          {adminTab === 'pricing & limits' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-[#00f0ff] border-b border-[#00f0ff]/30 pb-2 mb-4">GLOBAL LIMITS</h2>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div>
                    <label className="text-xs opacity-70">Weekly Free Searches</label>
                    <input type="number" value={appSettings.weeklyFreeLimit} onChange={e => setAppSettings({...appSettings, weeklyFreeLimit: e.target.value})} className={neonInput} />
                  </div>
                  <div>
                    <label className="text-xs opacity-70">Paid Scan Price (₹)</label>
                    <input type="number" value={appSettings.scanPrice} onChange={e => setAppSettings({...appSettings, scanPrice: e.target.value})} className={neonInput} />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#00f0ff] border-b border-[#00f0ff]/30 pb-2 mb-4">VIP PLANS CONFIG</h2>
                <div className="space-y-2">
                  {vipPlans.map(plan => (
                    <div key={plan.id} className="flex flex-wrap gap-2 items-center border border-[#00f0ff]/20 p-2 bg-black/40">
                      <span className="w-16 font-bold text-sm">Plan {plan.id}:</span>
                      <input type="text" value={plan.name} onChange={e => setVipPlans(vipPlans.map(p => p.id === plan.id ? {...p, name: e.target.value} : p))} className={neonInput} style={{flex: '2 1 150px'}} />
                      <input type="number" value={plan.days} onChange={e => setVipPlans(vipPlans.map(p => p.id === plan.id ? {...p, days: e.target.value} : p))} placeholder="Days" className={neonInput} style={{flex: '1 1 80px'}} />
                      <input type="number" value={plan.price} onChange={e => setVipPlans(vipPlans.map(p => p.id === plan.id ? {...p, price: e.target.value} : p))} placeholder="₹" className={neonInput} style={{flex: '1 1 80px'}} />
                    </div>
                  ))}
                  <button className={`mt-2 ${neonBtn}`}>SAVE PLAN CONFIG</button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              4. GIFT CODES (/gen_final)
          ======================================================== */}
          {adminTab === 'gift codes' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#00f0ff] border-b border-[#00f0ff]/30 pb-2">VOUCHER GENERATOR</h2>
              <div className="flex gap-2 max-w-lg">
                <input type="number" placeholder="VIP Days to give" className={neonInput} />
                <input type="number" placeholder="Max Claim Limit (Users)" className={neonInput} />
                <button className={neonBtn}>GENERATE CODE</button>
              </div>
              <div className="border border-[#00f0ff]/30 p-4 mt-4 bg-black/50 text-center">
                <p className="opacity-70 text-sm">Generated Code will appear here</p>
                <p className="text-2xl font-bold tracking-widest text-[#00f0ff] mt-2">ZENO-XXXX-XXXX</p>
              </div>
            </div>
          )}

          {/* ========================================================
              5. BRANDING & CHANNELS (/addchnnl)
          ======================================================== */}
          {adminTab === 'branding' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-[#00f0ff] border-b border-[#00f0ff]/30 pb-2 mb-4">WEB BRANDING</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs opacity-70">App Name</label>
                    <input type="text" value={appSettings.brandName} onChange={e => setAppSettings({...appSettings, brandName: e.target.value})} className={neonInput} />
                  </div>
                  <div>
                    <label className="text-xs opacity-70">Theme Color (Hex)</label>
                    <input type="color" value={appSettings.themeColor} onChange={e => setAppSettings({...appSettings, themeColor: e.target.value})} className="h-10 w-full bg-transparent border border-[#00f0ff]/50 rounded" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#00f0ff] border-b border-[#00f0ff]/30 pb-2 mb-4">SUPPORT CHANNELS (FORCE JOIN LINKS)</h2>
                <div className="flex gap-2 mb-4">
                  <input type="text" placeholder="Channel Name" className={neonInput} />
                  <input type="text" placeholder="URL (https://t.me/...)" className={neonInput} />
                  <button className={neonBtn}>+ ADD</button>
                </div>
                {channels.map(ch => (
                  <div key={ch.id} className="flex justify-between items-center border border-[#00f0ff]/20 p-2 mb-2 bg-black/40">
                    <span>{ch.name} <span className="opacity-50 text-sm">({ch.url})</span></span>
                    <button className="text-red-500 hover:underline text-sm">REMOVE</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              6. BROADCAST & NOTIFICATIONS (/broadcast)
          ======================================================== */}
          {adminTab === 'broadcast' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#00f0ff] border-b border-[#00f0ff]/30 pb-2">GLOBAL MESSAGING</h2>
              
              <div>
                <label className="text-xs opacity-70">24x7 Sticky Top Banner</label>
                <input type="text" value={appSettings.topBannerBroadcast} onChange={e => setAppSettings({...appSettings, topBannerBroadcast: e.target.value})} className={neonInput} />
              </div>

              <div className="pt-4 border-t border-[#00f0ff]/30">
                <label className="text-xs opacity-70 mb-2 block">Send Live Push Notification to all connected clients</label>
                <textarea 
                  value={broadcastMsg} 
                  onChange={e => setBroadcastMsg(e.target.value)} 
                  placeholder="Enter HTML or Plain Text Broadcast..." 
                  className={`${neonInput} h-24`} 
                />
                <button className={`w-full mt-2 ${neonBtn} bg-[#00f0ff]/30`}>🚀 DEPLOY GLOBAL BROADCAST</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
