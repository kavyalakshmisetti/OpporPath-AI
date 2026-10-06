import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  UserProfile,
  Opportunity,
  ApplicationItem,
  ApplicationStatus,
  OpportunityCategory,
  WorkType,
  UserSettings,
  AppPage,
  ResumeData
} from '../types';
import {
  initialProfile,
  initialOpportunities,
  initialApplications,
  initialSettings,
  careerTargets
} from '../data/mockData';

export interface AiSearchState {
  isSearching: boolean;
  step: number; // 1 to 5
  progress: number; // 0 to 100
  discoveredCount: number;
  matchedCount: number;
  completed: boolean;
  currentAgent: string;
  statusMessage: string;
}

interface AppContextType {
  // Navigation & View
  viewMode: 'landing' | 'app';
  setViewMode: (mode: 'landing' | 'app') => void;
  activePage: AppPage;
  setActivePage: (page: AppPage) => void;
  selectedOpportunityId: string | null;
  setSelectedOpportunityId: (id: string | null) => void;
  navigateTo: (page: AppPage, opportunityId?: string) => void;

  // Auth
  isAuthenticated: boolean;
  login: (email: string, password?: string) => boolean;
  signup: (name: string, email: string, password?: string) => boolean;
  logout: () => void;

  // User Profile
  userProfile: UserProfile;
  profileCompletion: number;
  updateProfile: (updated: Partial<UserProfile>) => void;
  uploadResume: (file: File) => Promise<void>;
  replaceResume: (file: File) => Promise<void>;
  removeResume: () => void;

  // Opportunities & Matching
  opportunities: Opportunity[];
  savedOpportunityIds: string[];
  toggleSaveOpportunity: (oppId: string) => void;
  isOpportunitySaved: (oppId: string) => boolean;
  selectedOpportunity: Opportunity | null;

  // Search & Filters on Opportunities page
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
  filterWorkType: string;
  setFilterWorkType: (wt: string) => void;
  filterSortBy: string;
  setFilterSortBy: (sort: string) => void;
  filterMinMatch: number;
  setFilterMinMatch: (match: number) => void;
  resetFilters: () => void;

  // AI Search Process
  aiSearchState: AiSearchState;
  startAiSearch: () => void;

  // Application Tracker
  applications: ApplicationItem[];
  addOrUpdateApplication: (opp: Opportunity, status?: ApplicationStatus, notes?: string) => void;
  updateApplicationStatus: (appId: string, newStatus: ApplicationStatus) => void;
  updateApplicationNotes: (appId: string, notes: string) => void;

  // Skill Gap & Career
  selectedTargetType: 'opportunity' | 'career';
  selectedTargetId: string;
  setSelectedTarget: (type: 'opportunity' | 'career', id: string) => void;
  learningStepStatus: Record<string, { completed: boolean; progress: number }>;
  toggleLearningStepComplete: (stepId: string) => void;
  updateLearningStepProgress: (stepId: string, progress: number) => void;

  // Settings
  settings: UserSettings;
  updateSettings: (newSettings: UserSettings) => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'opporpath_user_profile_v1',
  AUTH: 'opporpath_auth_v1',
  SAVED: 'opporpath_saved_opps_v1',
  APPLICATIONS: 'opporpath_applications_v1',
  SETTINGS: 'opporpath_settings_v1',
  LEARNING: 'opporpath_learning_progress_v1'
};

