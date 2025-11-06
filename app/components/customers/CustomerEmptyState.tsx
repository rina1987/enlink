'use client';

import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';

interface CustomerEmptyStateProps {
  onCreateClick: () => void;
}

export function CustomerEmptyState({ onCreateClick }: CustomerEmptyStateProps) {
  return (
    <Card className="flex-1 flex flex-col items-center justify-center p-8 text-center">
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
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <h3 className="text-lg font-medium text-text mb-2">
        顧客データがありません
      </h3>
      <p className="text-text-light mb-6">
        新規顧客を登録して、支援内容を記録しましょう
      </p>
      <Button variant="outline" size="sm" onClick={onCreateClick}>
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        新規顧客登録
      </Button>
    </Card>
  );
}