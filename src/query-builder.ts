export enum QueryTypes {
  query = 'query',
  mutation = 'mutation',
}

export class QueryBuilder {
  public static registerHost(
    hostUrl: string,
    hostName: string,
    registerAsDefault: boolean = false,
  ): void {
    QueryBuilder.hostUrls = {
      ...QueryBuilder.hostUrls,
      hostName,
    };

    QueryBuilder.argumentTypesMap.set(QueryBuilder.DEFAULT_HOST_NAME, new Map());

    if (registerAsDefault) {
      QueryBuilder.defaultHostUrl = hostUrl;
    }
  }

  public static registerArguments(
    argumentsMap: { [name: string]: string},
    hostName: string = QueryBuilder.DEFAULT_HOST_NAME,
  ): void {
    const argumentsForRegister: any[] = Object
      .keys(argumentsMap)
      .map((argumentName: string) => [argumentName, argumentsMap[argumentName]])
      .reduce((result: any[], val: any) => result.concat(val), []);

    QueryBuilder.argumentTypesMap
      .get(hostName)
      .set
      .apply(
        QueryBuilder.argumentTypesMap.get(hostName),
        argumentsForRegister,
      );
  }

  public static from(
    query: string,
    endpointName: string = QueryBuilder.DEFAULT_HOST_NAME,
  ): QueryBuilder {
    return new QueryBuilder(query, endpointName);
  }

  private static readonly DEFAULT_HOST_NAME: string = 'default host';
  private static defaultHostUrl: string;
  private static hostUrls: { [hostName: string]: string};
  private static argumentTypesMap: Map<string, Map<string, string>> = new Map();

  private vars: { [varName: string]: string};
  private fragments: string[];

  private constructor(
    private query: string,
    private endpoint: string,
  ) { }

  public addVariables(vars: { [varName: string]: string}): QueryBuilder {
    this.vars = vars;
    return this;
  }

  public addFragments(fragments: string[]): QueryBuilder {
    this.fragments = fragments;
    return this;
  }

  public toString(queryType: QueryTypes, keepNulls: boolean = false): string {
    const args = this.varsToString(keepNulls);
    const fragments = this.fragmentsToString();
    if (!args) {
      return `{ ${this.query} } ${fragments}`.trim();
    }
    return `${queryType} load(${args}) { ${this.query} } ${fragments}`.trim();
  }

  private varsToString(keepNulls: boolean): string {
    if (!this.vars) {
      return '';
    }

    return Object.getOwnPropertyNames(this.vars)
      .map((name: string) => {
        const value = this.vars[name];
        if ((value === undefined || value === null) && !keepNulls) {
          return null;
        }
        if (!QueryBuilder.argumentTypesMap.get(this.endpoint).has(name)) {
          return null;
        }
        return `$${name}: ${QueryBuilder.argumentTypesMap.get(this.endpoint).get(name)}`;
      })
      .filter((name: string) => name !== null)
      .join(', ');
  }

  private fragmentsToString(): string {
    if (Boolean(this.fragments) && this.fragments.length > 0) {
      return this.fragments.filter((fragment: string) => {
        return fragment !== undefined && fragment !== null;
      }).join(' ').trim();
    }

    return '';
  }
}
