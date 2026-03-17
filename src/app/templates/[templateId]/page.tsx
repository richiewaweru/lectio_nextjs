import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";
import { getTemplateById, templateRegistry } from "@/lib/template-registry";

export function generateStaticParams() {
  return templateRegistry.map((definition) => ({
    templateId: definition.contract.id
  }));
}

export default async function TemplateDetailPage({
  params
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  const definition = getTemplateById(templateId);

  if (!definition) {
    notFound();
  }

  const TemplatePreview = definition.render;

  return (
    <main className="page-frame space-y-8">
      <header className="lesson-shell p-8 sm:p-10">
        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
              {definition.contract.family}
            </Badge>
            <Badge variant="outline">{definition.contract.interactionLevel}</Badge>
            <Badge variant="outline">{definition.contract.intent}</Badge>
          </div>
          <div className="space-y-3">
            <p className="eyebrow">Template detail</p>
            <h1 className="font-[var(--font-display)] text-4xl text-primary sm:text-5xl">
              {definition.contract.name}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              {definition.contract.tagline}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/templates">Back to gallery</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/showcase">View components</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-white/60 bg-white/82">
          <CardHeader>
            <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
              Template contract
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="text-sm font-semibold text-primary">Best for</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
                {definition.contract.bestFor.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Not ideal for</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
                {definition.contract.notIdealFor.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Lesson flow</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {definition.contract.lessonFlow.join(" -> ")}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Required components</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {definition.contract.requiredComponents.map((component) => (
                  <Badge key={component} variant="outline">
                    {component}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Optional components</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {definition.contract.optionalComponents.map((component) => (
                  <Badge key={component} variant="outline">
                    {component}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Default behaviours</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(definition.contract.defaultBehaviours).length ? (
                  Object.entries(definition.contract.defaultBehaviours).map(
                    ([component, behaviour]) => (
                      <Badge key={component} className="bg-secondary text-secondary-foreground">
                        {component}: {behaviour}
                      </Badge>
                    )
                  )
                ) : (
                  <p className="text-sm text-muted-foreground">Static by default.</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Responsive notes</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
                {definition.contract.responsiveRules.map((rule) => (
                  <li key={rule}>- {rule}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Print notes</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
                {definition.contract.printRules.map((rule) => (
                  <li key={rule}>- {rule}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Allowed presets</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {definition.presets.map((preset) => (
                  <Badge key={preset.id}>{preset.name}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-4">
          <div>
            <p className="eyebrow">Live preview</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {definition.preview.summary}
            </p>
          </div>
          <TemplatePreview section={definition.preview.section} />
        </section>
      </div>
    </main>
  );
}
