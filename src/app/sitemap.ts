import { MetadataRoute } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const locales = ["en", "mn"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const supabase = await createServerSupabaseClient();

  // Fetch published projects
  const { data: projects } = await supabase.from("projects").select("slug, updated_at");

  // Fetch published blogs
  const { data: blogs } = await supabase
    .from("blogs")
    .select("slug, updated_at")
    .eq("published", true);

  const staticRoutes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    staticRoutes.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/${locale}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/${locale}/projects`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/${locale}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
    );
  }

  // Dynamic project routes (for each locale)
  const projectRoutes: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const project of projects || []) {
      projectRoutes.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: new Date(project.updated_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  // Dynamic blog routes (for each locale)
  const blogRoutes: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const blog of blogs || []) {
      blogRoutes.push({
        url: `${baseUrl}/${locale}/blog/${blog.slug}`,
        lastModified: new Date(blog.updated_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
