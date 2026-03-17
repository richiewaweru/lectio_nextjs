import Link from "next/link";

import { Badge } from "@/lib/components/ui/badge";
import { getSidebarNavigation } from "@/lib/navigation/sidebar-navigation";

interface AppSidebarProps {
  frameworkLabel: string;
}

export function AppSidebar({ frameworkLabel }: AppSidebarProps) {
  const navigation = getSidebarNavigation();

  return (
    <aside className="hidden w-72 shrink-0 xl:sticky xl:top-3 xl:block xl:self-start">
      <div className="lesson-shell max-h-[calc(100vh-1.5rem)] p-5">
        <div className="relative z-10 flex max-h-[calc(100vh-3rem)] flex-col">
          <Link href="/" className="block shrink-0 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary text-primary-foreground hover:bg-primary">
                Lectio
              </Badge>
              <Badge variant="outline">{frameworkLabel}</Badge>
            </div>
            <div>
              <h1 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-primary">
                Educational components
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A component system for teaching moves, not just interface widgets.
              </p>
            </div>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="scrollbar-styled mt-6 flex-1 space-y-6 overflow-y-auto pr-1 text-sm"
          >
            <div>
              <p className="eyebrow">Components</p>
              <ul className="mt-3 space-y-1.5">
                {navigation.components.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-3 py-2 text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {item.meta}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Templates</p>
              <ul className="mt-3 space-y-1.5">
                {navigation.templates.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-3 py-2 text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {item.meta}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
}
