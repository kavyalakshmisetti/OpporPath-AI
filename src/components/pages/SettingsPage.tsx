import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OpportunityCategory, WorkType, UserSettings } from '../../types';
import {
  Settings,
  User,
  Bell,
  Heart,
  Lock,
  LogOut,
  Save,
  CheckCircle2,
  Mail,
  ShieldAlert
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    settings,
    updateSettings,
    userProfile,
    updateProfile,
    logout
  } = useApp();

  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);
  const [accountName, setAccountName] = useState(userProfile.fullName);
  const [accountEmail, setAccountEmail] = useState(userProfile.email);
  const [password, setPassword] = useState('••••••••••••');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    updateProfile({
      fullName: accountName,
      email: accountEmail
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const toggleNotification = (key: keyof UserSettings['notifications']) => {
    setLocalSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const toggleOppPreference = (type: OpportunityCategory) => {
    setLocalSettings((prev) => {
      const exists = prev.preferences.opportunityTypes.includes(type);
      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          opportunityTypes: exists
            ? prev.preferences.opportunityTypes.filter((t) => t !== type)
            : [...prev.preferences.opportunityTypes, type]
        }
      };
    });
  };

  const toggleWorkTypePreference = (wt: WorkType) => {
    setLocalSettings((prev) => {
      const exists = prev.preferences.workTypes.includes(wt);
      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          workTypes: exists
            ? prev.preferences.workTypes.filter((t) => t !== wt)
            : [...prev.preferences.workTypes, wt]
        }
      };
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage your account credentials, alert notifications, and AI matching parameters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={logout}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-8">
        {/* ACCOUNT SETTINGS */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Account Credentials</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Email
              </label>
              <input
                type="email"
                value={accountEmail}
                onChange={(e) => setAccountEmail(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Change password to update local authentication credential.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notification Email
              </label>
              <input
                type="email"
                value={localSettings.account.notificationEmail}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    account: { ...localSettings.account, notificationEmail: e.target.value }
                  })
                }
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* NOTIFICATIONS SETTINGS */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Notifications & Alerts</h3>
          </div>

          <div className="space-y-3">
            {[
              {
                key: 'newOpportunityAlerts' as const,
                title: 'New Opportunity Alerts',
                desc: 'Receive immediate recommendations when scout agents discover roles above your match threshold.'
              },
              {
                key: 'deadlineReminders' as const,
                title: 'Deadline Reminders',
                desc: 'Alert notifications 7 days and 48 hours prior to application cycle closures.'
              },
              {
                key: 'applicationUpdates' as const,
                title: 'Application Updates',
                desc: 'Status log changes and interviewer response timeline notifications.'
              },
              {
                key: 'aiRecommendations' as const,
                title: 'AI Recommendations & Skill Roadmaps',
                desc: 'Periodic insights on in-demand frameworks and tailored career trajectories.'
              }
            ].map((item) => {
              const checked = localSettings.notifications[item.key];

              return (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="space-y-0.5 pr-4">
                    <div className="text-xs font-bold text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-slate-500">{item.desc}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleNotification(item.key)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 cursor-pointer ${
                      checked ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="bg-white w-4 h-4 rounded-full shadow-xs" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* PREFERENCES SETTINGS */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-6">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Scout & Matching Preferences</h3>
          </div>

          {/* Opportunity Types */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Active Opportunity Categories
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Internships', 'Jobs', 'Hackathons', 'Meetups'] as OpportunityCategory[]).map((type) => {
                const isSelected = localSettings.preferences.opportunityTypes.includes(type);

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleOppPreference(type)}
                    className={`p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-indigo-300 bg-indigo-50 text-indigo-700 font-semibold'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Work Types */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700">
              Allowed Work Types
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Remote', 'Hybrid', 'On-site'] as WorkType[]).map((wt) => {
                const isSelected = localSettings.preferences.workTypes.includes(wt);

                return (
                  <button
                    key={wt}
                    type="button"
                    onClick={() => toggleWorkTypePreference(wt)}
                    className={`p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-indigo-300 bg-indigo-50 text-indigo-700 font-semibold'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {wt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SAVE BAR & LOGOUT */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {isSaved && (
              <span className="text-xs text-emerald-600 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>All changes saved successfully!</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Logout
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
