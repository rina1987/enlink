'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert(error.message || 'ログインに失敗しました');
        return;
      }
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-text mb-6 text-center">ログイン</h1>
          <form className="space-y-4" onSubmit={handleLogin}>
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
              {loading ? 'ログイン中…' : 'ログイン'}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}


