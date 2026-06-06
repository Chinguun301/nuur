"use client";

import { motion } from "framer-motion";
import { Eye, Users, TrendingUp, Activity, Globe, Monitor, Smartphone } from "lucide-react";

const stats = [
  { icon: Eye, label: "Page Views", value: "12,345", change: "+12.5% this month" },
  { icon: Users, label: "Unique Visitors", value: "4,567", change: "+8.3% this month" },
  { icon: TrendingUp, label: "Bounce Rate", value: "32.1%", change: "-2.1% from last month" },
  {
    icon: Activity,
    label: "Avg. Session Duration",
    value: "3m 45s",
    change: "+15s from last month",
  },
];

const topPages = [
  { page: "/", views: 3456, label: "Home" },
  { page: "/projects", views: 2345, label: "Projects" },
  { page: "/about", views: 1890, label: "About" },
  { page: "/blog", views: 1234, label: "Blog" },
  { page: "/contact", views: 987, label: "Contact" },
];

const countries = [
  { name: "United States", visits: 4567, percentage: 37 },
  { name: "United Kingdom", visits: 1234, percentage: 10 },
  { name: "Germany", visits: 987, percentage: 8 },
  { name: "Canada", visits: 876, percentage: 7 },
  { name: "India", visits: 765, percentage: 6 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track your portfolio performance and visitor insights.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-foreground/5">
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-green-500">
                {stat.change.split(" ")[0]}
              </span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
          <div className="space-y-3">
            {topPages.map((page) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{page.label}</span>
                </div>
                <span className="text-sm font-medium">{page.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Countries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Visitor Countries</h3>
          <div className="space-y-3">
            {countries.map((country) => (
              <div key={country.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{country.name}</span>
                  <span className="text-muted-foreground">{country.visits.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-foreground/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${country.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Device Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Devices</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Monitor, label: "Desktop", percentage: 55, color: "from-blue-500 to-blue-600" },
            {
              icon: Smartphone,
              label: "Mobile",
              percentage: 35,
              color: "from-purple-500 to-purple-600",
            },
            { icon: Monitor, label: "Tablet", percentage: 10, color: "from-pink-500 to-pink-600" },
          ].map((device) => (
            <div key={device.label} className="text-center">
              <device.icon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{device.percentage}%</div>
              <div className="text-sm text-muted-foreground">{device.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
