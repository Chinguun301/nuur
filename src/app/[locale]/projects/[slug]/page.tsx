"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  Calendar,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

// This would come from Supabase in production
const projectData = {
  title: "E-Clinic Mobile App",
  slug: "eclinic-mobile",
  description:
    "Cross-platform healthcare mobile application built with Flutter for iOS and Android. Features multi-role access for Admins, Doctors, and Patients.",
  content: `## Overview
A comprehensive healthcare mobile application built with Flutter, serving patients, doctors, and administrators. The app features appointment management, communication tools, and role-based access control.

## Problem Statement
Healthcare facilities needed a modern digital solution to streamline patient management, appointment scheduling, and doctor-patient communication. The existing system was outdated and inefficient.

## Project Goals
- Build cross-platform apps for iOS and Android
- Implement multi-role access (Admin, Sub Admin, Client, Doctor)
- Create an admin web dashboard with Vue.js
- Ensure data security and privacy compliance

## Technical Architecture
Flutter for cross-platform mobile development, Vue.js for the web dashboard, and REST APIs for backend communication. State management handled by Vuex on the web side.

## Results
- Successfully delivered two mobile apps and a web dashboard
- Multi-role system with granular permissions
- Streamlined patient-doctor communication`,
  technologies: ["Flutter", "Dart", "Vue.js", "JavaScript", "REST APIs"],
  category: "Mobile",
  github: "#",
  demo: "#",
  date: "2025-2026",
  metrics: {
    Platforms: "iOS & Android",
    "User Roles": "4",
    Tech: "Flutter + Vue.js",
    Duration: "1 Year",
  },
  challenges: [
    "Building for both iOS and Android with a single codebase",
    "Implementing complex multi-role access control system",
    "Integrating with existing backend APIs",
  ],
  solutions: [
    "Used Flutter for true cross-platform development",
    "Designed a scalable role-based permission system",
    "Developed REST API integration layer with error handling",
  ],
  lessons: [
    "Flutter is excellent for cross-platform production apps",
    "Well-defined user roles simplify complex features",
    "Testing on real devices is essential for mobile apps",
  ],
};

export default function ProjectDetailPage() {
  const t = useTranslations("ProjectsPage");
  // In production, fetch from Supabase using params.slug
  const project = projectData;

  if (!project) {
    notFound();
  }

  return (
    <div className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" size="sm" asChild>
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("title")}
            </Link>
          </Button>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge>{project.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {project.date}
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{project.title}</h1>

          <p className="text-lg text-muted-foreground mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                Live Demo
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                Source Code
                <GitBranch className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Header Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-border flex items-center justify-center">
            <span className="text-6xl font-bold text-foreground/5">{project.title.charAt(0)}</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="bento-card text-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  {value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{key}</div>
              </div>
            ))}
          </div>

          {/* Markdown content rendered as sections */}
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
            <section>
              <h2>Overview</h2>
              <p>
                A comprehensive e-commerce solution built with modern web technologies. The platform
                supports multiple vendors, real-time inventory management, and seamless payment
                processing.
              </p>
            </section>

            <section>
              <h2>Problem Statement</h2>
              <p>
                Traditional e-commerce platforms are often slow, bloated, and provide poor user
                experiences. Our goal was to build a lightning-fast, intuitive shopping experience
                that converts visitors into customers.
              </p>
            </section>

            <section>
              <h2>Technical Architecture</h2>
              <p>
                The application follows a microservices architecture with Next.js on the frontend,
                Node.js microservices, and PostgreSQL for data persistence.
              </p>
            </section>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Challenges</h2>
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs text-destructive font-bold">!</span>
                    </span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Solutions</h2>
              <ul className="space-y-3">
                {project.solutions.map((solution, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lessons Learned */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Lessons Learned</h2>
            <div className="space-y-4">
              {project.lessons.map((lesson, i) => (
                <div key={i} className="bento-card flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">{lesson}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-border">
            <Button variant="ghost" asChild>
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("title")}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
