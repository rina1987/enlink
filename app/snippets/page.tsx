'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { SnippetService, Snippet } from '@/lib/services/snippet.service';
import { SnippetCreateModal } from '../components/snippets/SnippetCreateModal';
import { SnippetEditModal } from '../components/snippets/SnippetEditModal';

export default function SnippetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>(null);
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadSnippets = async () => {
    try {
      const data = (await SnippetService.getAll()) as any[];
      const typed = (data ?? []) as Snippet[];
      setSnippets(typed);
      if (!selectedSnippetId && typed.length > 0) {
        const first = typed[0] as Partial<Snippet>;
        if (first && typeof first.id === 'string') {
          setSelectedSnippetId(first.id);
        }
      }
    } catch (e) {
      console.error('Failed to load snippets', e);
    }
  };

  useEffect(() => {
    loadSnippets();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    snippets.forEach(s => { if (s.category) set.add(s.category); });
    return Array.from(set);
  }, [snippets]);

  const filteredSnippets = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return snippets.filter(snippet => {
      const matchesSearch = snippet.title.toLowerCase().includes(term) ||
        (snippet.content || '').toLowerCase().includes(term) ||
        (snippet.category || '').toLowerCase().includes(term);
      const matchesCategory = !selectedCategory || snippet.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [snippets, searchTerm, selectedCategory]);

  const selectedSnippetData = selectedSnippetId ? snippets.find(s => s.id === selectedSnippetId) : null;

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
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
            <p className="text-xs text-text-light">{filteredSnippets.length}件の文章クリップ</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" onClick={() => setIsCreateOpen(true)}>
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
                placeholder="タイトル、内容、カテゴリで検索..."
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
                  <option key={category} value={category}>{category}</option>
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
                    onClick={() => setSelectedSnippetId(snippet.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
                      selectedSnippetId === snippet.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{snippet.title}</h4>
                      {snippet.category && (
                        <Badge variant="secondary" size="sm">{snippet.category}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{snippet.content.split('\n')[0]}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* スニペット詳細 */}
          <div className="lg:col-span-2 flex flex-col min-h-0">
            {selectedSnippetData ? (
              <Card className="flex-1 flex flex-col min-h-0">
                <div className="p-6 flex-1 overflow-y-auto hide-scrollbar">
                  <div className="space-y-6">
                    {/* ヘッダー */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{selectedSnippetData.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          {selectedSnippetData.category && <span>カテゴリ: {selectedSnippetData.category}</span>}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setIsEditOpen(true)}>編集</Button>
                        <Button variant="outline" size="sm" onClick={() => setDeletingId(selectedSnippetData.id)}>削除</Button>
                      </div>
                    </div>

                    {/* 内容 */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-white">内容</h4>
                        <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(selectedSnippetData.content)}>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2z" />
                          </svg>
                          コピー
                        </Button>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100 font-mono">{selectedSnippetData.content}</pre>
                      </div>
                    </div>

                    {/* メタ情報 */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-600 dark:text-gray-400">作成:</span><span className="ml-2 text-gray-900 dark:text-white">{selectedSnippetData.created_at ? new Date(selectedSnippetData.created_at).toLocaleString() : '-'}</span></div>
                      <div><span className="text-gray-600 dark:text-gray-400">更新:</span><span className="ml-2 text-gray-900 dark:text-white">{selectedSnippetData.updated_at ? new Date(selectedSnippetData.updated_at).toLocaleString() : '-'}</span></div>
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
      {/* 作成モーダル */}
      <SnippetCreateModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSuccess={loadSnippets} />
      {/* 編集モーダル */}
      {selectedSnippetData && (
        <SnippetEditModal
          snippet={selectedSnippetData}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSaved={async () => {
            await loadSnippets();
          }}
        />
      )}
      {/* 削除確認モーダル */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md m-4">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-text">本当に削除してよろしいですか？</h3>
              <p className="text-sm text-text-light">この操作は取り消せません。</p>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setDeletingId(null)}>キャンセル</Button>
                <Button
                  className="text-white"
                  disabled={isDeleting}
                  onClick={async () => {
                    try {
                      setIsDeleting(true);
                      await SnippetService.delete(deletingId);
                      setDeletingId(null);
                      await loadSnippets();
                      // 選択中が削除されたら先頭に切り替え
                      if (selectedSnippetId === deletingId) {
                        const list = (await SnippetService.getAll()) as any[];
                        const first = (list ?? [])[0] as { id?: string } | undefined;
                        setSelectedSnippetId(first?.id ?? null);
                      }
                    } catch (e) {
                      console.error('Failed to delete snippet', e);
                      alert('削除に失敗しました');
                    } finally {
                      setIsDeleting(false);
                    }
                  }}
                >
                  削除する
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}


