import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApplicationStatus, ApplicationItem } from '../../types';
import {
  ClipboardList,
  Columns3,
  List,
  Calendar,
  Clock,
  Edit3,
  Check,
  X,
  ChevronDown,
  Building2,
  ExternalLink,
  Plus
} from 'lucide-react';

export const ApplicationTrackerPage: React.FC = () => {
  const {
    applications,
    updateApplicationStatus,
    updateApplicationNotes,
    navigateTo
  } = useApp();

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [editingNotesAppId, setEditingNotesAppId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');

  const statuses: ApplicationStatus[] = [
    'Saved',
    'Applying',
    'Applied',
    'Interview',
    'Selected',
    'Rejected'
  ];

  const statusStyles: Record<ApplicationStatus, { header: string; badge: string }> = {
    Saved: {
      header: 'bg-slate-100 text-slate-800 border-slate-200',
      badge: 'bg-slate-100 text-slate-700'
    },
    Applying: {
      header: 'bg-amber-50 text-amber-800 border-amber-200',
      badge: 'bg-amber-50 text-amber-700 border border-amber-200'
    },
    Applied: {
      header: 'bg-blue-50 text-blue-800 border-blue-200',
      badge: 'bg-blue-50 text-blue-700 border border-blue-200'
    },
    Interview: {
      header: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      badge: 'bg-indigo-50 text-indigo-700 border border-indigo-200'
    },
    Selected: {
      header: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    },
    Rejected: {
      header: 'bg-rose-50 text-rose-800 border-rose-200',
      badge: 'bg-rose-50 text-rose-700 border border-rose-200'
    }
  };

  const handleStartEditNotes = (app: ApplicationItem) => {
    setEditingNotesAppId(app.id);
    setTempNotes(app.notes);
  };

  const handleSaveNotes = (appId: string) => {
    updateApplicationNotes(appId, tempNotes);
    setEditingNotesAppId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header and View Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Application Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage your opportunities across Saved, Applying, Applied, Interview, Selected, and Rejected stages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Kanban / List Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table View</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('opportunities')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Opportunity</span>
          </button>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-slate-200 bg-white space-y-4">
          <ClipboardList className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-900">No applications tracked yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse opportunities and submit an application or save a role to begin tracking your hiring pipeline.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('opportunities')}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Explore Opportunities
          </button>
        </div>
      ) : viewMode === 'kanban' ? (
        /* KANBAN BOARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
          {statuses.map((status) => {
            const columnApps = applications.filter((a) => a.status === status);
            const style = statusStyles[status];

            return (
              <div
                key={status}
                className="bg-slate-100/70 border border-slate-200/80 rounded-xl p-3 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className={`p-2.5 rounded-lg border font-semibold text-xs flex items-center justify-between mb-3 ${style.header}`}>
                  <span>{status}</span>
                  <span className="bg-white/80 px-2 py-0.5 rounded-full text-[11px] font-bold">
                    {columnApps.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1">
                  {columnApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-3.5 rounded-lg border border-slate-200 bg-white shadow-2xs hover:shadow-xs transition-shadow space-y-2.5 text-xs"
                    >
                      {/* Title & Org */}
                      <div>
                        <div
                          onClick={() => navigateTo('opportunity-details', app.opportunityId)}
                          className="font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2"
                        >
                          {app.opportunityTitle}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                          {app.organization} · {app.category}
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="space-y-1 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>Applied: {app.appliedDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Deadline: {app.deadline}</span>
                        </div>
                      </div>

                      {/* Notes Section */}
                      <div className="pt-1 border-t border-slate-100">
                        {editingNotesAppId === app.id ? (
                          <div className="space-y-1.5">
                            <textarea
                              rows={2}
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              className="w-full text-[11px] p-2 border border-indigo-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <div className="flex items-center justify-end gap-1">
                              <button
                                type="button"
                                onClick={() => setEditingNotesAppId(null)}
                                className="p-1 text-slate-400 hover:text-slate-600"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveNotes(app.id)}
                                className="px-2 py-0.5 text-[11px] bg-indigo-600 text-white rounded font-medium"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => handleStartEditNotes(app)}
                            className="p-2 rounded bg-slate-50 text-[11px] text-slate-600 hover:bg-slate-100 cursor-pointer flex items-start justify-between gap-1 group"
                          >
                            <span className="line-clamp-2 italic">
                              {app.notes || 'Click to add notes...'}
                            </span>
                            <Edit3 className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                          </div>
                        )}
                      </div>

                      {/* Move Status Dropdown */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="relative">
                          <select
                            value={app.status}
                            onChange={(e) =>
                              updateApplicationStatus(app.id, e.target.value as ApplicationStatus)
                            }
                            className="w-full text-[11px] font-medium p-1.5 pr-6 border border-slate-200 rounded bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer"
                          >
                            {statuses.map((st) => (
                              <option key={st} value={st}>
                                Move: {st}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {columnApps.length === 0 && (
                    <div className="h-32 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs">
                      No roles in {status}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE / LIST VIEW */
        <div className="border border-slate-200 rounded-xl bg-white shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Opportunity</th>
                  <th className="py-3 px-4">Organization</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Notes</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs truncate">
                      <span
                        onClick={() => navigateTo('opportunity-details', app.opportunityId)}
                        className="hover:text-indigo-600 cursor-pointer"
                      >
                        {app.opportunityTitle}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {app.organization}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{app.category}</td>
                    <td className="py-3.5 px-4 text-slate-500">{app.appliedDate}</td>
                    <td className="py-3.5 px-4 text-slate-500">{app.deadline}</td>
                    <td className="py-3.5 px-4">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateApplicationStatus(app.id, e.target.value as ApplicationStatus)
                        }
                        className={`text-xs font-semibold py-1 px-2 rounded border appearance-none cursor-pointer ${
                          statusStyles[app.status].badge
                        }`}
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                      {editingNotesAppId === app.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={tempNotes}
                            onChange={(e) => setTempNotes(e.target.value)}
                            className="p-1 text-xs border border-indigo-300 rounded"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveNotes(app.id)}
                            className="p-1 bg-indigo-600 text-white rounded"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => handleStartEditNotes(app)}
                          className="cursor-pointer hover:underline truncate"
                        >
                          {app.notes || 'Add note...'}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => navigateTo('opportunity-details', app.opportunityId)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
