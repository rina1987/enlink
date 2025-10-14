'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [sortBy, setSortBy] = useState('updated');

  // サンプルデータ
  const customers = [
    {
      id: 1,
      companyName: 'テクノソリューション株式会社',
      contactPerson: '山田 健一',
      industry: 'IT・通信',
      location: '東京都',
      email: 'yamada@techno.co.jp',
      phone: '03-1234-5678',
      rank: 'A',
      tags: ['重要顧客', 'IT', 'DX推進'],
      lastUpdated: '2024-01-14',
      projectCount: 5,
      nextActionDate: '2024-01-16',
      status: 'active'
    },
    {
      id: 2,
      companyName: 'グローバルトレード株式会社',
      contactPerson: '鈴木 美咲',
      industry: '商社',
      location: '大阪府',
      email: 'suzuki@global.co.jp',
      phone: '06-2345-6789',
      rank: 'A',
      tags: ['重要顧客', '海外展開'],
      lastUpdated: '2024-01-13',
      projectCount: 3,
      nextActionDate: '2024-01-17',
      status: 'active'
    },
    {
      id: 3,
      companyName: '未来建設工業',
      contactPerson: '佐藤 龍太',
      industry: '建設',
      location: '神奈川県',
      email: 'sato@mirai.co.jp',
      phone: '045-3456-7890',
      rank: 'B',
      tags: ['建設業', '技術革新'],
      lastUpdated: '2024-01-12',
      projectCount: 2,
      nextActionDate: '2024-01-18',
      status: 'active'
    },
    {
      id: 4,
      companyName: 'エコフードシステムズ',
      contactPerson: '田中 優子',
      industry: '食品',
      location: '千葉県',
      email: 'tanaka@ecofood.co.jp',
      phone: '043-4567-8901',
      rank: 'B',
      tags: ['食品', '環境配慮'],
      lastUpdated: '2024-01-11',
      projectCount: 1,
      nextActionDate: '2024-01-19',
      status: 'active'
    },
    {
      id: 5,
      companyName: 'メディカルケアグループ',
      contactPerson: '高橋 誠',
      industry: '医療',
      location: '埼玉県',
      email: 'takahashi@medical.co.jp',
      phone: '048-5678-9012',
      rank: 'A',
      tags: ['医療', '地域密着'],
      lastUpdated: '2024-01-10',
      projectCount: 4,
      nextActionDate: '2024-01-20',
      status: 'active'
    },
    {
      id: 6,
      companyName: 'クリエイティブデザイン',
      contactPerson: '渡辺 香織',
      industry: 'デザイン',
      location: '京都府',
      email: 'watanabe@creative.co.jp',
      phone: '075-6789-0123',
      rank: 'C',
      tags: ['デザイン', '新規'],
      lastUpdated: '2024-01-09',
      projectCount: 0,
      nextActionDate: '2024-01-21',
      status: 'inactive'
    },
    {
      id: 7,
      companyName: 'スマートロジスティクス',
      contactPerson: '中村 大輔',
      industry: '物流',
      location: '愛知県',
      email: 'nakamura@smart.co.jp',
      phone: '052-7890-1234',
      rank: 'B',
      tags: ['物流', 'IoT'],
      lastUpdated: '2024-01-08',
      projectCount: 2,
      nextActionDate: '2024-01-22',
      status: 'active'
    },
    {
      id: 8,
      companyName: 'フィナンシャルパートナーズ',
      contactPerson: '小林 真理',
      industry: '金融',
      location: '福岡県',
      email: 'kobayashi@financial.co.jp',
      phone: '092-8901-2345',
      rank: 'A',
      tags: ['金融', 'コンサルティング'],
      lastUpdated: '2024-01-07',
      projectCount: 3,
      nextActionDate: '2024-01-23',
      status: 'active'
    },
    {
      id: 9,
      companyName: 'エデュケーションラボ',
      contactPerson: '木村 学',
      industry: '教育',
      location: '北海道',
      email: 'kimura@edulab.co.jp',
      phone: '011-9012-3456',
      rank: 'C',
      tags: ['教育', 'スタートアップ'],
      lastUpdated: '2024-01-06',
      projectCount: 1,
      nextActionDate: null,
      status: 'inactive'
    },
    {
      id: 10,
      companyName: 'サステナブルエナジー',
      contactPerson: '松本 環',
      industry: 'エネルギー',
      location: '兵庫県',
      email: 'matsumoto@sustainable.co.jp',
      phone: '078-0123-4567',
      rank: 'B',
      tags: ['エネルギー', '環境'],
      lastUpdated: '2024-01-05',
      projectCount: 2,
      nextActionDate: '2024-01-24',
      status: 'active'
    },
    {
      id: 1,
      companyName: 'A株式会社',
      contactPerson: '田中 太郎',
      industry: '製造業',
      location: '東京都',
      email: 'tanaka@a-corp.co.jp',
      phone: '03-1234-5678',
      rank: 'A',
      tags: ['重要顧客', '製造業'],
      lastUpdated: '2024-01-12',
      projectCount: 3,
      nextActionDate: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      companyName: 'B商事株式会社',
      contactPerson: '佐藤 花子',
      industry: '卸売業',
      location: '大阪府',
      email: 'sato@b-shouji.co.jp',
      phone: '06-2345-6789',
      rank: 'B',
      tags: ['新規', '卸売業'],
      lastUpdated: '2024-01-11',
      projectCount: 1,
      nextActionDate: '2024-01-16',
      status: 'active'
    },
    {
      id: 3,
      companyName: 'Cサービス株式会社',
      contactPerson: '鈴木 一郎',
      industry: 'サービス業',
      location: '愛知県',
      email: 'suzuki@c-service.co.jp',
      phone: '052-3456-7890',
      rank: 'C',
      tags: ['サービス業'],
      lastUpdated: '2024-01-10',
      projectCount: 0,
      nextActionDate: null,
      status: 'inactive'
    },
    {
      id: 4,
      companyName: 'D建設株式会社',
      contactPerson: '高橋 二郎',
      industry: '建設業',
      location: '福岡県',
      email: 'takahashi@d-kensetsu.co.jp',
      phone: '092-4567-8901',
      rank: 'A',
      tags: ['重要顧客', '建設業'],
      lastUpdated: '2024-01-09',
      projectCount: 5,
      nextActionDate: '2024-01-14',
      status: 'active'
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRank = !selectedRank || customer.rank === selectedRank;
    return matchesSearch && matchesRank;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'company':
        return a.companyName.localeCompare(b.companyName);
      case 'updated':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'rank':
        return a.rank.localeCompare(b.rank);
      default:
        return 0;
    }
  });

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'A': return 'error';
      case 'B': return 'warning';
      case 'C': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'default';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">顧客一覧</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {sortedCustomers.length}件の顧客
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CSV出力
            </Button>
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              新規顧客
            </Button>
          </div>
        </div>

        {/* 検索・フィルター */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="会社名、担当者、業種で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                value={selectedRank}
                onChange={(e) => setSelectedRank(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">すべてのランク</option>
                <option value="A">Aランク</option>
                <option value="B">Bランク</option>
                <option value="C">Cランク</option>
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="updated">更新日順</option>
                <option value="company">会社名順</option>
                <option value="rank">ランク順</option>
              </select>
            </div>
          </div>
        </Card>

        {/* 顧客一覧 */}
        <Card className="flex-1 overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-20rem)]">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">会社名</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">担当者</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">業種</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">所在地</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">ランク</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">案件数</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">次回アクション</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">最終更新</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">操作</th>
                </tr>
              </thead>
              <tbody>
                {sortedCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{customer.companyName}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {customer.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" size="sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">{customer.contactPerson}</td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{customer.industry}</td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{customer.location}</td>
                    <td className="py-4 px-4">
                      <Badge variant={getRankColor(customer.rank)} size="sm">
                        {customer.rank}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900 dark:text-white">{customer.projectCount}</span>
                    </td>
                    <td className="py-4 px-4">
                      {customer.nextActionDate ? (
                        <span className="text-gray-900 dark:text-white">{customer.nextActionDate}</span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{customer.lastUpdated}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          詳細
                        </Button>
                        <Button variant="ghost" size="sm">
                          編集
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedCustomers.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">該当する顧客が見つかりません</p>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
