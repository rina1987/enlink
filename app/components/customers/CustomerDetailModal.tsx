'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CustomerService } from '@/lib/services/customer.service';
import { Database } from '@/types/database';
import { useRouter } from 'next/navigation';

type DbCustomer = Database['public']['Tables']['customers']['Row'];

const statusLabels: Record<DbCustomer['status'], string> = {
  active: '進行中',
  pending: '保留',
  stopped: '停止'
};

interface CustomerDetailModalProps {
  customer: DbCustomer;
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  customer,
  isOpen,
  onClose,
  onUpdated,
}) => {
  const [editedCustomer, setEditedCustomer] = useState<DbCustomer>(customer);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleChange = (field: keyof DbCustomer, value: string) => {
    setEditedCustomer(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const { id, created_at, updated_at, ...payload } = editedCustomer as any;
      await CustomerService.update(editedCustomer.id, payload);
      setIsEditing(false);
      if (onUpdated) onUpdated();
      router.refresh();
    } catch (e) {
      console.error('Failed to update customer', e);
      alert('保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6 space-y-6">
          {/* ヘッダー */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text">顧客詳細</h2>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>キャンセル</Button>
                  <Button onClick={handleSave}>保存</Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(true)}>編集</Button>
                  <Button variant="ghost" onClick={onClose}>閉じる</Button>
                </>
              )}
            </div>
          </div>

          {/* 顧客情報フォーム */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text">会社名</label>
                <Input
                  value={editedCustomer.company_name}
                  onChange={(e) => handleChange('company_name', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                />
                {!isEditing && (
                  <button
                    onClick={() => handleCopy(editedCustomer.company_name || '')}
                    className="text-xs text-primary mt-1 hover:text-primary-hover"
                  >
                    コピー
                  </button>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-text">担当者</label>
                <Input
                  value={editedCustomer.contact_person || ''}
                  onChange={(e) => handleChange('contact_person', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text">業種</label>
                <Input
                  value={editedCustomer.industry || ''}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                />
                {!isEditing && (
                  <button
                    onClick={() => handleCopy(editedCustomer.industry || '')}
                    className="text-xs text-primary mt-1 hover:text-primary-hover"
                  >
                    コピー
                  </button>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-text">電話番号</label>
                <Input
                  value={editedCustomer.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                />
                {!isEditing && (
                  <button
                    onClick={() => handleCopy(editedCustomer.phone || '')}
                    className="text-xs text-primary mt-1 hover:text-primary-hover"
                  >
                    コピー
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text">メールアドレス</label>
                <Input
                  value={editedCustomer.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                />
                {!isEditing && (
                  <button
                    onClick={() => handleCopy(editedCustomer.email || '')}
                    className="text-xs text-primary mt-1 hover:text-primary-hover"
                  >
                    コピー
                  </button>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-text">住所</label>
                <Input
                  value={editedCustomer.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                />
                {!isEditing && (
                  <button
                    onClick={() => handleCopy(editedCustomer.address || '')}
                    className="text-xs text-primary mt-1 hover:text-primary-hover"
                  >
                    コピー
                  </button>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-text">進捗ステータス</label>
                {isEditing ? (
                  <select
                    value={editedCustomer.status}
                    onChange={(e) => handleChange('status', e.target.value as DbCustomer['status'])}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                ) : (
                  <div className="mt-1">{statusLabels[editedCustomer.status]}</div>
                )}
              </div>
            </div>
          </div>

          {/* 支援内容 */}
          <div>
            <label className="text-sm font-medium text-text">支援内容</label>
            <textarea
              value={editedCustomer.support_details || ''}
              onChange={(e) => handleChange('support_details', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
              rows={4}
            />
            {!isEditing && (
              <button
                onClick={() => handleCopy(editedCustomer.support_details || '')}
                className="text-xs text-primary mt-1 hover:text-primary-hover"
              >
                コピー
              </button>
            )}
          </div>

          {/* 更新情報 */}
          <div className="text-xs text-text-light">
            <p>作成日時: {editedCustomer.created_at ? new Date(editedCustomer.created_at).toLocaleString() : '-'}</p>
            <p>更新日時: {editedCustomer.updated_at ? new Date(editedCustomer.updated_at).toLocaleString() : '-'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
