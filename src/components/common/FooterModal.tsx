import React from 'react';
import { X, ShieldCheck, FileCheck, Info, Mail } from 'lucide-react';

interface FooterModalProps {
  type: 'about' | 'privacy' | 'terms' | 'contact' | null;
  onClose: () => void;
}

export const FooterModal: React.FC<FooterModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap = {
    about: {
      title: 'About OpporPath AI',
      icon: Info,
      content: (
        <div className="space-y-3 text-sm text-slate-600">
          <p>
            OpporPath AI is an intelligent career discovery ecosystem built specifically for university students, recent graduates, and early-career software developers.
          </p>
          <p>
            Instead of forcing candidates to monitor dozens of scattered platforms, our multi-agent architecture proactively scouts opportunities, analyzes candidate skill profiles, and bridges skill gaps with targeted curriculum paths.
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
            <div className="font-semibold text-slate-900">Supported Opportunities:</div>
            <div>• Summer & Fall Engineering Internships</div>
            <div>• Full-Time New Grad & Junior Software Engineering Roles</div>
            <div>• Competitive Hackathons & Builder Challenges</div>
            <div>• Technical Meetups & Networking Sessions</div>
          </div>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      icon: ShieldCheck,
      content: (
        <div className="space-y-3 text-sm text-slate-600">
          <p>
            Your privacy is our priority. OpporPath AI adheres to strict data minimization standards.
          </p>
          <div className="space-y-2 text-xs">
            <p className="font-medium text-slate-800">1. Data Storage</p>
            <p>Your resume, profile information, and application track records are stored client-side in your secure local session workspace unless you explicitly submit an external application.</p>
            <p className="font-medium text-slate-800">2. AI Matching</p>
            <p>The Profile Agent parses your skills solely to compute similarity vectors against public job descriptions. We do not sell your personal contact info to third-party ad brokers.</p>
            <p className="font-medium text-slate-800">3. Rights & Control</p>
            <p>You retain full ownership of your uploaded files and can wipe or update your profile at any time in Settings.</p>
          </div>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      icon: FileCheck,
      content: (
        <div className="space-y-3 text-sm text-slate-600">
          <p>
            By accessing OpporPath AI, you agree to these operational guidelines designed to keep our student community fair and authentic.
          </p>
          <div className="space-y-2 text-xs">
            <p className="font-medium text-slate-800">1. Authentic Applications</p>
            <p>Users must provide accurate academic credentials, degree years, and skills when applying to companies via the platform.</p>
            <p className="font-medium text-slate-800">2. External Listings</p>
            <p>OpporPath scouts public listings from partner platforms including Wellfound, LinkedIn, and Devpost. Company logos and trademarks belong to their respective holders.</p>
          </div>
        </div>
      )
    },
    contact: {
      title: 'Contact & Support',
      icon: Mail,
      content: (
        <div className="space-y-3 text-sm text-slate-600">
          <p>
            Have feedback, bug reports, or partnership inquiries? Our team is here to assist students and university campus recruiters.
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
            <div>
              <span className="font-medium text-slate-800">Student Support:</span> support@opporpath.ai
            </div>
            <div>
              <span className="font-medium text-slate-800">Recruiter Inquiries:</span> partners@opporpath.ai
            </div>
            <div>
              <span className="font-medium text-slate-800">Office:</span> 500 Howard Street, San Francisco, CA 94105
            </div>
          </div>
        </div>
      )
    }
  };

  const { title, icon: Icon, content } = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{content}</div>
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
