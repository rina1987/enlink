'use client';

import { Suspense, useState, useCallback, useMemo } from 'react';
import { CustomerList } from '@/app/components/customers/CustomerList';
import { CustomerListSkeleton } from '@/app/components/customers/CustomerListSkeleton';
import { CustomerEmptyState } from '@/app/components/customers/CustomerEmptyState';
import { CustomerCreateModal } from '@/app/components/customers/CustomerCreateModal';
import { CustomerSearchFilter, SearchFilters } from '@/app/components/customers/CustomerSearchFilter';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { CustomerService } from '@/lib/services/customer.service';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { useRouter } from 'next/navigation';

export default function CustomersPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Awaited<ReturnType<typeof CustomerService.getAll>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchTerm: '',
    status: []
  });
  const router = useRouter();

  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      const data = await CustomerService.getAll();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 初回ロード
  useState(() => {
    loadCustomers();
  });

  const handleCreateSuccess = () => {
    loadCustomers(); // 顧客一覧を再取得
    router.refresh(); // ページを更新
  };

  // 検索フィルター処理
  const handleSearch = useCallback((filters: SearchFilters) => {
    setSearchFilters(filters);
  }, []);

  // フィルタリングされた顧客リスト
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      // ステータスフィルター
      if (searchFilters.status.length > 0 && !searchFilters.status.includes(customer.status)) {
        return false;
      }

      // テキスト検索
      if (searchFilters.searchTerm) {
        const searchLower = searchFilters.searchTerm.toLowerCase();
        return (
          customer.company_name.toLowerCase().includes(searchLower) ||
          customer.contact_person.toLowerCase().includes(searchLower) ||
          (customer.industry && customer.industry.toLowerCase().includes(searchLower))
        );
      }

      return true;
    });
  }, [customers, searchFilters]);

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-text mb-1">顧客一覧</h1>
            <p className="text-sm text-text-light">顧客情報を一元管理し、支援内容を記録しましょう</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            新規顧客登録
          </Button>
        </div>

        {/* 検索フィルター */}
        <Card className="p-4 mb-6">
          <CustomerSearchFilter onSearch={handleSearch} />
        </Card>

        {/* 顧客一覧 */}
        <Suspense fallback={<CustomerListSkeleton />}>
          {isLoading ? (
            <CustomerListSkeleton />
          ) : filteredCustomers.length > 0 ? (
            <CustomerList customers={filteredCustomers} onUpdate={loadCustomers} />
          ) : customers.length > 0 ? (
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-text mb-2">
                検索結果が見つかりません
              </h3>
              <p className="text-text-light">
                検索条件を変更して再度お試しください
              </p>
            </Card>
          ) : (
            <CustomerEmptyState onCreateClick={() => setIsCreateModalOpen(true)} />
          )}
        </Suspense>

        {/* 新規登録モーダル */}
        <CustomerCreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleCreateSuccess}
        />
      </div>
    </DashboardLayout>
  );
}