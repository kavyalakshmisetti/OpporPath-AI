import React from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, Sparkles, Globe, User } from 'lucide-react';
import { AppPage } from '../../types';

interface AppHeaderProps {
  onOpenMobileSidebar: () => void;
}

const pageTitles: Record<AppPage, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Discover opportunities that match your skills and career goals.'
  },
  'my-profile': {
    title: 'My Profile',
    subtitle: 'Manage your academic details, skills, preferences, and verified resume.'
  },
  'find-opportunities': {
    title: 'Find Opportunities',
    subtitle: 'Run multi-agent AI discovery across connected developer networks.'
  },
  opportunities: {
    title: 'Opportunities',
    subtitle: 'Browse matched internships, jobs, hackathons, and meetups.'
  },
  'opportunity-details': {
    title: 'Opportunity Details',
    subtitle: 'In-depth qualification match, role benefits, and eligibility criteria.'
  },
  'skill-gap': {
    title: 'Skill Gap & Career',
    subtitle: 'Diagnose missing skills and follow structured AI learning roadmaps.'
  },
  'application-tracker': {
    title: 'Application Tracker',
    subtitle: 'Track your submissions across interview stages, notes, and deadlines.'
  },
  'saved-opportunities': {
    title: 'Saved Opportunities',
    subtitle: 'Review bookmarked roles and track approaching submission deadlines.'
  },
  settings: {
    title: 'Settings',
    subtitle: 'Manage account credentials, alert preferences, and search priorities.'
  }
};

export const AppHeader: React.FC<AppHeaderProps> = ({ onOpenMobileSidebar }) => {
  const { activePage, setViewMode, navigateTo, userProfile } = useApp();
  const info = pageTitles[activePage] || {
    title: 'Dashboard',
    subtitle: 'Career Opportunity Intelligence'
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="md:hidden p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {info.title}
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block truncate max-w-md">
              {info.subtitle}
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick AI Search Button */}
          {activePage !== 'find-opportunities' && (
            <button
              type="button"
              onClick={() => navigateTo('find-opportunities')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-200"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Scout</span>
            </button>
          )}

          {/* Switch to Landing Page preview */}
          <button
            type="button"
            onClick={() => setViewMode('landing')}
            className="px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            title="View Public Landing Page"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Landing Page</span>
          </button>

          {/* Quick Profile shortcut */}
          <button
            type="button"
            onClick={() => navigateTo('my-profile')}
            className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:border-indigo-400 transition-colors"
            title="My Profile"
          >
            <User className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
};
