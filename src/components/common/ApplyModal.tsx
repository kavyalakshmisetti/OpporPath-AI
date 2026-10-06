import React, { useState } from 'react';
import { Opportunity } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Send, FileText, CheckCircle2, Building2, MapPin, Calendar, UploadCloud } from 'lucide-react';

interface ApplyModalProps {
  opportunity: Opportunity;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ opportunity, onClose }) => {
  const { userProfile, addOrUpdateApplication, uploadResume, navigateTo } = useApp();
  const [coverNote, setCoverNote] = useState(
    `Hello ${opportunity.organization} hiring team,\n\nI am eager to apply for the ${opportunity.title} role. My background in ${userProfile.technicalSkills.slice(0, 3).join(', ')} aligns well with your team's mission.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadingResume(true);
      await uploadResume(e.target.files[0]);
      setUploadingResume(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      addOrUpdateApplication(opportunity, 'Applied', coverNote);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {submitted ? 'Application Confirmed' : 'Submit Application'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {opportunity.title} · {opportunity.organization}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">Application Submitted!</h4>
                <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                  Your application for <span className="font-medium text-slate-800">{opportunity.title}</span> has been logged and added to your Application Tracker.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigateTo('application-tracker');
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  View in Application Tracker
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Keep Exploring
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Opportunity Snapshot */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-3 text-xs space-y-1 text-slate-700">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="font-semibold text-slate-900">{opportunity.organization}</span>
                  <span className="text-slate-400">·</span>
                  <span>{opportunity.category}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {opportunity.location} ({opportunity.workType})
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Deadline: {opportunity.deadline}
                  </span>
                </div>
              </div>

              {/* Candidate Info */}
              <div className="border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Applicant Profile
                </div>
                <div className="text-sm">
                  <div className="font-medium text-slate-900">{userProfile.fullName}</div>
                  <div className="text-xs text-slate-500">{userProfile.email} · {userProfile.phone}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {userProfile.degree} · {userProfile.institution}
                  </div>
                </div>
              </div>

              {/* Resume Attachment */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Attached Resume
                </label>
                {userProfile.resume ? (
                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50 text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <div>
                        <div className="font-medium text-slate-800">{userProfile.resume.fileName}</div>
                        <div className="text-slate-500 text-[11px]">{userProfile.resume.fileSize} · Uploaded {userProfile.resume.uploadedAt}</div>
                      </div>
                    </div>
                    <label className="cursor-pointer text-indigo-600 hover:text-indigo-800 font-medium">
                      <span>Change</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                    <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs text-slate-600">No resume on file.</p>
                    <label className="mt-2 inline-block cursor-pointer px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors">
                      {uploadingResume ? 'Uploading...' : 'Upload PDF / Doc'}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Cover Note */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Note to Recruiter / Statement of Interest
                </label>
                <textarea
                  rows={4}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full text-xs text-slate-800 p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Share a brief statement about your interest and relevant projects..."
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Submitting...' : 'Send Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
