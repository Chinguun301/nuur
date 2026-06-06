"use client";

import { motion } from "framer-motion";
import { Archive, Trash2, CheckCircle2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const contacts = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    subject: "Project Collaboration",
    message: "I'd like to discuss a potential project...",
    status: "unread",
    createdAt: "2025-01-20",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    subject: "Job Opportunity",
    message: "We're looking for a senior front-end developer...",
    status: "read",
    createdAt: "2025-01-18",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@example.com",
    subject: "Freelance Work",
    message: "Need help with a React project...",
    status: "archived",
    createdAt: "2025-01-15",
  },
];

export default function AdminContactsPage() {
  const [search, setSearch] = useState("");

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contact Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage inquiries from your contact form.
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((contact, idx) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className={`rounded-2xl border p-5 transition-colors ${
              contact.status === "unread"
                ? "border-blue-500/30 bg-blue-500/5"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-xs font-medium">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-sm font-medium">{contact.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{contact.email}</span>
                  </div>
                  <Badge
                    variant={
                      contact.status === "unread"
                        ? "default"
                        : contact.status === "read"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs ml-auto"
                  >
                    {contact.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium mt-2">{contact.subject}</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{contact.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{contact.createdAt}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                  title="Mark as read"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                  title="Archive"
                >
                  <Archive className="h-4 w-4" />
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
