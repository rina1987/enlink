import { redirect } from 'next/navigation';

export default function Home() {
  // 開発中のため、直接ダッシュボードにリダイレクト
  redirect('/dashboard');
}