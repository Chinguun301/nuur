"use server";

import { adminQuery } from "@/lib/supabase/server";

interface UserRow {
  role: string;
}

export async function checkAdminRole(
  userId: string,
): Promise<{ role: string | null; error?: string }> {
  try {
    const { data, error } = await adminQuery<UserRow[]>("users", {
      select: "role",
      id: `eq.${userId}`,
      limit: "1",
    });

    if (error) {
      return { role: null, error };
    }

    if (!data || data.length === 0) {
      return { role: null, error: "User record not found in public.users table" };
    }

    return { role: data[0].role };
  } catch (err) {
    console.error("checkAdminRole error:", err);
    return { role: null, error: err instanceof Error ? err.message : "Unknown error" };
  }
}
