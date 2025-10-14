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
      name: '株式会社サンプルA',
      client: '経営改善コンサルティング',
      tasks: [
        { name: '現状分析・課題整理', startDate: new Date(2025, 9, 1), endDate: new Date(2025, 9, 8), type: 'bar', color: 'bg-slate-500' },
        { name: '改善提案策定', startDate: new Date(2025, 9, 10), endDate: new Date(2025, 9, 25), type: 'bar', color: 'bg-orange-500' },
        { name: '実行支援・フォローアップ', startDate: new Date(2025, 9, 19), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-pink-500' }
      ]
    },
    {
      id: 2,
      name: '株式会社サンプルB',
      client: 'システム導入支援',
      tasks: [
        { name: '要件定義・仕様策定', startDate: new Date(2025, 9, 1), endDate: new Date(2025, 9, 10), type: 'bar', color: 'bg-teal-500' },
        { name: 'システム設計・アーキテクチャ', startDate: new Date(2025, 9, 8), endDate: new Date(2025, 9, 18), type: 'bar', color: 'bg-green-500' },
        { name: '開発・実装フェーズ', startDate: new Date(2025, 9, 15), endDate: new Date(2025, 9, 28), type: 'bar', color: 'bg-yellow-500' },
        { name: 'テスト・品質保証', startDate: new Date(2025, 9, 25), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-purple-400' }
      ]
    },
    {
      id: 3,
      name: '株式会社サンプルC',
      client: 'マーケティング戦略',
      tasks: [
        { name: '市場調査・競合分析', startDate: new Date(2025, 9, 1), endDate: new Date(2025, 9, 12), type: 'bar', color: 'bg-pink-300' },
        { name: '戦略策定・ブランドポジショニング', startDate: new Date(2025, 9, 10), endDate: new Date(2025, 9, 20), type: 'bar', color: 'bg-blue-500' },
        { name: 'キャンペーン企画・クリエイティブ制作', startDate: new Date(2025, 9, 18), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-amber-600' }
      ]
    },
    {
      id: 4,
      name: '株式会社サンプルD',
      client: '組織改革支援',
      tasks: [
        { name: '組織診断・現状把握', startDate: new Date(2025, 9, 5), endDate: new Date(2025, 9, 15), type: 'bar', color: 'bg-green-500' },
        { name: '改革プラン策定', startDate: new Date(2025, 9, 12), endDate: new Date(2025, 9, 22), type: 'bar', color: 'bg-emerald-500' },
        { name: '実行支援・変革管理', startDate: new Date(2025, 9, 20), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-teal-400' }
      ]
    },
    {
      id: 5,
      name: '株式会社サンプルE',
      client: '財務改善支援',
      tasks: [
        { name: '財務分析・経営診断', startDate: new Date(2025, 9, 3), endDate: new Date(2025, 9, 16), type: 'bar', color: 'bg-red-500' },
        { name: '改善策提案・資金調達支援', startDate: new Date(2025, 9, 14), endDate: new Date(2025, 9, 28), type: 'bar', color: 'bg-orange-600' }
      ]
    },
    {
      id: 6,
      name: '株式会社サンプルF',
      client: 'ブランディング支援',
      tasks: [
        { name: 'ブランド戦略・コンセプト設計', startDate: new Date(2025, 9, 7), endDate: new Date(2025, 9, 21), type: 'bar', color: 'bg-indigo-500' },
        { name: 'ロゴ・VIデザイン制作', startDate: new Date(2025, 9, 18), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-violet-500' }
      ]
    },
    {
      id: 7,
      name: '株式会社サンプルG',
      client: '人材育成支援',
      tasks: [
        { name: '研修プログラム設計', startDate: new Date(2025, 9, 5), endDate: new Date(2025, 9, 18), type: 'bar', color: 'bg-cyan-500' },
        { name: '研修実施・評価', startDate: new Date(2025, 9, 20), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-lime-500' }
      ]
    },
    {
      id: 8,
      name: '株式会社サンプルH',
      client: 'IT戦略コンサルティング',
      tasks: [
        { name: 'IT戦略策定', startDate: new Date(2025, 9, 2), endDate: new Date(2025, 9, 15), type: 'bar', color: 'bg-fuchsia-500' },
        { name: 'システム選定・導入支援', startDate: new Date(2025, 9, 16), endDate: new Date(2025, 9, 30), type: 'bar', color: 'bg-sky-500' }
      ]
    },
    {
      id: 9,
      name: '株式会社サンプルI',
      client: '品質管理改善',
      tasks: [
        { name: '品質管理体制構築', startDate: new Date(2025, 9, 1), endDate: new Date(2025, 9, 20), type: 'bar', color: 'bg-amber-500' },
        { name: '品質改善活動支援', startDate: new Date(2025, 9, 22), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-emerald-600' }
      ]
    },
    {
      id: 10,
      name: '株式会社サンプルJ',
      client: '海外進出支援',
      tasks: [
        { name: '市場調査・競合分析', startDate: new Date(2025, 9, 3), endDate: new Date(2025, 9, 17), type: 'bar', color: 'bg-rose-600' },
        { name: '進出戦略・事業計画策定', startDate: new Date(2025, 9, 18), endDate: new Date(2025, 9, 31), type: 'bar', color: 'bg-orange-600' }
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">案件管理</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              プロジェクトの進捗と工程を管理しましょう
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
          <div className="overflow-y-auto relative px-6 py-4" style={{ height: 'calc(100vh - 12rem)' }}>
            {/* 今日の日付の縦ライン（全体を通す） */}
            {(() => {
              const todayIndex = days.findIndex(day => day.getDate() === 14 && day.getMonth() === 9);
              if (todayIndex !== -1) {
                // 月表示・週表示で異なる幅計算
                const projectAreaWidth = 320; // 案件名エリアの幅
                const totalWidth = '100%';
                const calendarWidth = `calc(${totalWidth} - ${projectAreaWidth}px)`;
                const maxDays = viewMode === 'month' ? 31 : 7; // 月表示は31日、週表示は7日
                const dayWidth = `calc(${calendarWidth} / ${maxDays})`;
                const leftPosition = `calc(${projectAreaWidth}px + ${dayWidth} * ${todayIndex})`;
                
                return (
                  <div key="today-line" className="absolute top-0 bottom-0 bg-blue-100 dark:bg-blue-900/30 z-0" 
                       style={{ 
                         left: leftPosition, 
                         width: dayWidth,
                         marginLeft: '-2px',
                         marginRight: '-2px'
                       }}>
                  </div>
                );
              }
              return null;
            })()}
            
            <div>
              {/* 曜日ヘッダー */}
              <div className="flex mb-2 relative">
                <div className="w-80 flex-shrink-0"></div>
                {days.map((day, index) => {
                  const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                  const maxDays = viewMode === 'month' ? 31 : 7; // 月表示は31日、週表示は7日
                  const dayWidth = `calc((100% - 320px) / ${maxDays})`;
                  
                  return (
                    <div key={index} className="text-center relative z-10" style={{ width: dayWidth }}>
                      <div className={`text-xs font-medium ${isWeekend ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                        {weekDays[day.getDay()]}
                      </div>
                      <div className={`text-sm font-semibold ${isWeekend ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                        {day.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 案件とタスク */}
              {projects.map((project) => (
                <div key={project.id} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0 relative">
                  
                  {/* 案件情報 */}
                  <div className="flex items-center py-3 relative z-10">
                    <div className="w-80 flex-shrink-0 pr-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {project.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {project.client}
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
                    <div className="flex-1 relative min-h-[80px] py-2">
                      {/* タスクバー */}
                      {project.tasks.map((task, taskIndex) => {
                        const taskDays = [];
                        for (let d = task.startDate; d <= task.endDate; d.setDate(d.getDate() + 1)) {
                          const dayIndex = days.findIndex(day => 
                            day.getDate() === d.getDate() && day.getMonth() === d.getMonth()
                          );
                          if (dayIndex !== -1) {
                            taskDays.push(dayIndex);
                          }
                        }
                        
                        if (taskDays.length === 0) return null;
                        
                        const maxDays = viewMode === 'month' ? 31 : 7; // 月表示は31日、週表示は7日
                        const startPos = (taskDays[0] / maxDays) * 100;
                        const endPos = ((taskDays[taskDays.length - 1] + 1) / maxDays) * 100;
                        const width = endPos - startPos;
                        
                        // 重なりを避けるための縦位置調整
                        const verticalOffset = taskIndex * 8; // 各工程を8pxずつ下にずらす
                        
                        // 1日工程でもバー形式で表示
                        return (
                          <div key={taskIndex} className="absolute flex items-center h-6"
                               style={{ 
                                 left: `${startPos}%`, 
                                 width: `${width}%`,
                                 top: `calc(50% + ${verticalOffset}px)`,
                                 transform: 'translateY(-50%)'
                               }}>
                            <div className={`h-6 ${task.color} rounded-md flex items-center px-2 shadow-sm relative`}>
                              {/* バーが短い場合は右横に工程名を表示 */}
                              {width < 15 ? (
                                <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-white/50"></div>
                                  <span className="text-xs text-gray-700 dark:text-gray-300 font-medium ml-2 whitespace-nowrap">
                                    {task.name}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-xs text-white font-medium truncate">
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
        </Card>
      </div>
    </DashboardLayout>
  );
}