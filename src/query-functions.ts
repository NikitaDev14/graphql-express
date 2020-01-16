import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

export const request = (
  endpoint: string,
  body: object,
  extraOptions?: RequestInit,
): Observable<any> => {
  const header: Headers = new Headers({
    'Content-Type': 'application/json',
  });

  return fromFetch(
    endpoint,
    {
      ...extraOptions,
      method: 'POST',
      body: JSON.stringify(body),
      headers: extraOptions ?
        {
          ...extraOptions.headers,
          ...header,
        } :
        header,
    },
  )
    .pipe(
      switchMap((rawResponse: Response) => rawResponse.json()),
    );
};

const joinList = (list: string[]): string => {
  return list.map((item: string) =>
    item.trim(),
  ).join(' ');
};

const fragmentsToString = (fragments: string[]): string => {
  return fragments ? joinList(fragments) : '';
};

export const query = (
  endpoint: string,
  queryString: string,
  variables?: { [key: string]: any},
  fragments?: string[],
  extraOptions?: RequestInit,
): Observable<any> => {
  return request(
    endpoint,
    {
      query: `query ${queryString.trim()} ${fragmentsToString(fragments)}`,
      variables,
    },
    extraOptions,
  );
};

export const mutation = (
  endpoint: string,
  mutationString: string,
  variables?: { [key: string]: any},
  fragments?: string[],
  extraOptions?: RequestInit,
): Observable<any> => {
  return request(
    endpoint,
    {
      query: `mutation ${mutationString.trim()} ${fragmentsToString(fragments)}`,
      variables,
    },
    extraOptions,
  );
};
