import * as CSS from "csstype";

export interface CSSProperties extends CSS.Properties<string | number> {}

export type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl";

export type ResponsiveProp<K extends keyof CSSProperties> =
  | CSSProperties[K]
  | Partial<Record<Breakpoints, CSSProperties[K]>>;

export interface ResolveResponsivePayload<K extends keyof CSSProperties> {
  vars: Record<string, CSSProperties[K]>;
  classes: string[];
}
