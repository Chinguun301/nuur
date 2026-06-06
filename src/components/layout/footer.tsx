import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Command, GitBranch, MessageCircle, BriefcaseBusiness, Mail } from "lucide-react";

export function Footer() {
  const t = useTranslations("Footer");

  const footerLinks = {
    pages: [
      { href: "/" as const, label: t("home") },
      { href: "/about" as const, label: t("about") },
      { href: "/resume" as const, label: t("resume") },
      { href: "/projects" as const, label: t("projects") },
      { href: "/blog" as const, label: t("blog") },
      { href: "/contact" as const, label: t("contact") },
    ],
    social: [
      { href: "https://github.com/chinguunv", icon: GitBranch, label: "GitHub" },
      { href: "#", icon: MessageCircle, label: "X (Twitter)" },
      { href: "#", icon: BriefcaseBusiness, label: "LinkedIn" },
      { href: "mailto:chinguunv@gmail.com", icon: Mail, label: "Email" },
    ],
  };

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground text-background">
                <Command className="h-4 w-4" />
              </div>
              {t("portfolio")}
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">{t("description")}</p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t("pages")}</h3>
            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t("connect")}</h3>
            <div className="flex flex-wrap gap-3">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card hover:bg-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("portfolio")}. {t("rights")}
          </p>
          <p className="text-sm text-muted-foreground">{t("crafted")}</p>
        </div>
      </div>
    </footer>
  );
}
