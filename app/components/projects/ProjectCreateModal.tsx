'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Customer } from '@/lib/services/customer.service';
import { ProjectService } from '@/lib/services/project.service';

interface ProjectCreateModalProps {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProjectCreateModal({ customer, isOpen, onClose, onSuccess }: ProjectCreateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [project, setProject] = useState({
    name: '',
    description: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    status: 'not_started' as const
  });

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await ProjectService.create({
        ...project,
        customer_id: customer.id,
        display_order: null
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('案件の登録に失敗しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6 space-y-6">
          {/* ヘッダー */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text">新規案件登録</h2>
              <p className="text-sm text-text-light mt-1">{customer.company_name}</p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* フォーム */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text">
                案件名<span className="text-error">*</span>
              </label>
              <Input
                value={project.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-text">説明</label>
              <textarea
                value={project.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text">
                  開始日<span className="text-error">*</span>
                </label>
                <Input
                  type="date"
                  value={project.start_date}
                  onChange={(e) => handleChange('start_date', e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text">
                  終了日<span className="text-error">*</span>
                </label>
                <Input
                  type="date"
                  value={project.end_date}
                  onChange={(e) => handleChange('end_date', e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-text">ステータス</label>
              <select
                value={project.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
              >
                <option value="not_started">未着手</option>
                <option value="in_progress">進行中</option>
                <option value="completed">完了</option>
                <option value="on_hold">保留</option>
              </select>
            </div>
          </div>

          {/* フッター */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!project.name || !project.start_date || !project.end_date || isSubmitting}
            >
              {isSubmitting ? '保存中...' : '保存'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}