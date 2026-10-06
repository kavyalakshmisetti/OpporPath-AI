import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  UserCheck,
  Compass,
  GitCompare,
  TrendingUp,
  Award,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Layers,
  Search,
  ExternalLink
} from 'lucide-react';

export const FindOpportunitiesPage: React.FC = () => {
  const {
    aiSearchState,
    startAiSearch,
    navigateTo,
    userProfile,
    opportunities
  } = useApp();

  const steps = [
    {
      num: 1,
      title: 'Profile Agent',
      action: 'Analyzing your profile...',
      desc: `Evaluating degree in ${userProfile.degree}, ${userProfile.technicalSkills.length} technical skills, career goals, and resume credentials.`,
      icon: UserCheck
    },
    {
      num: 2,
      title: 'Scout Agents',
      action: 'Discovering relevant opportunities...',
      desc: 'Querying developer platforms and job feeds across LinkedIn, Internshala, Indeed, Wellfound, Devpost, and Meetup.',
      icon: Compass
    },
    {
      num: 3,
      title: 'Matching Agent',
      action: 'Matching opportunities with your skills...',
      desc: 'Executing semantic cosine similarity and requirement cross-checks to calculate an exact Match Percentage.',
      icon: GitCompare
    },
    {
      num: 4,
      title: 'Career & Skill Agent',
      action: 'Analyzing career and skill relevance...',
      desc: 'Identifying skill gaps, estimating learning time, and generating customized "Why This Fits You" explanations.',
      icon: TrendingUp
    },
    {
      num: 5,
      title: 'Recommendation Engine',
      action: 'Ranking your best opportunities...',
      desc: 'Sorting and prioritizing listings by qualification match, approaching deadlines, and candidate preferences.',
      icon: Award
    }
  ];

  const sources = [
    { name: 'LinkedIn', type: 'Tech Internships & Full-Time' },
    { name: 'Internshala', type: 'Student Internships' },
    { name: 'Indeed', type: 'Software Engineering' },
    { name: 'Wellfound', type: 'Startup & Early Stage' },
    { name: 'Devpost', type: 'Global Hackathons' },
    { name: 'Meetup', type: 'Local Tech Communities' }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Find Opportunities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Autonomous multi-agent discovery that finds, evaluates, and ranks student opportunities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={aiSearchState.isSearching}
            onClick={startAiSearch}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${aiSearchState.isSearching ? 'animate-spin' : ''}`}
            />
            <span>{aiSearchState.isSearching ? 'Scouting in Progress...' : 'Start AI Search'}</span>
          </button>
        </div>
      </div>

      {/* Primary Discovery Hero Monitor */}
      <div className="p-6 sm:p-8 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-6">
        {/* Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-xs ${
                aiSearchState.isSearching
                  ? 'bg-indigo-600 text-white animate-pulse'
                  : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
              }`}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                Active Agent: {aiSearchState.currentAgent}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {aiSearchState.statusMessage}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <span className="text-slate-400 block">Overall Progress</span>
              <span className="text-base font-bold text-slate-900">
                {aiSearchState.progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${aiSearchState.progress}%` }}
          />
        </div>

        {/* Real-time Counter Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg">
            <span className="text-[11px] text-slate-500 font-medium">Scouted Sources</span>
            <div className="text-xl font-bold text-slate-900 mt-1">6 Sources</div>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg">
            <span className="text-[11px] text-slate-500 font-medium">Opportunities Discovered</span>
            <div className="text-xl font-bold text-indigo-600 mt-1">
              {aiSearchState.discoveredCount} Listings
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg">
            <span className="text-[11px] text-slate-500 font-medium">Matching Qualifications</span>
            <div className="text-xl font-bold text-emerald-600 mt-1">
              {aiSearchState.matchedCount} Strong Fits
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg">
            <span className="text-[11px] text-slate-500 font-medium">Avg. Match Score</span>
            <div className="text-xl font-bold text-slate-900 mt-1">87.5%</div>
          </div>
        </div>

        {/* Success Completion Box */}
        {aiSearchState.completed && !aiSearchState.isSearching && (
          <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Your Best Opportunities Are Ready
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  12 personalized opportunities ranked across Internships, Jobs, Hackathons, and Meetups.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('opportunities')}
              className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>View Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* STEP-BY-STEP AGENT PIPELINE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">AI Search Process</h3>
          <span className="text-xs text-slate-500">Autonomous multi-agent stages</span>
        </div>

        <div className="space-y-3">
          {steps.map((st) => {
            const isCompleted = aiSearchState.step > st.num || (aiSearchState.completed && !aiSearchState.isSearching);
            const isCurrent = aiSearchState.isSearching && aiSearchState.step === st.num;
            const isPending = aiSearchState.step < st.num;
            const Icon = st.icon;

            return (
              <div
                key={st.num}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'border-indigo-300 bg-indigo-50/40 shadow-xs'
                    : isCompleted
                    ? 'border-slate-200 bg-white'
                    : 'border-slate-200 bg-slate-50/50 opacity-60'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-700'
                        : isCurrent
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : st.num}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">
                        {st.title}
                      </span>
                      <span className="text-slate-400 text-xs">·</span>
                      <span
                        className={`text-xs font-medium ${
                          isCurrent
                            ? 'text-indigo-600 animate-pulse'
                            : isCompleted
                            ? 'text-emerald-700'
                            : 'text-slate-500'
                        }`}
                      >
                        {st.action}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right sm:text-left">
                  {isCurrent && (
                    <span className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-100 text-indigo-700 rounded-md">
                      Executing
                    </span>
                  )}
                  {isCompleted && (
                    <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100">
                      Completed
                    </span>
                  )}
                  {isPending && (
                    <span className="text-xs text-slate-400">Waiting</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CONNECTED PLATFORMS */}
      <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Supported Opportunity Sources</h3>
          </div>
          <span className="text-xs text-slate-500">Continuous indexation</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {sources.map((src) => (
            <div
              key={src.name}
              className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">{src.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{src.type}</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
