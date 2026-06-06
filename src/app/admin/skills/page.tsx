"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const skills = [
  { id: "1", name: "React", category: "Frontend", level: 95, icon: "Code2" },
  { id: "2", name: "Next.js", category: "Frontend", level: 92, icon: "Code2" },
  { id: "3", name: "TypeScript", category: "Frontend", level: 90, icon: "Code2" },
  { id: "4", name: "Node.js", category: "Backend", level: 85, icon: "Server" },
  { id: "5", name: "PostgreSQL", category: "Backend", level: 80, icon: "Database" },
  { id: "6", name: "Figma", category: "Design", level: 88, icon: "Palette" },
];

export default function AdminSkillsPage() {
  const [search, setSearch] = useState("");

  const filtered = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Skills</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your skills and expertise levels.
          </p>
        </div>
        <Button className="rounded-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Input
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-4"
        />
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="w-12 px-4 py-3"></th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                Name
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                Category
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                Level
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((skill, idx) => (
              <motion.tr
                key={skill.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.03 }}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium">{skill.name}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="secondary" className="text-xs">
                    {skill.category}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 max-w-[200px]">
                    <div className="flex-1 h-2 rounded-full bg-foreground/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">
                      {skill.level}%
                    </span>
                  </div>
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
