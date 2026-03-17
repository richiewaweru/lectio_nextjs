"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

import { TemplateContractPanel } from "@/app/templates/[templateId]/template-contract-panel";
import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/lib/components/ui/dialog";
import type {
  TemplateContract,
  TemplatePresetDefinition
} from "@/lib/template-types";
import { cn } from "@/lib/utils";

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";
const STORAGE_KEY = "template-contract-drawer-open";

interface TemplateDetailChromeProps {
  contract: TemplateContract;
  presets: TemplatePresetDefinition[];
  previewSummary: string;
  children: ReactNode;
}

function readDesktopPreference() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function writeDesktopPreference(value: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // Ignore storage failures in restricted environments.
  }
}

export function TemplateDetailChrome({
  contract,
  presets,
  previewSummary,
  children
}: TemplateDetailChromeProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    const syncViewportState = (matches: boolean) => {
      setIsDesktop(matches);

      if (matches) {
        setDesktopOpen(readDesktopPreference());
        setMobileOpen(false);
        return;
      }

      setDesktopOpen(false);
    };

    const handleChange = (event: MediaQueryListEvent) => {
      syncViewportState(event.matches);
    };

    syncViewportState(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }

    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  const handleToggle = () => {
    if (isDesktop) {
      const next = !desktopOpen;
      setDesktopOpen(next);
      writeDesktopPreference(next);
      return;
    }

    setMobileOpen(true);
  };

  const contractButtonLabel = isDesktop && desktopOpen ? "Hide contract" : "Show contract";

  return (
    <main className="page-frame space-y-8">
      <header className="lesson-shell p-8 sm:p-10">
        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
              {contract.family}
            </Badge>
            <Badge variant="outline">{contract.interactionLevel}</Badge>
            <Badge variant="outline">{contract.intent}</Badge>
          </div>
          <div className="space-y-3">
            <p className="eyebrow">Template detail</p>
            <h1 className="font-[var(--font-display)] text-4xl text-primary sm:text-5xl">
              {contract.name}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              {contract.tagline}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/templates">Back to gallery</Link>
            </Button>
            <Button
              variant="outline"
              onClick={handleToggle}
              aria-expanded={isDesktop ? desktopOpen : mobileOpen}
            >
              {isDesktop && desktopOpen ? (
                <PanelRightClose className="h-4 w-4" />
              ) : (
                <PanelRightOpen className="h-4 w-4" />
              )}
              {contractButtonLabel}
            </Button>
            <Button asChild variant="outline">
              <Link href="/showcase">View components</Link>
            </Button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "space-y-6",
          isDesktop &&
            desktopOpen &&
            "md:grid md:grid-cols-[22rem_minmax(0,1fr)] md:items-start md:gap-6 md:space-y-0 lg:grid-cols-[24rem_minmax(0,1fr)]"
        )}
      >
        {isDesktop && desktopOpen ? (
          <aside
            id="template-contract-panel"
            aria-label="Template contract"
            className="md:sticky md:top-6 md:max-h-[calc(100vh-1.5rem)] md:overflow-y-auto"
          >
            <div className="rounded-[1.75rem] border border-white/60 bg-white/82 p-6 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
              <TemplateContractPanel contract={contract} presets={presets} />
            </div>
          </aside>
        ) : null}

        <section className="space-y-4 md:min-w-0">
          <div>
            <p className="eyebrow">Live preview</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {previewSummary}
            </p>
          </div>
          {children}
        </section>
      </div>

      {!isDesktop ? (
        <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
          <DialogContent className="left-0 right-auto top-0 h-full w-[min(92vw,32rem)] max-h-none translate-x-0 translate-y-0 overflow-y-auto rounded-none rounded-r-[1.75rem] border-white/70 p-6 sm:w-[min(80vw,36rem)]">
            <DialogTitle className="sr-only">Template contract drawer</DialogTitle>
            <DialogDescription className="sr-only">
              Review the template contract on smaller screens.
            </DialogDescription>
            <div className="relative z-10 pr-10">
              <TemplateContractPanel contract={contract} presets={presets} />
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </main>
  );
}
