import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApplyModal } from '../common/ApplyModal';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Send,
  BookOpen,
  DollarSign,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Gift
} from 'lucide-react';

export const OpportunityDetailsPage: React.FC = () => {
  const {
    selectedOpportunity,
    navigateTo,
    toggleSaveOpportunity,
    isOpportunitySaved,
    setSelectedTarget,
    userProfile
  } = useApp();

  const [applyModalOpen, setApplyModalOpen] = useState(false);

  if (!selectedOpportunity) {
    return (
      <div className="p-12 text-center rounded-xl border border-slate-200 bg-white max-w-xl mx-auto space-y-4">
        <div className="text-base font-semibold text-slate-800">No opportunity selected</div>
        <p className="text-xs text-slate-500">
          Please select an opportunity from the list to view its complete specifications.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('opportunities')}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Back to Opportunities
        </button>
      </div>
    );
  }

  const opp = selectedOpportunity;
  const saved = isOpportunitySaved(opp.id);

  const handleOpenSkillGap = () => {
    setSelectedTarget('opportunity', opp.id);
    navigateTo('skill-gap');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Navigation & Back Action */}
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => navigateTo('opportunities')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleSaveOpportunity(opp.id)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 cursor-pointer ${
              saved
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{saved ? 'Saved' : 'Save Opportunity'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenSkillGap}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>View Skill Gap</span>
          </button>

          <button
            type="button"
            onClick={() => setApplyModalOpen(true)}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Apply Now</span>
          </button>
        </div>
      </div>

      {/* Hero Overview Card */}
      <div className="p-6 sm:p-8 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-indigo-600">{opp.category}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">Source: {opp.source}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {opp.title}
            </h2>

            <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>{opp.organization}</span>
            </div>
          </div>

          {/* Match Score Badge */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center sm:text-right shrink-0">
            <div className="text-2xl font-bold text-emerald-600">
              {opp.matchPercentage}%
            </div>
            <div className="text-[11px] font-medium text-emerald-800">
              Qualification Match
            </div>
          </div>
        </div>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{opp.location} ({opp.workType})</span>
          </div>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Deadline: {opp.deadline} ({opp.daysLeft} days remaining)</span>
          </div>
          {opp.stipendOrSalary && (
            <>
              <span className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>{opp.stipendOrSalary}</span>
              </div>
            </>
          )}
        </div>

        {/* WHY THIS MATCHES YOU SECTION */}
        <div className="p-5 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Why This Matches You</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {opp.whyThisFitsYou}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Technical Skills Alignment: High</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Preferred Work Type ({opp.workType}): Match</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Academic Level ({opp.experienceLevel}): Match</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Location Preference: Direct Match</span>
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION & ELIGIBILITY */}
      <div className="grid grid-cols-1 gap-6">
        {/* Description */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Description</h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {opp.description}
          </p>
        </div>

        {/* Eligibility */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Eligibility Criteria</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {opp.eligibility}
          </p>
        </div>

        {/* SKILLS BREAKDOWN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Required Skills */}
          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {opp.requiredSkills.map((sk) => {
                const userHas = userProfile.technicalSkills
                  .concat(userProfile.softSkills)
                  .some((s) => s.toLowerCase() === sk.toLowerCase());

                return (
                  <span
                    key={sk}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border ${
                      userHas
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{sk}</span>
                    {userHas && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Preferred Skills */}
          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Preferred Skills (Bonus)</h3>
            <div className="flex flex-wrap gap-2">
              {opp.preferredSkills.map((sk) => (
                <span
                  key={sk}
                  className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded-md text-xs font-medium"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Benefits & Perks</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
            {opp.benefits.map((b) => (
              <div key={b} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS BAR */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-slate-500">
          Application deadline closes on {opp.deadline}. We recommend applying 3-5 days in advance.
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenSkillGap}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Check Skill Gap
          </button>
          <button
            type="button"
            onClick={() => setApplyModalOpen(true)}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Apply Now</span>
          </button>
        </div>
      </div>

      {/* Apply Modal */}
      {applyModalOpen && (
        <ApplyModal
          opportunity={opp}
          onClose={() => setApplyModalOpen(false)}
        />
      )}
    </div>
  );
};
