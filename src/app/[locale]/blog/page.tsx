"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

const blogPosts = [
  {
    title: "Building Cross-Platform Apps with Flutter",
    description:
      "My experience building two production mobile apps for iOS and Android using Flutter.",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    category: "Flutter",
    slug: "building-flutter-apps",
    tags: ["Flutter", "Mobile", "Dart"],
  },
  {
    title: "Studying Computer Science in Shanghai",
    description: "My journey from Mongolia to Shanghai University of Science and Technology.",
    date: "Dec 20, 2024",
    readTime: "4 min read",
    category: "Life",
    slug: "studying-in-shanghai",
    tags: ["Study Abroad", "China", "CS"],
  },
  {
    title: "Building a Bilingual Portfolio with Next.js",
    description:
      "How I built this portfolio with full English and Mongolian support using Next.js 16.",
    date: "Dec 5, 2024",
    readTime: "7 min read",
    category: "Next.js",
    slug: "bilingual-portfolio-nextjs",
    tags: ["Next.js", "i18n", "TypeScript"],
  },
  {
    title: "Basketball and Coding: Lessons from Sports",
    description:
      "How being a competitive basketball player taught me discipline, teamwork, and persistence.",
    date: "Nov 18, 2024",
    readTime: "6 min read",
    category: "Life",
    slug: "basketball-coding-lessons",
    tags: ["Life", "Sports", "Mindset"],
  },
  {
    title: "Learning Chinese as a Developer",
    description: "My journey to HSK 5 and why language skills matter in tech.",
    date: "Nov 10, 2024",
    readTime: "8 min read",
    category: "Language",
    slug: "learning-chinese-developer",
    tags: ["Chinese", "HSK", "Language"],
  },
  {
    title: "Vue.js vs Next.js: My Take",
    description:
      "Comparing my experience building with Vue.js vs Next.js across different projects.",
    date: "Oct 25, 2024",
    readTime: "6 min read",
    category: "Web",
    slug: "vuejs-vs-nextjs",
    tags: ["Vue.js", "Next.js", "Comparison"],
  },
];

const categories = ["All", "Flutter", "Next.js", "Life", "Web"];

export default function BlogPage() {
  const t = useTranslations("BlogPage");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
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
          <p className="text-lg text-muted-foreground max-w-2xl">{t("description")}</p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link href={`/blog/${post.slug}`} className="block bento-card group h-full">
                <div className="flex flex-col h-full">
                  {/* Cover placeholder */}
                  <div className="h-40 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-foreground/10">
                      {post.title.charAt(0)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
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

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{t("noResults")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
