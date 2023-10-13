type Primitives = string | number | boolean | null;

export type RequestVariables = {
  [key: string]: Primitives | RequestVariables;
};
