# Getting started

## Install

To install the package run:

```
npm i @vfcoding/module-css-classname
```

## how to use

How does the `buildClassName` works? It is very simple, the first argument is the css module file, the second argument are the static properties while the last argument are the dynamic variables.

When you pass a static variable like:

```
{ visibility: props.visibility}
```

where `props.visibility` can be `hidden | visible | etc...` you must create a class in the scss file with this format:

```
.visibility-hidden { visibility: hidden; }
.visibility-visible { visibility: visible; }
```

the `buildClassName` uses this format `{prop-name}-{prop-value}` to find the class in the `styles` object, for example `styles[".visibility-{visible|hidden}"]`, a similar approach is required for a responsive props, with the only difference that the `buildClassName` will append the brakpoint as well in the key `{prop-name}-{prop-value}-{breakpoint}`, so the scss whould have this format:

```
@each $size, $breakpoint in mixins.$breakpoints {
    @media (min-width: #{$breakpoint}) {
      .visibility-hidden-#{$size} {
        visibility: hidden;
      }

      .visibility-visible-#{$size} {
        visibility: visible;
      }
    }
  }
```

The exact same approach works for the vairables as well, so if you pass this object to the third argument of `buildClassName`:

```
{ margin: props.margin }
```

you need a a css like this:

```
  @each $size, $breakpoint in mixins.$breakpoints {
    @media (min-width: #{$breakpoint}) {
      &.margin-#{$size} {
        margin: var(--margin-#{$size}, 0);
      }
    }
  }
```

the `buildClassName` will find the right class `.margin-{breakpoint}` and it will return the right variable `--margin-{breakpoint}: {props.margin}`, if `.margin-{breakpoint}` is not found it will try to find the `.margin` class.

You can then use these classes/vars returned by `buildClassName` in the component:

```
className={classNames(classes)}
style={vars}
```

## Example

Create a component like:

```
import { buildClassName } from "@vfcoding/module-css-classes";
import styles from "./styles.module.scss";

interface BaseProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  visibility?: ResponsiveProp<"visibility">;
  display?: ResponsiveProp<"display">;
  padding?: ResponsiveProp<"padding">;
  margin?: ResponsiveProp<"margin">;
  style?: CSSProperties;
}

export function Base(props: BaseProps) {
  const { children, className, style } = props;

  const { classes, vars } = buildClassName(
    styles,
    { display: props.display, visibility: props.visibility },
    { padding: props.padding, margin: props.margin },
  );

  return (
    <div className={classNames(styles.base, ...classes, className)} style={{ ...vars, ...style }}>
      {children}
    </div>
  );
}
```

create a style file like:

```
.base {
  @each $size, $breakpoint in mixins.$breakpoints {
    @media (min-width: #{$breakpoint}) {
      &.margin-#{$size} {
        margin: var(--margin-#{$size}, 0);
      }

      &.padding-#{$size} {
        padding: var(--padding-#{$size}, 0);
      }

      .display-block-#{$size} {
        display: block;
      }

      .display-flex-#{$size} {
        display: flex;
      }

      .display-inline-#{$size}-block {
        display: inline-block;
      }
    }
  }

  &.visibility-hidden {
    visibility: hidden;
  }

  &.visibility-visible {
    visibility: visible;
  }
}
```
