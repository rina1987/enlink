'use client';

import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // ログインページではチェックしない
    if (pathname === '/login') return;
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace('/login');
      }
    };
    check();
    // セッション変化も監視
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && pathname !== '/login') {
        router.replace('/login');
      }
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [router, pathname]);

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
