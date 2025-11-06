'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Customer } from '@/lib/services/customer.service';
import { MeetingService } from '@/lib/services/meeting.service';

interface MeetingCreateModalProps {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function MeetingCreateModal({ customer, isOpen, onClose, onSuccess }: MeetingCreateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meeting, setMeeting] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    location: '',
    attendees: [] as string[],
    content: '',
    linksText: ''
  });
  

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setMeeting(prev => ({
      ...prev,
      [field]: field === 'attendees' ? value.split(',').map(v => v.trim()) : value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const localDateTime = new Date(`${meeting.date}T${meeting.time}:00`);
      const dateIso = localDateTime.toISOString();

      await MeetingService.create({
        customer_id: customer.id,
        title: meeting.title,
        date: dateIso,
        location: meeting.location || null,
        attendees: meeting.attendees,
        content: meeting.content,
        links: meeting.linksText
          ? meeting.linksText
              .split(/\n|,/) // 改行またはカンマ区切り
              .map(v => v.trim())
              .filter(Boolean)
          : null,
        attachments: null
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to create meeting:', error);
      alert('面談記録の登録に失敗しました。');
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
              <h2 className="text-xl font-semibold text-text">新規面談記録</h2>
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
                タイトル<span className="text-error">*</span>
              </label>
              <Input
                value={meeting.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="mt-1"
                required
                placeholder="例：定例MTG、商談、ヒアリング"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text">
                  日付<span className="text-error">*</span>
                </label>
                <Input
                  type="date"
                  value={meeting.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text">
                  時間<span className="text-error">*</span>
                </label>
                <Input
                  type="time"
                  value={meeting.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-text">場所</label>
              <Input
                value={meeting.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="mt-1"
                placeholder="例：オンライン、本社会議室"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-text">参加者</label>
              <Input
                value={meeting.attendees.join(', ')}
                onChange={(e) => handleChange('attendees', e.target.value)}
                className="mt-1"
                placeholder="例：田中様、佐藤様（カンマ区切り）"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-text">
                面談内容<span className="text-error">*</span>
              </label>
              <textarea
                value={meeting.content}
                onChange={(e) => handleChange('content', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                rows={6}
                required
                placeholder="面談の内容、決定事項、次回アクションなど"
              />
            </div>

          <div>
            <label className="text-sm font-medium text-text">関連リンク（任意・改行/カンマ区切りで複数可）</label>
            <textarea
              value={meeting.linksText}
              onChange={(e) => handleChange('linksText', e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
              rows={2}
              placeholder="https://example.com\nhttps://docs.example.com"
            />
          </div>

          {/* 添付ファイルは保存しない方針のためUIを削除 */}
          </div>

          {/* フッター */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!meeting.title || !meeting.date || !meeting.time || !meeting.content || isSubmitting}
            >
              {isSubmitting ? '保存中...' : '保存'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}