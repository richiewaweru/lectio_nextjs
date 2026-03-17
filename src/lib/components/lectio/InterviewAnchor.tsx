import { MessageSquareMore } from "lucide-react";

import type { InterviewContent } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";

export function InterviewAnchor({ content }: { content: InterviewContent }) {
  return (
    <Card className="border-primary/10 bg-white/80">
      <CardHeader className="pb-3">
        <p className="eyebrow">Interview</p>
        <CardTitle className="flex items-center gap-2 font-[var(--font-display)] text-2xl text-primary">
          <MessageSquareMore className="h-5 w-5" />
          Explain it out loud
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base leading-7 text-foreground/85">{content.prompt}</p>
        <div className="rounded-[1rem] bg-secondary/60 p-4 text-sm leading-6 text-foreground/82">
          Audience: <span className="font-semibold">{content.audience}</span>
        </div>
        {content.follow_up ? (
          <div className="rounded-[1rem] border border-dashed border-border/80 bg-background/70 p-4 text-sm leading-6 text-muted-foreground">
            Follow-up: {content.follow_up}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
