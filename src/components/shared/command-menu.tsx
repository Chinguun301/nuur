"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, User2, FolderKanban, FileText, Mail, Command } from "lucide-react";
import { cn } from "@/lib/utils";

const commands = [
  { icon: Home, label: "Home", href: "/", shortcut: "G H" },
  { icon: User2, label: "About", href: "/about", shortcut: "G A" },
  { icon: FolderKanban, label: "Projects", href: "/projects", shortcut: "G P" },
  { icon: FileText, label: "Blog", href: "/blog", shortcut: "G B" },
  { icon: Mail, label: "Contact", href: "/contact", shortcut: "G C" },
];

export function CommandMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.href.toLowerCase().includes(search.toLowerCase()),
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
    if (e.key === "Escape") setIsOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const navigate = (href: string) => {
    setIsOpen(false);
    setSearch("");
    router.push(href);
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-muted-foreground border border-border bg-card hover:bg-accent transition-colors"
        aria-label="Open command menu"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-muted text-[10px] font-medium">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            >
              {/* Search */}
              <div className="flex items-center gap-3 px-4 border-b border-border">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
                    }
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setSelectedIndex((i) => Math.max(i - 1, 0));
                    }
                    if (e.key === "Enter" && filtered[selectedIndex]) {
                      navigate(filtered[selectedIndex].href);
                    }
                  }}
                  placeholder="Search pages..."
                  className="flex-1 h-12 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>

              {/* Results */}
              <div className="p-2 max-h-64 overflow-y-auto">
                {filtered.map((cmd, idx) => (
                  <button
                    key={cmd.href}
                    onClick={() => navigate(cmd.href)}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-colors",
                      idx === selectedIndex
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-accent/50",
                    )}
                  >
                    <cmd.icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{cmd.label}</span>
                    <span className="text-xs text-muted-foreground">{cmd.shortcut}</span>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No results found
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
