"use server";

import { createAdminClient, createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitContact(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  const { error } = await supabase.from("contacts").insert({
    name,
    email,
    subject,
    message,
  });

  if (error) throw new Error(error.message);
}

export async function getContacts() {
  const supabase = await createAdminClient();
  const { data } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return data || [];
}

export async function updateContactStatus(id: string, status: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("contacts").update({ status }).eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/contacts");
}

export async function deleteContact(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("contacts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/contacts");
}
