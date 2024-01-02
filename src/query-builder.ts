import { Observable } from 'rxjs';

import { query } from './query';
import { mutation } from './mutation';

export class QueryBuilder {
  public static registerHost(
    hostUrl: string,
    hostName: string,
    registerAsDefault: boolean = false,
  ): void {
    const hostNameToRegister: string = registerAsDefault ? QueryBuilder.DEFAULT_HOST_NAME : hostName;

    QueryBuilder.hostUrls = {
      ...QueryBuilder.hostUrls,
      [hostNameToRegister]: hostUrl,
    };

    QueryBuilder.argumentTypesMap.set(
      hostNameToRegister,
      new Map(),
    );
  }

  public static registerArguments(
    argumentsMap: { [name: string]: string},
    hostName: string = QueryBuilder.DEFAULT_HOST_NAME,
  ): void {
    const hostArgumentsMap: Map<string, string> = QueryBuilder.argumentTypesMap.get(hostName);

    Object
      .keys(argumentsMap)
      .forEach((argumentKey: string) => {
        hostArgumentsMap.set(argumentKey, argumentsMap[argumentKey]);
      });
  }

  public static from(
    queryString: string,
    endpointName: string = QueryBuilder.DEFAULT_HOST_NAME,
    extraOptions?: RequestInit,
    fullResponse: boolean = false,
  ): QueryBuilder {
    return new QueryBuilder(
      queryString,
      endpointName,
      extraOptions,
      fullResponse,
    );
  }

  private static readonly DEFAULT_HOST_NAME: string = 'default host';
  private static hostUrls: { [hostName: string]: string} = { };
  private static argumentTypesMap: Map<string, Map<string, string>> = new Map();

  private variables: { [varName: string]: string };
  private fragments: string[];

  private constructor(
    private queryString: string,
    private endpointName: string,
    private extraOptions: RequestInit,
    private fullResponse: boolean,
  ) { }

  public addVariables(variables: { [varName: string]: string }): QueryBuilder {
    this.variables = variables;
    return this;
  }

  public addFragments(fragments: string[]): QueryBuilder {
    this.fragments = fragments;
    return this;
  }

  public query<T>(
    extraOptions?: RequestInit,
    fullResponse?: boolean,
  ): Observable<T> {
    return query<T>(
      QueryBuilder.hostUrls[this.endpointName],
      this.toString(),
      this.variables,
      this.fragments,
      extraOptions || this.extraOptions,
      fullResponse || this.fullResponse,
    );
  }

  public mutation<T>(
    extraOptions?: RequestInit,
    fullResponse?: boolean,
  ): Observable<T> {
    return mutation<T>(
      QueryBuilder.hostUrls[this.endpointName],
      this.toString(),
      this.variables,
      this.fragments,
      extraOptions || this.extraOptions,
      fullResponse || this.fullResponse,
    );
  }

  private toString(keepNulls: boolean = false): string {
    const args: string = this.varsToString(keepNulls);
    if (!args) {
      return `{ ${this.queryString} }`;
    }
    return `request(${args}) { ${this.queryString} }`;
  }

  private varsToString(keepNulls: boolean): string {
    if (!this.variables) {
      return '';
    }

    return Object.getOwnPropertyNames(this.variables)
      .map((name: string) => {
        const value: string = this.variables[name];
        if ((value === undefined || value === null) && !keepNulls) {
          return null;
        }
        if (!QueryBuilder.argumentTypesMap.get(this.endpointName).has(name)) {
          return null;
        }
        return `$${name}: ${QueryBuilder.argumentTypesMap.get(this.endpointName).get(name)}`;
      })
      .filter((name: string) => name !== null)
      .join(', ');
  }
}
