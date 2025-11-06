'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { ProjectTaskService } from '@/lib/services/project-task.service';

interface TaskCreateModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const COLOR_PALETTE = ['#3b82f6','#6366f1','#22c55e','#f59e0b','#ef4444'];

export function TaskCreateModal({ projectId, isOpen, onClose, onSuccess }: TaskCreateModalProps) {
  const today = new Date();
  const initialYmd = today.toISOString().split('T')[0];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [color, setColor] = useState(COLOR_PALETTE[0]);
  const [displayDate, setDisplayDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [startDate, setStartDate] = useState(initialYmd);
  const [endDate, setEndDate] = useState(initialYmd);
  const [selectionPhase, setSelectionPhase] = useState<'start' | 'end'>('start');

  if (!isOpen) return null;

  const days = useMemo(() => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7; // 月曜始まり
    const gridStart = new Date(year, month, 1 - startOffset);
    const result: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      result.push(d);
    }
    return result;
  }, [displayDate]);

  const formatYmd = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const da = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${da}`;
  };

  const handleDayClick = (d: Date) => {
    const ymd = formatYmd(d);
    if (selectionPhase === 'start') {
      // 開始日を確定（終了日は一旦同日）
      setStartDate(ymd);
      setEndDate(ymd);
      setSelectionPhase('end');
    } else {
      // 終了日を確定（開始/終了の順序を自動補正）
      if (ymd < startDate) {
        setEndDate(startDate);
        setStartDate(ymd);
      } else {
        setEndDate(ymd);
      }
      // 次は再び開始日選択へ
      setSelectionPhase('start');
    }
  };

  const isInRange = (d: Date) => {
    const ymd = formatYmd(d);
    return ymd >= startDate && ymd <= endDate;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await ProjectTaskService.create({
        project_id: projectId,
        name: taskName,
        description: null,
        start_date: startDate,
        end_date: endDate,
        color,
        status: 'in_progress'
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to create task:', error);
      alert('工程の登録に失敗しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevMonth = () => {
    const d = new Date(displayDate);
    d.setMonth(d.getMonth() - 1);
    setDisplayDate(d);
  };
  const handleNextMonth = () => {
    const d = new Date(displayDate);
    d.setMonth(d.getMonth() + 1);
    setDisplayDate(d);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6 space-y-6">
          {/* ヘッダー */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text">工程の追加</h2>
            <Button variant="ghost" onClick={onClose}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* フォーム */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text">工程名<span className="text-error">*</span></label>
              <Input value={taskName} onChange={(e) => setTaskName(e.target.value)} className="mt-1" required />
            </div>

            {/* カラー選択（5色） */}
            <div>
              <label className="text-sm font-medium text-text">バーのカラー</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {COLOR_PALETTE.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full border ${color === c ? 'ring-2 ring-offset-2 ring-blue-400' : 'border-gray-200'}`}
                    style={{ backgroundColor: c }}
                    aria-label={c}
                  />
                ))}
              </div>
            </div>

            {/* カレンダー（単一）で期間選択 */}
            <div className="border rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <button onClick={handlePrevMonth} className="p-2 text-text-light hover:text-text" aria-label="prev">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                </button>
                <div className="text-sm font-medium text-text">
                  {displayDate.getFullYear()}年 {displayDate.getMonth() + 1}月
                </div>
                <button onClick={handleNextMonth} className="p-2 text-text-light hover:text-text" aria-label="next">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
              <div className="grid grid-cols-7 text-center text-xs text-text-light mb-1">
                {['月','火','水','木','金','土','日'].map(d => (<div key={d} className="py-1">{d}</div>))}
              </div>
              <div className="grid grid-cols-7 grid-rows-6 gap-1">
                {days.map((d, idx) => {
                  const inCurrentMonth = d.getMonth() === displayDate.getMonth();
                  const ymd = formatYmd(d);
                  const selected = ymd === startDate || ymd === endDate;
                  const inRange = isInRange(d);
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handleDayClick(d)}
                      className={`py-2 rounded-md text-sm transition-colors ${
                        inRange ? 'bg-blue-100 text-blue-700' : ''
                      } ${selected ? 'ring-2 ring-blue-400 font-semibold' : ''} ${
                        inCurrentMonth ? 'text-text' : 'text-text-light/50'
                      }`}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 text-xs text-text-light">
                期間: {startDate} 〜 {endDate}
              </div>
            </div>
          </div>

          {/* フッター */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>キャンセル</Button>
            <Button onClick={handleSubmit} disabled={!taskName || !startDate || !endDate || isSubmitting}>
              {isSubmitting ? '保存中…' : '保存'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}


