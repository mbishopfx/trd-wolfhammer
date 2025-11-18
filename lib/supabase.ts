import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

// Client for public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client with service role key
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Database types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  urgency?: string;
  problem_type?: string;
  location_in_home?: string;
  contact_preference: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
  priority: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
  contacted_at?: string;
  completed_at?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source: string;
  status: string;
  created_at: string;
}

export interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  source?: string;
  details?: any;
  created_at: string;
}

