import * as graphqlExpress from '../src/index';
import { RequestVariables } from '../src/models';
import { fragmentsToString } from "../src/utilities";

// jest.mock('rxjs/fetch');

// const mockedFromFetch = jest.mocked(fromFetch, true);
jest.mock('../src/request');

describe('Query functions', () => {
  describe('Query', () => {
    test('query function exists', () => {
      expect(graphqlExpress.query).toBeDefined();
    });

    test('calls request function wirth arguments', () => {
      const endpoint = 'testEndpoint';
      const queryString = 'testQueryString';
      const variables: RequestVariables = { testVariable: 'testValue' };
      const fragments = ['testFragment'];
      const extraOptions: RequestInit = { keepalive: true };

      graphqlExpress.query(
        endpoint,
        queryString,
        variables,
        fragments,
        extraOptions,
      );

      expect(graphqlExpress.request).toHaveBeenNthCalledWith(
        1,
        endpoint,
        {
          query: `query ${queryString.trim()} ${fragmentsToString(fragments)}`,
          variables,
        },
        extraOptions,
        false,
      );
    });
  });
});

