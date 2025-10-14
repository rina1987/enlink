'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

export default function MeetingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // サンプルデータ
  const meetings = [
    {
      id: 1,
      customerId: 1,
      customerName: 'テクノソリューション株式会社',
      contactPerson: '山田 健一',
      date: '2024-01-14',
      time: '10:00-11:30',
      title: 'DX推進戦略会議',
      summary: 'デジタルトランスフォーメーション推進における課題と解決策について議論。基幹システムの刷新計画についても検討。',
      nextAction: '提案書の作成と見積もりの準備',
      nextActionDate: '2024-01-17',
      priority: 'high',
      attachments: ['dx_strategy.pdf', 'system_requirements.xlsx'],
      tags: ['DX', '戦略会議', 'システム刷新'],
      status: 'completed'
    },
    {
      id: 2,
      customerId: 2,
      customerName: 'グローバルトレード株式会社',
      contactPerson: '鈴木 美咲',
      date: '2024-01-13',
      time: '14:00-15:00',
      title: '海外展開支援ミーティング',
      summary: 'アジア市場への展開戦略について協議。現地パートナーとの連携方針を決定。',
      nextAction: '市場調査レポートの作成',
      nextActionDate: '2024-01-18',
      priority: 'high',
      attachments: ['market_analysis.pdf'],
      tags: ['海外展開', '市場調査'],
      status: 'completed'
    },
    {
      id: 3,
      customerId: 3,
      customerName: '未来建設工業',
      contactPerson: '佐藤 龍太',
      date: '2024-01-12',
      time: '13:00-14:30',
      title: 'IoT導入計画ミーティング',
      summary: '建設現場へのIoTデバイス導入について具体的な計画を策定。コスト試算も実施。',
      nextAction: 'パイロット導入計画の作成',
      nextActionDate: '2024-01-19',
      priority: 'medium',
      attachments: ['iot_plan.pdf', 'cost_estimation.xlsx'],
      tags: ['IoT', '技術革新'],
      status: 'completed'
    },
    {
      id: 4,
      customerId: 4,
      customerName: 'エコフードシステムズ',
      contactPerson: '田中 優子',
      date: '2024-01-11',
      time: '15:00-16:00',
      title: 'サプライチェーン改善会議',
      summary: '食品ロス削減のための新しいサプライチェーン管理システムについて検討。',
      nextAction: 'システム要件の定義',
      nextActionDate: '2024-01-20',
      priority: 'medium',
      attachments: ['supply_chain.pdf'],
      tags: ['サプライチェーン', '食品ロス'],
      status: 'completed'
    },
    {
      id: 5,
      customerId: 5,
      customerName: 'メディカルケアグループ',
      contactPerson: '高橋 誠',
      date: '2024-01-16',
      time: '11:00-12:30',
      title: '経営効率化プロジェクト会議',
      summary: '医療事務の効率化と患者サービス向上のための施策を検討。',
      nextAction: '業務フロー分析の実施',
      nextActionDate: '2024-01-21',
      priority: 'high',
      attachments: [],
      tags: ['効率化', '医療'],
      status: 'scheduled'
    },
    {
      id: 6,
      customerId: 6,
      customerName: 'クリエイティブデザイン',
      contactPerson: '渡辺 香織',
      date: '2024-01-17',
      time: '13:30-14:30',
      title: 'ブランディング戦略相談',
      summary: '新規事業立ち上げに伴うブランディング戦略について初回相談。',
      nextAction: 'コンペティター分析',
      nextActionDate: '2024-01-22',
      priority: 'low',
      attachments: [],
      tags: ['ブランディング', '新規事業'],
      status: 'scheduled'
    },
    {
      id: 7,
      customerId: 7,
      customerName: 'スマートロジスティクス',
      contactPerson: '中村 大輔',
      date: '2024-01-18',
      time: '10:00-11:00',
      title: '物流最適化プロジェクトMTG',
      summary: '配送ルート最適化システムの導入について検討。AI活用の可能性も議論。',
      nextAction: 'PoC計画の策定',
      nextActionDate: '2024-01-23',
      priority: 'medium',
      attachments: [],
      tags: ['物流', 'AI'],
      status: 'scheduled'
    },
    {
      id: 8,
      customerId: 8,
      customerName: 'フィナンシャルパートナーズ',
      contactPerson: '小林 真理',
      date: '2024-01-19',
      time: '15:00-16:30',
      title: 'デジタル金融サービス企画MTG',
      summary: '新規デジタル金融サービスの企画について協議。規制対応についても確認。',
      nextAction: '法務確認と企画書作成',
      nextActionDate: '2024-01-24',
      priority: 'high',
      attachments: [],
      tags: ['金融', 'デジタル'],
      status: 'scheduled'
    },
    {
      id: 9,
      customerId: 9,
      customerName: 'エデュケーションラボ',
      contactPerson: '木村 学',
      date: '2024-01-10',
      time: '13:00-14:00',
      title: 'オンライン教育プラットフォーム相談',
      summary: 'スタートアップの教育プラットフォーム開発について初回相談。',
      nextAction: '市場規模調査',
      nextActionDate: null,
      priority: 'low',
      attachments: ['platform_concept.pdf'],
      tags: ['教育', 'スタートアップ'],
      status: 'completed'
    },
    {
      id: 10,
      customerId: 10,
      customerName: 'サステナブルエナジー',
      contactPerson: '松本 環',
      date: '2024-01-20',
      time: '14:00-15:30',
      title: '再生可能エネルギー導入MTG',
      summary: '工場への再生可能エネルギー導入計画について協議予定。',
      nextAction: 'フィージビリティスタディ',
      nextActionDate: '2024-01-25',
      priority: 'medium',
      attachments: [],
      tags: ['エネルギー', '環境'],
      status: 'scheduled'
    },
    {
      id: 1,
      customerId: 1,
      customerName: 'A株式会社',
      contactPerson: '田中 太郎',
      date: '2024-01-12',
      time: '14:00-15:30',
      title: '月次進捗確認面談',
      summary: 'Q4の経営改善プロジェクトの進捗を確認。売上向上施策について議論。',
      nextAction: '提案書の作成',
      nextActionDate: '2024-01-15',
      priority: 'high',
      attachments: ['meeting_notes.pdf', 'financial_data.xlsx'],
      tags: ['進捗確認', '経営改善'],
      status: 'completed'
    },
    {
      id: 2,
      customerId: 2,
      customerName: 'B商事株式会社',
      contactPerson: '佐藤 花子',
      date: '2024-01-11',
      time: '10:00-11:00',
      title: '新規提案面談',
      summary: '新サービスの提案を行い、詳細な検討を依頼された。',
      nextAction: '追加資料の準備',
      nextActionDate: '2024-01-16',
      priority: 'medium',
      attachments: ['proposal.pdf'],
      tags: ['新規提案', 'サービス'],
      status: 'completed'
    },
    {
      id: 3,
      customerId: 3,
      customerName: 'Cサービス株式会社',
      contactPerson: '鈴木 一郎',
      date: '2024-01-10',
      time: '15:00-16:00',
      title: 'フォローアップ面談',
      summary: '前回の提案内容について質問があり、詳細を説明。',
      nextAction: '契約書の準備',
      nextActionDate: '2024-01-18',
      priority: 'low',
      attachments: [],
      tags: ['フォローアップ'],
      status: 'completed'
    },
    {
      id: 4,
      customerId: 4,
      customerName: 'D建設株式会社',
      contactPerson: '高橋 二郎',
      date: '2024-01-15',
      time: '13:00-14:30',
      title: '戦略会議',
      summary: '来年度の戦略について議論予定。',
      nextAction: '戦略資料の準備',
      nextActionDate: '2024-01-14',
      priority: 'high',
      attachments: [],
      tags: ['戦略', '年度計画'],
      status: 'scheduled'
    }
  ];

  const customers = [
    { id: 1, name: 'テクノソリューション株式会社' },
    { id: 2, name: 'グローバルトレード株式会社' },
    { id: 3, name: '未来建設工業' },
    { id: 4, name: 'エコフードシステムズ' },
    { id: 5, name: 'メディカルケアグループ' },
    { id: 6, name: 'クリエイティブデザイン' },
    { id: 7, name: 'スマートロジスティクス' },
    { id: 8, name: 'フィナンシャルパートナーズ' },
    { id: 9, name: 'エデュケーションラボ' },
    { id: 10, name: 'サステナブルエナジー' }
  ];

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCustomer = !selectedCustomer || meeting.customerId.toString() === selectedCustomer;
    return matchesSearch && matchesCustomer;
  });

  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'customer':
        return a.customerName.localeCompare(b.customerName);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
      default:
        return 0;
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'scheduled': return 'primary';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '完了';
      case 'scheduled': return '予定';
      case 'cancelled': return 'キャンセル';
      default: return status;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6 min-h-0">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">面談記録</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {sortedMeetings.length}件の面談記録
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
              新規記録
            </Button>
          </div>
        </div>

        {/* 検索・フィルター */}
        <Card className="flex-shrink-0 sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="面談タイトル、顧客名、内容で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">すべての顧客</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id.toString()}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">日付順</option>
                <option value="customer">顧客名順</option>
                <option value="priority">優先度順</option>
              </select>
            </div>
          </div>
        </Card>

        {/* 面談記録一覧 */}
        <div className="space-y-4 overflow-y-auto hide-scrollbar" style={{ maxHeight: 'calc(100vh - 16rem)' }}>
          {sortedMeetings.map((meeting) => (
            <Card key={meeting.id} hover>
              <div className="space-y-4">
                {/* ヘッダー情報 */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {meeting.title}
                      </h3>
                      <Badge variant={getStatusColor(meeting.status)} size="sm">
                        {getStatusText(meeting.status)}
                      </Badge>
                      <Badge variant={getPriorityColor(meeting.priority)} size="sm">
                        {meeting.priority === 'high' ? '高' : meeting.priority === 'medium' ? '中' : '低'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {meeting.customerName} ({meeting.contactPerson})
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {meeting.date}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {meeting.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      詳細
                    </Button>
                    <Button variant="ghost" size="sm">
                      編集
                    </Button>
                  </div>
                </div>

                {/* 面談内容 */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">面談内容</h4>
                  <p className="text-gray-600 dark:text-gray-400">{meeting.summary}</p>
                </div>

                {/* 次回アクション */}
                {meeting.nextAction && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-1">次回アクション</h4>
                    <p className="text-blue-800 dark:text-blue-300">
                      {meeting.nextAction}
                      {meeting.nextActionDate && (
                        <span className="ml-2 text-blue-600 dark:text-blue-400">
                          (期限: {meeting.nextActionDate})
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {/* タグと添付ファイル */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap gap-1">
                    {meeting.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {meeting.attachments.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {meeting.attachments.length}個のファイル
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {sortedMeetings.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">該当する面談記録が見つかりません</p>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
