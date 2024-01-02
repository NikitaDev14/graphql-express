import { Observable } from 'rxjs';

import type { RequestVariables } from './models';
import { request } from './request';
import { fragmentsToString } from './utilities';

export const mutation = <T>(
  endpoint: string,
  mutationString: string,
  variables?: RequestVariables,
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
