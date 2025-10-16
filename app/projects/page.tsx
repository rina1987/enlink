'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function ProjectsPage() {
  // 現在の日付（2025年10月14日を基準）
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 14)); // 月は0ベースなので9=10月
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  // サンプル案件データ
  const projects = [
    {
      id: 1,
      name: 'テクノソリューション株式会社',
      client: 'DX推進支援',
      tasks: [
        { name: '現状分析・課題整理', startDate: new Date(2025, 9, 1), endDate: new Date(2025, 9, 10), type: 'bar', color: 'bg-blue-500' },
        { name: '改善提案策定', startDate: new Date(2025, 9, 8), endDate: new Date(2025, 9, 20), type: 'bar', color: 'bg-indigo-500' },
        { name: '要件定義', startDate: new Date(2025, 9, 15), endDate: new Date(2025, 9, 25), type: 'bar', color: 'bg-purple-500' },
        { name: '実行支援・フォローアップ', startDate: new Date(2025, 9, 22), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-violet-500' }
      ]
    },
    {
      id: 2,
      name: 'グローバルトレード株式会社',
      client: '海外展開支援',
      tasks: [
        { name: '市場調査', startDate: new Date(2025, 9, 3), endDate: new Date(2025, 9, 8), type: 'bar', color: 'bg-emerald-500' },
        { name: '競合分析', startDate: new Date(2025, 9, 5), endDate: new Date(2025, 9, 12), type: 'bar', color: 'bg-green-500' },
        { name: '戦略策定', startDate: new Date(2025, 9, 10), endDate: new Date(2025, 9, 20), type: 'bar', color: 'bg-teal-500' },
        { name: 'パートナー選定', startDate: new Date(2025, 9, 15), endDate: new Date(2025, 9, 25), type: 'bar', color: 'bg-cyan-500' },
        { name: '現地拠点立ち上げ', startDate: new Date(2025, 9, 22), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-sky-500' }
      ]
    },
    {
      id: 3,
      name: '未来建設工業',
      client: 'IoT導入支援',
      tasks: [
        { name: '要件定義', startDate: new Date(2025, 9, 1), endDate: new Date(2025, 9, 7), type: 'bar', color: 'bg-rose-500' },
        { name: '導入計画策定', startDate: new Date(2025, 9, 5), endDate: new Date(2025, 9, 15), type: 'bar', color: 'bg-pink-500' },
        { name: 'パイロット導入', startDate: new Date(2025, 9, 12), endDate: new Date(2025, 9, 22), type: 'bar', color: 'bg-fuchsia-500' },
        { name: '検証・改善', startDate: new Date(2025, 9, 20), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-purple-500' }
      ]
    },
    {
      id: 4,
      name: 'エコフードシステムズ',
      client: 'サプライチェーン改善',
      tasks: [
        { name: 'ヒアリング', startDate: new Date(2025, 9, 2), endDate: new Date(2025, 9, 4), type: 'bar', color: 'bg-amber-500' },
        { name: '現状分析', startDate: new Date(2025, 9, 4), endDate: new Date(2025, 9, 10), type: 'bar', color: 'bg-yellow-500' },
        { name: '課題抽出', startDate: new Date(2025, 9, 8), endDate: new Date(2025, 9, 15), type: 'bar', color: 'bg-lime-500' },
        { name: '改善計画策定', startDate: new Date(2025, 9, 14), endDate: new Date(2025, 9, 25), type: 'bar', color: 'bg-green-500' },
        { name: 'システム導入支援', startDate: new Date(2025, 9, 22), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-emerald-500' }
      ]
    },
    {
      id: 5,
      name: 'メディカルケアグループ',
      client: '経営効率化支援',
      tasks: [
        { name: '業務フロー分析', startDate: new Date(2025, 9, 1), endDate: new Date(2025, 9, 10), type: 'bar', color: 'bg-orange-500' },
        { name: '課題整理', startDate: new Date(2025, 9, 8), endDate: new Date(2025, 9, 15), type: 'bar', color: 'bg-amber-500' },
        { name: '改善施策立案', startDate: new Date(2025, 9, 12), endDate: new Date(2025, 9, 20), type: 'bar', color: 'bg-yellow-500' },
        { name: '実施計画策定', startDate: new Date(2025, 9, 18), endDate: new Date(2025, 9, 25), type: 'bar', color: 'bg-lime-500' },
        { name: '導入支援', startDate: new Date(2025, 9, 23), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-green-500' }
      ]
    },
    {
      id: 6,
      name: 'クリエイティブデザイン',
      client: 'ブランディング支援',
      tasks: [
        { name: 'ブランド分析', startDate: new Date(2025, 9, 3), endDate: new Date(2025, 9, 8), type: 'bar', color: 'bg-red-500' },
        { name: '戦略立案', startDate: new Date(2025, 9, 7), endDate: new Date(2025, 9, 15), type: 'bar', color: 'bg-orange-500' },
        { name: 'デザイン開発', startDate: new Date(2025, 9, 12), endDate: new Date(2025, 9, 22), type: 'bar', color: 'bg-amber-500' },
        { name: '展開計画策定', startDate: new Date(2025, 9, 20), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-yellow-500' }
      ]
    },
    {
      id: 7,
      name: 'スマートロジスティクス',
      client: '物流最適化支援',
      tasks: [
        { name: 'データ収集', startDate: new Date(2025, 9, 1), endDate: new Date(2025, 9, 7), type: 'bar', color: 'bg-blue-500' },
        { name: 'ルート分析', startDate: new Date(2025, 9, 5), endDate: new Date(2025, 9, 12), type: 'bar', color: 'bg-indigo-500' },
        { name: '最適化計画策定', startDate: new Date(2025, 9, 10), endDate: new Date(2025, 9, 20), type: 'bar', color: 'bg-violet-500' },
        { name: 'システム選定', startDate: new Date(2025, 9, 18), endDate: new Date(2025, 9, 25), type: 'bar', color: 'bg-purple-500' },
        { name: '導入支援', startDate: new Date(2025, 9, 23), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-fuchsia-500' }
      ]
    },
    {
      id: 8,
      name: 'フィナンシャルパートナーズ',
      client: '財務改善支援',
      tasks: [
        { name: '財務分析', startDate: new Date(2025, 9, 2), endDate: new Date(2025, 9, 8), type: 'bar', color: 'bg-cyan-500' },
        { name: '課題抽出', startDate: new Date(2025, 9, 6), endDate: new Date(2025, 9, 12), type: 'bar', color: 'bg-teal-500' },
        { name: '改善策立案', startDate: new Date(2025, 9, 10), endDate: new Date(2025, 9, 18), type: 'bar', color: 'bg-emerald-500' },
        { name: '資金調達支援', startDate: new Date(2025, 9, 15), endDate: new Date(2025, 9, 25), type: 'bar', color: 'bg-green-500' },
        { name: '実行支援', startDate: new Date(2025, 9, 22), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-lime-500' }
      ]
    },
    {
      id: 9,
      name: 'エデュケーションラボ',
      client: 'オンライン教育支援',
      tasks: [
        { name: '要件定義', startDate: new Date(2025, 9, 1), endDate: new Date(2025, 9, 7), type: 'bar', color: 'bg-rose-500' },
        { name: 'プラットフォーム設計', startDate: new Date(2025, 9, 5), endDate: new Date(2025, 9, 15), type: 'bar', color: 'bg-pink-500' },
        { name: 'コンテンツ企画', startDate: new Date(2025, 9, 12), endDate: new Date(2025, 9, 20), type: 'bar', color: 'bg-fuchsia-500' },
        { name: '開発支援', startDate: new Date(2025, 9, 18), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-purple-500' }
      ]
    },
    {
      id: 10,
      name: 'サステナブルエナジー',
      client: '再生可能エネルギー導入',
      tasks: [
        { name: '現状調査', startDate: new Date(2025, 9, 2), endDate: new Date(2025, 9, 8), type: 'bar', color: 'bg-blue-500' },
        { name: '導入計画策定', startDate: new Date(2025, 9, 6), endDate: new Date(2025, 9, 15), type: 'bar', color: 'bg-indigo-500' },
        { name: 'システム選定', startDate: new Date(2025, 9, 12), endDate: new Date(2025, 9, 22), type: 'bar', color: 'bg-violet-500' },
        { name: '実装支援', startDate: new Date(2025, 9, 20), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-purple-500' },
        { name: '進捗MTG', startDate: new Date(2025, 9, 14), endDate: new Date(2025, 9, 14), type: 'bar', color: 'bg-rose-500' },
        { name: '最終確認', startDate: new Date(2025, 9, 30), endDate: new Date(2025, 9, 30), type: 'bar', color: 'bg-pink-500' }
      ]
    },
    {
      id: 11,
      name: 'イノベーションラボ',
      client: 'R&D支援',
      tasks: [
        { name: 'キックオフMTG', startDate: new Date(2025, 9, 1), endDate: new Date(2025, 9, 1), type: 'bar', color: 'bg-blue-500' },
        { name: '要件定義', startDate: new Date(2025, 9, 1), endDate: new Date(2025, 9, 7), type: 'bar', color: 'bg-indigo-500' },
        { name: 'プロトタイプ開発', startDate: new Date(2025, 9, 5), endDate: new Date(2025, 9, 15), type: 'bar', color: 'bg-violet-500' },
        { name: '中間報告MTG', startDate: new Date(2025, 9, 8), endDate: new Date(2025, 9, 8), type: 'bar', color: 'bg-rose-500' },
        { name: '検証', startDate: new Date(2025, 9, 12), endDate: new Date(2025, 9, 20), type: 'bar', color: 'bg-purple-500' },
        { name: '最終報告MTG', startDate: new Date(2025, 9, 22), endDate: new Date(2025, 9, 22), type: 'bar', color: 'bg-pink-500' }
      ]
    }
  ];

  // 週の日付を生成（月曜始まり）
  const getWeekDays = (date: Date) => {
    const weekDays = [];
    const dayOfWeek = date.getDay();
    // 日曜日を0、月曜日を1として、月曜日を0にする計算
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() + mondayOffset);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    
    return weekDays;
  };

  // 月の日付を生成（左寄せ、31日分の幅で統一）
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // 月の日付を左から順番に配置（31日分の幅で統一）
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const days = viewMode === 'month' ? getDaysInMonth(currentDate) : getWeekDays(currentDate);
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

  // 期間を変更する関数
  const changePeriod = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
    } else {
      // 週表示の場合（月曜始まりの週単位で移動）
      const dayOfWeek = newDate.getDay();
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const currentMonday = new Date(newDate);
      currentMonday.setDate(newDate.getDate() + mondayOffset);
      
      if (direction === 'prev') {
        currentMonday.setDate(currentMonday.getDate() - 7);
      } else {
        currentMonday.setDate(currentMonday.getDate() + 7);
      }
      
      newDate.setTime(currentMonday.getTime());
    }
    setCurrentDate(newDate);
  };

  // 日付が範囲内かチェック
  const isDateInRange = (date: Date, startDate: Date, endDate: Date) => {
    return date >= startDate && date <= endDate;
  };

  // 日付をフォーマット
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDay = weekDays[date.getDay()];
    return `${year}年${month}月${day}日${weekDay}曜日`;
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-text mb-2">案件管理</h1>
            <p className="text-sm text-text-light mb-1">プロジェクトの進捗と工程を管理しましょう</p>
            <p className="text-xs text-text-light">
              {projects.length}件のプロジェクト
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* カレンダーナビゲーション */}
            <div className="flex items-center space-x-4">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                今日: {formatDate(new Date(2025, 9, 14))}
              </div>
              
              <button 
                onClick={() => changePeriod('prev')}
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{viewMode === 'month' ? '前月' : '前週'}</span>
              </button>
              
              <div className="text-xl font-semibold text-gray-900 dark:text-white min-w-[120px] text-center">
                {viewMode === 'month' 
                  ? `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月`
                  : (() => {
                      const dayOfWeek = currentDate.getDay();
                      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
                      const monday = new Date(currentDate);
                      monday.setDate(currentDate.getDate() + mondayOffset);
                      const weekNumber = Math.ceil(monday.getDate() / 7);
                      return `第${weekNumber}週`;
                    })()
                }
              </div>
              
              <button 
                onClick={() => changePeriod('next')}
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span>{viewMode === 'month' ? '次月' : '次週'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* 表示切り替えボタン */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === 'month'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                月表示
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === 'week'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                週表示
              </button>
            </div>
            
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              新規案件
            </Button>
          </div>
        </div>

        {/* ガントチャート */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl mb-4">
          {/* カレンダーグリッド */}
          <div className="flex flex-col h-[calc(100vh-12rem)] min-h-[600px]">
            {/* 固定ヘッダー */}
            <div className="sticky top-0 z-20 border-b border-gray-100 dark:border-gray-800">
              <div className="relative">
                {/* 日付ヘッダー */}
                <div className="flex px-6 py-3 relative">
                  <div className="w-80 flex-shrink-0"></div>
                  <div className="flex-1 grid" style={{ 
                    gridTemplateColumns: `repeat(${viewMode === 'month' ? 31 : 7}, 1fr)`,
                    position: 'relative'
                  }}>
                    {/* 縦線グリッド（ヘッダー部分） */}
                    <div className="absolute inset-0 grid" style={{ 
                      gridTemplateColumns: `repeat(${viewMode === 'month' ? 31 : 7}, 1fr)`,
                      width: '100%',
                      height: '100%'
                    }}>
                      {Array.from({ length: viewMode === 'month' ? 31 : 7 }).map((_, index) => (
                        <div
                          key={`grid-${index}`}
                          className="border-l border-gray-100 dark:border-gray-800"
                        />
                      ))}
                    </div>

                    {/* 日付 */}
                    {days.map((day, index) => {
                      const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                      const isToday = day.getDate() === new Date(2025, 9, 14).getDate() &&
                                    day.getMonth() === new Date(2025, 9, 14).getMonth() &&
                                    day.getFullYear() === new Date(2025, 9, 14).getFullYear();
                      
                      return (
                        <div 
                          key={`date-${index}`}
                          className={`text-center py-1 relative ${isToday ? 'bg-blue-50 dark:bg-blue-900/20 rounded-lg' : ''}`}
                        >
                          <div className={`text-xs font-medium ${
                            isWeekend ? 'text-red-500' : 
                            isToday ? 'text-blue-600 dark:text-blue-400' :
                            'text-text-light'
                          }`}>
                            {weekDays[day.getDay()]}
                          </div>
                          <div className={`text-sm font-semibold ${
                            isWeekend ? 'text-red-500' : 
                            isToday ? 'text-blue-600 dark:text-blue-400' :
                            'text-text'
                          }`}>
                            {day.getDate()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* スクロール可能なコンテンツ */}
            <div className="flex-1 relative overflow-y-auto px-6 pb-4">
              {/* 案件とタスク */}
              <div className="relative min-h-full">
                {projects.map((project) => (
                  <div key={project.id} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0 relative">
                    
                    {/* 案件情報 */}
                    <div className="flex items-start py-3 relative z-10">
                      <div className="w-80 flex-shrink-0 pr-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              {project.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {project.client}
                            </div>
                            <div className="flex space-x-2 mt-2">
                              <Button variant="ghost" size="sm">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                顧客情報
                              </Button>
                              <Button variant="ghost" size="sm">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                面談記録
                              </Button>
                            </div>
                          </div>
                          <button className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* タスクバーエリア */}
                      <div className="flex-1 relative min-h-[180px] py-2">
                        {/* タスクバー */}
                        {project.tasks.map((task, taskIndex) => {
                        const taskDays = [];
                        const taskStartDate = new Date(task.startDate);
                        for (let d = new Date(taskStartDate); d <= task.endDate; d.setDate(d.getDate() + 1)) {
                          const dayIndex = days.findIndex(day => 
                            day.getDate() === d.getDate() && day.getMonth() === d.getMonth()
                          );
                          if (dayIndex !== -1) {
                            taskDays.push(dayIndex);
                          }
                        }
                        
                        if (taskDays.length === 0) return null;
                        
                        // 日数に基づいて位置とサイズを計算
                        const maxDays = viewMode === 'month' ? 31 : 7;
                        const startDay = taskDays[0];
                        const endDay = taskDays[taskDays.length - 1];
                        const startPercent = (startDay / maxDays) * 100;
                        const width = ((endDay - startDay + 1) / maxDays) * 100;

                        // 1日工程かどうかを判定
                        const isSingleDay = task.startDate.getTime() === task.endDate.getTime();
                        
                        // 重なりを検出して縦位置を調整
                        let rowPosition = 0;
                        let positionTaken = true;
                        while (positionTaken) {
                          positionTaken = project.tasks
                            .slice(0, taskIndex)
                            .some(prevTask => {
                              const prevStart = new Date(prevTask.startDate);
                              const prevEnd = new Date(prevTask.endDate);
                              const currentStart = new Date(task.startDate);
                              const currentEnd = new Date(task.endDate);
                              
                              // 日付の重なりをチェック
                              const isOverlapping = (
                                (currentStart <= prevEnd && currentEnd >= prevStart) || // 期間が重なる
                                (currentStart.getTime() === prevStart.getTime() && currentEnd.getTime() === prevEnd.getTime()) // 同じ日
                              );

                              // 同じ行にある重なるタスクを探す
                              const taskVerticalOffset = Math.floor(
                                (prevTask as any).verticalPosition / 32
                              );
                              return isOverlapping && taskVerticalOffset === rowPosition;
                            });

                          if (positionTaken) {
                            rowPosition++;
                          }
                        }

                        // 垂直位置を保存（後続のタスクの位置計算に使用）
                        (task as any).verticalPosition = rowPosition * 32;
                        
                        return (
                          <div
                            key={taskIndex}
                            className="absolute flex items-center"
                            style={{ 
                              left: `${startPercent}%`,
                              width: `${width}%`,
                              top: rowPosition * 32 + 8,
                              height: '24px',
                              zIndex: 1
                            }}
                          >
                            <div
                              className={`h-full w-full ${task.color} rounded-md flex items-center px-2 shadow-sm relative`}
                            >
                              {!isSingleDay && (
                                <span className="text-xs text-white font-medium truncate">
                                  {task.name}
                                </span>
                              )}
                              {isSingleDay && (
                                <span className="absolute left-full ml-2 text-xs text-text font-medium whitespace-nowrap">
                                  {task.name}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}