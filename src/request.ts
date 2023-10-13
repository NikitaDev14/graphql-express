import { from, Observable, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

export const request = <T>(
  endpoint: string,
  body: object,
  extraOptions?: RequestInit,
  fullResponse: boolean = false,
): Observable<T> => {
  const header = {
    'Content-Type': 'application/json',
  };

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
