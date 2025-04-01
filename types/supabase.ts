export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          referral_code: string
          coins: number
          referred_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          referral_code: string
          coins?: number
          referred_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          referral_code?: string
          coins?: number
          referred_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      referrals: {
        Row: {
          id: string
          referrer_id: string
          referred_user_id: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          referrer_id: string
          referred_user_id: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          referrer_id?: string
          referred_user_id?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          status: string
          target: number
          current: number
          start_date: string
          end_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description: string
          status?: string
          target: number
          current?: number
          start_date: string
          end_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string
          status?: string
          target?: number
          current?: number
          start_date?: string
          end_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          user_id: string
          type: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          description?: string
          created_at?: string
        }
      }
      user_stats: {
        Row: {
          id: string
          user_id: string
          total_sales: number
          total_revenue: number
          active_campaigns: number
          conversion_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_sales?: number
          total_revenue?: number
          active_campaigns?: number
          conversion_rate?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_sales?: number
          total_revenue?: number
          active_campaigns?: number
          conversion_rate?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      process_referral: {
        Args: {
          referrer_code: string
          referred_user_id: string
        }
        Returns: boolean
      }
    }
  }
}

