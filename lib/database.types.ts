export type Database = {
  public: {
    Tables: {
      ephemerides: {
        Row: {
          id: number
          date: string
          year: number
          title: string
          description: string
          category: "language" | "hardware" | "software" | "internet" | "person" | "company"
          created_at: string
        }
        Insert: {
          id?: number
          date: string
          year: number
          title: string
          description: string
          category: "language" | "hardware" | "software" | "internet" | "person" | "company"
          created_at?: string
        }
        Update: {
          id?: number
          date?: string
          year?: number
          title?: string
          description?: string
          category?: "language" | "hardware" | "software" | "internet" | "person" | "company"
          created_at?: string
        }
      }
    }
  }
}
