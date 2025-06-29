import { CSSProperties, ResponsiveProp } from "../types";
import { buildResponsiveVarsAndClasses } from "./buildResponsiveVarsAndClasses";
import { getClassNames } from "./getClassNames";
import { camelToKebabCase } from "./camelToKebabCase";

export const buildClassName = <K extends keyof CSSProperties>(
  styles: Record<string, string>,
  propsClasses?: Record<string, ResponsiveProp<K> | undefined>,
  propsVars?: Record<string, ResponsiveProp<K> | undefined>,
) => {
  const vars: Record<string, string | number> = {};

  const classes: string[] = propsClasses
    ? getClassNames(styles, propsClasses)
    : [];

  if (propsVars) {
    Object.keys(propsVars).forEach((key) => {
      const result = buildResponsiveVarsAndClasses(
        styles,
        camelToKebabCase(key),
        propsVars[key],
      );
      classes.push(...result.classes);
      Object.assign(vars, result.vars);
    });
  }

  return { classes: classes.filter(Boolean), vars };
};
