import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
export type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

export class ProjectService {
  static async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        customer:customers(
          id,
          company_name
        )
      `)
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getByCustomerId(customerId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        customer:customers(
          id,
          company_name
        )
      `)
      .eq('customer_id', customerId)
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async create(project: ProjectInsert) {
    const { data, error } = await supabase
      .from('projects')
      .insert(project as any)
      .select()
      .single();

    if (error) throw error;

    // アクティビティログを記録
    await this.logActivity('project_created', data);

    return data;
  }

  static async update(id: string, project: ProjectUpdate) {
    const { data, error } = await supabase
      .from('projects')
      .update(project as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // アクティビティログを記録
    await this.logActivity('project_updated', data);

    return data;
  }

  static async delete(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  private static async logActivity(
    type: 'project_created' | 'project_updated',
    project: Project
  ) {
    const { error } = await supabase.from('activities').insert({
      type,
      title: `案件「${project.name}」を${type === 'project_created' ? '作成' : '更新'}しました`,
      customer_id: project.customer_id,
      project_id: project.id
    });

    if (error) console.error('Failed to log activity:', error);
  }
}
