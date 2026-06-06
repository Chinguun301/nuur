"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

const projects = [
  {
    title: "E-Clinic Mobile App",
    description:
      "Cross-platform healthcare mobile application built with Flutter for iOS and Android. Features multi-role access for Admins, Doctors, and Patients.",
    image: "/images/project-1.jpg",
    technologies: ["Flutter", "Dart", "iOS", "Android"],
    category: "Mobile",
    slug: "eclinic-mobile",
    github: "#",
    demo: "#",
  },
  {
    title: "E-Clinic Web Dashboard",
    description:
      "Admin and management dashboard built with Vue.js. Includes role-based access control, analytics, and patient management features.",
    image: "/images/project-2.jpg",
    technologies: ["Vue.js", "JavaScript", "Vuex", "REST APIs"],
    category: "Web",
    slug: "eclinic-dashboard",
    github: "#",
    demo: "#",
  },
  {
    title: "Personal Portfolio",
    description:
      "Modern portfolio website built with Next.js 16, featuring bilingual support (English & Mongolian), dark mode, and smooth animations.",
    image: "/images/project-3.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Web",
    slug: "portfolio",
    github: "#",
    demo: "#",
  },
];

export function FeaturedProjects() {
  const t = useTranslations("FeaturedProjects");

  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("title")}</h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl">{t("description")}</p>
          </div>
          <Button variant="outline" className="rounded-full shrink-0" asChild>
            <Link href="/projects">
              {t("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bento-card overflow-hidden"
            >
              {/* Image placeholder */}
              <div className="relative h-48 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-4 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold text-foreground/10">
                    {project.title.charAt(0)}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all">
                    {project.title}
                  </h3>
                  <div className="flex gap-1.5 shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-accent transition-colors"
                      aria-label="View source code"
                    >
                      <GitBranch className="h-4 w-4" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-accent transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-foreground transition-colors pt-1"
                >
                  {t("viewCaseStudy")}
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
