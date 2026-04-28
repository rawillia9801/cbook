export const SUPABASE_CONFIG = {
 url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
 key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
};

export function getSupabaseReady(){
 return SUPABASE_CONFIG.url && SUPABASE_CONFIG.key;
}