"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Code2,
  User2,
  Star,
  MessageSquare,
  Share2,
  Search,
  Settings,
  FileDown,
  BarChart3,
  LogOut,
  Command,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: FolderKanban, label: "Projects", href: "/admin/projects" },
  { icon: FileText, label: "Blogs", href: "/admin/blogs" },
  { icon: Code2, label: "Skills", href: "/admin/skills" },
  { icon: User2, label: "About", href: "/admin/about" },
  { icon: Star, label: "Testimonials", href: "/admin/testimonials" },
  { icon: MessageSquare, label: "Contacts", href: "/admin/contacts" },
  { icon: Share2, label: "Social Links", href: "/admin/social" },
  { icon: Settings, label: "SEO", href: "/admin/seo" },
  { icon: FileDown, label: "Resume", href: "/admin/resume" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <Link
          href="/admin/dashboard"
          className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground text-background shrink-0">
            <Command className="h-4 w-4" />
          </div>
          {!collapsed && <span className="font-semibold text-sm">Admin Panel</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-lg hover:bg-sidebar-accent transition-colors",
            collapsed && "absolute -right-3 top-4 bg-sidebar border border-border",
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-foreground rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-3 border-t border-border">
        <button
          onClick={handleSignOut}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all w-full",
            collapsed && "justify-center px-2",
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
