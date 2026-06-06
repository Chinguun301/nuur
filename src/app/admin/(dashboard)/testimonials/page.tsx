"use client";

import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    id: "1",
    name: "Jane Smith",
    position: "CTO",
    company: "Tech Corp",
    feedback: "An exceptional developer...",
    rating: 5,
    featured: true,
  },
  {
    id: "2",
    name: "Mike Johnson",
    position: "Product Manager",
    company: "Digital Agency",
    feedback: "One of the best...",
    rating: 5,
    featured: true,
  },
  {
    id: "3",
    name: "Sarah Williams",
    position: "Founder",
    company: "Startup Inc.",
    feedback: "Transformed our interface...",
    rating: 5,
    featured: false,
  },
];

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage client testimonials.</p>
        </div>
        <Button className="rounded-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-2xl border border-border bg-card p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-medium text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.position}, {t.company}
                  </div>
                </div>
              </div>
              {t.featured && <Badge className="text-xs">Featured</Badge>}
            </div>

            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
              ))}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">&ldquo;{t.feedback}&rdquo;</p>

            <div className="flex items-center gap-1 pt-2 border-t border-border">
              <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground">
                <Edit className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
