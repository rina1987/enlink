import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

export type Snippet = Database['public']['Tables']['snippets']['Row']
export type SnippetInsert = Database['public']['Tables']['snippets']['Insert']
export type SnippetUpdate = Database['public']['Tables']['snippets']['Update']

export class SnippetService {
  static async getAll() {
    const { data, error } = await supabase
      .from('snippets')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  static async create(values: SnippetInsert) {
    const { data, error } = await supabase
      .from('snippets')
      .insert(values)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async update(id: string, values: SnippetUpdate) {
    const { data, error } = await supabase
      .from('snippets')
      .update(values)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async delete(id: string) {
    const { error } = await supabase
      .from('snippets')
      .delete()
      .eq('id', id)
    if (error) throw error
  }
}


