"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Front-End Developer (Flutter)",
    company: "E Clinic LLC",
    period: "Mar 2025 - May 2026",
    description:
      "Built two mobile apps (iOS & Android) using Flutter and a web dashboard with Vue.js. Implemented multi-role system with Admin, Sub Admin, Client, and Doctor access levels.",
    technologies: ["Flutter", "Dart", "Vue.js", "JavaScript"],
  },
  {
    title: "Intern",
    company: "Shanghai Qike Information Technology Co., Ltd.",
    period: "2023 - 2024",
    description:
      "Participated in daily operations, document processing and information aggregation. Developed teamwork skills and gained professional experience in a tech environment.",
    technologies: ["Office Suite", "Document Processing", "Data Entry"],
  },
  {
    title: "B.Sc. Computer Science",
    company: "Shanghai University of Science and Technology",
    period: "2020 - 2024",
    description:
      "Earned a Bachelor's degree in Computer Science with a 3.3 GPA. Studied in Shanghai, China with coursework in software engineering, algorithms, and web development.",
    technologies: ["Computer Science", "Algorithms", "Python", "Java"],
  },
];

export function ExperienceHighlights() {
  const t = useTranslations("ExperienceHighlights");

  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("title")}</h2>
          <p className="mt-4 text-muted-foreground text-lg">{t("description")}</p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-1 w-9 h-9 rounded-full bg-foreground/5 border border-border flex items-center justify-center -translate-x-1/2">
                  <Briefcase className="h-4 w-4" />
                </div>

                <div className="bento-card">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-primary mb-3">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-foreground/5 text-foreground/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
