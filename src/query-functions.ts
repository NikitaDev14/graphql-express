import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { mergeMap } from 'rxjs/operators';

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
      mergeMap((rawResponse: Response) => rawResponse.json()),
    );
};

export const query = (
  endpoint: string,
  queryString: string,
  variables?: { [key: string]: string},
  fragments?: string[],
  extraOptions?: RequestInit,
): Observable<any> => {
  return request(
    endpoint,
    {
      query: `query ${queryString} \n
        ${fragments ? fragments.join('\n') : ''}`,
      variables,
    },
    extraOptions,
  );
};

export const mutation = (
  endpoint: string,
  mutationString: string,
  variables?: { [key: string]: string},
  fragments?: string[],
  extraOptions?: RequestInit,
): Observable<any> => {
  return request(
    endpoint,
    {
      query: `mutation ${mutationString} \n
        ${fragments ? fragments.join('\n') : ''}`,
      variables,
    },
    extraOptions,
  );
};
