import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OpportunityCategory, Opportunity } from '../../types';
import { ApplyModal } from '../common/ApplyModal';
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  Target,
  Trophy,
  Users,
  Bookmark,
  BookmarkCheck,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  Lightbulb,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    userProfile,
    profileCompletion,
    navigateTo,
    setFilterCategory,
    opportunities,
    savedOpportunityIds,
    toggleSaveOpportunity,
    isOpportunitySaved
  } = useApp();

  const [applyingOpportunity, setApplyingOpportunity] = useState<Opportunity | null>(null);

  // Filter top 3 highest matching opportunities for Recommended section
  const recommendedOpps = [...opportunities]
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 3);

  // Upcoming deadlines (opportunities sorted by daysLeft)
  const upcomingDeadlines = [...opportunities]
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 4);

  // Saved opportunities summary
  const savedOpps = opportunities.filter((o) => savedOpportunityIds.includes(o.id));

  const handleCategoryClick = (cat: OpportunityCategory) => {
    setFilterCategory(cat);
    navigateTo('opportunities');
  };

  // Dynamic AI insight generated from user's actual skills
  const getDynamicAiInsight = () => {
    const hasPython = userProfile.technicalSkills.some((s) => s.toLowerCase().includes('python'));
    const hasReact = userProfile.technicalSkills.some((s) => s.toLowerCase().includes('react'));
    const hasDocker = userProfile.technicalSkills.some((s) => s.toLowerCase().includes('docker'));
    const hasSql = userProfile.technicalSkills.some((s) => s.toLowerCase().includes('sql'));

    if (hasReact && !hasDocker) {
      return `Your profile is exceptionally strong in React and modern UI engineering. Adding Docker and containerization concepts would increase your match rate for Full-Stack and Platform Engineer roles by 14%.`;
    }
    if (hasPython && !hasSql) {
      return `Your foundation in Python is well-suited for backend systems. Adding advanced SQL and relational data modeling could unlock high-match Data & Analytics opportunities.`;
    }
    return `Your background across ${userProfile.technicalSkills.slice(0, 3).join(', ')} gives you an edge in junior engineering tracks. Target Summer 2027 internship cycles right now before priority deadlines close.`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* TOP GREETING */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Good morning, {userProfile.fullName || 'Student'} 👋
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Discover opportunities that match your skills and career goals.
          </p>
        </div>

        {/* PRIMARY CTA */}
        <div>
          <button
            type="button"
            onClick={() => navigateTo('find-opportunities')}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>⭐ Find My Opportunities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* AI CAREER INSIGHT */}
      <div className="p-4 sm:p-5 rounded-xl border border-indigo-100 bg-indigo-50/50 shadow-2xs flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900 uppercase tracking-wide">
            <span>AI Career Insight</span>
            <span className="text-indigo-400">·</span>
            <span className="font-normal text-indigo-700 normal-case">Personalized for {userProfile.fullName}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {getDynamicAiInsight()}
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => navigateTo('skill-gap')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore recommended learning path</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* PROFILE COMPLETION & QUICK STATS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Completion Card */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Profile Completion</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {profileCompletion < 100
                    ? 'Complete your profile to improve your opportunity matches.'
                    : 'Your profile is fully calibrated for optimal multi-agent matching.'}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-slate-900">{profileCompletion}%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  profileCompletion >= 80 ? 'bg-emerald-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-slate-600">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                {userProfile.technicalSkills.length} Technical Skills
              </span>
              <span className="text-slate-300">·</span>
              <span>{userProfile.resume ? 'Resume Attached' : 'No Resume'}</span>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('my-profile')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <span>{profileCompletion < 100 ? 'Complete Profile' : 'Edit Profile'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Discovery Summary */}
        <div className="p-5 sm:p-6 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Scouting Snapshot
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-900">{opportunities.length}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Scouted Roles</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{savedOpps.length}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Saved for Later</div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('find-opportunities')}
            className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Re-run AI Matching</span>
          </button>
        </div>
      </div>

      {/* QUICK CATEGORIES */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">Quick Categories</h3>
          <span className="text-xs text-slate-500">Filter opportunities by format</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              category: 'Internships' as OpportunityCategory,
              title: 'Internships',
              icon: Briefcase,
              count: `${opportunities.filter((o) => o.category === 'Internships').length} Openings`
            },
            {
              category: 'Jobs' as OpportunityCategory,
              title: 'Jobs',
              icon: Target,
              count: `${opportunities.filter((o) => o.category === 'Jobs').length} Openings`
            },
            {
              category: 'Hackathons' as OpportunityCategory,
              title: 'Hackathons',
              icon: Trophy,
              count: `${opportunities.filter((o) => o.category === 'Hackathons').length} Openings`
            },
            {
              category: 'Meetups' as OpportunityCategory,
              title: 'Meetups',
              icon: Users,
              count: `${opportunities.filter((o) => o.category === 'Meetups').length} Openings`
            }
          ].map((cat) => (
            <button
              key={cat.title}
              type="button"
              onClick={() => handleCategoryClick(cat.category)}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-indigo-300 transition-all text-left flex items-center gap-3.5 group shadow-2xs cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <cat.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                  {cat.title}
                </div>
                <div className="text-[11px] text-slate-500 truncate">{cat.count}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RECOMMENDED OPPORTUNITIES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Recommended Opportunities</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked highest based on your skills, coursework, and work preferences
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('opportunities')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({opportunities.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedOpps.map((opp) => {
            const saved = isOpportunitySaved(opp.id);

            return (
              <div
                key={opp.id}
                className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Bar: Category & Match Score */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-slate-500 font-medium">{opp.category}</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs border border-emerald-100">
                      {opp.matchPercentage}% Match
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {opp.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      {opp.organization}
                    </p>
                  </div>

                  {/* Unboxed Metadata with · separator */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {opp.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{opp.workType}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Due {opp.deadline}
                    </span>
                  </div>

                  {/* Why This Fits You */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-800 block mb-0.5">Why This Fits You:</span>
                    {opp.whyThisFitsYou}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => toggleSaveOpportunity(opp.id)}
                    className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                      saved
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                    title={saved ? 'Remove from Saved' : 'Save Opportunity'}
                  >
                    {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    <span>{saved ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo('opportunity-details', opp.id)}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LOWER SECTION: UPCOMING DEADLINES & SAVED OPPORTUNITIES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="p-5 sm:p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <h3 className="text-base font-semibold text-slate-900">Upcoming Deadlines</h3>
            </div>
            <span className="text-xs text-slate-500">Approaching windows</span>
          </div>

          <div className="space-y-3">
            {upcomingDeadlines.map((opp) => (
              <div
                key={opp.id}
                onClick={() => navigateTo('opportunity-details', opp.id)}
                className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer transition-colors flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {opp.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {opp.organization} · {opp.category}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={`text-xs font-bold ${
                      opp.daysLeft <= 7 ? 'text-rose-600 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    {opp.daysLeft} {opp.daysLeft === 1 ? 'day' : 'days'} left
                  </div>
                  <div className="text-[10px] text-slate-400">Due {opp.deadline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Opportunities Summary */}
        <div className="p-5 sm:p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-indigo-600" />
              <h3 className="text-base font-semibold text-slate-900">Saved Opportunities</h3>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('saved-opportunities')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              View All ({savedOpps.length})
            </button>
          </div>

          {savedOpps.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
              <div className="text-xs font-medium text-slate-600">No saved opportunities yet.</div>
              <button
                type="button"
                onClick={() => navigateTo('opportunities')}
                className="text-xs text-indigo-600 font-semibold hover:underline cursor-pointer"
              >
                Browse opportunities
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {savedOpps.slice(0, 4).map((opp) => (
                <div
                  key={opp.id}
                  className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div
                      onClick={() => navigateTo('opportunity-details', opp.id)}
                      className="text-xs font-bold text-slate-900 hover:text-indigo-600 cursor-pointer truncate"
                    >
                      {opp.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {opp.organization} · {opp.matchPercentage}% Match
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setApplyingOpportunity(opp)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleSaveOpportunity(opp.id)}
                      className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors cursor-pointer px-1.5 py-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {applyingOpportunity && (
        <ApplyModal
          opportunity={applyingOpportunity}
          onClose={() => setApplyingOpportunity(null)}
        />
      )}
    </div>
  );
};
