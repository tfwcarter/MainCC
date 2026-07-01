"use client";

import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconName = keyof typeof Lucide;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = (Lucide as unknown as Record<string, React.ComponentType<LucideProps>>)[
    name as IconName as string
  ];
  if (!Cmp) {
    const Fallback = Lucide.Circle;
    return <Fallback {...props} />;
  }
  return <Cmp {...props} />;
}
