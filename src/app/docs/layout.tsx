import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DocsMobileNav } from "@/lib/navigation/docs-mobile-nav";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Guides for using Lectio React in your app, rendering patterns, contracts, and integration examples."
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page-frame">
      <DocsMobileNav />
      <div className="lesson-shell p-6 sm:p-8 lg:p-10">
        <div className="relative z-10 doc-prose">{children}</div>
      </div>
    </div>
  );
}