function calculateCompletion(p: UserProfile): number {
  let score = 0;
  if (p.fullName && p.fullName.trim().length > 1) score += 6;
  if (p.email && p.email.includes('@')) score += 6;
  if (p.phone && p.phone.trim().length > 5) score += 6;
  if (p.location && p.location.trim().length > 2) score += 6;
  if (p.degree && p.degree.trim().length > 2) score += 8;
  if (p.institution && p.institution.trim().length > 2) score += 8;
  if (p.currentYear && p.currentYear.trim().length > 1) score += 8;
  if (p.graduationYear && p.graduationYear.trim().length > 1) score += 8;
  if (p.technicalSkills && p.technicalSkills.length >= 3) score += 12;
  else if (p.technicalSkills && p.technicalSkills.length > 0) score += 6;
  if (p.softSkills && p.softSkills.length >= 2) score += 8;
  else if (p.softSkills && p.softSkills.length > 0) score += 4;
  if (p.interests && p.interests.length > 0) score += 6;
  if (p.careerGoals && p.careerGoals.trim().length > 10) score += 8;
  if (p.preferredOpportunityTypes && p.preferredOpportunityTypes.length > 0) score += 6;
  if (p.preferredWorkType && p.preferredWorkType.length > 0) score += 5;
  if (p.resume) score += 7;

  return Math.min(100, Math.max(10, score));
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Authentication & View
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
      return saved ? JSON.parse(saved) : true; // Default logged in for smooth exploration
    } catch {
      return true;
    }
  });

  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [activePage, setActivePage] = useState<AppPage>('dashboard');
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  // Saved Opportunities
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
      return saved ? JSON.parse(saved) : ['opp-1', 'opp-4', 'opp-6'];
    } catch {
      return ['opp-1', 'opp-4', 'opp-6'];
    }
  });

  // Applications
  const [applications, setApplications] = useState<ApplicationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return saved ? JSON.parse(saved) : initialApplications;
    } catch {
      return initialApplications;
    }
  });

  // Settings
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  // Learning progress
  const [learningStepStatus, setLearningStepStatus] = useState<Record<string, { completed: boolean; progress: number }>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEARNING);
      return saved ? JSON.parse(saved) : {
        'lp-fs-1': { completed: false, progress: 80 },
        'lp-fs-2': { completed: false, progress: 40 },
        'lp-ai-1': { completed: false, progress: 60 }
      };
    } catch {
      return {
        'lp-fs-1': { completed: false, progress: 80 },
        'lp-fs-2': { completed: false, progress: 40 }
      };
    }
  });

  // Skill gap target selection
  const [selectedTargetType, setSelectedTargetType] = useState<'opportunity' | 'career'>('career');
  const [selectedTargetId, setSelectedTargetId] = useState<string>('career-fullstack');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterWorkType, setFilterWorkType] = useState<string>('All');
  const [filterSortBy, setFilterSortBy] = useState<string>('best-match');
  const [filterMinMatch, setFilterMinMatch] = useState<number>(0);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // AI Search Simulation state
  const [aiSearchState, setAiSearchState] = useState<AiSearchState>({
    isSearching: false,
    step: 5,
    progress: 100,
    discoveredCount: 12,
    matchedCount: 8,
    completed: true,
    currentAgent: 'Recommendation Engine',
    statusMessage: 'Your best matched opportunities are calibrated and ready.'
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userProfile));
    } catch (e) {
      console.error(e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(isAuthenticated));
    } catch (e) {
      console.error(e);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedOpportunityIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedOpportunityIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LEARNING, JSON.stringify(learningStepStatus));
    } catch (e) {
      console.error(e);
    }
  }, [learningStepStatus]);

  // Dynamic Profile Completion
  const profileCompletion = useMemo(() => {
    return calculateCompletion(userProfile);
  }, [userProfile]);

  // Recalculate dynamic match percentage and custom explanation for all opportunities based on userProfile
  const opportunities = useMemo(() => {
    const userTech = new Set(userProfile.technicalSkills.map((s) => s.toLowerCase()));
    const userSoft = new Set(userProfile.softSkills.map((s) => s.toLowerCase()));
    const userTypes = new Set(userProfile.preferredOpportunityTypes);
    const userWorkTypes = new Set(userProfile.preferredWorkType);

    return initialOpportunities.map((opp) => {
      // Calculate required skill overlap
      const reqMatched = opp.requiredSkills.filter(
        (s) => userTech.has(s.toLowerCase()) || userSoft.has(s.toLowerCase())
      );
      const prefMatched = opp.preferredSkills.filter(
        (s) => userTech.has(s.toLowerCase()) || userSoft.has(s.toLowerCase())
      );

      let score = 55;
      if (opp.requiredSkills.length > 0) {
        score += Math.round((reqMatched.length / opp.requiredSkills.length) * 30);
      }
      if (opp.preferredSkills.length > 0) {
        score += Math.round((prefMatched.length / opp.preferredSkills.length) * 10);
      }
      if (userTypes.has(opp.category)) score += 3;
      if (userWorkTypes.has(opp.workType)) score += 2;

      // Cap at 98, floor at 60
      const finalMatch = Math.min(98, Math.max(62, score));

      let customWhy = opp.whyThisFitsYou;
      if (reqMatched.length > 0) {
        customWhy = `Direct match with your ${reqMatched.slice(0, 3).join(', ')} capabilities. Meets your preferred ${opp.workType} format.`;
      }

      return {
        ...opp,
        matchPercentage: finalMatch,
        whyThisFitsYou: customWhy
      };
    });
  }, [userProfile]);

  // Currently selected opportunity object
  const selectedOpportunity = useMemo(() => {
    if (!selectedOpportunityId) return null;
    return opportunities.find((o) => o.id === selectedOpportunityId) || null;
  }, [selectedOpportunityId, opportunities]);

  // Navigation helper
  const navigateTo = (page: AppPage, opportunityId?: string) => {
    if (opportunityId !== undefined) {
      setSelectedOpportunityId(opportunityId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth actions
  const login = (email: string, _password?: string) => {
    setIsAuthenticated(true);
    setViewMode('app');
    setActivePage('dashboard');
    showToast(`Welcome back, ${userProfile.fullName}!`);
    return true;
  };

  const signup = (name: string, email: string, _password?: string) => {
    const updated: UserProfile = {
      ...userProfile,
      fullName: name || 'Student Member',
      email: email || 'student@domain.edu'
    };
    setUserProfile(updated);
    setIsAuthenticated(true);
    setViewMode('app');
    setActivePage('dashboard');
    showToast(`Account created! Welcome to OpporPath AI, ${name}.`);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setViewMode('landing');
    setActivePage('dashboard');
    showToast('Logged out successfully.');
  };

  // User Profile actions
  const updateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updated
    }));
    showToast('Profile updated successfully.');
  };

  const uploadResume = async (file: File) => {
    const resumeInfo: ResumeData = {
      fileName: file.name,
      fileSize: `${Math.round(file.size / 1024)} KB`,
      uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      summary: `Parsed resume for ${userProfile.fullName}. Identified technical background in software development and computing systems.`,
      extractedSkills: ['TypeScript', 'React', 'Python', 'Node.js', 'Git', 'REST APIs', 'SQL']
    };
    setUserProfile((prev) => ({
      ...prev,
      resume: resumeInfo
    }));
    showToast(`Resume "${file.name}" uploaded and parsed!`);
  };

  const replaceResume = async (file: File) => {
    await uploadResume(file);
  };

  const removeResume = () => {
    setUserProfile((prev) => ({
      ...prev,
      resume: null
    }));
    showToast('Resume removed.');
  };

  // Save/Unsave Opportunity
  const toggleSaveOpportunity = (oppId: string) => {
    const opp = opportunities.find((o) => o.id === oppId);
    if (!opp) return;

    if (savedOpportunityIds.includes(oppId)) {
      setSavedOpportunityIds((prev) => prev.filter((id) => id !== oppId));
      // Also update application tracker if it was just in 'Saved' state
      setApplications((prev) => prev.filter((a) => !(a.opportunityId === oppId && a.status === 'Saved')));
      showToast(`Removed "${opp.title}" from saved opportunities.`);
    } else {
      setSavedOpportunityIds((prev) => [...prev, oppId]);
      // If not in application tracker, add as Saved
      const existsInApps = applications.some((a) => a.opportunityId === oppId);
      if (!existsInApps) {
        const newApp: ApplicationItem = {
          id: `app-${Date.now()}`,
          opportunityId: opp.id,
          opportunityTitle: opp.title,
          organization: opp.organization,
          category: opp.category,
          location: opp.location,
          workType: opp.workType,
          status: 'Saved',
          appliedDate: new Date().toISOString().split('T')[0],
          deadline: opp.deadline,
          notes: 'Saved for review.',
          updatedAt: new Date().toISOString().split('T')[0]
        };
        setApplications((prev) => [newApp, ...prev]);
      }
      showToast(`Saved "${opp.title}".`);
    }
  };

  const isOpportunitySaved = (oppId: string) => {
    return savedOpportunityIds.includes(oppId);
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery('');
    setFilterCategory('All');
    setFilterWorkType('All');
    setFilterSortBy('best-match');
    setFilterMinMatch(0);
    showToast('Filters reset.');
  };

  // Applications
  const addOrUpdateApplication = (opp: Opportunity, status: ApplicationStatus = 'Applied', notes: string = '') => {
    const existingIndex = applications.findIndex((a) => a.opportunityId === opp.id);
    const today = new Date().toISOString().split('T')[0];

    if (existingIndex >= 0) {
      setApplications((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                status,
                appliedDate: today,
                notes: notes || item.notes,
                updatedAt: today
              }
            : item
        )
      );
    } else {
      const newApp: ApplicationItem = {
        id: `app-${Date.now()}`,
        opportunityId: opp.id,
        opportunityTitle: opp.title,
        organization: opp.organization,
        category: opp.category,
        location: opp.location,
        workType: opp.workType,
        status,
        appliedDate: today,
        deadline: opp.deadline,
        notes: notes || `Applied via OpporPath AI application workflow.`,
        updatedAt: today
      };
      setApplications((prev) => [newApp, ...prev]);
    }

    if (!savedOpportunityIds.includes(opp.id)) {
      setSavedOpportunityIds((prev) => [...prev, opp.id]);
    }

    showToast(`Application submitted for ${opp.title}!`);
  };

  const updateApplicationStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? {
              ...app,
              status: newStatus,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : app
      )
    );
    showToast(`Status updated to "${newStatus}".`);
  };

  const updateApplicationNotes = (appId: string, notes: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? {
              ...app,
              notes,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : app
      )
    );
    showToast('Notes updated.');
  };

  // Skill Gap & Learning Path
  const setSelectedTarget = (type: 'opportunity' | 'career', id: string) => {
    setSelectedTargetType(type);
    setSelectedTargetId(id);
  };

  const toggleLearningStepComplete = (stepId: string) => {
    setLearningStepStatus((prev) => {
      const current = prev[stepId] || { completed: false, progress: 0 };
      const nextCompleted = !current.completed;
      return {
        ...prev,
        [stepId]: {
          completed: nextCompleted,
          progress: nextCompleted ? 100 : 0
        }
      };
    });
    showToast('Learning step progress updated.');
  };

  const updateLearningStepProgress = (stepId: string, progress: number) => {
    setLearningStepStatus((prev) => ({
      ...prev,
      [stepId]: {
        completed: progress >= 100,
        progress: Math.min(100, Math.max(0, progress))
      }
    }));
  };

  // Settings
  const updateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    showToast('Preferences & settings saved.');
  };

  // Simulated Multi-Agent AI Search Process
  const startAiSearch = () => {
    setAiSearchState({
      isSearching: true,
      step: 1,
      progress: 15,
      discoveredCount: 0,
      matchedCount: 0,
      completed: false,
      currentAgent: 'Profile Agent',
      statusMessage: `Analyzing ${userProfile.fullName}'s education, ${userProfile.technicalSkills.length} technical skills, and career preferences...`
    });

    // Step 2: Scout Agents (Discovering)
    setTimeout(() => {
      setAiSearchState((prev) => ({
        ...prev,
        step: 2,
        progress: 35,
        discoveredCount: 6,
        currentAgent: 'Scout Agents',
        statusMessage: 'Scouting supported sources: LinkedIn, Internshala, Wellfound, Devpost, Indeed, Meetup...'
      }));
    }, 900);

    // Step 3: Matching Agent (Comparing skills)
    setTimeout(() => {
      setAiSearchState((prev) => ({
        ...prev,
        step: 3,
        progress: 60,
        discoveredCount: 12,
        matchedCount: 5,
        currentAgent: 'Matching Agent',
        statusMessage: 'Comparing opportunity requirements against your verified skills and resume tokens...'
      }));
    }, 1800);

    // Step 4: Career & Skill Agent (Analyzing relevance & gaps)
    setTimeout(() => {
      setAiSearchState((prev) => ({
        ...prev,
        step: 4,
        progress: 85,
        discoveredCount: 12,
        matchedCount: 9,
        currentAgent: 'Career & Skill Agent',
        statusMessage: 'Analyzing growth trajectories, missing skills, and learning curve feasibility...'
      }));
    }, 2700);

    // Step 5: Recommendation Engine (Ranking results)
    setTimeout(() => {
      setAiSearchState((prev) => ({
        ...prev,
        isSearching: false,
        step: 5,
        progress: 100,
        discoveredCount: 12,
        matchedCount: 12,
        completed: true,
        currentAgent: 'Recommendation Engine',
        statusMessage: 'Your best opportunities are ranked and ready!'
      }));
      showToast('AI search complete! 12 tailored opportunities ready.');
    }, 3600);
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        activePage,
        setActivePage,
        selectedOpportunityId,
        setSelectedOpportunityId,
        navigateTo,

        isAuthenticated,
        login,
        signup,
        logout,

        userProfile,
        profileCompletion,
        updateProfile,
        uploadResume,
        replaceResume,
        removeResume,

        opportunities,
        savedOpportunityIds,
        toggleSaveOpportunity,
        isOpportunitySaved,
        selectedOpportunity,

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

        aiSearchState,
        startAiSearch,

        applications,
        addOrUpdateApplication,
        updateApplicationStatus,
        updateApplicationNotes,

        selectedTargetType,
        selectedTargetId,
        setSelectedTarget,
        learningStepStatus,
        toggleLearningStepComplete,
        updateLearningStepProgress,

        settings,
        updateSettings,

        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
