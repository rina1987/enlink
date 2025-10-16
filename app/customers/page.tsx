'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { CustomerDetailModal } from '../components/customers/CustomerDetailModal';
import { Customer, CustomerStatus, statusLabels, statusColors } from '../types/customer';

export default function CustomersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // サンプルデータ
  const customers: Customer[] = [
    {
      id: '1',
      companyName: 'テクノソリューション株式会社',
      contactPerson: '山田 太郎',
      industry: 'IT・通信',
      phone: '03-1234-5678',
      email: 'yamada@techno.co.jp',
      address: '東京都千代田区丸の内1-1-1',
      supportDetails: 'DX推進支援、業務効率化コンサルティング、基幹システムの刷新計画策定',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      companyName: 'グローバルトレード株式会社',
      contactPerson: '鈴木 美咲',
      industry: '商社',
      phone: '06-2345-6789',
      email: 'suzuki@global-trade.co.jp',
      address: '大阪府大阪市中央区本町2-2-2',
      supportDetails: '海外展開戦略の策定、現地パートナー選定支援、市場調査',
      status: 'active',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '3',
      companyName: '未来建設工業',
      contactPerson: '佐藤 龍太',
      industry: '建設',
      phone: '045-3456-7890',
      email: 'sato@mirai-kensetsu.co.jp',
      address: '神奈川県横浜市西区みなとみらい3-3-3',
      supportDetails: 'IoT導入による建設現場の効率化、人材育成計画の策定',
      status: 'active',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '4',
      companyName: 'エコフードシステムズ',
      contactPerson: '田中 優子',
      industry: '食品',
      phone: '043-4567-8901',
      email: 'tanaka@eco-food.co.jp',
      address: '千葉県千葉市中央区新町4-4-4',
      supportDetails: 'フードロス削減プロジェクト、サプライチェーン最適化',
      status: 'pending',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-22')
    },
    {
      id: '5',
      companyName: 'メディカルケアグループ',
      contactPerson: '高橋 誠',
      industry: '医療',
      phone: '048-5678-9012',
      email: 'takahashi@medical-care.co.jp',
      address: '埼玉県さいたま市大宮区桜木町5-5-5',
      supportDetails: '医療事務効率化、患者サービス向上プログラムの実施',
      status: 'active',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-25')
    },
    {
      id: '6',
      companyName: 'クリエイティブデザイン',
      contactPerson: '渡辺 香織',
      industry: 'デザイン',
      phone: '075-6789-0123',
      email: 'watanabe@creative-design.co.jp',
      address: '京都府京都市下京区烏丸通6-6-6',
      supportDetails: 'ブランディング戦略策定、新規事業立ち上げ支援',
      status: 'stopped',
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-28')
    },
    {
      id: '7',
      companyName: 'スマートロジスティクス',
      contactPerson: '中村 大輔',
      industry: '物流',
      phone: '052-7890-1234',
      email: 'nakamura@smart-logistics.co.jp',
      address: '愛知県名古屋市中区栄7-7-7',
      supportDetails: '配送ルート最適化、物流倉庫のDX推進、コスト削減施策の実施',
      status: 'active',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-05')
    },
    {
      id: '8',
      companyName: 'フィナンシャルパートナーズ',
      contactPerson: '小林 真理',
      industry: '金融',
      phone: '092-8901-2345',
      email: 'kobayashi@financial.co.jp',
      address: '福岡県福岡市博多区博多駅前8-8-8',
      supportDetails: '資金調達計画の策定、財務体質改善のための施策立案',
      status: 'pending',
      createdAt: new Date('2024-02-05'),
      updatedAt: new Date('2024-02-10')
    },
    {
      id: '9',
      companyName: 'エデュケーションラボ',
      contactPerson: '木村 学',
      industry: '教育',
      phone: '011-9012-3456',
      email: 'kimura@edu-lab.co.jp',
      address: '北海道札幌市中央区大通9-9-9',
      supportDetails: 'オンライン教育プラットフォームの構築支援、教育コンテンツの開発',
      status: 'stopped',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-15')
    },
    {
      id: '10',
      companyName: 'サステナブルエナジー',
      contactPerson: '松本 環',
      industry: 'エネルギー',
      phone: '078-0123-4567',
      email: 'matsumoto@sustainable.co.jp',
      address: '兵庫県神戸市中央区三宮10-10-10',
      supportDetails: '再生可能エネルギー導入計画の策定、省エネ施策の実施',
      status: 'active',
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-20')
    }
  ];

  const handleSave = (updatedCustomer: Customer) => {
    // TODO: API連携時に実装
    console.log('Updated customer:', updatedCustomer);
    setIsModalOpen(false);
  };

  const handleDelete = (customerId: string) => {
    // TODO: API連携時に実装
    console.log('Delete customer:', customerId);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-2rem)] py-4">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-text mb-1">顧客一覧</h1>
            <p className="text-sm text-text-light">顧客情報を一元管理し、支援内容を記録しましょう</p>
          </div>
          <Button variant="outline" size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            新規顧客登録
          </Button>
        </div>

        {/* 検索フィルター */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="会社名、担当者名で検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </Card>

        {/* 顧客一覧テーブル */}
        <Card className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto hide-scrollbar">
              <table className="w-full min-w-[800px]">
                <thead className="sticky top-0 bg-white dark:bg-gray-900 z-10">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-light">会社名</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-light">ステータス</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-light">支援内容</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-text-light">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 text-sm text-text">{customer.companyName}</td>
                    <td className="px-6 py-4">
                      <Badge variant={statusColors[customer.status]}>
                        {statusLabels[customer.status]}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-text">
                      <div className="max-w-xs truncate">{customer.supportDetails}</div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsModalOpen(true);
                        }}
                      >
                        詳細
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          router.push(`/projects?customerId=${customer.id}`);
                        }}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        ＋案件管理
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          router.push(`/meetings?customerId=${customer.id}`);
                        }}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        ＋面談記録
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(customer.id)}
                      >
                        <svg className="w-4 h-4 text-text-light hover:text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      {/* 顧客詳細モーダル */}
      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCustomer(null);
          }}
          onSave={handleSave}
        />
      )}
    </DashboardLayout>
  );
}