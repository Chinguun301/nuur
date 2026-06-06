"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const pages = [
  { route: "/", title: "Home" },
  { route: "/about", title: "About" },
  { route: "/projects", title: "Projects" },
  { route: "/blog", title: "Blog" },
  { route: "/contact", title: "Contact" },
];

export default function AdminSEOPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SEO Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage meta titles, descriptions, and Open Graph data.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="rounded-full">
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save All"}
        </Button>
      </div>

      <div className="space-y-4">
        {pages.map((page, idx) => (
          <motion.div
            key={page.route}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-2xl border border-border bg-card p-6 space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="px-2 py-0.5 rounded-md bg-foreground/5 text-xs font-mono">
                {page.route}
              </div>
              <h3 className="text-sm font-semibold">{page.title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium">Meta Title</label>
                <Input placeholder={`${page.title} | Portfolio`} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">Meta Description</label>
                <Input placeholder="Description for search engines..." />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium">Keywords (comma separated)</label>
              <Input placeholder="frontend, developer, portfolio" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium">OG Image URL</label>
              <Input placeholder="/images/og-default.jpg" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
