import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vabndvvzlbfzlccrpwcc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_F3TRJrxs_Z1hVnBzvvr_KQ_9xHeRszW';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AppRelease {
  id: string;
  latest_version: string;
  min_required_version: string;
  title: string;
  release_notes: string;
  download_url: string;
  is_active: boolean;
  created_at: string;
}

export async function fetchLatestRelease(): Promise<AppRelease | null> {
  try {
    const { data, error } = await supabase
      .from('app_versions')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn('[Supabase] Could not fetch latest release:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('[Supabase] Network exception:', err);
    return null;
  }
}
