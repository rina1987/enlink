'use client';

import { useRouter } from 'next/navigation';
import { Button } from './components/ui/Button';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景の装飾 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute -bottom-28 -left-10 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      </div>

      {/* 中央にロゴ画像と同一タイポのタイトル */}
      <main className="max-w-6xl mx-auto px-6">
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Image
              src="/seagull.png"
              alt="EN-LINK ロゴ"
              width={160}
              height={130}
              priority
              className="h-auto w-auto"
            />
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#2F3D89] to-[#6D7EC5] bg-clip-text text-transparent">
              EN-LINK
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              出会いをつなぎ、仕事を前に。
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Button onClick={() => router.push('/signup')}>はじめる</Button>
            <Button variant="outline" onClick={() => router.push('/login')}>ログイン</Button>
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} EN-LINK
      </footer>
    </div>
  );
}