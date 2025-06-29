import { buildClassName } from "./buildClassName";

const styles = {
  margin: "_margin",
  "margin-top-xs": "_margin-top-xs",
  "flex-wrap": "_flex-wrap",
  "visibility-hidden": "_visibility-hidden",
  "display-block-xs": "_display-block-xs",
  "display-block-md": "_display-block-md",
  "padding-xs": "_padding-xs",
  "padding-sm": "_padding-sm",
};

describe("buildClassName", () => {
  it("returns the right classes and variables", () => {
    const classes = {
      flexWrap: "flex-wrap",
      visibility: "hidden",
      display: {
        xs: "block",
        md: "inline",
      },
    };

    const variables = {
      margin: "1rem",
      marginTop: "1rem",
      padding: {
        xs: "1rem",
        sm: "2rem",
      },
    };

    const result = buildClassName(styles, classes, variables);

    expect(result).toEqual({
      classes: [
        "_visibility-hidden",
        "_display-block-xs",
        "_margin",
        "_margin-top-xs",
        "_padding-xs",
        "_padding-sm",
      ],
      vars: {
        "--margin": "1rem",
        "--margin-top-xs": "1rem",
        "--padding-sm": "2rem",
        "--padding-xs": "1rem",
      },
    });
  });
});
