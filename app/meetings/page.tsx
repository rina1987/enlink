'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MeetingService } from '@/lib/services/meeting.service';
import { useSearchParams } from 'next/navigation';
import { Input } from '../components/ui/Input';

function MeetingsPage() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortMode, setSortMode] = useState<'latest' | 'project'>('latest');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState<any | null>(null);
  const [deletingMeetingId, setDeletingMeetingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const searchParams = useSearchParams();

  const fetchMeetings = async () => {
      try {
        setIsLoading(true);
        const customerId = searchParams.get('customer');
        const data = customerId
          ? await MeetingService.getByCustomerId(customerId)
          : await MeetingService.getAll();
        setMeetings(data);
      } catch (error) {
        console.error('Failed to load meetings:', error);
      } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'long'
    }).format(date);
  };

  const filteredMeetings = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return meetings;
    return meetings.filter((m: any) => {
      const haystack = [
        m.title,
        m.customer?.company_name,
        m.location,
        Array.isArray(m.attendees) ? m.attendees.join(',') : '',
        m.content,
        Array.isArray(m.links) ? m.links.join(' ') : ''
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [meetings, searchTerm]);

  const sortedMeetings = useMemo(() => {
    if (sortMode === 'latest') {
      return [...filteredMeetings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    // project/grouped sort is handled at render time
    return filteredMeetings;
  }, [filteredMeetings, sortMode]);

  const projectOptions = useMemo(() => {
    const map = new Map<string, string>();
    map.set('all', 'すべての案件');
    meetings.forEach((m: any) => {
      const id = m.project?.id || 'unassigned';
      const name = m.project?.name || '未割当の案件';
      if (!map.has(id)) map.set(id, name);
    });
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }));
  }, [meetings]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col">
          <Card className="p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-text-light">読み込み中...</p>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-text mb-2">面談記録</h1>
            <p className="text-sm text-text-light mb-1">面談内容を確実に記録しましょう</p>
            <p className="text-xs text-text-light">
              {meetings.length}件の面談記録
            </p>
          </div>
          {/* 検索＋並べ替えコントロール */}
          <div className="flex items-center gap-3">
            <div className="w-96 hidden sm:block">
              <Input
                placeholder="会社名・タイトル・内容を検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white dark:bg-gray-900"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit">
            <button
              onClick={() => setSortMode('latest')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                sortMode === 'latest'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              最新日付
            </button>
            <button
              onClick={() => setSortMode('project')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                sortMode === 'project'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              案件別
            </button>
            </div>
          </div>
          {/* 案件別のフィルターは不要のため非表示にし、レイアウトは最新日付と同一に */}
        </div>

        {meetings.length > 0 ? (
          sortMode === 'latest' ? (
            <div className="space-y-3">
              {sortedMeetings.map((meeting) => (
                <Card key={meeting.id} className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => setSelectedMeeting(meeting)}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      {/* 会社名を強調 */}
                      <div className="text-base font-semibold text-text truncate">{meeting.customer?.company_name || '不明な顧客'}</div>
                      <div className="text-sm text-text-light truncate">{meeting.title}</div>
                      <div className="text-sm text-text mt-2 whitespace-pre-line line-clamp-2">
                        {(meeting.content || '').split('\\n').slice(0, 2).join('\\n')}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-text-light whitespace-nowrap">{formatDate(meeting.date)}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingMeetingId(meeting.id);
                        }}
                        className="text-error hover:text-error/80"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* 案件別（プロジェクト名）でグルーピング */
            <div className="space-y-6">
              {Object.entries(
                filteredMeetings
                  .filter((m: any) => projectFilter === 'all' ? true : (projectFilter === 'unassigned' ? !m.project?.id : m.project?.id === projectFilter))
                  .reduce((acc: Record<string, any[]>, m: any) => {
                    const key = m.project?.name || '未割当の案件';
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(m);
                    return acc;
                  }, {})
              ).map(([projectName, items]) => (
                <div key={projectName} className="space-y-3">
                  {(() => {
                    const isUnassigned = projectName === '未割当の案件' || projectName === '未割り当ての案件';
                    return !isUnassigned ? (
                      <div className="px-1 text-sm font-semibold text-text">{projectName}</div>
                    ) : null;
                  })()}
                  {items.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((meeting: any) => (
                    <Card key={meeting.id} className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => setSelectedMeeting(meeting)}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-base font-semibold text-text truncate">{meeting.customer?.company_name || '不明な顧客'}</div>
                          <div className="text-sm text-text-light truncate">{meeting.title}</div>
                          <div className="text-sm text-text mt-2 whitespace-pre-line line-clamp-2">
                            {(meeting.content || '').split('\\n').slice(0, 2).join('\\n')}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-text-light whitespace-nowrap">{formatDate(meeting.date)}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeletingMeetingId(meeting.id);
                            }}
                            className="text-error hover:text-error/80"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          )
        ) : (
          <Card className="flex flex-col items-center justify-center p-8 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-text mb-2">
              面談記録がありません
            </h3>
            <p className="text-text-light">
              顧客一覧から新しい面談記録を登録してください
            </p>
          </Card>
        )}
        {/* 詳細モーダル */}
        {selectedMeeting && (
          <MeetingDetailModal
            meeting={selectedMeeting}
            onClose={() => setSelectedMeeting(null)}
            onSaved={async () => {
              await fetchMeetings();
              setSelectedMeeting(null);
            }}
          />
        )}

        {/* 削除確認モーダル */}
        {deletingMeetingId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="w-full max-w-md m-4">
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-text">本当に削除してよろしいですか？</h3>
                <p className="text-sm text-text-light">この操作は取り消せません。</p>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setDeletingMeetingId(null)}>キャンセル</Button>
                  <Button
                    className="text-white"
                    disabled={isDeleting}
                    onClick={async () => {
                      try {
                        setIsDeleting(true);
                        await MeetingService.delete(deletingMeetingId);
                        setDeletingMeetingId(null);
                        await fetchMeetings();
                      } catch (e) {
                        console.error('Failed to delete meeting', e);
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
      </div>
    </DashboardLayout>
  );
}

export default function MeetingsPageWithSuspense() {
  // useSearchParams を使うコンポーネントを Suspense で包む
  return (
    <Suspense
      fallback={
        <DashboardLayout>
          <div className="flex flex-col">
            <Card className="p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-text-light">読み込み中...</p>
              </div>
            </Card>
          </div>
        </DashboardLayout>
      }
    >
      <MeetingsPage />
    </Suspense>
  );
}

function MeetingDetailModal({ meeting, onClose, onSaved }: { meeting: any; onClose: () => void; onSaved?: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [edited, setEdited] = useState(() => {
    const d = new Date(meeting.date);
    const pad = (n: number) => String(n).padStart(2, '0');
    const localDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const localTime = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    return {
      title: meeting.title || '',
      date: localDate,
      time: localTime,
      location: meeting.location || '',
      attendeesText: Array.isArray(meeting.attendees) ? meeting.attendees.join(', ') : '',
      content: meeting.content || '',
      linksText: Array.isArray(meeting.links) ? meeting.links.join('\n') : ''
    };
  });
  const format = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'long'
    }).format(date);
  };
  const renderAttachments = (att: any) => {
    const items: Array<{ name: string; href?: string }> = [];
    const toHref = (val: any): string | undefined => {
      if (!val) return undefined;
      if (typeof val === 'string') return val;
      if (typeof val.url === 'string') return val.url;
      if (typeof val.href === 'string') return val.href;
      if (typeof val.path === 'string') return val.path; // ルート/絶対パス
      return undefined;
    };
    if (Array.isArray(att)) {
      att.forEach((v: any, idx: number) => {
        if (typeof v === 'string') items.push({ name: v.split('/').pop() || `file-${idx + 1}`, href: v });
        else items.push({ name: v.name || `file-${idx + 1}`, href: toHref(v) });
      });
    } else if (typeof att === 'object') {
      Object.entries(att as any).forEach(([name, info]) => {
        items.push({ name: String(name), href: toHref(info) });
      });
    }
    return items.map(({ name, href }, i) => {
      const node = (
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 hover:bg-gray-200/70">
          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          <span className={`${href ? 'text-text underline' : 'text-text-light'} text-sm`}>{name}</span>
        </div>
      );
      return href ? (
        <a key={`${name}-${i}`} href={href} target="_blank" rel="noopener noreferrer">{node}</a>
      ) : (
        <div key={`${name}-${i}`}>{node}</div>
      );
    });
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-semibold text-text">{meeting.customer?.company_name || '不明な顧客'}</div>
              {!isEditing ? (
                <div className="text-sm text-text-light mt-1">{meeting.title}</div>
              ) : (
                <Input className="mt-1" value={edited.title} onChange={(e) => setEdited({ ...edited, title: e.target.value })} />
              )}
            </div>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <Button variant="outline" onClick={() => setIsEditing(true)}>編集</Button>
              ) : (
                <Button
                  onClick={async () => {
                    try {
                      setSaving(true);
                      const newDate = new Date(`${edited.date}T${edited.time}:00`).toISOString();
                      await MeetingService.update(meeting.id, {
                        title: edited.title,
                        date: newDate,
                        location: edited.location || null,
                        attendees: edited.attendeesText
                          ? edited.attendeesText.split(',').map((s: string) => s.trim()).filter(Boolean)
                          : [],
                        content: edited.content,
                        links: edited.linksText
                          ? edited.linksText.split(/\n|,/).map((s: string) => s.trim()).filter(Boolean)
                          : []
                      });
                      setIsEditing(false);
                      if (onSaved) onSaved();
                    } catch (e) {
                      console.error('Failed to save meeting', e);
                      alert('保存に失敗しました');
                    } finally {
                      setSaving(false);
                    }
                  }}
                  disabled={saving || !edited.title || !edited.date || !edited.time || !edited.content}
                >
                  {saving ? '保存中…' : '保存'}
                </Button>
              )}
              <Button variant="ghost" onClick={onClose}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          {/* ↑ actions row */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-text">日時</p>
              {!isEditing ? (
                <p className="text-sm text-text-light">{format(meeting.date)}</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" value={edited.date} onChange={(e) => setEdited({ ...edited, date: e.target.value })} />
                  <Input type="time" value={edited.time} onChange={(e) => setEdited({ ...edited, time: e.target.value })} />
                </div>
              )}
            </div>
            {meeting.project?.name && (
              <div>
                <p className="text-sm font-medium text-text">案件</p>
                <p className="text-sm text-text-light">{meeting.project.name}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-text">場所</p>
              {!isEditing ? (
                <p className="text-sm text-text-light">{meeting.location || '-'}</p>
              ) : (
                <Input value={edited.location} onChange={(e) => setEdited({ ...edited, location: e.target.value })} />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-text">参加者</p>
              {!isEditing ? (
                <p className="text-sm text-text-light">{Array.isArray(meeting.attendees) && meeting.attendees.length > 0 ? meeting.attendees.join(', ') : '-'}</p>
              ) : (
                <Input value={edited.attendeesText} onChange={(e) => setEdited({ ...edited, attendeesText: e.target.value })} />
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-text mb-2">面談内容</p>
            {!isEditing ? (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-text whitespace-pre-wrap">{meeting.content}</p>
              </div>
            ) : (
              <textarea
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                rows={6}
                value={edited.content}
                onChange={(e) => setEdited({ ...edited, content: e.target.value })}
              />
            )}
          </div>
          {/* 関連リンク */}
          <div>
            <p className="text-sm font-medium text-text mb-2">関連リンク</p>
            {!isEditing ? (
              <div className="flex flex-wrap gap-2">
                {Array.isArray(meeting.links) && meeting.links.length > 0 ? (
                  meeting.links.map((url: string, i: number) => {
                    const href = /^(https?:)?\/\//i.test(url) ? url : `https://${url}`;
                    return (
                    <a
                      key={`${url}-${i}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline break-all"
                    >
                      {url}
                    </a>
                    );
                  })
                ) : (
                  <p className="text-sm text-text-light">-</p>
                )}
              </div>
            ) : (
              <textarea
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                rows={3}
                value={edited.linksText}
                onChange={(e) => setEdited({ ...edited, linksText: e.target.value })}
                placeholder="https://example.com\nhttps://docs.example.com"
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}