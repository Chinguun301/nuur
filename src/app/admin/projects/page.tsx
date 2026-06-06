"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, ExternalLink, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    category: "Full Stack",
    featured: true,
    status: "completed",
    createdAt: "2024-12-01",
  },
  {
    id: "2",
    title: "AI Chat Application",
    slug: "ai-chat-app",
    category: "AI",
    featured: true,
    status: "completed",
    createdAt: "2024-11-15",
  },
  {
    id: "3",
    title: "Design System Library",
    slug: "design-system",
    category: "Library",
    featured: false,
    status: "completed",
    createdAt: "2024-10-20",
  },
];

export default function AdminProjectsPage() {
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your portfolio projects.</p>
        </div>
        <Button className="rounded-full" asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Title
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Featured
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Created
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((project, idx) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-xs font-medium">
                        {project.title.charAt(0)}
                      </div>
                      <span className="text-sm font-medium">{project.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={project.status === "completed" ? "success" : "warning"}
                      className="text-xs capitalize"
                    >
                      {project.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {project.featured ? (
                      <Badge variant="default" className="text-xs">
                        Featured
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{project.createdAt}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
