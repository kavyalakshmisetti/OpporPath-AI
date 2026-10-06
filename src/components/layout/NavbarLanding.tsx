import React from 'react';
import { Sparkles } from 'lucide-react';

interface NavbarLandingProps {
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
  onScrollTo: (id: string) => void;
}

export const NavbarLanding: React.FC<NavbarLandingProps> = ({
  onOpenLogin,
  onOpenSignUp,
  onScrollTo
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-lg leading-tight tracking-tight">
              OpporPath AI
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
              Opportunity Engine
            </span>
          </div>
        </div>

        {/* Right: Navigation items */}
        <nav className="flex items-center gap-2 sm:gap-6">
          <button
            type="button"
            onClick={() => onScrollTo('how-it-works')}
            className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('features')}
            className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Features
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

          <button
            type="button"
            onClick={onOpenLogin}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onOpenSignUp}
            className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
          >
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
};
