"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

// This would come from Supabase in production
const blogPost = {
  title: "Building Performant React Applications",
  slug: "building-performant-react-apps",
  content: `
## Introduction

Performance is crucial for modern web applications. Users expect fast, responsive experiences, and search engines reward well-performing sites with better rankings.

## Why Performance Matters

Research shows that:
- 53% of mobile users abandon sites that take longer than 3 seconds to load
- A 1-second delay in page response can result in a 7% reduction in conversions
- 47% of consumers expect a web page to load in 2 seconds or less

## Key Strategies

### 1. Code Splitting

Code splitting allows you to split your application into smaller chunks that are loaded on demand. This significantly reduces the initial bundle size.

### 2. Image Optimization

Images are often the largest assets on a page. Using modern formats like WebP, implementing lazy loading, and using responsive images can dramatically improve performance.

### 3. Caching Strategy

Implementing proper caching strategies for both static and dynamic content reduces server load and improves response times.

### 4. Bundle Analysis

Regularly analyze your bundle to identify large dependencies that could be optimized or replaced with lighter alternatives.

## Conclusion

Performance optimization is an ongoing process. By implementing these strategies and regularly monitoring your application's performance, you can ensure a fast, responsive experience for your users.
  `,
  date: "Jan 15, 2025",
  readTime: "5 min read",
  category: "React",
  tags: ["React", "Performance", "Optimization"],
  author: {
    name: "John Doe",
    avatar: "JD",
  },
};

const relatedPosts = [
  {
    title: "The Future of CSS: What's New in 2025",
    slug: "future-of-css-2025",
    category: "CSS",
    readTime: "4 min read",
  },
  {
    title: "Mastering TypeScript: Advanced Patterns",
    slug: "mastering-typescript-patterns",
    category: "TypeScript",
    readTime: "7 min read",
  },
];

export default function BlogDetailPage() {
  const t = useTranslations("BlogPage");
  const [readingProgress, setReadingProgress] = useState(0);
  const [liked, setLiked] = useState(false);

  const post = blogPost;

  if (!post) {
    notFound();
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="reading-progress" style={{ width: `${readingProgress}%` }} />

      <div className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("title")}
              </Link>
            </Button>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{post.category}</Badge>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-medium text-white">
                  {post.author.avatar}
                </div>
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </div>
            </div>

            {/* Cover Image */}
            <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-border mb-12 flex items-center justify-center">
              <span className="text-6xl font-bold text-foreground/5">{post.title.charAt(0)}</span>
            </div>
          </motion.article>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-neutral dark:prose-invert max-w-none mb-12"
          >
            <section>
              <h2>Introduction</h2>
              <p>
                Performance is crucial for modern web applications. Users expect fast, responsive
                experiences, and search engines reward well-performing sites with better rankings.
              </p>
            </section>

            <section>
              <h2>Why Performance Matters</h2>
              <p>Research shows that:</p>
              <ul>
                <li>53% of mobile users abandon sites that take longer than 3 seconds to load</li>
                <li>
                  A 1-second delay in page response can result in a 7% reduction in conversions
                </li>
                <li>47% of consumers expect a web page to load in 2 seconds or less</li>
              </ul>
            </section>

            <section>
              <h2>Key Strategies</h2>

              <h3>1. Code Splitting</h3>
              <p>
                Code splitting allows you to split your application into smaller chunks that are
                loaded on demand. This significantly reduces the initial bundle size.
              </p>

              <h3>2. Image Optimization</h3>
              <p>
                Images are often the largest assets on a page. Using modern formats like WebP,
                implementing lazy loading, and using responsive images can dramatically improve
                performance.
              </p>

              <h3>3. Caching Strategy</h3>
              <p>
                Implementing proper caching strategies for both static and dynamic content reduces
                server load and improves response times.
              </p>

              <pre>
                <code className="language-javascript">
                  {`// Example: Dynamic import for code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
});`}
                </code>
              </pre>

              <h3>4. Bundle Analysis</h3>
              <p>
                Regularly analyze your bundle to identify large dependencies that could be optimized
                or replaced with lighter alternatives.
              </p>
            </section>

            <section>
              <h2>Conclusion</h2>
              <p>
                Performance optimization is an ongoing process. By implementing these strategies and
                regularly monitoring your application&apos;s performance, you can ensure a fast,
                responsive experience for your users.
              </p>
            </section>
          </motion.div>

          {/* Reactions & Share */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between py-6 border-y border-border mb-8"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  liked ? "text-red-500" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-red-500" : ""}`} />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>Comment</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Bookmark className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-1.5" />
              Share
            </Button>
          </motion.div>

          {/* Related Posts */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="bento-card group"
                >
                  <Badge variant="secondary" className="text-xs mb-2">
                    {related.category}
                  </Badge>
                  <h3 className="font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all">
                    {related.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{related.readTime}</p>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Back to blog */}
          <div className="mt-12 text-center">
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("title")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
