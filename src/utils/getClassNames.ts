import { Breakpoints, ResponsiveProp, CSSProperties } from "../types";
import { camelToKebabCase } from "./camelToKebabCase";

export const getClassNames = <K extends keyof CSSProperties>(
  styles: Record<string, string>,
  props: Record<string, ResponsiveProp<K>>,
) => {
  return Object.keys(props).reduce<string[]>((acc, _prop) => {
    const name = camelToKebabCase(_prop);
    const prop = props[_prop];

    const classes: string[] = [];

    if (!prop) return acc;

    if (typeof prop === "string" || typeof prop === "number") {
      classes.push(styles[`${name}-${prop}-xs`] ?? styles[`${name}-${prop}`]);
    }

    if (prop && typeof prop === "object") {
      Object.keys(prop).forEach((_breakpoint) => {
        const breakpoint = _breakpoint as Breakpoints;
        if (prop[breakpoint]) {
          console.log(`${name}-${prop[breakpoint]}-${breakpoint}`);
          classes.push(styles[`${name}-${prop[breakpoint]}-${breakpoint}`]);
        }
      });
    }

    return acc.concat(classes);
  }, []);
};
