import type { ReactNode } from "react";

import { AppSidebar } from "@/lib/navigation/app-sidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto flex min-h-screen max-w-[96rem] items-start gap-6 px-3 py-3 sm:px-4 lg:px-5">
        <AppSidebar frameworkLabel="Next.js" />
        <div className="min-h-screen min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
