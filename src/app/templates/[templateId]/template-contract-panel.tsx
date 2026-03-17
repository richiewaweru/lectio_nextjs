import { Badge } from "@/lib/components/ui/badge";
import type {
  TemplateContract,
  TemplatePresetDefinition
} from "@/lib/template-types";

interface TemplateContractPanelProps {
  contract: TemplateContract;
  presets: TemplatePresetDefinition[];
}

export function TemplateContractPanel({
  contract,
  presets
}: TemplateContractPanelProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="eyebrow">Template detail</p>
        <h2 className="font-[var(--font-display)] text-2xl text-primary">
          Template contract
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Review the template contract without losing space for the live preview.
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-primary">Best for</p>
        <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
          {contract.bestFor.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-semibold text-primary">Not ideal for</p>
        <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
          {contract.notIdealFor.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-semibold text-primary">Lesson flow</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {contract.lessonFlow.join(" -> ")}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-primary">Required components</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {contract.requiredComponents.map((component) => (
            <Badge key={component} variant="outline">
              {component}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-primary">Optional components</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {contract.optionalComponents.map((component) => (
            <Badge key={component} variant="outline">
              {component}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-primary">Default behaviours</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {Object.entries(contract.defaultBehaviours).length ? (
            Object.entries(contract.defaultBehaviours).map(([component, behaviour]) => (
              <Badge key={component} className="bg-secondary text-secondary-foreground">
                {component}: {behaviour}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Static by default.</p>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-primary">Responsive notes</p>
        <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
          {contract.responsiveRules.map((rule) => (
            <li key={rule}>- {rule}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-semibold text-primary">Print notes</p>
        <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
          {contract.printRules.map((rule) => (
            <li key={rule}>- {rule}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-semibold text-primary">Allowed presets</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {presets.map((preset) => (
            <Badge key={preset.id}>{preset.name}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
