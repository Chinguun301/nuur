"use server";

import { createAdminClient, createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getSkills() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  return data || [];
}

export async function createSkill(formData: FormData) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("skills").insert({
    name: formData.get("name"),
    category: formData.get("category"),
    icon: formData.get("icon") || "Code2",
    level: parseInt(formData.get("level") as string) || 50,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  const supabase = await createAdminClient();
  const data: Record<string, unknown> = {};
  const fields = ["name", "category", "icon"];
  for (const field of fields) {
    const value = formData.get(field);
    if (value) data[field] = value;
  }
  const level = formData.get("level");
  if (level) data.level = parseInt(level as string);

  const { error } = await supabase.from("skills").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/skills");
}

export async function deleteSkill(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/skills");
}
