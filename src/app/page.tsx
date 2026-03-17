import Link from "next/link";
import { ArrowRight, BookOpenText, Layers3, Sparkles } from "lucide-react";

import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";

const pillars = [
  {
    title: "Schema first",
    description:
      "Lesson content is typed before it is styled, so components stay predictable for AI generation."
  },
  {
    title: "Cognitive components",
    description:
      "Each block exists to perform a teaching job, not just to fill a layout slot."
  },
  {
    title: "Template assembly",
    description:
      "Instructional flow is expressed through templates that compose reusable educational components."
  }
];

export default function HomePage() {
  return (
    <main className="page-frame">
      <section className="lesson-shell isolate px-6 py-10 sm:px-10 sm:py-14">
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
              Phase 1 demo
            </Badge>
            <div className="space-y-4">
              <p className="eyebrow">Lectio Next.js</p>
              <h1 className="font-[var(--font-display)] text-4xl leading-none text-primary sm:text-5xl lg:text-6xl">
                Interactive textbook sections built from educational intent.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                This workspace ports Lectio into Next.js and keeps the
                instructional architecture explicit: schema drives components,
                components drive templates, and templates render lessons.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/showcase">
                  View component showcase
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/templates/showcase">
                  Open template showcase
                </Link>
              </Button>
            </div>
          </div>
          <Card className="border-primary/10 bg-primary/95 text-primary-foreground">
            <CardHeader>
              <CardTitle className="font-[var(--font-display)] text-2xl">
                Guided Concept Path
              </CardTitle>
              <CardDescription className="text-primary-foreground/75">
                Guided baseline plus the new extended visualization path
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-primary-foreground/88">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-4 w-4" />
                <p>
                  The hook creates felt need before formal explanation begins.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <BookOpenText className="mt-1 h-4 w-4" />
                <p>
                  Content schema remains the source of truth for AI-generated
                  section data.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Layers3 className="mt-1 h-4 w-4" />
                <p>
                  Templates assemble reusable educational interactions into
                  coherent lessons and now support a richer full-surface demo.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <Card key={pillar.title} className="border-white/60 bg-white/80">
            <CardHeader>
              <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
                {pillar.title}
              </CardTitle>
              <CardDescription className="text-base leading-7 text-muted-foreground">
                {pillar.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </main>
  );
}
