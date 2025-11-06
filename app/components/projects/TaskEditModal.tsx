'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { ProjectTaskService } from '@/lib/services/project-task.service';

interface TaskEditModalProps {
  taskId: string;
  initialName: string;
  initialColor: string;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

const COLOR_PALETTE = ['#3b82f6','#6366f1','#22c55e','#f59e0b','#ef4444'];

export function TaskEditModal({ taskId, initialName, initialColor, isOpen, onClose, onSaved }: TaskEditModalProps) {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor || COLOR_PALETTE[0]);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      setSaving(true);
      await ProjectTaskService.update(taskId, { name, color });
      onSaved();
      onClose();
    } catch (e) {
      console.error('Failed to update task', e);
      alert('更新に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <Card className="w-full max-w-sm m-4">
        <div className="p-4 space-y-4">
          <div className="text-sm font-medium text-text">工程の編集</div>
          <div>
            <label className="text-xs text-text-light">工程名</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
          </div>
          <div>
            <label className="text-xs text-text-light">カラー</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {COLOR_PALETTE.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full border ${color === c ? 'ring-2 ring-offset-2 ring-blue-400' : 'border-gray-200'}`}
                  style={{ backgroundColor: c }}
                  aria-label={c}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>キャンセル</Button>
            <Button onClick={handleSave} disabled={!name || saving}>{saving ? '保存中…' : '保存'}</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}


