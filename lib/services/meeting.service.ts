import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

export type Meeting = Database['public']['Tables']['meetings']['Row'];
export type MeetingInsert = Database['public']['Tables']['meetings']['Insert'];
export type MeetingUpdate = Database['public']['Tables']['meetings']['Update'];

export class MeetingService {
  static async getAll() {
    const { data, error } = await supabase
      .from('meetings')
      .select(`
        *,
        customer:customers(
          id,
          company_name
        ),
        project:projects(
          id,
          name
        )
      `)
      .order('date', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getByCustomerId(customerId: string) {
    const { data, error } = await supabase
      .from('meetings')
      .select(`
        *,
        customer:customers(
          id,
          company_name
        ),
        project:projects(
          id,
          name
        )
      `)
      .eq('customer_id', customerId)
      .order('date', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async create(meeting: MeetingInsert) {
    const { data, error } = await supabase
      .from('meetings')
      .insert(meeting as any)
      .select()
      .single();

    if (error) throw error;

    // アクティビティログを記録
    await this.logActivity('meeting_created', data);

    return data;
  }

  static async update(id: string, meeting: MeetingUpdate) {
    const { data, error } = await (supabase.from('meetings') as any)
      .update(meeting)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // アクティビティログを記録
    await this.logActivity('meeting_updated', data);

    return data;
  }

  static async delete(id: string) {
    const { error } = await supabase
      .from('meetings')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  private static async logActivity(
    type: 'meeting_created' | 'meeting_updated',
    meeting: Meeting
  ) {
    const { error } = await (supabase.from('activities') as any).insert({
      type,
      title: `面談「${meeting.title}」を${type === 'meeting_created' ? '記録' : '更新'}しました`,
      customer_id: meeting.customer_id,
      meeting_id: meeting.id
    });

    if (error) console.error('Failed to log activity:', error);
  }
}
