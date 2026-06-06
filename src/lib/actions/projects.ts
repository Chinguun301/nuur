"use server";

import { createServerSupabaseClient, createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

export async function getProjects(featured?: boolean) {
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("projects").select("*").order("created_at", { ascending: false });

  if (featured !== undefined) {
    query = query.eq("featured", featured);
  }

  const { data } = await query;
  return data || [];
}

export async function getProjectBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("projects").select("*").eq("slug", slug).single();
  return data;
}

export async function createProject(formData: FormData) {
  const supabase = await createAdminClient();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const technologies = (formData.get("technologies") as string).split(",").map((t) => t.trim());
  const github_url = formData.get("github_url") as string;
  const demo_url = formData.get("demo_url") as string;
  const featured = formData.get("featured") === "true";

  const slug = slugify(title);

  const { error } = await supabase.from("projects").insert({
    title,
    slug,
    description,
    content,
    category,
    technologies,
    github_url,
    demo_url,
    featured,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createAdminClient();
  const data: Record<string, unknown> = {};

  const fields = ["title", "description", "content", "category", "github_url", "demo_url"];
  for (const field of fields) {
    const value = formData.get(field);
    if (value) data[field] = value;
  }

  const technologies = formData.get("technologies");
  if (technologies) {
    data.technologies = (technologies as string).split(",").map((t: string) => t.trim());
  }

  const featured = formData.get("featured");
  if (featured !== null) data.featured = featured === "true";

  if (data.title) {
    data.slug = slugify(data.title as string);
  }

  const { error } = await supabase.from("projects").update(data).eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}
