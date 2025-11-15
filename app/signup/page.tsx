'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setInfo(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name }
        }
      });
      if (error) {
        alert(error.message || 'サインアップに失敗しました');
        return;
      }
      // メール確認が無効なら session が返る想定
      if (data.session) {
        router.push('/dashboard');
        return;
      }
      // 念のため即ログインを試行（メール確認が有効な場合は失敗します）
      const signIn = await supabase.auth.signInWithPassword({ email, password });
      if (signIn.error) {
        setInfo('アカウントを有効化してください（管理画面でメール確認を無効化すると即ログインできます）。');
        return;
      }
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <div className="absolute right-6 top-6">
        <Button variant="outline" onClick={() => router.push('/')}>戻る</Button>
      </div>
      <Card className="w-full max-w-md">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-text mb-6 text-center">アカウント作成</h1>
          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="text-sm font-medium text-text">お名前（任意）</label>
              <Input
                className="mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="山田 太郎"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text">メールアドレス</label>
              <Input
                type="email"
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text">パスワード</label>
              <Input
                type="password"
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading || !email || !password} className="w-full">
              {loading ? '作成中…' : 'はじめる'}
            </Button>
            {info && <p className="text-xs text-center text-text-light mt-3">{info}</p>}
          </form>
        </div>
      </Card>
    </div>
  );
}


