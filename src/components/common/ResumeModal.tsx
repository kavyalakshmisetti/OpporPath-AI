import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, FileText, Download, CheckCircle, Upload, Trash2, Award } from 'lucide-react';

interface ResumeModalProps {
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ onClose }) => {
  const { userProfile, replaceResume, removeResume } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await replaceResume(e.target.files[0]);
    }
  };

  const resume = userProfile.resume;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Career Resume</h3>
              <p className="text-xs text-slate-500">
                {resume ? resume.fileName : 'No file attached'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {resume ? (
            <>
              {/* Meta strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400">File size:</span> {resume.fileSize}
                </div>
                <div>
                  <span className="text-slate-400">Uploaded on:</span> {resume.uploadedAt}
                </div>
                <div className="flex items-center gap-1 text-emerald-600 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" /> Parsed by Profile Agent
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Resume Summary
                </div>
                <div className="p-3.5 bg-indigo-50/40 border border-indigo-100 rounded-lg text-xs leading-relaxed text-slate-700">
                  {resume.summary}
                </div>
              </div>

              {/* Extracted Skills */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  Skills Extracted by AI
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {resume.extractedSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 text-xs bg-slate-100 border border-slate-200 text-slate-800 rounded-md"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Document Preview Box */}
              <div className="border border-slate-200 rounded-lg p-4 bg-white text-xs text-slate-600 space-y-2">
                <div className="font-semibold text-slate-900">{userProfile.fullName}</div>
                <div>{userProfile.email} · {userProfile.phone} · {userProfile.location}</div>
                <div className="pt-2 border-t border-slate-100 font-medium text-slate-800">
                  Education: {userProfile.degree} ({userProfile.institution}), Class of {userProfile.graduationYear}
                </div>
                <div className="pt-1 text-slate-500">
                  Objective: {userProfile.careerGoals}
                </div>
              </div>
            </>
          ) : (
            <div className="py-8 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-medium text-slate-700">No Resume Uploaded</div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Upload your resume in PDF format to enable automated skill extraction and tailored match scoring.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          {resume ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  removeResume();
                  onClose();
                }}
                className="px-3 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          ) : <div />}

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              {resume ? 'Replace Resume' : 'Upload Resume'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
