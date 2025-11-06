'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [todayTasks, setTodayTasks] = useState<any[]>([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalCustomers: 0, activeProjects: 0, monthlyMeetings: 0, weeklyMeetings: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

        // 顧客数
        const { count: customersCount } = await supabase.from('customers').select('*', { count: 'exact', head: true });

        // 進行中案件（status='in_progress'）
        const { count: activeProjectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'in_progress');

        // 今月/今週の面談数
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfWeek = new Date(today);
        const dow = startOfWeek.getDay();
        const mondayOffset = dow === 0 ? -6 : 1 - dow;
        startOfWeek.setDate(today.getDate() + mondayOffset);

        const { count: monthlyMeetingsCount } = await supabase
          .from('meetings')
          .select('*', { count: 'exact', head: true })
          .gte('date', startOfMonth.toISOString())
          .lte('date', endOfDay.toISOString());

        const { count: weeklyMeetingsCount } = await supabase
          .from('meetings')
          .select('*', { count: 'exact', head: true })
          .gte('date', startOfWeek.toISOString())
          .lte('date', endOfDay.toISOString());

        setStats({
          totalCustomers: customersCount || 0,
          activeProjects: activeProjectsCount || 0,
          monthlyMeetings: monthlyMeetingsCount || 0,
          weeklyMeetings: weeklyMeetingsCount || 0
        });

        // 今日の予定（今日のmeetings）
        const { data: todayMeetings } = await supabase
          .from('meetings')
          .select('id, title, date, customer:customers(company_name)')
          .gte('date', startOfDay.toISOString())
          .lte('date', endOfDay.toISOString())
          .order('date', { ascending: true });

        setTodayTasks(
          (todayMeetings || []).map((m: any) => ({
            id: m.id,
            title: m.title,
            time: new Date(m.date).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
            customer: m.customer?.company_name || '',
            priority: 'medium',
            type: 'meeting'
          }))
        );

        // 期限間近（project_tasksのend_dateが今後14日）
        const twoWeeksLater = new Date();
        twoWeeksLater.setDate(today.getDate() + 14);
        const { data: tasksDue } = await supabase
          .from('project_tasks')
          .select('id, name, end_date, project:projects(name, customer:customers(company_name))')
          .gte('end_date', today.toISOString().slice(0, 10))
          .lte('end_date', twoWeeksLater.toISOString().slice(0, 10))
          .order('end_date', { ascending: true })
          .limit(10);

        setUpcomingDeadlines(
          (tasksDue || []).map((t: any) => {
            const deadlineDate = new Date(t.end_date);
            const diff = Math.ceil((deadlineDate.getTime() - startOfDay.getTime()) / (1000 * 60 * 60 * 24));
            return {
              id: t.id,
              title: t.name,
              deadline: t.end_date,
              daysLeft: diff,
              customer: t.project?.customer?.company_name || '',
              status: diff <= 3 ? 'urgent' : diff <= 7 ? 'warning' : 'normal'
            };
          })
        );

        // 最近の活動（activities 10件）
        const { data: activities } = await supabase
          .from('activities')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentActivities(
          (activities || []).map((a: any) => ({
            id: a.id,
            customer: a.title,
            action: a.description || a.type,
            time: new Date(a.created_at).toLocaleString(),
            type: a.type.includes('meeting') ? 'meeting' : a.type.includes('project') ? 'project' : 'customer'
          }))
        );
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'error';
      case 'warning': return 'warning';
      case 'normal': return 'success';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'task':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
      case 'followup':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-text-light">読み込み中...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">総顧客数</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCustomers}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">進行中案件</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeProjects}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">今月の面談数</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.monthlyMeetings}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">今週の面談数</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.weeklyMeetings}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 今日のタスク */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">今日の予定</h3>
              <Button variant="ghost" size="sm">すべて表示</Button>
            </div>
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-shrink-0">
                    {getTypeIcon(task.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {task.customer} • {task.time}
                    </p>
                  </div>
                  <Badge variant={getPriorityColor(task.priority)} size="sm">
                    {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* 期限間近 */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">期限間近</h3>
              <Button variant="ghost" size="sm">すべて表示</Button>
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-red-600 dark:text-red-400 text-xs font-bold">
                        {deadline.daysLeft}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {deadline.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {deadline.customer} • {deadline.deadline}
                    </p>
                  </div>
                  <Badge variant={getStatusColor(deadline.status)} size="sm">
                    {deadline.status === 'urgent' ? '緊急' : deadline.status === 'warning' ? '注意' : '通常'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 最近の活動 */}
        <Card>
          <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">直近のアクティビティ</h3>
            <Button variant="ghost" size="sm">すべて表示</Button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                <div className="flex-shrink-0">
                  {getTypeIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.customer}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.action}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
