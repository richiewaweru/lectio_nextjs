import type { Metadata } from "next";
import Link from "next/link";

import { getDocsNavigation } from "@/lib/navigation/docs-navigation";

export const metadata: Metadata = {
  title: "Documentation — Lectio React",
  description: "Overview and links to installation, concepts, rendering, contracts, and examples."
};

export default function DocsHomePage() {
  const groups = getDocsNavigation();

  return (
    <>
      <p className="eyebrow">Documentation</p>
      <h1>Lectio documentation</h1>
      <p className="lead">
        Guides for using the educational component library in your own React or Next.js app, wiring
        multi-section lessons, and feeding external pipelines with exported JSON contracts.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {groups.map((group) => (
          <section
            key={group.eyebrow}
            className="rounded-[1.35rem] border border-border/70 bg-white/75 p-5 shadow-sm"
          >
            <p className="eyebrow text-xs">{group.eyebrow}</p>
            <ul className="mt-4 list-none space-y-3 pl-0">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-xl px-2 py-1.5 transition-colors hover:bg-primary/5"
                  >
                    <span className="font-semibold text-primary">{item.label}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{item.meta}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Live demos live under{" "}
        <Link href="/showcase" className="font-medium text-primary underline-offset-4 hover:underline">
          Component showcase
        </Link>{" "}
        and{" "}
        <Link href="/templates" className="font-medium text-primary underline-offset-4 hover:underline">
          Templates
        </Link>{" "}
        — this section focuses on consumption, patterns, and contracts.
      </p>
    </>
  );
}
