import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { OpportunityCategory, WorkType, UserProfile } from '../../types';
import { ResumeModal } from '../common/ResumeModal';
import {
  User,
  GraduationCap,
  Code,
  Heart,
  Target,
  FileText,
  Upload,
  Eye,
  RefreshCw,
  Plus,
  X,
  Check,
  Edit2,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const MyProfilePage: React.FC = () => {
  const {
    userProfile,
    updateProfile,
    profileCompletion,
    uploadResume,
    replaceResume,
    removeResume
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // New tag inputs
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const resumeInputRef = useRef<HTMLInputElement>(null);

  const handleStartEdit = () => {
    setFormData(userProfile);
    setIsEditing(true);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setFormData(userProfile);
    setIsEditing(false);
  };

  const handleResumeFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (userProfile.resume) {
        await replaceResume(e.target.files[0]);
      } else {
        await uploadResume(e.target.files[0]);
      }
    }
  };

  // Tag add/remove helpers
  const addTechSkill = () => {
    if (newTechSkill.trim() && !formData.technicalSkills.includes(newTechSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        technicalSkills: [...prev.technicalSkills, newTechSkill.trim()]
      }));
      setNewTechSkill('');
    }
  };

  const removeTechSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter((s) => s !== skill)
    }));
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim() && !formData.softSkills.includes(newSoftSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        softSkills: [...prev.softSkills, newSoftSkill.trim()]
      }));
      setNewSoftSkill('');
    }
  };

  const removeSoftSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      softSkills: prev.softSkills.filter((s) => s !== skill)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== item)
    }));
  };

  const addLocation = () => {
    if (newLocation.trim() && !formData.preferredLocations.includes(newLocation.trim())) {
      setFormData((prev) => ({
        ...prev,
        preferredLocations: [...prev.preferredLocations, newLocation.trim()]
      }));
      setNewLocation('');
    }
  };

  const removeLocation = (loc: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredLocations: prev.preferredLocations.filter((l) => l !== loc)
    }));
  };

  // Toggles for checkboxes
  const toggleOppType = (type: OpportunityCategory) => {
    setFormData((prev) => {
      const exists = prev.preferredOpportunityTypes.includes(type);
      return {
        ...prev,
        preferredOpportunityTypes: exists
          ? prev.preferredOpportunityTypes.filter((t) => t !== type)
          : [...prev.preferredOpportunityTypes, type]
      };
    });
  };

  const toggleWorkType = (type: WorkType) => {
    setFormData((prev) => {
      const exists = prev.preferredWorkType.includes(type);
      return {
        ...prev,
        preferredWorkType: exists
          ? prev.preferredWorkType.filter((t) => t !== type)
          : [...prev.preferredWorkType, type]
      };
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My Profile</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Build and refine your student profile to calibrate the Profile Agent and AI Matching Engine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveChanges}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleStartEdit}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Completion Indicator */}
      <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              Profile Calibration: {profileCompletion}% Complete
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            {profileCompletion < 100
              ? 'Complete your profile to improve your opportunity matches.'
              : 'All profile criteria verified! AI matching is operating at maximum precision.'}
          </p>
        </div>
        <div className="w-full sm:w-64 bg-slate-100 h-2.5 rounded-full overflow-hidden shrink-0">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              profileCompletion >= 80 ? 'bg-emerald-500' : 'bg-indigo-600'
            }`}
            style={{ width: `${profileCompletion}%` }}
          />
        </div>
      </div>

      {/* RESUME MANAGEMENT SECTION */}
      <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Resume</h3>
          </div>
          <span className="text-xs text-slate-500">Supported formats: PDF, DOCX</span>
        </div>

        <input
          ref={resumeInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeFileSelected}
          className="hidden"
        />

        {userProfile.resume ? (
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-slate-900">
                  {userProfile.resume.fileName}
                </span>
                <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Parsed
                </span>
              </div>
              <div className="text-xs text-slate-500">
                {userProfile.resume.fileSize} · Uploaded on {userProfile.resume.uploadedAt}
              </div>
              <div className="text-xs text-slate-600 line-clamp-1 pt-1">
                {userProfile.resume.summary}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setResumeModalOpen(true)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>View Resume</span>
              </button>

              <button
                type="button"
                onClick={() => resumeInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Replace Resume</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <div>
              <div className="text-sm font-semibold text-slate-800">No Resume Uploaded</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Upload your resume to allow the Profile Agent to automatically extract skills and match job requirements.
              </p>
            </div>
            <button
              type="button"
              onClick={() => resumeInputRef.current?.click()}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Resume</span>
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveChanges} className="space-y-8">
        {/* PERSONAL INFORMATION */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              ) : (
                <div className="text-xs text-slate-900 font-medium py-1">{userProfile.fullName}</div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              ) : (
                <div className="text-xs text-slate-900 font-medium py-1">{userProfile.email}</div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <div className="text-xs text-slate-900 font-medium py-1">{userProfile.phone}</div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <div className="text-xs text-slate-900 font-medium py-1">{userProfile.location}</div>
              )}
            </div>
          </div>
        </div>

        {/* EDUCATION */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Education</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Degree
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <div className="text-xs text-slate-900 font-medium py-1">{userProfile.degree}</div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institution
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <div className="text-xs text-slate-900 font-medium py-1">{userProfile.institution}</div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Year
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.currentYear}
                  onChange={(e) => setFormData({ ...formData, currentYear: e.target.value })}
                  placeholder="e.g. Senior (Year 4)"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <div className="text-xs text-slate-900 font-medium py-1">{userProfile.currentYear}</div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Graduation Year
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  placeholder="e.g. 2026"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <div className="text-xs text-slate-900 font-medium py-1">{userProfile.graduationYear}</div>
              )}
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-5">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Skills</h3>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Technical Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? formData.technicalSkills : userProfile.technicalSkills).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded-md text-xs font-medium"
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeTechSkill(skill)}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <div className="flex items-center gap-2 pt-1 max-w-sm">
                <input
                  type="text"
                  value={newTechSkill}
                  onChange={(e) => setNewTechSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechSkill();
                    }
                  }}
                  placeholder="Add skill (e.g. Docker, GraphQL)..."
                  className="flex-1 text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={addTechSkill}
                  className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Soft Skills */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700">
              Soft Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? formData.softSkills : userProfile.softSkills).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded-md text-xs font-medium"
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeSoftSkill(skill)}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <div className="flex items-center gap-2 pt-1 max-w-sm">
                <input
                  type="text"
                  value={newSoftSkill}
                  onChange={(e) => setNewSoftSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSoftSkill();
                    }
                  }}
                  placeholder="Add soft skill (e.g. Leadership)..."
                  className="flex-1 text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={addSoftSkill}
                  className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* OTHER INFORMATION: INTERESTS & CAREER GOALS */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Interests & Career Goals</h3>
          </div>

          <div className="space-y-4">
            {/* Interests */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Interests & Subfields
              </label>
              <div className="flex flex-wrap gap-2">
                {(isEditing ? formData.interests : userProfile.interests).map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-800 rounded-md text-xs font-medium"
                  >
                    <span>{item}</span>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeInterest(item)}
                        className="text-indigo-400 hover:text-rose-600 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {isEditing && (
                <div className="flex items-center gap-2 pt-1 max-w-sm">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addInterest();
                      }
                    }}
                    placeholder="Add interest (e.g. Distributed Systems)..."
                    className="flex-1 text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={addInterest}
                    className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Career Goals */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700">
                Career Goals
              </label>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={formData.careerGoals}
                  onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Describe your 1-2 year target roles, sectors, and engineering milestones..."
                />
              ) : (
                <div className="text-xs text-slate-700 leading-relaxed py-1">
                  {userProfile.careerGoals}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PREFERRED OPPORTUNITY TYPES & WORK TYPE */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-6">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Preferences</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preferred Opportunity Types */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                Preferred Opportunity Types
              </label>
              <div className="space-y-2">
                {(['Internships', 'Jobs', 'Hackathons', 'Meetups'] as OpportunityCategory[]).map((type) => {
                  const currentSelected = isEditing
                    ? formData.preferredOpportunityTypes.includes(type)
                    : userProfile.preferredOpportunityTypes.includes(type);

                  return (
                    <label
                      key={type}
                      className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                        currentSelected
                          ? 'border-indigo-200 bg-indigo-50/50 text-indigo-900 font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        disabled={!isEditing}
                        checked={currentSelected}
                        onChange={() => toggleOppType(type)}
                        className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span>{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Preferred Work Type */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                Preferred Work Type
              </label>
              <div className="space-y-2">
                {(['Remote', 'Hybrid', 'On-site'] as WorkType[]).map((type) => {
                  const currentSelected = isEditing
                    ? formData.preferredWorkType.includes(type)
                    : userProfile.preferredWorkType.includes(type);

                  return (
                    <label
                      key={type}
                      className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                        currentSelected
                          ? 'border-indigo-200 bg-indigo-50/50 text-indigo-900 font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        disabled={!isEditing}
                        checked={currentSelected}
                        onChange={() => toggleWorkType(type)}
                        className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span>{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Preferred Locations */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700">
              Preferred Locations
            </label>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? formData.preferredLocations : userProfile.preferredLocations).map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded-md text-xs font-medium"
                >
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{loc}</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeLocation(loc)}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <div className="flex items-center gap-2 pt-1 max-w-sm">
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addLocation();
                    }
                  }}
                  placeholder="Add location (e.g. Seattle, WA)..."
                  className="flex-1 text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={addLocation}
                  className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM SAVE BAR */}
        {isEditing && (
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50 flex items-center justify-between gap-4">
            <div className="text-xs text-indigo-900 font-medium">
              You have unsaved changes. Save to trigger AI matching recalibration.
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Resume Modal */}
      {resumeModalOpen && (
        <ResumeModal onClose={() => setResumeModalOpen(false)} />
      )}
    </div>
  );
};
