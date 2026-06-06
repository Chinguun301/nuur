"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Team Lead",
    position: "Front-End Team",
    company: "E Clinic LLC",
    feedback:
      "Delivered two complex mobile apps and a web dashboard with great attention to detail. Reliable and always meets deadlines.",
    rating: 5,
  },
  {
    name: "Classmate",
    position: "CS Department",
    company: "Shanghai University of Science and Technology",
    feedback:
      "A dedicated and hardworking team player. His ability to communicate in three languages made collaboration smooth and effective.",
    rating: 5,
  },
  {
    name: "Teammate",
    position: "Basketball Team",
    company: "Shanghai Mongolian Student Union",
    feedback:
      "Disciplined, adaptable, and always gives 100%. These qualities shine both in sports and in professional work.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const t = useTranslations("TestimonialsSection");

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bento-card relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-foreground/5" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-6 italic">
                &ldquo;{testimonial.feedback}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-medium text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.position}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
