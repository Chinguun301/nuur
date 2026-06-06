"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, ArrowUpDown, ExternalLink, GitBranch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

const allProjects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-featured e-commerce platform with real-time inventory and payment processing.",
    slug: "ecommerce-platform",
    category: "Full Stack",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    image: null,
    github: "#",
    demo: "#",
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat with AI-powered responses and image generation.",
    slug: "ai-chat-app",
    category: "AI",
    technologies: ["React", "OpenAI", "WebSocket", "Redis"],
    image: null,
    github: "#",
    demo: "#",
  },
  {
    title: "Design System Library",
    description: "50+ accessible, themeable UI components with documentation.",
    slug: "design-system",
    category: "Library",
    technologies: ["React", "Storybook", "CSS Variables", "TypeScript"],
    image: null,
    github: "#",
    demo: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with interactive charts and reports.",
    slug: "analytics-dashboard",
    category: "Full Stack",
    technologies: ["Next.js", "D3.js", "Supabase", "TypeScript"],
    image: null,
    github: "#",
    demo: "#",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with Kanban boards.",
    slug: "task-management",
    category: "Full Stack",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    image: null,
    github: "#",
    demo: "#",
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio with dynamic content management.",
    slug: "portfolio-website",
    category: "Frontend",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    image: null,
    github: "#",
    demo: "#",
  },
];

const categories = ["All", "Full Stack", "Frontend", "AI", "Library"];

export default function ProjectsPage() {
  const t = useTranslations("ProjectsPage");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const filtered = allProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{t("title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("description")}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortBy(sortBy === "newest" ? "oldest" : "newest")}
            className="shrink-0"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-accent text-accent-foreground hover:bg-accent/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bento-card group"
            >
              <div className="h-40 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-foreground/10">
                  {project.title.charAt(0)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500">
                    {project.title}
                  </h3>
                  <div className="flex gap-1.5 shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-accent"
                      aria-label="Source code"
                    >
                      <GitBranch className="h-4 w-4" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-accent"
                      aria-label="Live demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center text-sm font-medium text-primary pt-1"
                >
                  {t("viewCaseStudy")} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{t("noResults")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
