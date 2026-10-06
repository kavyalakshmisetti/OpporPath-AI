import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './components/landing/LandingPage';
import { AppLayout } from './components/layout/AppLayout';
import { Toast } from './components/common/Toast';

const AppContent: React.FC = () => {
  const { viewMode } = useApp();

  return (
    <>
      {viewMode === 'landing' ? <LandingPage /> : <AppLayout />}
      <Toast />
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
