"use client";

import { motion } from "framer-motion";
import {
  FolderKanban,
  FileText,
  Code2,
  MessageSquare,
  Eye,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";

const statsCards = [
  { icon: FolderKanban, label: "Total Projects", value: "12", change: "+2 this month" },
  { icon: FileText, label: "Total Blogs", value: "24", change: "+3 this month" },
  { icon: Code2, label: "Total Skills", value: "18", change: "6 categories" },
  { icon: MessageSquare, label: "Contact Requests", value: "8", change: "3 unread" },
];

const analyticsCards = [
  { icon: Eye, label: "Page Views", value: "12,345", change: "+12.5%" },
  { icon: Users, label: "Visitors", value: "4,567", change: "+8.3%" },
  { icon: Activity, label: "Bounce Rate", value: "32.1%", change: "-2.1%" },
  { icon: TrendingUp, label: "Avg. Session", value: "3m 45s", change: "+15s" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your portfolio and analytics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-foreground/5">
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="text-sm font-medium mt-1">{card.label}</div>
            <div className="text-xs text-muted-foreground mt-1">{card.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-foreground/5">
                  <card.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-green-500">{card.change}</span>
              </div>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{card.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="space-y-4">
            {[
              { action: "New contact form submission", time: "5 minutes ago" },
              {
                action: "Blog post published: 'Building Performant React Applications'",
                time: "2 hours ago",
              },
              { action: "Project updated: 'E-Commerce Platform'", time: "1 day ago" },
              { action: "New testimonial received from Jane Smith", time: "2 days ago" },
              { action: "Resume PDF generated and downloaded", time: "3 days ago" },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm">{activity.action}</span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
