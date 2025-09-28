export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          activity_type: string
          created_at: string | null
          description: string | null
          id: string
          match_id: string
          notes: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          match_id: string
          notes?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          match_id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          comments: string | null
          created_at: string | null
          created_by: string
          id: string
          match_id: string
          rating: number | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          created_by: string
          id?: string
          match_id: string
          rating?: number | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          created_by?: string
          id?: string
          match_id?: string
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          check_in_time: string | null
          check_out_time: string | null
          created_at: string | null
          hours_logged: number | null
          id: string
          points_awarded: number | null
          senior_id: string
          slot_id: string
          status: Database["public"]["Enums"]["visit_status"] | null
          teen_volunteer_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string | null
          hours_logged?: number | null
          id?: string
          points_awarded?: number | null
          senior_id: string
          slot_id: string
          status?: Database["public"]["Enums"]["visit_status"] | null
          teen_volunteer_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string | null
          hours_logged?: number | null
          id?: string
          points_awarded?: number | null
          senior_id?: string
          slot_id?: string
          status?: Database["public"]["Enums"]["visit_status"] | null
          teen_volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "seniors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "volunteer_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_teen_volunteer_id_fkey"
            columns: ["teen_volunteer_id"]
            isOneToOne: false
            referencedRelation: "teen_volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          metadata: Json | null
          read_at: string | null
          recipient_id: string
          sender_id: string
          title: string
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          metadata?: Json | null
          read_at?: string | null
          recipient_id: string
          sender_id: string
          title: string
          type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          approval_status: Database["public"]["Enums"]["approval_status"] | null
          bio: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          photo_url: string | null
          points: number | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          bio?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          photo_url?: string | null
          points?: number | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          bio?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          photo_url?: string | null
          points?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      senior_centers: {
        Row: {
          address: string
          admin_id: string | null
          city: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          full_address: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          state: string
          zip_code: string
        }
        Insert: {
          address: string
          admin_id?: string | null
          city: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          full_address?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          state: string
          zip_code: string
        }
        Update: {
          address?: string
          admin_id?: string | null
          city?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          full_address?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          state?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "senior_centers_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      senior_time_slots: {
        Row: {
          created_at: string | null
          day_of_week: number
          end_time: string
          id: string
          is_available: boolean | null
          senior_id: string
          start_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          end_time: string
          id?: string
          is_available?: boolean | null
          senior_id: string
          start_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          end_time?: string
          id?: string
          is_available?: boolean | null
          senior_id?: string
          start_time?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      seniors: {
        Row: {
          age: number | null
          bio: string | null
          created_at: string | null
          first_name: string
          id: string
          interests: string[] | null
          last_name: string
          mobility_notes: string | null
          photo_url: string | null
          preferred_activities: string[] | null
          senior_center_id: string
        }
        Insert: {
          age?: number | null
          bio?: string | null
          created_at?: string | null
          first_name: string
          id?: string
          interests?: string[] | null
          last_name: string
          mobility_notes?: string | null
          photo_url?: string | null
          preferred_activities?: string[] | null
          senior_center_id: string
        }
        Update: {
          age?: number | null
          bio?: string | null
          created_at?: string | null
          first_name?: string
          id?: string
          interests?: string[] | null
          last_name?: string
          mobility_notes?: string | null
          photo_url?: string | null
          preferred_activities?: string[] | null
          senior_center_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "seniors_senior_center_id_fkey"
            columns: ["senior_center_id"]
            isOneToOne: false
            referencedRelation: "senior_centers"
            referencedColumns: ["id"]
          },
        ]
      }
      teen_volunteers: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          grade_level: number | null
          id: string
          interests: string[] | null
          parent_consent: boolean | null
          parent_email: string | null
          parent_phone: string | null
          profile_id: string
          school_id: string | null
          total_hours: number | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          grade_level?: number | null
          id?: string
          interests?: string[] | null
          parent_consent?: boolean | null
          parent_email?: string | null
          parent_phone?: string | null
          profile_id: string
          school_id?: string | null
          total_hours?: number | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          grade_level?: number | null
          id?: string
          interests?: string[] | null
          parent_consent?: boolean | null
          parent_email?: string | null
          parent_phone?: string | null
          profile_id?: string
          school_id?: string | null
          total_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teen_volunteers_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teen_volunteers_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_requests: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          requested_date: string
          requested_end_time: string
          requested_start_time: string
          senior_center_id: string
          senior_id: string
          status: string | null
          student_email: string | null
          student_name: string
          student_phone: string | null
          time_slot_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          requested_date: string
          requested_end_time: string
          requested_start_time: string
          senior_center_id: string
          senior_id: string
          status?: string | null
          student_email?: string | null
          student_name?: string
          student_phone?: string | null
          time_slot_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          requested_date?: string
          requested_end_time?: string
          requested_start_time?: string
          senior_center_id?: string
          senior_id?: string
          status?: string | null
          student_email?: string | null
          student_name?: string
          student_phone?: string | null
          time_slot_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_requests_time_slot_id_fkey"
            columns: ["time_slot_id"]
            isOneToOne: false
            referencedRelation: "senior_time_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_slots: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          end_time: string
          id: string
          max_volunteers: number | null
          required_skills: string[] | null
          scheduled_date: string
          senior_center_id: string
          senior_id: string | null
          start_time: string
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          end_time: string
          id?: string
          max_volunteers?: number | null
          required_skills?: string[] | null
          scheduled_date: string
          senior_center_id: string
          senior_id?: string | null
          start_time: string
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          end_time?: string
          id?: string
          max_volunteers?: number | null
          required_skills?: string[] | null
          scheduled_date?: string
          senior_center_id?: string
          senior_id?: string | null
          start_time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_slots_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_slots_senior_center_id_fkey"
            columns: ["senior_center_id"]
            isOneToOne: false
            referencedRelation: "senior_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_slots_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "seniors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      approval_status: "pending" | "approved" | "rejected"
      user_role:
        | "teen_volunteer"
        | "teen_admin"
        | "senior_center_admin"
        | "family_member"
      visit_status: "scheduled" | "checked_in" | "completed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      approval_status: ["pending", "approved", "rejected"],
      user_role: [
        "teen_volunteer",
        "teen_admin",
        "senior_center_admin",
        "family_member",
      ],
      visit_status: ["scheduled", "checked_in", "completed", "cancelled"],
    },
  },
} as const
