"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Code2, Star, GitFork, Users } from "lucide-react";

export function StatsSection() {
  const t = useTranslations("StatsSection");

  const stats = [
    { icon: Code2, label: t("projects"), value: "50+" },
    { icon: Star, label: t("githubStars"), value: "2.5K" },
    { icon: GitFork, label: t("contributions"), value: "1.2K" },
    { icon: Users, label: t("clients"), value: "30+" },
  ];

  return (
    <section className="py-24 relative border-y border-border">
      <div className="absolute inset-0 gradient-mesh" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-foreground/5 mx-auto mb-4">
                <stat.icon className="h-6 w-6" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 + idx * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
