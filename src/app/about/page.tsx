"use client";

import { motion } from "framer-motion";
import { Download, Calendar, MapPin, Award, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const timeline = [
  {
    year: "2024",
    title: "Senior Front-End Developer",
    company: "Tech Corp",
    type: "work",
    description:
      "Leading front-end architecture, implementing design systems, and mentoring team members.",
  },
  {
    year: "2023",
    title: "Front-End Developer",
    company: "Digital Agency",
    type: "work",
    description: "Built responsive web applications and led the migration to Next.js.",
  },
  {
    year: "2022",
    title: "M.Sc. Computer Science",
    company: "University of Technology",
    type: "education",
    description: "Specialized in Human-Computer Interaction and Web Technologies.",
  },
  {
    year: "2021",
    title: "AWS Certified Developer",
    company: "Amazon Web Services",
    type: "certification",
    description: "Associate level certification for cloud development.",
  },
  {
    year: "2020",
    title: "Junior Developer",
    company: "Startup Inc.",
    type: "work",
    description: "Started career building web applications with modern frameworks.",
  },
  {
    year: "2019",
    title: "B.Sc. Computer Science",
    company: "University of Technology",
    type: "education",
    description: "Graduated with honors. Focused on software engineering and web development.",
  },
];

const achievements = [
  { icon: Award, label: "Best Developer Award", value: "2024" },
  { icon: Award, label: "Outstanding Project", value: "2023" },
  { icon: Award, label: "Open Source Contributor", value: "2022" },
  { icon: Award, label: "Hackathon Winner", value: "2021" },
];

export default function AboutPage() {
  return (
    <div className="py-20">
      {/* Hero */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  Me
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I&apos;m a passionate Front-End Developer with 5+ years of experience building
                modern web applications. I specialize in React, Next.js, and creating delightful
                user experiences.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                My journey in tech started during college when I built my first website. Since then,
                I&apos;ve been obsessed with crafting beautiful, performant, and accessible web
                applications that make a real impact.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  5+ Years Experience
                </div>
              </div>
              <Button size="lg" className="rounded-full">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="relative">
                <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <div className="text-8xl font-bold text-foreground/10">JD</div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl -z-10 blur-2xl opacity-50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-foreground/5 mx-auto mb-3">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold">My Journey</h2>
            <p className="mt-2 text-muted-foreground">The path that shaped my career.</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border" />

            <div className="space-y-8">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-14"
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-1 w-[38px] h-[38px] rounded-full border border-border bg-background flex items-center justify-center">
                    {item.type === "work" ? (
                      <Briefcase className="h-4 w-4" />
                    ) : item.type === "education" ? (
                      <GraduationCap className="h-4 w-4" />
                    ) : (
                      <Award className="h-4 w-4" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary">{item.year}</span>
                      <Badge variant="outline" className="text-[10px] capitalize">
                        {item.type}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{item.company}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
