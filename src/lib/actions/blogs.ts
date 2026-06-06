"use server";

import { createAdminClient, createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { slugify, getReadingTime } from "@/lib/utils";

export async function getBlogs(published?: boolean) {
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("blogs").select("*").order("created_at", { ascending: false });

  if (published !== undefined) {
    query = query.eq("published", published);
  }

  const { data } = await query;
  return data || [];
}

export async function getBlogBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("blogs").select("*").eq("slug", slug).single();
  return data;
}

export async function createBlog(formData: FormData) {
  const supabase = await createAdminClient();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const tags = (formData.get("tags") as string).split(",").map((t) => t.trim());
  const published = formData.get("published") === "true";

  const slug = slugify(title);
  const reading_time = getReadingTime(content);

  const { error } = await supabase
    .from("blogs")
    .insert({ title, slug, content, category, tags, reading_time, published });

  if (error) throw new Error(error.message);
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
}

export async function updateBlog(id: string, formData: FormData) {
  const supabase = await createAdminClient();
  const data: Record<string, unknown> = {};

  const fields = ["title", "content", "category", "cover_image"];
  for (const field of fields) {
    const value = formData.get(field);
    if (value) data[field] = value;
  }

  const tags = formData.get("tags");
  if (tags) data.tags = (tags as string).split(",").map((t) => t.trim());

  const published = formData.get("published");
  if (published !== null) data.published = published === "true";

  if (data.title) {
    data.slug = slugify(data.title as string);
    data.reading_time = getReadingTime((data.content as string) || "");
  }

  const { error } = await supabase.from("blogs").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
}

export async function deleteBlog(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
}
