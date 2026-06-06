"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Download, Calendar, MapPin, Award, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const timeline = [
  {
    year: "2025",
    title: "Front-End Developer (Flutter)",
    company: "E Clinic LLC",
    type: "work",
    description:
      "Built two mobile apps (iOS & Android) using Flutter and a web dashboard with Vue.js. System featured Admin, Sub Admin, Client, and Doctor roles.",
  },
  {
    year: "2023",
    title: "Internship",
    company: "Shanghai Qike Information Technology Co., Ltd.",
    type: "work",
    description:
      "Gained hands-on experience in daily operations, document processing, and information aggregation. Developed teamwork and professional skills.",
  },
  {
    year: "2020",
    title: "B.Sc. Computer Science",
    company: "Shanghai University of Science and Technology",
    type: "education",
    description:
      "Bachelor's degree in Computer Science with a 3.3 GPA. Specialized in software engineering in Shanghai, China.",
  },
  {
    year: "2019",
    title: "International Program",
    company: "East China University of Science and Technology",
    type: "education",
    description: "Specialized program in Shanghai, China. Achieved top grades (GPA: A).",
  },
  {
    year: "2018",
    title: "Chinese Language Program",
    company: "University of Political Science and Law, Shanghai",
    type: "education",
    description: "Intensive Chinese language preparation program. Achieved top grades (GPA: A).",
  },
  {
    year: "2007",
    title: "Secondary Education (Math Focus)",
    company: "Leading Laboratory 1st School, Mongolia",
    type: "education",
    description:
      "Advanced mathematics program at Mongolia's top secondary school. Active in sports and olympiads.",
  },
];

const achievements = [
  { icon: Award, label: "Basketball Gold Medal", value: "2024" },
  { icon: Award, label: "HSK Level 5", value: "Chinese" },
  { icon: Award, label: "Math Olympiad Silver", value: "2015" },
  { icon: Award, label: "Basketball Champion", value: "2016-18" },
];

export default function AboutPage() {
  const t = useTranslations("AboutPage");

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
                {t("title")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  {t("titleAccent")}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("description")}
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t("description2")}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {t("location")}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {t("experience")}
                </div>
              </div>
              <Button size="lg" className="rounded-full">
                <Download className="mr-2 h-4 w-4" />
                {t("downloadResume")}
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
                  <div className="text-8xl font-bold text-foreground/10">Ч</div>
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
            <h2 className="text-3xl font-bold">{t("journeyTitle")}</h2>
            <p className="mt-2 text-muted-foreground">{t("journeyDescription")}</p>
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
