export class QueryBuilder {
  public static registerHost(hostUrl: string, hostName: string, registerAsDefault: boolean = false): void {
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
    argumentsMap: Array<{ [name: string]: string}>,
    hostName: string = QueryBuilder.DEFAULT_HOST_NAME,
  ): void {
    QueryBuilder.argumentTypesMap
      .get(hostName)
      .set
      .apply(QueryBuilder.argumentTypesMap.get(hostName), argumentsMap);
  }

  private static readonly DEFAULT_HOST_NAME: string = 'default host';
  private static defaultHostUrl: string;
  private static hostUrls: { [hostName: string]: string};
  private static argumentTypesMap: Map<string, Map<string, string>> = new Map();

  private vars: { [varName: string]: string};
  private fragments: string[];
}
