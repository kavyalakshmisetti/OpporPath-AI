import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { AppHeader } from './AppHeader';
import { DashboardPage } from '../pages/DashboardPage';
import { MyProfilePage } from '../pages/MyProfilePage';
import { FindOpportunitiesPage } from '../pages/FindOpportunitiesPage';
import { OpportunitiesPage } from '../pages/OpportunitiesPage';
import { OpportunityDetailsPage } from '../pages/OpportunityDetailsPage';
import { SkillGapPage } from '../pages/SkillGapPage';
import { ApplicationTrackerPage } from '../pages/ApplicationTrackerPage';
import { SavedOpportunitiesPage } from '../pages/SavedOpportunitiesPage';
import { SettingsPage } from '../pages/SettingsPage';
import { Toast } from '../common/Toast';

export const AppLayout: React.FC = () => {
  const { activePage } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'my-profile':
        return <MyProfilePage />;
      case 'find-opportunities':
        return <FindOpportunitiesPage />;
      case 'opportunities':
        return <OpportunitiesPage />;
      case 'opportunity-details':
        return <OpportunityDetailsPage />;
      case 'skill-gap':
        return <SkillGapPage />;
      case 'application-tracker':
        return <ApplicationTrackerPage />;
      case 'saved-opportunities':
        return <SavedOpportunitiesPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-row text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sidebar (Desktop persistent, Mobile drawer) */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AppHeader
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Global Toast */}
      <Toast />
    </div>
  );
};
