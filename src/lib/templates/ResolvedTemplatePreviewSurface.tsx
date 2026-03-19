import { Badge } from "@/lib/components/ui/badge";
import type {
  TemplateDefinition,
  TemplatePresetDefinition
} from "@/lib/template-types";

import { LectioThemeSurface } from "@/lib/templates/LectioThemeSurface";

export function ResolvedTemplatePreviewSurface({
  definition,
  preset = null,
  showMetadata = true
}: {
  definition: TemplateDefinition;
  preset?: TemplatePresetDefinition | null;
  showMetadata?: boolean;
}) {
  const PreviewComponent = definition.render;
  const learnerFit = definition.contract.learnerFit.join(", ").replace(/-/g, " ");
  const subjects = definition.contract.subjects.join(", ");
  const presetSummary = preset
    ? `${preset.name} - ${preset.palette} - ${preset.description}`
    : "Default Lectio theme";

  return (
    <LectioThemeSurface preset={preset}>
      <div className="page-frame space-y-6">
        {showMetadata ? (
          <header className="lesson-shell p-6 sm:p-8">
            <div className="relative z-10 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                  {definition.contract.family}
                </Badge>
                <Badge variant="outline">{definition.contract.interactionLevel}</Badge>
                <Badge variant="outline">{definition.contract.intent}</Badge>
              </div>

              <div className="space-y-3">
                <p className="eyebrow">Template preview</p>
                <h2 className="font-[var(--font-serif)] text-3xl text-primary sm:text-4xl">
                  {definition.contract.name}
                </h2>
                <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {definition.contract.tagline}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-[1.25rem] border border-border/70 bg-white/80 p-4">
                  <p className="eyebrow">Learner fit</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/82">{learnerFit}</p>
                </div>
                <div className="rounded-[1.25rem] border border-border/70 bg-white/80 p-4">
                  <p className="eyebrow">Subjects</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/82">{subjects}</p>
                </div>
                <div className="rounded-[1.25rem] border border-border/70 bg-white/80 p-4 md:col-span-2 xl:col-span-1">
                  <p className="eyebrow">Preset</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/82">
                    {presetSummary}
                  </p>
                </div>
              </div>
            </div>
          </header>
        ) : null}

        <section className="space-y-4">
          <div className="space-y-2">
            <p className="eyebrow">Seeded preview</p>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              {definition.preview.summary}
            </p>
          </div>

          <PreviewComponent section={definition.preview.section} />
        </section>
      </div>
    </LectioThemeSurface>
  );
}
