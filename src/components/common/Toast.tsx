import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-lg shadow-xl border border-slate-800 text-sm animate-fade-in max-w-md">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="flex-1 font-medium">{toastMessage}</span>
      <button
        onClick={() => showToast('')}
        className="text-slate-400 hover:text-white transition-colors p-1"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
