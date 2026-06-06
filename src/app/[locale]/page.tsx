import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ExperienceHighlights } from "@/components/sections/experience-highlights";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { BlogPreview } from "@/components/sections/blog-preview";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <FeaturedProjects />
      <ExperienceHighlights />
      <StatsSection />
      <TestimonialsSection />
      <BlogPreview />
      <ContactCTA />
    </>
  );
}
