'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Snippet, SnippetService } from '@/lib/services/snippet.service';

interface SnippetEditModalProps {
  snippet: Snippet;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export function SnippetEditModal({ snippet, isOpen, onClose, onSaved }: SnippetEditModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState(snippet.title || '');
  const [category, setCategory] = useState(snippet.category || '');
  const [content, setContent] = useState(snippet.content || '');

  useEffect(() => {
    if (isOpen) {
      setTitle(snippet.title || '');
      setCategory(snippet.category || '');
      setContent(snippet.content || '');
    }
  }, [isOpen, snippet]);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      await SnippetService.update(snippet.id, { title, category, content });
      onSaved();
      onClose();
    } catch (e) {
      console.error('Failed to update snippet', e);
      alert('更新に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text">クリップを編集</h2>
            <Button variant="ghost" onClick={onClose}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text">タイトル<span className="text-error">*</span></label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1" required />
            </div>
            <div>
              <label className="text-sm font-medium text-text">カテゴリ</label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-text">内容<span className="text-error">*</span></label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                rows={10}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>キャンセル</Button>
            <Button onClick={handleSave} disabled={!title || !content || isSubmitting}>
              {isSubmitting ? '保存中…' : '保存'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}


