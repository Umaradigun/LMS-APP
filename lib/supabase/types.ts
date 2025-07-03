export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'STUDENT' | 'TEACHER' | 'ADMIN';
          avatar: string | null;
          status: 'ACTIVE' | 'BANNED' | 'PENDING';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?: 'STUDENT' | 'TEACHER' | 'ADMIN';
          avatar?: string | null;
          status?: 'ACTIVE' | 'BANNED' | 'PENDING';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'STUDENT' | 'TEACHER' | 'ADMIN';
          avatar?: string | null;
          status?: 'ACTIVE' | 'BANNED' | 'PENDING';
          created_at?: string;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          price: number;
          currency: string;
          category: string;
          thumbnail: string | null;
          created_by: string;
          status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          price?: number;
          currency?: string;
          category: string;
          thumbnail?: string | null;
          created_by: string;
          status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          price?: number;
          currency?: string;
          category?: string;
          thumbnail?: string | null;
          created_by?: string;
          status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
          created_at?: string;
          updated_at?: string;
        };
      };
      modules: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          description: string | null;
          order_num: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          description?: string | null;
          order_num: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          description?: string | null;
          order_num?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          title: string;
          type: 'VIDEO' | 'TEXT' | 'PDF' | 'AUDIO';
          content_url: string | null;
          content: string | null;
          duration: number | null;
          order_num: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          module_id: string;
          title: string;
          type: 'VIDEO' | 'TEXT' | 'PDF' | 'AUDIO';
          content_url?: string | null;
          content?: string | null;
          duration?: number | null;
          order_num: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          module_id?: string;
          title?: string;
          type?: 'VIDEO' | 'TEXT' | 'PDF' | 'AUDIO';
          content_url?: string | null;
          content?: string | null;
          duration?: number | null;
          order_num?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          enrolled_at: string;
          completed_at: string | null;
          status: 'ACTIVE' | 'COMPLETED' | 'DROPPED';
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          enrolled_at?: string;
          completed_at?: string | null;
          status?: 'ACTIVE' | 'COMPLETED' | 'DROPPED';
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          enrolled_at?: string;
          completed_at?: string | null;
          status?: 'ACTIVE' | 'COMPLETED' | 'DROPPED';
        };
      };
      progress: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          lesson_id: string | null;
          percent_completed: number;
          last_accessed_at: string;
          time_spent: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          lesson_id?: string | null;
          percent_completed?: number;
          last_accessed_at?: string;
          time_spent?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          lesson_id?: string | null;
          percent_completed?: number;
          last_accessed_at?: string;
          time_spent?: number;
        };
      };
      quizzes: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          description: string | null;
          duration: number;
          total_marks: number;
          passing_marks: number;
          max_attempts: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          description?: string | null;
          duration: number;
          total_marks: number;
          passing_marks: number;
          max_attempts?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          description?: string | null;
          duration?: number;
          total_marks?: number;
          passing_marks?: number;
          max_attempts?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      questions: {
        Row: {
          id: string;
          quiz_id: string;
          question_text: string;
          type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'ESSAY' | 'FILL_BLANK';
          options: string[] | null;
          correct_answer: string;
          marks: number;
          order_num: number;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          question_text: string;
          type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'ESSAY' | 'FILL_BLANK';
          options?: string[] | null;
          correct_answer: string;
          marks: number;
          order_num: number;
        };
        Update: {
          id?: string;
          quiz_id?: string;
          question_text?: string;
          type?: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'ESSAY' | 'FILL_BLANK';
          options?: string[] | null;
          correct_answer?: string;
          marks?: number;
          order_num?: number;
        };
      };
      quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          quiz_id: string;
          answers: Record<string, string>;
          score: number;
          started_at: string;
          completed_at: string | null;
          time_spent: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          quiz_id: string;
          answers: Record<string, string>;
          score: number;
          started_at?: string;
          completed_at?: string | null;
          time_spent: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          quiz_id?: string;
          answers?: Record<string, string>;
          score?: number;
          started_at?: string;
          completed_at?: string | null;
          time_spent?: number;
        };
      };
      assignments: {
        Row: {
          id: string;
          lesson_id: string;
          title: string;
          instructions: string;
          due_date: string | null;
          max_marks: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          title: string;
          instructions: string;
          due_date?: string | null;
          max_marks: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          title?: string;
          instructions?: string;
          due_date?: string | null;
          max_marks?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      submissions: {
        Row: {
          id: string;
          user_id: string;
          assignment_id: string;
          file_url: string | null;
          content: string | null;
          submitted_at: string;
          score: number | null;
          feedback: string | null;
          graded_at: string | null;
          graded_by: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          assignment_id: string;
          file_url?: string | null;
          content?: string | null;
          submitted_at?: string;
          score?: number | null;
          feedback?: string | null;
          graded_at?: string | null;
          graded_by?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          assignment_id?: string;
          file_url?: string | null;
          content?: string | null;
          submitted_at?: string;
          score?: number | null;
          feedback?: string | null;
          graded_at?: string | null;
          graded_by?: string | null;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          amount: number;
          currency: string;
          status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
          gateway: 'STRIPE' | 'PAYSTACK' | 'FLUTTERWAVE';
          gateway_reference: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          amount: number;
          currency: string;
          status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
          gateway: 'STRIPE' | 'PAYSTACK' | 'FLUTTERWAVE';
          gateway_reference: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          amount?: number;
          currency?: string;
          status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
          gateway?: 'STRIPE' | 'PAYSTACK' | 'FLUTTERWAVE';
          gateway_reference?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: 'COURSE_UPDATE' | 'ASSIGNMENT_DUE' | 'QUIZ_AVAILABLE' | 'MESSAGE' | 'SYSTEM';
          title: string;
          message: string;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'COURSE_UPDATE' | 'ASSIGNMENT_DUE' | 'QUIZ_AVAILABLE' | 'MESSAGE' | 'SYSTEM';
          title: string;
          message: string;
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'COURSE_UPDATE' | 'ASSIGNMENT_DUE' | 'QUIZ_AVAILABLE' | 'MESSAGE' | 'SYSTEM';
          title?: string;
          message?: string;
          read_at?: string | null;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          course_id: string | null;
          subject: string;
          content: string;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          course_id?: string | null;
          subject: string;
          content: string;
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          receiver_id?: string;
          course_id?: string | null;
          subject?: string;
          content?: string;
          read_at?: string | null;
          created_at?: string;
        };
      };
      admin_settings: {
        Row: {
          key: string;
          value: string;
          description: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: string;
          description?: string | null;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: string;
          description?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}