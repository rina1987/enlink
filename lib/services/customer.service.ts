import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

export type Customer = Database['public']['Tables']['customers']['Row']
export type CustomerInsert = Database['public']['Tables']['customers']['Insert']
export type CustomerUpdate = Database['public']['Tables']['customers']['Update']

export class CustomerService {
  static async getAll() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('company_name', { ascending: true })

    if (error) throw error
    return data
  }

  static async getById(id: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  static async create(customer: CustomerInsert) {
    const { data, error } = await (supabase.from('customers') as any)
      .insert(customer)
      .select()
      .single()

    if (error) throw error

    // アクティビティログを記録
    await this.logActivity('customer_created', data)
    
    return data
  }

  static async update(id: string, customer: CustomerUpdate) {
    const { data, error } = await (supabase.from('customers') as any)
      .update(customer)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async delete(id: string) {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  private static async logActivity(
    type: 'customer_created',
    customer: Customer,
    description?: string
  ) {
    const { error } = await supabase.from('activities').insert({
      type,
      title: `顧客「${customer.company_name}」を登録しました`,
      description,
      customer_id: customer.id
    })

    if (error) console.error('Failed to log activity:', error)
  }
}
