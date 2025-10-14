'use client';

import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    license: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('パスワードが一致しません');
      setIsLoading(false);
      return;
    }

    // ここで実際の登録処理を実装
    setTimeout(() => {
      setIsLoading(false);
      console.log('Registration attempt:', formData);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ENLINK
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            中小企業診断士のための顧客管理システム
          </p>
        </div>

        <Card>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
                新規登録
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
                新しいアカウントを作成してください
              </p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="お名前"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="田中 太郎"
                required
                disabled={isLoading}
              />

              <Input
                label="メールアドレス"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />

              <Input
                label="会社名・事務所名"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="田中診断士事務所"
                disabled={isLoading}
              />

              <Input
                label="診断士登録番号"
                type="text"
                value={formData.license}
                onChange={(e) => handleInputChange('license', e.target.value)}
                placeholder="12345"
                helperText="診断士登録番号をお持ちの場合は入力してください"
                disabled={isLoading}
              />

              <Input
                label="パスワード"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                required
                helperText="8文字以上で入力してください"
                disabled={isLoading}
              />

              <Input
                label="パスワード（確認）"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>利用規約・プライバシーポリシー</strong><br />
                  アカウント作成により、利用規約およびプライバシーポリシーに同意したものとみなします。
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? '登録中...' : 'アカウント作成'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                すでにアカウントをお持ちの方は{' '}
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  ログイン
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
