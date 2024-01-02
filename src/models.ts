type Primitives = string | number | boolean | null;

export type RequestVariables = {
  [key: string]: Primitives | RequestVariables;
};

export enum QueryTypes {
  query = 'query',
  mutation = 'mutation',
}
