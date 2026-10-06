import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Opportunity } from '../../types';
import { ApplyModal } from '../common/ApplyModal';
import {
  Heart,
  Bookmark,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  Trash2,
  Building2,
  AlertTriangle
} from 'lucide-react';

export const SavedOpportunitiesPage: React.FC = () => {
  const {
    opportunities,
    savedOpportunityIds,
    toggleSaveOpportunity,
    navigateTo
  } = useApp();

  const [applyingOpportunity, setApplyingOpportunity] = useState<Opportunity | null>(null);

  const savedList = opportunities.filter((o) => savedOpportunityIds.includes(o.id));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Saved Opportunities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Review bookmarked roles, track approaching application deadlines, and submit applications.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('find-opportunities')}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <span>Find More Opportunities</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {savedList.length === 0 ? (
        <div className="p-16 text-center rounded-xl border border-slate-200 bg-white space-y-4 max-w-md mx-auto">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              No saved opportunities yet.
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Save roles you are interested in while browsing to keep them organized here.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('find-opportunities')}
            className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Find Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedList.map((opp) => {
            const isUrgent = opp.daysLeft <= 7;

            return (
              <div
                key={opp.id}
                className={`p-5 rounded-xl border bg-white shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-4 ${
                  isUrgent ? 'border-amber-300 ring-1 ring-amber-100' : 'border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Bar: Category, Match %, Urgent notice */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-slate-500 font-medium">{opp.category}</span>
                    <div className="flex items-center gap-1.5">
                      {isUrgent && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>Closing Soon!</span>
                        </span>
                      )}
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs border border-emerald-100">
                        {opp.matchPercentage}% Match
                      </span>
                    </div>
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

                  {/* Metadata unboxed with middle dot */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {opp.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{opp.workType}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={`flex items-center gap-1 ${
                        isUrgent ? 'text-amber-700 font-semibold' : ''
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {opp.daysLeft} days left (Due {opp.deadline})
                    </span>
                  </div>

                  {/* Saved Date info */}
                  <div className="text-[11px] text-slate-400">
                    Saved to workspace
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => toggleSaveOpportunity(opp.id)}
                    className="p-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => navigateTo('opportunity-details', opp.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setApplyingOpportunity(opp)}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Apply Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
