import { Breakpoints, CSSProperties, ResponsiveProp } from "../types";

export const buildResponsiveVarsAndClasses = <K extends keyof CSSProperties>(
  styles: Record<string, string>,
  key: string,
  value: ResponsiveProp<K>,
) => {
  const classes = [];
  const vars: Record<string, string | number> = {};

  if (typeof value === "string" || typeof value === "number") {
    if (styles[`${key}-xs`]) {
      vars[`--${key}-xs`] = value;
      classes.push(styles[`${key}-xs`]);
    } else {
      vars[`--${key}`] = value;
      classes.push(styles[key]);
    }
  }

  if (value && typeof value === "object") {
    Object.keys(value).forEach((_breakpoint) => {
      const breakpoint = _breakpoint as Breakpoints;

      if (value[breakpoint]) {
        vars[`--${key}-${breakpoint}`] = value[breakpoint];
        classes.push(styles[`${key}-${breakpoint}`]);
      }
    });
  }

  return { vars, classes };
};
