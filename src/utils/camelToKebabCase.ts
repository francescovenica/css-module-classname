export const camelToKebabCase = (str: string): string =>
  str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // insert - between lowercase/number and uppercase
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2") // split acronyms if followed by lowercase
    .toLowerCase();
