"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminAboutPage() {
  const [saving, setSaving] = useState(false);
  const [bio, setBio] = useState(
    "I'm a passionate Front-End Developer with 5+ years of experience building modern web applications...",
  );

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">About Page</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your biography and personal information.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="rounded-full">
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Professional Title</label>
            <Input defaultValue="Front-End Developer" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Biography</label>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={8} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input defaultValue="San Francisco, CA" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input defaultValue="hello@example.com" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Resume PDF URL</label>
          <Input defaultValue="/resume.pdf" />
        </div>
      </motion.div>
    </div>
  );
}
