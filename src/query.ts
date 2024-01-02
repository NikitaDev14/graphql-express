import { Observable } from 'rxjs';

import { request } from './request';
import { fragmentsToString } from './utilities';
import type { RequestVariables } from './models';

export const query = <T>(
  endpoint: string,
  queryString: string,
  variables?: RequestVariables,
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
