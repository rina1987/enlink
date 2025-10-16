'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

export default function SnippetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSnippet, setSelectedSnippet] = useState<number | null>(null);

  // 選択中のスニペットのモックデータ
  const selectedSnippetMockData = {
    id: 1,
    title: '提案書基本フォーマット',
    category: '提案書',
    content: `【提案書】

件名：{{プロジェクト名}}
提出日：{{日付}}
提出先：{{顧客名}} 御中

1. 提案の背景と目的
{{背景と目的}}

2. 現状の課題
{{課題}}

3. 解決策の提案
{{解決策}}

4. 期待される効果
{{効果}}

5. 実施スケジュール
{{スケジュール}}

6. 費用見積
{{見積}}

7. 実施体制
{{体制}}

8. リスクと対策
{{リスク対策}}

以上`,
    variables: [
      { name: 'プロジェクト名', description: 'プロジェクトの正式名称' },
      { name: '日付', description: '提案書の提出日（YYYY年MM月DD日）' },
      { name: '顧客名', description: '顧客の会社名' },
      { name: '背景と目的', description: 'プロジェクトの背景と目的' },
      { name: '課題', description: '現状の課題と問題点' },
      { name: '解決策', description: '提案する解決策の詳細' },
      { name: '効果', description: '期待される効果や成果' },
      { name: 'スケジュール', description: '実施スケジュールの詳細' },
      { name: '見積', description: '費用の見積もり' },
      { name: '体制', description: 'プロジェクトの実施体制' },
      { name: 'リスク対策', description: '想定されるリスクと対策' }
    ],
    examples: [
      {
        title: 'DX推進プロジェクト提案書',
        replacements: {
          'プロジェクト名': 'DX推進プロジェクト',
          '日付': '2024年1月15日',
          '顧客名': '株式会社テクノロジー',
          '背景と目的': '御社のDX推進による業務効率化と顧客満足度向上',
          '課題': '現状の手作業による非効率な業務プロセス',
          '解決策': 'AI/RPA導入による自動化と業務プロセスの最適化',
          '効果': '業務効率30%向上、顧客対応時間50%短縮',
          'スケジュール': '3ヶ月間での段階的な導入',
          '見積': '初期費用300万円、運用費用月額10万円',
          '体制': 'PM1名、エンジニア2名、コンサルタント1名',
          'リスク対策': '段階的な導入によるリスク最小化'
        }
      }
    ],
    lastModified: '2024-01-15 14:30',
    createdBy: '乘松 利奈',
    version: '1.2'
  };

  // サンプルデータ
  const snippets = [
    {
      id: 1,
      title: '提案書基本フォーマット',
      category: '提案書',
      tags: ['基本', 'フォーマット'],
      content: `【提案書】

件名：{{プロジェクト名}}
提出日：{{日付}}
提出先：{{顧客名}} 御中

1. 提案の背景と目的
{{背景と目的}}

2. 現状の課題
{{課題}}

3. 解決策の提案
{{解決策}}

4. 期待される効果
{{効果}}

5. 実施スケジュール
{{スケジュール}}

6. 費用見積
{{見積}}

7. 実施体制
{{体制}}

8. リスクと対策
{{リスク対策}}

以上`,
      shortCode: 'proposal_base',
      useCount: 25,
      lastUsed: '2024-01-14',
      createdAt: '2023-08-01'
    },
    {
      id: 2,
      title: '契約書テンプレート',
      category: '契約書',
      tags: ['基本', '契約'],
      content: `業務委託契約書

{{顧客名}}（以下「甲」という）と{{自社名}}（以下「乙」という）は、以下のとおり業務委託契約（以下「本契約」という）を締結する。

第1条（目的）
{{目的}}

第2条（委託業務の内容）
{{業務内容}}

第3条（契約期間）
{{契約期間}}

第4条（委託料及び支払方法）
{{委託料}}

第5条（成果物）
{{成果物}}

第6条（秘密保持）
{{秘密保持条項}}

第7条（契約解除）
{{解除条項}}

第8条（損害賠償）
{{損害賠償条項}}

第9条（協議事項）
{{協議事項}}

以上、本契約の成立を証するため、本書2通を作成し、甲乙記名押印の上、各1通を保有する。

{{契約日}}

甲：{{顧客住所}}
　　{{顧客名}}
　　{{顧客代表者名}}　印

乙：{{自社住所}}
　　{{自社名}}
　　{{自社代表者名}}　印`,
      shortCode: 'contract_base',
      useCount: 18,
      lastUsed: '2024-01-13',
      createdAt: '2023-07-15'
    },
    {
      id: 3,
      title: '面談お礼メール',
      category: 'メール',
      tags: ['お礼', '面談後'],
      content: `{{顧客名}}様

先日は貴重なお時間をいただき、ありがとうございました。

面談でお話しさせていただいた内容を踏まえ、{{提案内容}}について詳細なご提案をさせていただきたく存じます。

近日中にご提案書をお送りいたしますので、ご確認のほどよろしくお願いいたします。

何かご不明な点がございましたら、お気軽にお声かけください。

今後ともよろしくお願いいたします。

{{担当者名}}`,
      shortCode: 'thank_you_meeting',
      useCount: 15,
      lastUsed: '2024-01-10',
      createdAt: '2023-12-01'
    },
    {
      id: 2,
      title: '提案書送付メール',
      category: 'メール',
      tags: ['提案書', '送付'],
      content: `{{顧客名}}様

いつもお世話になっております。

先日ご相談いただきました件について、ご提案書を作成いたしました。

以下の内容でご提案させていただいております：

1. {{提案1}}
2. {{提案2}}
3. {{提案3}}

ご検討いただき、ご質問等がございましたらお気軽にお声かけください。

お忙しい中恐縮ですが、ご確認のほどよろしくお願いいたします。

{{担当者名}}`,
      shortCode: 'proposal_email',
      useCount: 8,
      lastUsed: '2024-01-08',
      createdAt: '2023-11-15'
    },
    {
      id: 3,
      title: '契約締結お礼',
      category: 'メール',
      tags: ['契約', 'お礼'],
      content: `{{顧客名}}様

この度は弊社をご選択いただき、誠にありがとうございます。

契約締結を機に、{{サービス内容}}について全力でサポートさせていただきます。

プロジェクトの進行に際しては、定期的にご報告をさせていただき、お客様のご要望にお応えできるよう努めてまいります。

今後ともよろしくお願いいたします。

{{担当者名}}`,
      shortCode: 'contract_thanks',
      useCount: 3,
      lastUsed: '2024-01-05',
      createdAt: '2023-12-20'
    },
    {
      id: 4,
      title: '進捗報告テンプレート',
      category: '報告書',
      tags: ['進捗', '報告'],
      content: `【進捗報告】{{プロジェクト名}}

{{顧客名}}様

{{期間}}の進捗状況をご報告いたします。

■ 実施内容
・{{実施内容1}}
・{{実施内容2}}
・{{実施内容3}}

■ 成果
{{成果内容}}

■ 今後の予定
・{{今後の予定1}}
・{{今後の予定2}}

■ 課題・リスク
{{課題内容}}

ご不明な点がございましたらお気軽にお声かけください。

{{担当者名}}`,
      shortCode: 'progress_report',
      useCount: 12,
      lastUsed: '2024-01-12',
      createdAt: '2023-10-01'
    },
    {
      id: 6,
      title: '月次報告書テンプレート',
      category: '報告書',
      tags: ['月次', '報告'],
      content: `月次報告書

報告期間：{{年月}}
報告先：{{顧客名}} 御中

1. 今月の主な活動
{{活動内容}}

2. KPI達成状況
{{KPI状況}}

3. 課題と対応状況
{{課題対応}}

4. 来月の予定
{{来月予定}}

5. 特記事項
{{特記事項}}

報告者：{{担当者名}}
報告日：{{報告日}}`,
      shortCode: 'monthly_report',
      useCount: 30,
      lastUsed: '2024-01-14',
      createdAt: '2023-06-01'
    },
    {
      id: 7,
      title: 'プロジェクト計画書',
      category: '報告書',
      tags: ['計画', 'プロジェクト'],
      content: `プロジェクト計画書

プロジェクト名：{{プロジェクト名}}
作成日：{{作成日}}

1. プロジェクト概要
{{概要}}

2. 目的と目標
{{目的}}
{{目標}}

3. スコープ
{{スコープ}}

4. 実施体制
{{体制}}

5. スケジュール
{{スケジュール}}

6. 予算
{{予算}}

7. リスク管理
{{リスク}}

8. 品質管理
{{品質}}

承認者：{{承認者名}}
作成者：{{作成者名}}`,
      shortCode: 'project_plan',
      useCount: 15,
      lastUsed: '2024-01-12',
      createdAt: '2023-09-01'
    },
    {
      id: 8,
      title: '議事録テンプレート',
      category: '報告書',
      tags: ['会議', '記録'],
      content: `議事録

会議名：{{会議名}}
日時：{{日時}}
場所：{{場所}}
参加者：{{参加者}}

1. 議題
{{議題}}

2. 討議内容
{{討議内容}}

3. 決定事項
{{決定事項}}

4. 次回アクション
{{アクション}}

5. 次回会議予定
{{次回予定}}

記録者：{{記録者名}}`,
      shortCode: 'meeting_minutes',
      useCount: 22,
      lastUsed: '2024-01-13',
      createdAt: '2023-08-15'
    },
    {
      id: 9,
      title: '請求書テンプレート',
      category: 'その他',
      tags: ['請求', '経理'],
      content: `請求書

請求書番号：{{請求書番号}}
発行日：{{発行日}}

{{顧客名}} 御中

下記の通りご請求申し上げます。

ご請求金額：{{金額}}円（税込）

内訳：
{{内訳}}

お支払期限：{{支払期限}}
お振込先：{{振込先}}

備考：
{{備考}}

{{自社名}}
{{自社住所}}
{{自社連絡先}}`,
      shortCode: 'invoice',
      useCount: 12,
      lastUsed: '2024-01-11',
      createdAt: '2023-10-01'
    },
    {
      id: 10,
      title: 'プレスリリース',
      category: 'その他',
      tags: ['広報', 'リリース'],
      content: `プレスリリース

{{発表日}}

{{見出し}}

{{リード文}}

1. 背景
{{背景}}

2. 概要
{{概要}}

3. 特徴
{{特徴}}

4. 今後の展開
{{展開}}

5. 会社概要
{{会社概要}}

本件に関するお問い合わせ
{{問い合わせ先}}`,
      shortCode: 'press_release',
      useCount: 8,
      lastUsed: '2024-01-10',
      createdAt: '2023-11-01'
    },
    {
      id: 5,
      title: 'フォローアップメール',
      category: 'メール',
      tags: ['フォロー', '継続'],
      content: `{{顧客名}}様

お疲れ様です。

先日ご提案させていただいた件について、ご検討いただけましたでしょうか。

ご不明な点やご質問がございましたら、お気軽にお声かけください。

また、{{関連サービス}}についてもご相談がございましたら、いつでもお申し付けください。

お忙しい中恐縮ですが、ご連絡をお待ちしております。

{{担当者名}}`,
      shortCode: 'followup_email',
      useCount: 20,
      lastUsed: '2024-01-11',
      createdAt: '2023-09-01'
    }
  ];

  const categories = ['メール', '報告書', '提案書', '契約書', 'その他'];

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || snippet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedSnippetData = selectedSnippet ? snippets.find(s => s.id === selectedSnippet) : null;

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    // ここでトースト通知などを表示
    alert('クリップボードにコピーしました');
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-2rem)] py-4">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-text mb-2">文章クリップ</h1>
            <p className="text-sm text-text-light mb-1">よく使う文章を保存して効率的に活用しましょう</p>
            <p className="text-xs text-text-light">
              {filteredSnippets.length}件の文章クリップ
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              エクスポート
            </Button>
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              新規作成
            </Button>
          </div>
        </div>

        {/* 検索・フィルター */}
        <Card className="flex-shrink-0 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="タイトル、内容、タグで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">すべてのカテゴリ</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          {/* スニペット一覧 */}
          <div className="lg:col-span-1 flex flex-col min-h-0">
            <Card className="flex-1 flex flex-col min-h-0">
              <div className="p-4 flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">文章クリップ一覧</h3>
              </div>
              <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-4 space-y-3">
                {filteredSnippets.map((snippet) => (
                  <div
                    key={snippet.id}
                    onClick={() => setSelectedSnippet(snippet.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
                      selectedSnippet === snippet.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{snippet.title}</h4>
                      <Badge variant="secondary" size="sm">
                        {snippet.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {snippet.content.split('\n')[0]}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* スニペット詳細 */}
          <div className="lg:col-span-2 flex flex-col min-h-0">
            {selectedSnippetMockData ? (
              <Card className="flex-1 flex flex-col min-h-0">
                <div className="p-6 flex-1 overflow-y-auto hide-scrollbar">
                  <div className="space-y-6">
                    {/* ヘッダー */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {selectedSnippetMockData.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>カテゴリ: {selectedSnippetMockData.category}</span>
                          <span>バージョン: {selectedSnippetMockData.version}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          編集
                        </Button>
                        <Button variant="outline" size="sm">
                          削除
                        </Button>
                      </div>
                    </div>

                    {/* 内容 */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-white">内容</h4>
                        <Button variant="outline" size="sm">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          コピー
                        </Button>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100 font-mono">
                          {selectedSnippetMockData.content}
                        </pre>
                      </div>
                    </div>

                    {/* メタ情報 */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">最終更新:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {selectedSnippetMockData.lastModified}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">作成者:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {selectedSnippetMockData.createdBy}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="text-center py-12">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400">文章クリップを選択してください</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
