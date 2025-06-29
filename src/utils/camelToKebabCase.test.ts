import { camelToKebabCase } from "./camelToKebabCase";

describe("camelToKebabCase", () => {
  it("converts camelCase to kebab-case", () => {
    expect(camelToKebabCase("camelCaseTest")).toBe("camel-case-test");
  });

  it("handles single word starting with uppercase", () => {
    expect(camelToKebabCase("Pascal")).toBe("pascal");
  });

  it("handles consecutive uppercase letters (acronyms)", () => {
    expect(camelToKebabCase("getURLPath")).toBe("get-url-path");
  });

  it("returns an empty string if input is empty", () => {
    expect(camelToKebabCase("")).toBe("");
  });

  it("does not add extra dashes for already-lowercase strings", () => {
    expect(camelToKebabCase("justlowercase")).toBe("justlowercase");
  });

  it("handles strings that start with multiple uppercase letters", () => {
    expect(camelToKebabCase("ABCd")).toBe("ab-cd");
  });

  it("handles a mix of numbers and letters by ignoring numbers (if needed)", () => {
    expect(camelToKebabCase("get2DView")).toBe("get2-d-view"); // You can decide if numbers should be ignored or kept
  });
});
