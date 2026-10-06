import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { OpportunityCategory, WorkType, Opportunity } from '../../types';
import {
  Search,
  Filter,
  RotateCcw,
  MapPin,
  Calendar,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ArrowUpDown,
  Building2,
  ExternalLink,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const {
    opportunities,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    filterWorkType,
    setFilterWorkType,
    filterSortBy,
    setFilterSortBy,
    filterMinMatch,
    setFilterMinMatch,
    resetFilters,
    savedOpportunityIds,
    toggleSaveOpportunity,
    isOpportunitySaved,
    navigateTo
  } = useApp();

  const [filterSkill, setFilterSkill] = useState<string>('All');
  const [filterExperience, setFilterExperience] = useState<string>('All');
  const [filterDeadlineWindow, setFilterDeadlineWindow] = useState<string>('All');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Extract unique skills across all opportunities for filter dropdown
  const allUniqueSkills = useMemo(() => {
    const set = new Set<string>();
    opportunities.forEach((o) => {
      o.requiredSkills.forEach((s) => set.add(s));
    });
    return Array.from(set).sort();
  }, [opportunities]);

  // Handle comprehensive filtering and sorting
  const filteredAndSortedOpportunities = useMemo(() => {
    return opportunities
      .filter((opp) => {
        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = opp.title.toLowerCase().includes(q);
          const matchOrg = opp.organization.toLowerCase().includes(q);
          const matchDesc = opp.description.toLowerCase().includes(q);
          const matchSkills = opp.requiredSkills.some((s) => s.toLowerCase().includes(q));
          if (!matchTitle && !matchOrg && !matchDesc && !matchSkills) {
            return false;
          }
        }

        // Category filter
        if (filterCategory !== 'All' && opp.category !== filterCategory) {
          return false;
        }

        // Work Type filter
        if (filterWorkType !== 'All' && opp.workType !== filterWorkType) {
          return false;
        }

        // Min Match % filter
        if (filterMinMatch > 0 && opp.matchPercentage < filterMinMatch) {
          return false;
        }

        // Skill filter
        if (filterSkill !== 'All') {
          const hasReq = opp.requiredSkills.some((s) => s.toLowerCase() === filterSkill.toLowerCase());
          const hasPref = opp.preferredSkills.some((s) => s.toLowerCase() === filterSkill.toLowerCase());
          if (!hasReq && !hasPref) return false;
        }

        // Experience filter
        if (filterExperience !== 'All' && opp.experienceLevel !== filterExperience) {
          return false;
        }

        // Deadline filter
        if (filterDeadlineWindow === '7days' && opp.daysLeft > 7) return false;
        if (filterDeadlineWindow === '14days' && opp.daysLeft > 14) return false;
        if (filterDeadlineWindow === '30days' && opp.daysLeft > 30) return false;

        return true;
      })
      .sort((a, b) => {
        if (filterSortBy === 'best-match') {
          return b.matchPercentage - a.matchPercentage;
        }
        if (filterSortBy === 'deadline') {
          return a.daysLeft - b.daysLeft;
        }
        if (filterSortBy === 'latest') {
          return a.daysLeft - b.daysLeft;
        }
        // Most relevant default
        return b.matchPercentage - a.matchPercentage;
      });
  }, [
    opportunities,
    searchQuery,
    filterCategory,
    filterWorkType,
    filterMinMatch,
    filterSkill,
    filterExperience,
    filterDeadlineWindow,
    filterSortBy
  ]);

  const handleClearAllFilters = () => {
    resetFilters();
    setFilterSkill('All');
    setFilterExperience('All');
    setFilterDeadlineWindow('All');
  };

  const categories: { label: string; value: string }[] = [
    { label: 'All Categories', value: 'All' },
    { label: 'Internships', value: 'Internships' },
    { label: 'Jobs', value: 'Jobs' },
    { label: 'Hackathons', value: 'Hackathons' },
    { label: 'Meetups', value: 'Meetups' }
  ];

  const workTypes: { label: string; value: string }[] = [
    { label: 'All Work Types', value: 'All' },
    { label: 'Remote', value: 'Remote' },
    { label: 'Hybrid', value: 'Hybrid' },
    { label: 'On-site', value: 'On-site' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header and Results Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Opportunities</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Showing {filteredAndSortedOpportunities.length} of {opportunities.length} matched opportunities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAdvancedFilters ? 'Simple Filters' : 'More Filters'}</span>
          </button>

          <button
            type="button"
            onClick={handleClearAllFilters}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>

      {/* SEARCH AND PRIMARY CONTROLS */}
      <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
        {/* Search Bar + Sort */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, skills (e.g. React, Stripe, Python)..."
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <select
                value={filterSortBy}
                onChange={(e) => setFilterSortBy(e.target.value)}
                className="text-xs font-semibold pl-3 pr-8 py-2.5 border border-slate-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
              >
                <option value="best-match">Sort: Best Match %</option>
                <option value="deadline">Sort: Urgent Deadline</option>
                <option value="latest">Sort: Latest Added</option>
                <option value="relevant">Sort: Most Relevant</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Tabs (Segmented Control) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {categories.map((c) => {
            const isActive = filterCategory === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setFilterCategory(c.value)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Secondary / Advanced Filters */}
        {showAdvancedFilters && (
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Work Type */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Work Type
              </label>
              <select
                value={filterWorkType}
                onChange={(e) => setFilterWorkType(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {workTypes.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Match % */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Minimum Match %
              </label>
              <select
                value={filterMinMatch}
                onChange={(e) => setFilterMinMatch(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value={0}>Any Match %</option>
                <option value={75}>75% or higher</option>
                <option value={85}>85% or higher</option>
                <option value={90}>90% or higher</option>
              </select>
            </div>

            {/* Specific Required Skill */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Required Skill
              </label>
              <select
                value={filterSkill}
                onChange={(e) => setFilterSkill(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">All Skills</option>
                {allUniqueSkills.map((sk) => (
                  <option key={sk} value={sk}>
                    {sk}
                  </option>
                ))}
              </select>
            </div>

            {/* Deadline Window */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Deadline Proximity
              </label>
              <select
                value={filterDeadlineWindow}
                onChange={(e) => setFilterDeadlineWindow(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">Any Deadline</option>
                <option value="7days">Closing in 7 days</option>
                <option value="14days">Closing in 14 days</option>
                <option value="30days">Closing in 30 days</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* RESULTS LIST / EMPTY STATE */}
      {filteredAndSortedOpportunities.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-slate-200 bg-white space-y-4">
          <Search className="w-10 h-10 text-slate-300 mx-auto" />
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              No matching opportunities found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Try relaxing your filters, clearing your search keywords, or adjusting your minimum match threshold.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClearAllFilters}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedOpportunities.map((opp) => {
            const saved = isOpportunitySaved(opp.id);

            return (
              <div
                key={opp.id}
                className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Category & Match Score */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-slate-500 font-medium">{opp.category}</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs border border-emerald-100">
                      {opp.matchPercentage}% Match
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                      {opp.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      {opp.organization}
                    </p>
                  </div>

                  {/* Metadata - unboxed with middle dot */}
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

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {opp.requiredSkills.slice(0, 4).map((sk) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px]"
                      >
                        {sk}
                      </span>
                    ))}
                    {opp.requiredSkills.length > 4 && (
                      <span className="text-[11px] text-slate-400 self-center">
                        +{opp.requiredSkills.length - 4} more
                      </span>
                    )}
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
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
