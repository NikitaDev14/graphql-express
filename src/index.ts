import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

const request = (
  endpoint: string,
  body: object,
  extraOptions?: RequestInit,
): Observable<Response> => {
  return fromFetch(
    endpoint,
    {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
      ...extraOptions,
    },
  );
};

export const query = (
  endpoint: string,
  query: string,
  variables?: { [key: string]: string},
  fragments?: string[],
  extraOptions?: RequestInit,
): Observable<Response> => {
  return request(
    endpoint,
    {
      query: `
        query ${query} \n
        ${fragments.join('\n')}
      `,
      variables,
    },
    extraOptions,
  );
};
