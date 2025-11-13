'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { Customer } from '@/lib/services/customer.service';
import { CustomerDetailModal } from './CustomerDetailModal';
import { MeetingCreateModal } from '../meetings/MeetingCreateModal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ProjectService } from '@/lib/services/project.service';
import { CustomerService } from '@/lib/services/customer.service';

interface CustomerListProps {
  customers: Customer[];
  onUpdate: () => void;
}

const statusLabels: Record<Customer['status'], string> = {
  active: '進行中',
  pending: '保留',
  stopped: '停止',
};

const statusColors: Record<Customer['status'], 'success' | 'warning' | 'error'> = {
  active: 'success',
  pending: 'warning',
  stopped: 'error',
};

export function CustomerList({ customers, onUpdate }: CustomerListProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [creatingProjectId, setCreatingProjectId] = useState<string | null>(null);
  const [customerIdsWithProject, setCustomerIdsWithProject] = useState<Set<string>>(new Set());
  const router = useRouter();
  const [deletingCustomerId, setDeletingCustomerId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 初期表示時に、各顧客に既存案件があるかを取得
  useEffect(() => {
    const loadExistingProjects = async () => {
      try {
        const ids = customers.map(c => c.id);
        if (ids.length === 0) return;
        const { data, error } = await supabase
          .from('projects')
          .select('customer_id')
          .in('customer_id', ids);
        if (error) throw error;
        const set = new Set<string>(data?.map(d => d.customer_id) || []);
        setCustomerIdsWithProject(set);
      } catch (e) {
        console.error('Failed to check existing projects', e);
      }
    };
    loadExistingProjects();
  }, [customers]);

  const handleCreateProjectAndGo = async (customer: Customer) => {
    try {
      setCreatingProjectId(customer.id);
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const ymd = `${yyyy}-${mm}-${dd}`;

      const projectName = (customer.support_details || '').trim() || '新規案件';

      const created = await ProjectService.create({
        customer_id: customer.id,
        name: projectName,
        description: null,
        start_date: ymd,
        end_date: ymd,
        status: 'not_started'
      });

      onUpdate();
      setCustomerIdsWithProject(prev => new Set(prev).add(customer.id));
      router.push(`/projects?highlight=${created.id}`);
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('案件の作成に失敗しました');
    } finally {
      setCreatingProjectId(null);
    }
  };

  const handleMeetingSuccess = () => {
    router.push('/meetings');
    onUpdate();
  };

  return (
    <>
      <Card className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
          <table className="w-full">
            <thead className="bg-white/80 backdrop-blur-xl sticky top-0 z-10">
              <tr className="border-b">
                <th className="text-left p-4">会社名</th>
                <th className="text-left p-4">ステータス</th>
                <th className="text-left p-4">支援内容</th>
                <th className="text-right p-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="p-4">{customer.company_name}</td>
                  <td className="p-4">
                    <Badge variant={statusColors[customer.status]}>
                      {statusLabels[customer.status]}
                    </Badge>
                  </td>
                  <td className="p-4 max-w-md">
                    <p className="line-clamp-2 text-sm text-text-light">
                      {customer.support_details || '未記入'}
                    </p>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {!customerIdsWithProject.has(customer.id) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={creatingProjectId === customer.id}
                        onClick={() => handleCreateProjectAndGo(customer)}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {creatingProjectId === customer.id ? '作成中…' : '+案件管理'}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setIsMeetingModalOpen(true);
                      }}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      +面談記録
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      詳細
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-error hover:text-error/80"
                      onClick={() => setDeletingCustomerId(customer.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* モーダル */}
      {selectedCustomer && (
        <>
          <CustomerDetailModal
            customer={{
              id: selectedCustomer.id,
              company_name: selectedCustomer.company_name,
              contact_person: selectedCustomer.contact_person,
              industry: selectedCustomer.industry,
              phone: selectedCustomer.phone,
              email: selectedCustomer.email,
              address: selectedCustomer.address,
              support_details: selectedCustomer.support_details,
              status: selectedCustomer.status,
              created_at: '',
              updated_at: ''
            }}
            isOpen={!isMeetingModalOpen}
            onClose={() => setSelectedCustomer(null)}
            onUpdated={onUpdate}
          />
          <MeetingCreateModal
            customer={selectedCustomer}
            isOpen={isMeetingModalOpen}
            onClose={() => {
              setIsMeetingModalOpen(false);
              setSelectedCustomer(null);
            }}
            onSuccess={handleMeetingSuccess}
          />
        </>
      )}

      {/* 削除確認モーダル */}
      {deletingCustomerId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md m-4">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-text">本当に削除してよろしいですか？</h3>
              <p className="text-sm text-text-light">この操作は取り消せません。</p>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setDeletingCustomerId(null)}>キャンセル</Button>
                <Button
                  className="text-white"
                  disabled={isDeleting}
                  onClick={async () => {
                    try {
                      setIsDeleting(true);
                      await CustomerService.delete(deletingCustomerId);
                      setDeletingCustomerId(null);
                      onUpdate();
                      router.refresh();
                    } catch (e) {
                      console.error('Failed to delete customer', e);
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
    </>
  );
}