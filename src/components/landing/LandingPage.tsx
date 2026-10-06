import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NavbarLanding } from '../layout/NavbarLanding';
import { AuthModal } from '../auth/AuthModal';
import { FooterModal } from '../common/FooterModal';
import {
  Sparkles,
  ArrowRight,
  UserCheck,
  Search,
  CheckCircle2,
  Send,
  Cpu,
  Compass,
  GitCompare,
  TrendingUp,
  Briefcase,
  Code,
  Users,
  Trophy,
  Target,
  BarChart2,
  Bookmark,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';
import { OpportunityCategory } from '../../types';

export const LandingPage: React.FC = () => {
  const { setViewMode, setActivePage, setFilterCategory, startAiSearch } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [footerModalType, setFooterModalType] = useState<'about' | 'privacy' | 'terms' | 'contact' | null>(null);

  const handleOpenLogin = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const handleOpenSignUp = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const handleExploreOpportunities = () => {
    setViewMode('app');
    setActivePage('opportunities');
    setFilterCategory('All');
  };

  const handleCategoryClick = (category: OpportunityCategory) => {
    setViewMode('app');
    setFilterCategory(category);
    setActivePage('opportunities');
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <NavbarLanding
        onOpenLogin={handleOpenLogin}
        onOpenSignUp={handleOpenSignUp}
        onScrollTo={handleScrollTo}
      />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Agent Career Intelligence for Students</span>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Find Opportunities That Fit You
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
                Your AI-powered career opportunity platform that discovers, matches, and recommends opportunities based on your skills, interests, education, and career goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={handleOpenSignUp}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleExploreOpportunities}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Explore Opportunities</span>
              </button>
            </div>

            {/* Quick Preview Card */}
            <div className="pt-8 max-w-3xl mx-auto">
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/80 shadow-xs text-left">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 text-xs text-slate-500">
                  <div className="flex items-center gap-2 font-medium text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Agent Analysis Preview
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span>Profile: Alex Morgan</span>
                    <span>·</span>
                    <span>Class of 2026</span>
                  </div>
                </div>
                <div className="pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">
                      Frontend Software Engineering Intern (Summer 2027)
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Linear Technologies · San Francisco, CA · Hybrid
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-600">94% Match</div>
                      <div className="text-[11px] text-slate-500">Skills + Education fit</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleExploreOpportunities}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    >
                      View Match
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM & SOLUTION SECTION */}
        <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              {/* Problem */}
              <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-semibold text-sm">
                    01
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    The Problem
                  </h2>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">
                    Students spend too much time searching multiple websites for internships, jobs, hackathons, and meetups.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Tabs get lost, requirements are opaque, deadlines slip past unnoticed, and applicants never know why they were filtered out or what skills they lacked.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-rose-700">
                  <Clock className="w-4 h-4" />
                  <span>Avg. 15+ hours wasted per week browsing disorganized job listings</span>
                </div>
              </div>

              {/* Solution */}
              <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-semibold text-sm">
                    02
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    The AI Solution
                  </h2>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">
                    AI understands your profile, discovers relevant opportunities, compares requirements with your skills, and recommends the opportunities that fit you best.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Get an instant Match Percentage, read tailored explanations of "Why This Fits You", identify specific skill gaps, and follow curated learning paths.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Personalized matching engine that works specifically for your student profile</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-16 sm:py-20 bg-white border-b border-slate-200 scroll-mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                How It Works
              </h2>
              <p className="text-sm text-slate-600">
                Four simple steps from student profile to personalized career opportunity recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Create Your Profile',
                  desc: 'Input your degree, coursework, technical skills, soft skills, interests, and upload your resume.',
                  icon: UserCheck
                },
                {
                  step: '2',
                  title: 'AI Searches Opportunities',
                  desc: 'Scout agents continuously index verified internships, full-time jobs, hackathons, and local meetups.',
                  icon: Search
                },
                {
                  step: '3',
                  title: 'AI Matches Your Skills',
                  desc: 'Matching algorithms compare requirements against your profile to generate a real Match % and gap insights.',
                  icon: GitCompare
                },
                {
                  step: '4',
                  title: 'Discover & Apply',
                  desc: 'Review custom fit explanations, follow learning paths to bridge missing skills, and track applications.',
                  icon: Send
                }
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-slate-500" />
                      <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI AGENTS SECTION */}
        <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
                <Cpu className="w-3.5 h-3.5" />
                <span>Autonomous Multi-Agent Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Four Specialized AI Agents Working For You
              </h2>
              <p className="text-sm text-slate-600">
                Unlike generic keyword search bars, OpporPath AI orchestrates four focused agents to evaluate opportunities holistically.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Agent 1 */}
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">PROFILE AGENT</h3>
                    <p className="text-xs text-slate-500">Candidate Deep Understanding</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Extracts semantic context from your profile. Understands:
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-700">
                  {['Education', 'Skills', 'Interests', 'Resume', 'Location', 'Preferences', 'Career Goals'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-slate-100 rounded-md text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Agent 2 */}
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">SCOUT AGENTS</h3>
                    <p className="text-xs text-slate-500">Multi-Channel Discovery</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Discover relevant opportunities from supported sources across the web:
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-700">
                  {['LinkedIn', 'Internshala', 'Indeed', 'Wellfound', 'Devpost', 'Meetup'].map((src) => (
                    <span key={src} className="px-2.5 py-1 bg-slate-100 rounded-md text-slate-700">
                      {src}
                    </span>
                  ))}
                </div>
              </div>

              {/* Agent 3 */}
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <GitCompare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">MATCHING AGENT</h3>
                    <p className="text-xs text-slate-500">Skill & Eligibility Compatibility</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Compares opportunity requirements with the student's profile. Generates a precise Match % and explains in plain English why a role fits you.
                </p>
                <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 font-mono">
                  Score = Weighted (Technical Skills 50% + Soft Skills 20% + Work Type 15% + Degree Fit 15%)
                </div>
              </div>

              {/* Agent 4 */}
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">CAREER & SKILL AGENT</h3>
                    <p className="text-xs text-slate-500">Roadmaps & Gap Diagnostics</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Identifies missing skills and recommends structured learning paths, project ideas, and free courses to turn 75% matches into 95% matches.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 bg-rose-50 text-rose-700 rounded-md">High Priority Gaps</span>
                  <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-md">Medium Priority</span>
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md">Interactive Roadmaps</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OPPORTUNITY CATEGORIES */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Discover All Four Opportunity Categories
              </h2>
              <p className="text-sm text-slate-600">
                Click any category below to immediately explore matched listings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  category: 'Internships' as OpportunityCategory,
                  title: 'Internships',
                  icon: Briefcase,
                  count: '4 active listings',
                  desc: 'Summer & Fall technical internships with mentorship and stipends.'
                },
                {
                  category: 'Jobs' as OpportunityCategory,
                  title: 'Jobs',
                  icon: Target,
                  count: '3 active listings',
                  desc: 'Entry-level, new graduate, and junior software engineer positions.'
                },
                {
                  category: 'Hackathons' as OpportunityCategory,
                  title: 'Hackathons',
                  icon: Trophy,
                  count: '3 active listings',
                  desc: 'High-stakes coding sprints, prize pools, and fast-track recruiter referrals.'
                },
                {
                  category: 'Meetups' as OpportunityCategory,
                  title: 'Meetups',
                  icon: Users,
                  count: '2 active listings',
                  desc: 'Local developer gatherings, tech talks, and grassroots networking.'
                }
              ].map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => handleCategoryClick(item.category)}
                  className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-300 transition-all text-left flex flex-col justify-between group shadow-2xs"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">{item.count}</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-medium text-indigo-600">
                    <span>Explore category</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Built For Serious Student Career Success
              </h2>
              <p className="text-sm text-slate-600">
                Everything you need to discover, improve, and apply with confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'AI Opportunity Matching',
                  desc: 'Synthesizes your technical skills, soft skills, and degree trajectory to highlight high-affinity roles.',
                  icon: Sparkles
                },
                {
                  title: 'Personalized Recommendations',
                  desc: 'Direct, tailored opportunities surfaced on your dashboard that evolve as you add new skills.',
                  icon: Target
                },
                {
                  title: 'Multi-source Opportunity Discovery',
                  desc: 'Aggregates listings from LinkedIn, Internshala, Indeed, Wellfound, Devpost, and Meetup.',
                  icon: Layers
                },
                {
                  title: 'Match Percentage',
                  desc: 'Objective, transparent percentage score indicating your qualification level for every listing.',
                  icon: BarChart2
                },
                {
                  title: 'Why This Fits You',
                  desc: 'Plain-language explanation breaking down exactly which of your projects and skills match the job.',
                  icon: CheckCircle2
                },
                {
                  title: 'Skill Gap Analysis',
                  desc: 'Visual breakdown of current vs. required skills with High, Medium, and Low priorities.',
                  icon: TrendingUp
                },
                {
                  title: 'AI Career Guidance',
                  desc: 'Dynamic career insight banners and project prompts that prepare you for target roles.',
                  icon: Code
                },
                {
                  title: 'Application Tracking',
                  desc: 'Full-featured Kanban and list management with Saved, Applying, Applied, Interview, Selected, and Rejected states.',
                  icon: Send
                },
                {
                  title: 'Saved Opportunities',
                  desc: 'Bookmark opportunities to review later or keep tabs on approaching application windows.',
                  icon: Bookmark
                },
                {
                  title: 'Deadline Tracking',
                  desc: 'Approaching deadline countdowns ensure you never miss summer internship closing dates.',
                  icon: Clock
                }
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL LANDING CTA */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Start Finding Your Opportunities
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
              Join students discovering high-match internships, full-time engineering jobs, hackathons, and meetups with intelligent skill gap guidance.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleOpenSignUp}
                className="px-6 py-3 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 text-slate-600 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 text-sm">OpporPath AI</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">© 2026 All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setFooterModalType('about')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => handleScrollTo('features')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => setFooterModalType('privacy')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => setFooterModalType('terms')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={() => setFooterModalType('contact')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {authModalOpen && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setAuthModalOpen(false)}
        />
      )}

      {footerModalType && (
        <FooterModal
          type={footerModalType}
          onClose={() => setFooterModalType(null)}
        />
      )}
    </div>
  );
};
