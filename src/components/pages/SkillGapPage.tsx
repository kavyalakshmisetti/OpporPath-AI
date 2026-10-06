import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { careerTargets } from '../../data/mockData';
import { Opportunity, LearningPathStep, SkillPriority } from '../../types';
import {
  BookOpen,
  Target,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Sparkles,
  Layers,
  ChevronRight,
  Code,
  FolderGit2,
  X,
  Play
} from 'lucide-react';

export const SkillGapPage: React.FC = () => {
  const {
    userProfile,
    opportunities,
    selectedTargetType,
    selectedTargetId,
    setSelectedTarget,
    learningStepStatus,
    toggleLearningStepComplete,
    updateLearningStepProgress
  } = useApp();

  const [activeResourceModal, setActiveResourceModal] = useState<LearningPathStep | null>(null);

  // Determine current target configuration
  const currentCareer = careerTargets.find((c) => c.id === selectedTargetId) || careerTargets[0];
  const currentOpp = opportunities.find((o) => o.id === selectedTargetId) || opportunities[0];

  const targetTitle = selectedTargetType === 'career' ? currentCareer.name : currentOpp.title;
  const targetRequiredSkills = selectedTargetType === 'career' ? currentCareer.requiredSkills : currentOpp.requiredSkills;

  // Student skills set
  const studentSkillsSet = useMemo(() => {
    return new Set(
      userProfile.technicalSkills
        .concat(userProfile.softSkills)
        .map((s) => s.toLowerCase().trim())
    );
  }, [userProfile]);

  // Current Skills vs Missing Skills
  const { matchedSkills, missingSkills } = useMemo(() => {
    const matched: string[] = [];
    const missing: { name: string; priority: SkillPriority; reason: string }[] = [];

    targetRequiredSkills.forEach((req, idx) => {
      if (studentSkillsSet.has(req.toLowerCase().trim())) {
        matched.push(req);
      } else {
        // Assign priority based on position & role impact
        const priority: SkillPriority = idx === 0 || idx === 1 ? 'High' : idx <= 3 ? 'Medium' : 'Low';
        missing.push({
          name: req,
          priority,
          reason: `Required for core architectural deliverables and technical interview rounds.`
        });
      }
    });

    return { matchedSkills: matched, missingSkills: missing };
  }, [targetRequiredSkills, studentSkillsSet]);

  // Learning path steps for this target
  const learningSteps: LearningPathStep[] = useMemo(() => {
    if (selectedTargetType === 'career') {
      return currentCareer.learningPath;
    }

    // Generate dynamic opportunity-specific learning steps
    return currentOpp.requiredSkills.map((sk, index) => {
      const isMissing = !studentSkillsSet.has(sk.toLowerCase().trim());
      return {
        id: `opp-step-${currentOpp.id}-${index}`,
        stepNumber: index + 1,
        skill: sk,
        title: `Master ${sk} for ${currentOpp.organization}`,
        priority: index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low',
        recommendedLearning: `Review ${sk} industry patterns, test suite paradigms, and build a sandbox project demonstrating clean architecture.`,
        estimatedTime: `${(index + 1) * 3} hours`,
        progress: isMissing ? 0 : 100,
        completed: !isMissing,
        resourceTitle: `${sk} Official Documentation & Guides`,
        resourceType: 'Interactive Lab',
        resourceSummary: `Curated learning syllabus covering core idioms, best practices, and integration examples for ${sk}.`,
        resourceLink: 'https://developer.mozilla.org'
      };
    });
  }, [selectedTargetType, currentCareer, currentOpp, studentSkillsSet]);

  // Compute overall learning path completion
  const overallProgress = useMemo(() => {
    if (learningSteps.length === 0) return 0;
    let completedCount = 0;
    learningSteps.forEach((s) => {
      const status = learningStepStatus[s.id];
      if (status?.completed || (!status && s.completed)) {
        completedCount++;
      }
    });
    return Math.round((completedCount / learningSteps.length) * 100);
  }, [learningSteps, learningStepStatus]);

  const recommendedProjects = selectedTargetType === 'career' ? currentCareer.recommendedProjects : [
    {
      title: `${currentOpp.title} Portfolio Project`,
      description: `Create an end-to-end prototype tackling ${currentOpp.organization}'s problem space using ${currentOpp.requiredSkills.slice(0, 3).join(', ')}.`,
      tech: currentOpp.requiredSkills,
      difficulty: 'Intermediate' as const
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Skill Gap & Career
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Analyze qualification requirements, identify missing skills, and follow structured AI learning roadmaps.
          </p>
        </div>

        {/* Target Type Selector */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSelectedTarget('career', careerTargets[0].id)}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              selectedTargetType === 'career'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Target Career
          </button>
          <button
            type="button"
            onClick={() => setSelectedTarget('opportunity', opportunities[0].id)}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              selectedTargetType === 'opportunity'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Target Opportunity
          </button>
        </div>
      </div>

      {/* TARGET SELECTION CARD */}
      <div className="p-5 sm:p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {selectedTargetType === 'career' ? 'Target Career Roadmap' : 'Target Opportunity Gap Analysis'}
            </span>
            <h3 className="text-lg font-bold text-slate-900">{targetTitle}</h3>
          </div>

          {/* Dropdown Selector */}
          <div className="w-full sm:w-72">
            {selectedTargetType === 'career' ? (
              <select
                value={selectedTargetId}
                onChange={(e) => setSelectedTarget('career', e.target.value)}
                className="w-full text-xs font-semibold p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {careerTargets.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={selectedTargetId}
                onChange={(e) => setSelectedTarget('opportunity', e.target.value)}
                className="w-full text-xs font-semibold p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {opportunities.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.title} ({o.organization})
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Curriculum Mastery Progress</span>
            <span className="font-bold text-indigo-600">{overallProgress}% Completed</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* THREE SKILLS COMPARISON PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Skills */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Current Skills</span>
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              {matchedSkills.length} Matched
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Skills you currently possess that directly satisfy this target.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {matchedSkills.map((sk) => (
              <span
                key={sk}
                className="px-2.5 py-1 text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md font-medium"
              >
                {sk}
              </span>
            ))}
            {matchedSkills.length === 0 && (
              <span className="text-xs text-slate-400 italic">None matched yet.</span>
            )}
          </div>
        </div>

        {/* Required Skills */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Required Skills</span>
            </h3>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              {targetRequiredSkills.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Baseline core competencies expected by employers and recruiters.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {targetRequiredSkills.map((sk) => (
              <span
                key={sk}
                className="px-2.5 py-1 text-xs bg-slate-100 border border-slate-200 text-slate-800 rounded-md font-medium"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Missing Skills</span>
            </h3>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
              {missingSkills.length} Gaps
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Skills requiring focused study to elevate match percentage to 95%+.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {missingSkills.map((item) => (
              <span
                key={item.name}
                className={`px-2.5 py-1 text-xs rounded-md font-medium border flex items-center gap-1 ${
                  item.priority === 'High'
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : item.priority === 'Medium'
                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span>{item.name}</span>
                <span className="text-[10px] opacity-75">({item.priority})</span>
              </span>
            ))}
            {missingSkills.length === 0 && (
              <span className="text-xs text-emerald-600 font-medium">All required skills met!</span>
            )}
          </div>
        </div>
      </div>

      {/* WHAT TO LEARN GUIDANCE */}
      <div className="p-5 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase tracking-wide">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>What To Learn Next</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {missingSkills.length > 0
            ? `Prioritize ${missingSkills[0].name} (${missingSkills[0].priority} priority). Closing this single gap will noticeably increase your eligibility for ${targetTitle}. Follow the ordered AI curriculum below.`
            : `You have completed all baseline prerequisites for ${targetTitle}! Focus on building the recommended portfolio project to showcase production readiness.`}
        </p>
      </div>

      {/* AI ORDERED LEARNING PATH */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">AI Learning Path</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured step-by-step curriculum with estimated completion times
            </p>
          </div>
          <span className="text-xs text-slate-500">{learningSteps.length} Steps</span>
        </div>

        <div className="space-y-3">
          {learningSteps.map((step) => {
            const currentStatus = learningStepStatus[step.id] || {
              completed: step.completed,
              progress: step.progress
            };
            const isCompleted = currentStatus.completed;

            return (
              <div
                key={step.id}
                className={`p-5 rounded-xl border transition-all space-y-3 ${
                  isCompleted
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-slate-200 bg-white shadow-2xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {step.stepNumber}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            step.priority === 'High'
                              ? 'bg-rose-50 text-rose-700 border border-rose-100'
                              : step.priority === 'Medium'
                              ? 'bg-amber-50 text-amber-700 border border-amber-100'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {step.priority} Priority
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {step.recommendedLearning}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Progress */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveResourceModal(step)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 text-indigo-600" />
                      <span>Start Learning</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleLearningStepComplete(step.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                    </button>
                  </div>
                </div>

                {/* Progress bar inside card */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Est. Time: {step.estimatedTime}
                    </span>
                    <span>·</span>
                    <span>Skill: {step.skill}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-700">
                      {currentStatus.progress}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECOMMENDED PROJECTS */}
      <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Recommended Projects</h3>
          </div>
          <span className="text-xs text-slate-500">Hands-on proof of work</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedProjects.map((proj) => (
            <div
              key={proj.title}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    {proj.difficulty}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[11px] bg-white border border-slate-200 text-slate-700 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RESOURCE MODAL */}
      {activeResourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {activeResourceModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveResourceModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 space-y-1">
                <div className="font-semibold text-indigo-900">
                  {activeResourceModal.resourceTitle}
                </div>
                <div className="text-[11px] text-slate-500">
                  Format: {activeResourceModal.resourceType} · Estimated Time: {activeResourceModal.estimatedTime}
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-slate-800">Resource Overview</div>
                <p className="leading-relaxed text-slate-600">
                  {activeResourceModal.resourceSummary}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-slate-800">Learning Objectives</div>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li>Understand core architecture patterns and standard idioms.</li>
                  <li>Build reproducible unit and integration test exercises.</li>
                  <li>Incorporate real-world benchmarks into your portfolio codebase.</li>
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    toggleLearningStepComplete(activeResourceModal.id);
                    setActiveResourceModal(null);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                >
                  Mark Step as Completed
                </button>
                <button
                  type="button"
                  onClick={() => setActiveResourceModal(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
