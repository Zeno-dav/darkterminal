import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  brandName: { type: String, default: 'ZENO_MAINFRAME_' },
  themeColor: { type: String, default: '#00ff00' },
  appVersion: { type: String, default: '4.1.0' },
  topBannerBroadcast: { type: String, default: '⚠️ V4.1 Update is LIVE.' }
});

const UserSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  name: { type: String, default: 'Operator' },
  balance: { type: Number, default: 0 },
  isVip: { type: Boolean, default: false }
});

export const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
