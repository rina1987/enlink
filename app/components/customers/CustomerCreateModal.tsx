'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { CustomerService, CustomerInsert } from '@/lib/services/customer.service';

interface CustomerCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CustomerCreateModal({ isOpen, onClose, onSuccess }: CustomerCreateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customer, setCustomer] = useState<CustomerInsert>({
    company_name: '',
    contact_person: '',
    industry: '',
    phone: '',
    email: '',
    address: '',
    support_details: '',
    status: 'active'
  });

  if (!isOpen) return null;

  const handleChange = (field: keyof CustomerInsert, value: string) => {
    setCustomer(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await CustomerService.create(customer);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to create customer:', error);
      alert('顧客の登録に失敗しました。');
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
            <h2 className="text-xl font-semibold text-text">新規顧客登録</h2>
            <Button variant="ghost" onClick={onClose}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* フォーム */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text">
                  会社名<span className="text-danger">*</span>
                </label>
                <Input
                  value={customer.company_name}
                  onChange={(e) => handleChange('company_name', e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text">
                  担当者
                </label>
                <Input
                  value={customer.contact_person}
                  onChange={(e) => handleChange('contact_person', e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text">業種</label>
                <Input
                  value={customer.industry ?? ''}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text">電話番号</label>
                <Input
                  value={customer.phone ?? ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                  type="tel"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text">メールアドレス</label>
                <Input
                  value={customer.email ?? ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                  type="email"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text">住所</label>
                <Input
                  value={customer.address ?? ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text">進捗ステータス</label>
                <select
                  value={customer.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                >
                  <option value="active">進行中</option>
                  <option value="pending">保留</option>
                  <option value="stopped">停止</option>
                </select>
              </div>
            </div>
          </div>

          {/* 支援内容 */}
          <div>
            <label className="text-sm font-medium text-text">支援内容<span className="text-danger">*</span></label>
            <textarea
              value={customer.support_details ?? ''}
              onChange={(e) => handleChange('support_details', e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
              rows={4}
              required
            />
          </div>

          {/* フッター */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!customer.company_name || !customer.support_details || isSubmitting}
            >
              {isSubmitting ? '保存中...' : '保存'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
