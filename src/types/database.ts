export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  images: string[];
  video?: string;
  technologies: string[];
  github_url?: string;
  demo_url?: string;
  featured: boolean;
  category: string;
  status: "completed" | "in-progress" | "archived";
  results?: string;
  metrics?: Record<string, string | number>;
  challenges?: string[];
  solutions?: string[];
  lessons_learned?: string[];
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  reading_time?: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  level: number;
  order: number;
  created_at: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string;
  technologies?: string[];
  type: "work" | "education" | "certification";
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar?: string;
  feedback: string;
  rating: number;
  featured: boolean;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "archived";
  metadata?: Record<string, string>;
  created_at: string;
}

export interface Analytics {
  id: string;
  event_type: string;
  page: string;
  country?: string;
  device?: string;
  browser?: string;
  referrer?: string;
  session_id?: string;
  created_at: string;
}

export interface SiteContent {
  id: string;
  section: string;
  key: string;
  value: string;
  type: "text" | "image" | "json";
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  order: number;
  active: boolean;
  created_at: string;
}

export interface SEOSettings {
  id: string;
  page: string;
  meta_title: string;
  meta_description: string;
  keywords: string[];
  og_image?: string;
  created_at: string;
  updated_at: string;
}

export interface ResumeData {
  id: string;
  name: string;
  title: string;
  summary: string;
  experience: Experience[];
  education: Experience[];
  skills: string[];
  certifications: string[];
  languages: string[];
  updated_at: string;
}
