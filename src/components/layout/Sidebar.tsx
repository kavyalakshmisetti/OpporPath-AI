import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppPage } from '../../types';
import {
  Home,
  User,
  Search,
  Target,
  BookOpen,
  ClipboardList,
  Heart,
  Settings,
  LogOut,
  Sparkles,
  X
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { activePage, navigateTo, userProfile, logout } = useApp();

  const navItems: { id: AppPage; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'my-profile', label: 'My Profile', icon: User },
    { id: 'find-opportunities', label: 'Find Opportunities', icon: Search },
    { id: 'opportunities', label: 'Opportunities', icon: Target },
    { id: 'skill-gap', label: 'Skill Gap & Career', icon: BookOpen },
    { id: 'application-tracker', label: 'Application Tracker', icon: ClipboardList },
    { id: 'saved-opportunities', label: 'Saved Opportunities', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (pageId: AppPage) => {
    navigateTo(pageId);
    onCloseMobile();
  };

  const content = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Brand Header */}
      <div className="px-5 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm tracking-tight">OpporPath AI</div>
            <div className="text-[10px] text-slate-400 font-medium">Career Intelligence</div>
          </div>
        </div>
        {mobileOpen && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            activePage === item.id ||
            (activePage === 'opportunity-details' && item.id === 'opportunities');
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium rounded-lg transition-colors text-left ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User profile & Logout at bottom */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-2">
        <div
          onClick={() => handleNavClick('my-profile')}
          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs flex items-center justify-center shrink-0 border border-indigo-200">
            {userProfile.fullName ? userProfile.fullName.charAt(0) : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-900 truncate">
              {userProfile.fullName}
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              {userProfile.email}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop / Tablet Persistent Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
