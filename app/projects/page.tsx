'use client';

import { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProjectService } from '@/lib/services/project.service';
import { ProjectTaskService } from '@/lib/services/project-task.service';
import { useSearchParams } from 'next/navigation';
import { TaskCreateModal } from '../components/projects/TaskCreateModal';
import { Project } from '@/lib/services/project.service';
import { TaskEditModal } from '../components/projects/TaskEditModal';

export default function ProjectsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [projects, setProjects] = useState<any[]>([]);
  const [openTaskProjectId, setOpenTaskProjectId] = useState<string | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<null | { id: string; name: string; color: string }>(null);
  const barAreaRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const customerId = searchParams.get('customer');
        // 常に全件を取得
        const data = await ProjectService.getAll();

        // プロジェクトデータを整形
        // 各プロジェクトのタスクを取得
        const tasksByProject = await Promise.all(
          data.map(async (p) => ({
            projectId: p.id,
            tasks: await ProjectTaskService.getByProjectId(p.id)
          }))
        );

        // highlight指定があれば、対象案件を先頭に並べ替え
        const highlightId = searchParams.get('highlight');
        const sorted = highlightId
          ? [...data].sort((a, b) => (a.id === highlightId ? -1 : b.id === highlightId ? 1 : 0))
          : data;

        const formattedProjects = sorted.map(project => {
          const item = tasksByProject.find(t => t.projectId === project.id);
          const tasks = (item?.tasks || []).map(t => ({
            id: t.id,
            name: t.name,
            startDate: new Date(t.start_date),
            endDate: new Date(t.end_date),
            color: t.color || '#3b82f6'
          }));

          // タスクが無い場合でも、プロジェクト期間を仮表示したい場合は下記を有効化
          // if (tasks.length === 0) {
          //   tasks.push({
          //     name: project.name,
          //     startDate: new Date(project.start_date),
          //     endDate: new Date(project.end_date),
          //     color: getStatusColor(project.status)
          //   })
          // }

          return {
            id: project.id,
            name: project.name,
            client: project.customer.company_name,
            tasks
          };
        });

        setProjects(formattedProjects);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [searchParams]);

  // ステータスに応じた色を返す関数
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started':
        return 'bg-gray-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'on_hold':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  // 週の日付を生成（月曜始まり）
  const getWeekDays = (date: Date) => {
    const weekDays = [];
    const dayOfWeek = date.getDay();
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

  // 月の日付を生成
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const days = viewMode === 'month' ? getDaysInMonth(currentDate) : getWeekDays(currentDate);
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  // ドラッグ編集に必要な一時状態
  const [dragState, setDragState] = useState<null | {
    mode: 'move' | 'resize-start' | 'resize-end'
    projectId: string
    taskId: string
    originX: number
    startIndex: number
    endIndex: number
  }>(null);

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

  // ドラッグ開始（リサイズ）
  const startResize = (
    e: React.MouseEvent,
    projectId: string,
    taskId: string,
    edge: 'start' | 'end',
    startIndex: number,
    endIndex: number
  ) => {
    e.stopPropagation();
    setDragState({
      mode: edge === 'start' ? 'resize-start' : 'resize-end',
      projectId,
      taskId,
      originX: e.clientX,
      startIndex,
      endIndex
    });
  };

  // ドラッグ開始（移動）
  const startMove = (
    e: React.MouseEvent,
    projectId: string,
    taskId: string,
    startIndex: number,
    endIndex: number
  ) => {
    setDragState({
      mode: 'move',
      projectId,
      taskId,
      originX: e.clientX,
      startIndex,
      endIndex
    });
  };

  // ドラッグ終了時にDB更新
  const finishDragAndSave = async (newStartIdx: number, newEndIdx: number) => {
    if (!dragState) return;
    const maxDays = viewMode === 'month' ? 31 : 7;
    const clamp = (n: number) => Math.max(0, Math.min(maxDays - 1, n));
    const s = clamp(Math.min(newStartIdx, newEndIdx));
    const eIdx = clamp(Math.max(newStartIdx, newEndIdx));

    const dayToDate = (base: Date, dayIndex: number) => {
      const d = new Date(base);
      d.setDate(1 + dayIndex);
      return d;
    };

    const base = viewMode === 'month' ? new Date(currentDate.getFullYear(), currentDate.getMonth(), 1) : (() => {
      const dow = currentDate.getDay();
      const mondayOffset = dow === 0 ? -6 : 1 - dow;
      const start = new Date(currentDate);
      start.setDate(currentDate.getDate() + mondayOffset);
      return start;
    })();

    const startDate = dayToDate(base, s);
    const endDate = dayToDate(base, eIdx);

    try {
      await ProjectTaskService.update(dragState.taskId, {
        start_date: `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`,
        end_date: `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`
      });
      // 再読み込み
      const customerId = searchParams.get('customer');
      const data = customerId ? await ProjectService.getByCustomerId(customerId) : await ProjectService.getAll();
      const tasksByProject = await Promise.all(
        data.map(async (p) => ({ projectId: p.id, tasks: await ProjectTaskService.getByProjectId(p.id) }))
      );
      const formatted = data.map(project => {
        const item = tasksByProject.find(t => t.projectId === project.id);
        const tasks = (item?.tasks || []).map(t => ({
          id: t.id,
          name: t.name,
          startDate: new Date(t.start_date),
          endDate: new Date(t.end_date),
          color: t.color || '#3b82f6'
        }));
        return { id: project.id, name: project.name, client: project.customer.company_name, tasks };
      });
      setProjects(formatted);
    } finally {
      setDragState(null);
    }
  };

  // 日付をフォーマット
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDay = weekDays[date.getDay()];
    return `${year}年${month}月${day}日${weekDay}曜日`;
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col">
          <Card className="p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-text-light">読み込み中...</p>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col" onMouseUp={(e) => {
        if (!dragState) return;
        // グリッド幅から日数デルタを算出
        const areaEl = barAreaRefs.current[dragState.projectId];
        if (!areaEl) {
          finishDragAndSave(dragState.startIndex, dragState.endIndex);
          return;
        }
        const rect = areaEl.getBoundingClientRect();
        const maxDays = viewMode === 'month' ? 31 : 7;
        const dayWidth = rect.width / maxDays;
        const dx = (e.clientX - dragState.originX);
        const deltaDays = Math.round(dx / dayWidth);
        let newStart = dragState.startIndex;
        let newEnd = dragState.endIndex;
        if (dragState.mode === 'move') {
          newStart += deltaDays;
          newEnd += deltaDays;
        } else if (dragState.mode === 'resize-start') {
          newStart += deltaDays;
        } else if (dragState.mode === 'resize-end') {
          newEnd += deltaDays;
        }
        finishDragAndSave(newStart, newEnd);
      }}>
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
                今日: {formatDate(new Date())}
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
          </div>
        </div>

        {/* ガントチャート */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl mb-4">
          {projects.length > 0 ? (
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
                      {days.map((day, index) => {
                        const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                        const isToday = day.toDateString() === new Date().toDateString();
                        
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
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" onClick={() => setOpenTaskProjectId(project.id)}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </Button>
                              <Button variant="ghost" size="sm" className="text-error hover:text-error/80" onClick={() => setDeletingProjectId(project.id)}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* タスクバーエリア */}
                        <div className="flex-1 relative min-h-[180px] py-2" ref={(el) => { barAreaRefs.current[project.id] = el }}>
                          {(() => {
                            // 1) タスクを期間のインデックスに変換
                            const maxDays = viewMode === 'month' ? 31 : 7;
                            const indexedTasks = project.tasks
                              .map((task: any) => {
                                const taskDays: number[] = [];
                                const start = new Date(task.startDate);
                                const end = new Date(task.endDate);
                                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                                  const idx = days.findIndex(day => day.getDate() === d.getDate() && day.getMonth() === d.getMonth());
                                  if (idx !== -1) taskDays.push(idx);
                                }
                                if (taskDays.length === 0) return null;
                                const startIndex = taskDays[0];
                                const endIndex = taskDays[taskDays.length - 1];
                                return { ...task, startIndex, endIndex };
                              })
                              .filter(Boolean)
                              .sort((a: any, b: any) => a.startIndex - b.startIndex || a.endIndex - b.endIndex);

                            // 2) 重なりを避けるための行割り当て（最小行数でパック）
                            const rowLastEnd: number[] = [];
                            const placed = indexedTasks.map((t: any) => {
                              let row = 0;
                              while (row < rowLastEnd.length && t.startIndex <= rowLastEnd[row]) {
                                row += 1;
                              }
                              rowLastEnd[row] = t.endIndex; // その行の最後の終了位置を更新
                              return { ...t, row };
                            });

                            const rowsCount = Math.max(1, rowLastEnd.length);
                            const rowHeight = 32; // px

                            return (
                              <>
                                {placed.map((task: any, i: number) => {
                                  const startPercent = (task.startIndex / maxDays) * 100;
                                  const width = ((task.endIndex - task.startIndex + 1) / maxDays) * 100;
                                  const isSingleDay = new Date(task.startDate).getTime() === new Date(task.endDate).getTime();
                                  return (
                                    <div
                                      key={i}
                                      className="absolute flex items-center group"
                                      style={{
                                        left: `${startPercent}%`,
                                        width: `${width}%`,
                                        top: task.row * rowHeight + 8,
                                        height: '24px'
                                      }}
                                    >
                                      <div
                                        onMouseDown={(e) => startMove(e, project.id, task.id, task.startIndex, task.endIndex)}
                                        onClick={(e) => { e.stopPropagation(); setEditingTask({ id: task.id, name: task.name, color: task.color }); }}
                                        className={`h-full w-full rounded-md flex items-center px-2 shadow-sm relative cursor-move`}
                                        style={{ backgroundColor: task.color }}
                                      >
                                        {!isSingleDay && (
                                          <span className="text-xs text-white font-medium truncate">{task.name}</span>
                                        )}
                                        {isSingleDay && (
                                          <span className="absolute left-full ml-2 text-xs text-text font-medium whitespace-nowrap">{task.name}</span>
                                        )}
                                        {/* ドラッグハンドル - 左右 */}
                                        <span
                                          className="absolute left-0 top-0 h-full w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 bg-black/10"
                                          onMouseDown={(e) => startResize(e, project.id, task.id, 'start', task.startIndex, task.endIndex)}
                                        />
                                        <span
                                          className="absolute right-0 top-0 h-full w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 bg-black/10"
                                          onMouseDown={(e) => startResize(e, project.id, task.id, 'end', task.startIndex, task.endIndex)}
                                        />
                                      </div>
                                    </div>
                                  );
                                })}

                                {/* 高さを重なり数に合わせて最低確保 */}
                                <div style={{ height: rowsCount * rowHeight + 16 }} />
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-lg font-medium text-text mb-2">
                案件がありません
              </h3>
              <p className="text-text-light">
                顧客一覧から新しい案件を登録してください
              </p>
            </div>
          )}
        </Card>
        {/* 削除確認モーダル */}
        {deletingProjectId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="w-full max-w-md m-4">
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-text">案件を削除しますか？</h3>
                <p className="text-sm text-text-light">この操作は取り消せません。</p>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setDeletingProjectId(null)}>キャンセル</Button>
                  <Button
                    className="text-white"
                    onClick={async () => {
                      try {
                        await ProjectService.delete(deletingProjectId);
                        // 再読み込み
                        const customerId = searchParams.get('customer');
                        const data = customerId
                          ? await ProjectService.getByCustomerId(customerId)
                          : await ProjectService.getAll();
                        const tasksByProject = await Promise.all(
                          data.map(async (p) => ({ projectId: p.id, tasks: await ProjectTaskService.getByProjectId(p.id) }))
                        );
                        const formatted = data.map(project => {
                          const item = tasksByProject.find(t => t.projectId === project.id);
                          const tasks = (item?.tasks || []).map(t => ({
                            name: t.name,
                            startDate: new Date(t.start_date),
                            endDate: new Date(t.end_date),
                            color: t.color || '#3b82f6'
                          }));
                          return { id: project.id, name: project.name, client: project.customer.company_name, tasks };
                        });
                        setProjects(formatted);
                      } catch (e) {
                        console.error('Failed to delete project', e);
                        alert('削除に失敗しました');
                      } finally {
                        setDeletingProjectId(null);
                      }
                    }}
                  >
                    削除
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
        {/* 工程追加モーダル */}
        {openTaskProjectId && (
          <TaskCreateModal
            projectId={openTaskProjectId}
            isOpen={!!openTaskProjectId}
            onClose={() => setOpenTaskProjectId(null)}
            onSuccess={() => {
              // 追加後に再読み込み
              const reload = async () => {
                const customerId = searchParams.get('customer');
                const data = customerId
                  ? await ProjectService.getByCustomerId(customerId)
                  : await ProjectService.getAll();
                const tasksByProject = await Promise.all(
                  data.map(async (p) => ({ projectId: p.id, tasks: await ProjectTaskService.getByProjectId(p.id) }))
                );
                const formatted = data.map(project => {
                  const item = tasksByProject.find(t => t.projectId === project.id);
                  const tasks = (item?.tasks || []).map(t => ({
                    name: t.name,
                    startDate: new Date(t.start_date),
                    endDate: new Date(t.end_date),
                    color: t.color || '#3b82f6'
                  }));
                  return { id: project.id, name: project.name, client: project.customer.company_name, tasks };
                });
                setProjects(formatted);
              };
              reload();
            }}
          />
        )}

        {/* 工程編集モーダル */}
        {editingTask && (
          <TaskEditModal
            taskId={editingTask.id}
            initialName={editingTask.name}
            initialColor={editingTask.color}
            isOpen={!!editingTask}
            onClose={() => setEditingTask(null)}
            onSaved={async () => {
              const customerId = searchParams.get('customer');
              const data = customerId ? await ProjectService.getByCustomerId(customerId) : await ProjectService.getAll();
              const tasksByProject = await Promise.all(
                data.map(async (p) => ({ projectId: p.id, tasks: await ProjectTaskService.getByProjectId(p.id) }))
              );
              const formatted = data.map(project => {
                const item = tasksByProject.find(t => t.projectId === project.id);
                const tasks = (item?.tasks || []).map(t => ({
                  id: t.id,
                  name: t.name,
                  startDate: new Date(t.start_date),
                  endDate: new Date(t.end_date),
                  color: t.color || '#3b82f6'
                }));
                return { id: project.id, name: project.name, client: project.customer.company_name, tasks };
              });
              setProjects(formatted);
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}