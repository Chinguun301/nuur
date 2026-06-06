"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileDown, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminResumePage() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resume Generator</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage resume data and generate downloadable PDFs.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full">
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>
          <Button onClick={handleSave} disabled={saving} className="rounded-full">
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
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
          <label className="text-sm font-medium">Professional Summary</label>
          <Textarea
            defaultValue="Passionate Front-End Developer with 5+ years of experience..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Skills (comma separated)</label>
          <Input defaultValue="React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Languages (comma separated)</label>
          <Input defaultValue="English (Native), Mongolian (Native)" />
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="rounded-full">
              <FileDown className="mr-2 h-4 w-4" />
              Generate English Resume
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <FileDown className="mr-2 h-4 w-4" />
              Generate Mongolian Resume
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <FileDown className="mr-2 h-4 w-4" />
              Generate Portfolio PDF
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
