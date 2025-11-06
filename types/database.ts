export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          company_name: string
          contact_person: string
          industry: string | null
          phone: string | null
          email: string | null
          address: string | null
          support_details: string | null
          status: 'active' | 'pending' | 'stopped'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['customers']['Insert']>
      }
      projects: {
        Row: {
          id: string
          customer_id: string
          name: string
          description: string | null
          start_date: string
          end_date: string
          status: 'not_started' | 'in_progress' | 'completed' | 'on_hold'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      project_tasks: {
        Row: {
          id: string
          project_id: string
          name: string
          description: string | null
          start_date: string
          end_date: string
          color: string | null
          status: 'not_started' | 'in_progress' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['project_tasks']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['project_tasks']['Insert']>
      }
      meetings: {
        Row: {
          id: string
          customer_id: string
          project_id: string | null
          title: string
          date: string
          location: string | null
          attendees: string[] | null
          content: string
          links: string[] | null
          attachments: Json | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['meetings']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['meetings']['Insert']>
      }
      snippets: {
        Row: {
          id: string
          title: string
          content: string
          category: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['snippets']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['snippets']['Insert']>
      }
      activities: {
        Row: {
          id: string
          type: 'customer_created' | 'project_created' | 'meeting_created' | 'project_updated' | 'meeting_updated'
          title: string
          description: string | null
          customer_id: string | null
          project_id: string | null
          meeting_id: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['activities']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['activities']['Insert']>
      }
    }
  }
}
