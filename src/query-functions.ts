import { Observable, of, from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

type Primitives = string | number | boolean | null;

type Variables = { [key: string]: Primitives | Variables };

export const request = <T>(
  endpoint: string,
  body: object,
  extraOptions?: RequestInit,
  fullResponse: boolean = false,
): Observable<T> => {
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
      switchMap((rawResponse: Response): Observable<T> =>
        fullResponse ? of(rawResponse) : from(rawResponse.json()),
      ),
    );
};

const joinList = (list: string[]): string => {
  return list.map((item: string): string =>
    item.trim(),
  ).join(' ');
};

const fragmentsToString = (fragments: string[]): string => {
  return fragments ? joinList(fragments) : '';
};

export const query = <T>(
  endpoint: string,
  queryString: string,
  variables?: Variables,
  fragments?: string[],
  extraOptions?: RequestInit,
  fullResponse: boolean = false,
): Observable<T> => {
  return request<T>(
    endpoint,
    {
      query: `query ${queryString.trim()} ${fragmentsToString(fragments)}`,
      variables,
    },
    extraOptions,
    fullResponse,
  );
};

export const mutation = <T>(
  endpoint: string,
  mutationString: string,
  variables?: Variables,
  fragments?: string[],
  extraOptions?: RequestInit,
  fullResponse: boolean = false,
): Observable<T> => {
  return request<T>(
    endpoint,
    {
      query: `mutation ${mutationString.trim()} ${fragmentsToString(fragments)}`,
      variables,
    },
    extraOptions,
    fullResponse,
  );
};
