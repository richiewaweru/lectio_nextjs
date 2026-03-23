"use client";

import { usePathname, useRouter } from "next/navigation";

import { flattenDocsNavItems } from "@/lib/navigation/docs-navigation";

const items = flattenDocsNavItems();

export function DocsMobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      className="mb-4 rounded-[1.25rem] border border-border/80 bg-white/85 p-3 shadow-sm backdrop-blur-sm xl:hidden"
      aria-label="Documentation pages"
    >
      <label className="sr-only" htmlFor="docs-jump">
        Jump to documentation page
      </label>
      <select
        id="docs-jump"
        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground"
        value={pathname}
        onChange={(e) => {
          const v = e.currentTarget.value;
          if (v) router.push(v);
        }}
      >
        {items.map((item) => (
          <option key={item.href} value={item.href}>
            {item.label}
          </option>
        ))}
      </select>
    </nav>
  );
}
