'use client';

import React from 'react';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-72 overflow-hidden">
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
