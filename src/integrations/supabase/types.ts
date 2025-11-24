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
          action: string
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          comment: string | null
          created_at: string | null
          from_user_id: string
          id: string
          rating: number | null
          visit_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          from_user_id: string
          id?: string
          rating?: number | null
          visit_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          from_user_id?: string
          id?: string
          rating?: number | null
          visit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "visits"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string | null
          id: string
          match_score: number | null
          senior_center_id: string
          senior_id: string
          status: Database["public"]["Enums"]["approval_status"] | null
          teen_volunteer_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          match_score?: number | null
          senior_center_id: string
          senior_id: string
          status?: Database["public"]["Enums"]["approval_status"] | null
          teen_volunteer_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          match_score?: number | null
          senior_center_id?: string
          senior_id?: string
          status?: Database["public"]["Enums"]["approval_status"] | null
          teen_volunteer_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_senior_center_id_fkey"
            columns: ["senior_center_id"]
            isOneToOne: false
            referencedRelation: "senior_centers"
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
          link: string | null
          message: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          link?: string | null
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          link?: string | null
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          onboarding_completed: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          school: string | null
          tutorial_completed: boolean | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          school?: string | null
          tutorial_completed?: boolean | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          school?: string | null
          tutorial_completed?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      senior_center_requirements: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          requirement_text: string
          senior_center_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          requirement_text: string
          senior_center_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          requirement_text?: string
          senior_center_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "senior_center_requirements_senior_center_id_fkey"
            columns: ["senior_center_id"]
            isOneToOne: false
            referencedRelation: "senior_centers"
            referencedColumns: ["id"]
          },
        ]
      }
      senior_centers: {
        Row: {
          address: string
          admin_id: string | null
          city: string
          created_at: string | null
          description: string | null
          email: string
          id: string
          name: string
          phone: string
          state: string
          updated_at: string | null
          website: string | null
          zip_code: string
        }
        Insert: {
          address: string
          admin_id?: string | null
          city: string
          created_at?: string | null
          description?: string | null
          email: string
          id?: string
          name: string
          phone: string
          state: string
          updated_at?: string | null
          website?: string | null
          zip_code: string
        }
        Update: {
          address?: string
          admin_id?: string | null
          city?: string
          created_at?: string | null
          description?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
          state?: string
          updated_at?: string | null
          website?: string | null
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
          preferred_activities: string[] | null
          senior_center_id: string
          updated_at: string | null
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
          preferred_activities?: string[] | null
          senior_center_id: string
          updated_at?: string | null
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
          preferred_activities?: string[] | null
          senior_center_id?: string
          updated_at?: string | null
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
          availability: Json | null
          created_at: string | null
          grade_level: number | null
          id: string
          interests: string[] | null
          preferred_activities: string[] | null
          profile_id: string
          total_hours: number | null
          updated_at: string | null
        }
        Insert: {
          availability?: Json | null
          created_at?: string | null
          grade_level?: number | null
          id?: string
          interests?: string[] | null
          preferred_activities?: string[] | null
          profile_id: string
          total_hours?: number | null
          updated_at?: string | null
        }
        Update: {
          availability?: Json | null
          created_at?: string | null
          grade_level?: number | null
          id?: string
          interests?: string[] | null
          preferred_activities?: string[] | null
          profile_id?: string
          total_hours?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teen_volunteers_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      visits: {
        Row: {
          created_at: string | null
          duration_minutes: number | null
          id: string
          match_id: string
          notes: string | null
          scheduled_date: string
          senior_center_id: string
          senior_id: string
          status: Database["public"]["Enums"]["visit_status"] | null
          teen_volunteer_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          match_id: string
          notes?: string | null
          scheduled_date: string
          senior_center_id: string
          senior_id: string
          status?: Database["public"]["Enums"]["visit_status"] | null
          teen_volunteer_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          match_id?: string
          notes?: string | null
          scheduled_date?: string
          senior_center_id?: string
          senior_id?: string
          status?: Database["public"]["Enums"]["visit_status"] | null
          teen_volunteer_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visits_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visits_senior_center_id_fkey"
            columns: ["senior_center_id"]
            isOneToOne: false
            referencedRelation: "senior_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visits_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "seniors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visits_teen_volunteer_id_fkey"
            columns: ["teen_volunteer_id"]
            isOneToOne: false
            referencedRelation: "teen_volunteers"
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
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      approval_status: "pending" | "approved" | "rejected"
      user_role:
        | "teen_volunteer"
        | "senior_center_admin"
        | "teen_admin"
        | "family_member"
      visit_status: "scheduled" | "completed" | "cancelled" | "no_show"
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
        "senior_center_admin",
        "teen_admin",
        "family_member",
      ],
      visit_status: ["scheduled", "completed", "cancelled", "no_show"],
    },
  },
} as const
