import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type CookieOptions } from "@supabase/ssr";

export async function getCookie(name: string) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value;
}

export async function setCookie(name: string, value: string, options: CookieOptions) {
  const cookieStore = await cookies();
  cookieStore.set({ name, value, ...options });
}

export async function removeCookie(name: string, options: CookieOptions) {
  const cookieStore = await cookies();
  cookieStore.set({ name, value: '', ...options });
}

export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: getCookie,
        set: setCookie,
        remove: removeCookie,
      },
    }
  );
}