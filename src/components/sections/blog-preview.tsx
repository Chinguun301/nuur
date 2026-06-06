"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

const posts = [
  {
    title: "Building Cross-Platform Apps with Flutter",
    description:
      "My experience building two production mobile apps for iOS and Android using Flutter. Lessons learned and best practices.",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    category: "Flutter",
    slug: "building-flutter-apps",
    tags: ["Flutter", "Mobile", "Dart"],
  },
  {
    title: "Studying Computer Science in Shanghai",
    description:
      "My journey from Mongolia to Shanghai University of Science and Technology. Life lessons from studying abroad.",
    date: "Dec 20, 2024",
    readTime: "4 min read",
    category: "Life",
    slug: "studying-in-shanghai",
    tags: ["Study Abroad", "China", "CS"],
  },
  {
    title: "Building a Bilingual Portfolio with Next.js",
    description:
      "How I built this portfolio with full English and Mongolian support using Next.js 16 and next-intl.",
    date: "Dec 5, 2024",
    readTime: "7 min read",
    category: "Next.js",
    slug: "bilingual-portfolio-nextjs",
    tags: ["Next.js", "i18n", "TypeScript"],
  },
];

export function BlogPreview() {
  const t = useTranslations("BlogPreview");

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
            <p className="mt-4 text-muted-foreground text-lg">{t("description")}</p>
          </div>
          <Button variant="outline" className="rounded-full shrink-0" asChild>
            <Link href="/blog">
              {t("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="block bento-card group h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">
                    {post.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-auto">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
