'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { Customer } from '@/lib/services/customer.service';

interface CustomerSearchFilterProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  searchTerm: string;
  status: string[];
}

export function CustomerSearchFilter({ onSearch }: CustomerSearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: 'active', label: '進行中', color: 'bg-success/10 text-success' },
    { value: 'pending', label: '保留', color: 'bg-warning/10 text-warning' },
    { value: 'stopped', label: '停止', color: 'bg-error/10 text-error' }
  ];

  useEffect(() => {
    // 検索条件が変更されたら自動的に検索を実行
    const filters: SearchFilters = {
      searchTerm,
      status: selectedStatuses
    };
    onSearch(filters);
  }, [searchTerm, selectedStatuses, onSearch]);

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatuses([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* 検索バー */}
        <div className="flex-1 relative">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="会社名、担当者、業種で検索..."
            className="pl-10"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* フィルター展開ボタン */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full sm:w-auto"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          フィルター
          {selectedStatuses.length > 0 && (
            <span className="ml-2 bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
              {selectedStatuses.length}
            </span>
          )}
        </Button>

        {/* クリアボタン */}
        {(searchTerm || selectedStatuses.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="w-full sm:w-auto"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            クリア
          </Button>
        )}
      </div>

      {/* 展開されるフィルター */}
      {isExpanded && (
        <div className="pt-4 border-t">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">ステータス</label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(status => (
                <button
                  key={status.value}
                  onClick={() => toggleStatus(status.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedStatuses.includes(status.value)
                      ? status.color
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.label}
                  {selectedStatuses.includes(status.value) && (
                    <span className="ml-2">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
