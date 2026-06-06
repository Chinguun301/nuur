"use client";

import { motion } from "framer-motion";
import { Edit, Trash2, GitBranch, MessageCircle, BriefcaseBusiness, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const platforms = [
  { platform: "GitHub", url: "https://github.com/johndoe", icon: "GitBranch", active: true },
  { platform: "Twitter", url: "https://x.com/johndoe", icon: "MessageCircle", active: true },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/johndoe",
    icon: "BriefcaseBusiness",
    active: true,
  },
  { platform: "Website", url: "https://johndoe.com", icon: "Globe", active: false },
];

export default function AdminSocialPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Social Links</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your social media profiles.</p>
        </div>
        <Button className="rounded-full">Add Link</Button>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                Platform
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                URL
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {platforms.map((p, idx) => (
              <motion.tr
                key={p.platform}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {p.icon === "GitBranch" && (
                      <GitBranch className="h-4 w-4 text-muted-foreground" />
                    )}
                    {p.icon === "MessageCircle" && (
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    {p.icon === "BriefcaseBusiness" && (
                      <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
                    )}
                    {p.icon === "Globe" && <Globe className="h-4 w-4 text-muted-foreground" />}
                    <span className="text-sm font-medium">{p.platform}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{p.url}</td>
                <td className="px-6 py-4">
                  {p.active ? (
                    <Badge variant="success" className="text-xs">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Inactive
                    </Badge>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
