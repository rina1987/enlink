import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

export type ProjectTask = Database['public']['Tables']['project_tasks']['Row']
export type ProjectTaskInsert = Database['public']['Tables']['project_tasks']['Insert']
export type ProjectTaskUpdate = Database['public']['Tables']['project_tasks']['Update']

export class ProjectTaskService {
  static async getByProjectId(projectId: string) {
    const { data, error } = await supabase
      .from('project_tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('start_date', { ascending: true })

    if (error) throw error
    return data
  }

  static async create(task: ProjectTaskInsert) {
    const { data, error } = await supabase
      .from('project_tasks')
      .insert(task as any)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async update(id: string, task: ProjectTaskUpdate) {
    const { data, error } = await supabase
      .from('project_tasks')
      .update(task as any)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async delete(id: string) {
    const { error } = await supabase
      .from('project_tasks')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}


