"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { useParams } from "next/navigation";

export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error — pathname type is the union of all possible paths
        { pathname, params },
        { locale: nextLocale },
      );
    });
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        aria-label={t("en")}
        disabled={isPending}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase text-xs font-semibold">{locale}</span>
      </button>

      <div className="absolute right-0 top-full mt-1 w-36 py-1 rounded-xl border border-border bg-card shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <button
          onClick={() => handleLocaleChange("en")}
          className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${
            locale === "en" ? "text-foreground font-semibold" : "text-muted-foreground"
          }`}
          disabled={isPending}
        >
          {t("en")}
        </button>
        <button
          onClick={() => handleLocaleChange("mn")}
          className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${
            locale === "mn" ? "text-foreground font-semibold" : "text-muted-foreground"
          }`}
          disabled={isPending}
        >
          {t("mn")}
        </button>
      </div>
    </div>
  );
}
