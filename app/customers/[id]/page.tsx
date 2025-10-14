'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview');

  // サンプルデータ
  const customer = {
    id: params.id,
    companyName: 'A株式会社',
    contactPerson: '田中 太郎',
    position: '代表取締役',
    industry: '製造業',
    location: '東京都渋谷区',
    address: '東京都渋谷区恵比寿1-1-1',
    email: 'tanaka@a-corp.co.jp',
    phone: '03-1234-5678',
    website: 'https://a-corp.co.jp',
    rank: 'A',
    tags: ['重要顧客', '製造業', '大企業'],
    status: 'active',
    registeredDate: '2023-06-15',
    lastUpdated: '2024-01-12',
    nextActionDate: '2024-01-15',
    notes: '大手製造業のお客様。経営改善支援を中心に複数のプロジェクトを進行中。'
  };

  const activities = [
    {
      id: 1,
      date: '2024-01-12',
      type: 'meeting',
      title: '月次進捗確認面談',
      description: 'Q4の経営改善プロジェクトの進捗を確認。売上向上施策について議論。',
      nextAction: '提案書の作成',
      nextActionDate: '2024-01-15',
      attachments: ['meeting_notes.pdf']
    },
    {
      id: 2,
      date: '2024-01-05',
      type: 'call',
      title: '電話フォローアップ',
      description: '前回の提案内容について質問があり、電話で回答。',
      nextAction: '追加資料の提供',
      nextActionDate: '2024-01-08',
      attachments: []
    },
    {
      id: 3,
      date: '2023-12-20',
      type: 'meeting',
      title: '年度末戦略会議',
      description: '来年度の経営戦略について詳細な議論を行った。',
      nextAction: '戦略書の最終確認',
      nextActionDate: '2023-12-25',
      attachments: ['strategy_draft.pdf', 'financial_analysis.xlsx']
    }
  ];

  const projects = [
    {
      id: 1,
      name: '経営改善プロジェクト',
      status: 'active',
      startDate: '2023-10-01',
      endDate: '2024-03-31',
      progress: 75,
      description: '売上向上とコスト削減を目指す総合的な経営改善プロジェクト'
    },
    {
      id: 2,
      name: '組織改革支援',
      status: 'planning',
      startDate: '2024-02-01',
      endDate: '2024-08-31',
      progress: 20,
      description: '組織の効率化と人材育成を目的とした改革支援'
    }
  ];

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
      case 'planning': return 'warning';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'call':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const tabs = [
    { id: 'overview', name: '概要', count: null },
    { id: 'activities', name: '活動履歴', count: activities.length },
    { id: 'projects', name: '関連案件', count: projects.length },
    { id: 'notes', name: 'メモ', count: null }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              戻る
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{customer.companyName}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {customer.contactPerson} • {customer.industry}
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              面談記録
            </Button>
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              案件作成
            </Button>
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              編集
            </Button>
          </div>
        </div>

        {/* 基本情報 */}
        <Card>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">会社名</label>
                  <p className="text-gray-900 dark:text-white">{customer.companyName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">担当者</label>
                  <p className="text-gray-900 dark:text-white">{customer.contactPerson}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">役職</label>
                  <p className="text-gray-900 dark:text-white">{customer.position}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">業種</label>
                  <p className="text-gray-900 dark:text-white">{customer.industry}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">所在地</label>
                  <p className="text-gray-900 dark:text-white">{customer.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">メール</label>
                  <p className="text-gray-900 dark:text-white">{customer.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">電話</label>
                  <p className="text-gray-900 dark:text-white">{customer.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ウェブサイト</label>
                  <p className="text-gray-900 dark:text-white">{customer.website}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ランク</label>
                  <Badge variant={getRankColor(customer.rank)} size="md">
                    {customer.rank}ランク
                  </Badge>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">タグ</label>
                  <div className="flex flex-wrap gap-1">
                    {customer.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">登録日</label>
                  <p className="text-gray-900 dark:text-white">{customer.registeredDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">最終更新</label>
                  <p className="text-gray-900 dark:text-white">{customer.lastUpdated}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">次回アクション</label>
                  <p className="text-gray-900 dark:text-white">{customer.nextActionDate}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* タブナビゲーション */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }
                `}
              >
                {tab.name}
                {tab.count !== null && (
                  <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* タブコンテンツ */}
        {activeTab === 'overview' && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">概要</h3>
            <p className="text-gray-600 dark:text-gray-400">{customer.notes}</p>
          </Card>
        )}

        {activeTab === 'activities' && (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">活動履歴</h3>
              <Button size="sm">新規記録</Button>
            </div>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{activity.description}</p>
                    {activity.nextAction && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>次回アクション:</strong> {activity.nextAction}
                          {activity.nextActionDate && (
                            <span className="ml-2 text-blue-600 dark:text-blue-400">
                              (期限: {activity.nextActionDate})
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                    {activity.attachments.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">添付ファイル:</p>
                        <div className="flex flex-wrap gap-1">
                          {activity.attachments.map((file, index) => (
                            <Badge key={index} variant="secondary" size="sm">
                              {file}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'projects' && (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">関連案件</h3>
              <Button size="sm">新規案件</Button>
            </div>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                    <Badge variant={getStatusColor(project.status)} size="sm">
                      {project.status === 'active' ? '進行中' : project.status === 'planning' ? '計画中' : '完了'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{project.startDate} - {project.endDate}</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'notes' && (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">メモ</h3>
              <Button size="sm">編集</Button>
            </div>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
              placeholder="顧客に関するメモを入力してください..."
              defaultValue={customer.notes}
            />
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
