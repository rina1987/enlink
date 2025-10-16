export type CustomerStatus = 'active' | 'pending' | 'stopped';

export interface Customer {
  id: string;
  companyName: string;           // 会社名
  contactPerson: string;         // 担当者
  industry: string;              // 業種
  phone: string;                 // 電話番号
  email: string;                 // メールアドレス
  address: string;               // 住所
  supportDetails: string;        // 支援内容
  status: CustomerStatus;        // 進捗ステータス
  createdAt: Date;              // 作成日時
  updatedAt: Date;              // 更新日時
}

export const statusLabels: Record<CustomerStatus, string> = {
  active: '進行中',
  pending: '保留',
  stopped: '停止'
};

export const statusColors: Record<CustomerStatus, string> = {
  active: 'success',
  pending: 'warning',
  stopped: 'error'
};
