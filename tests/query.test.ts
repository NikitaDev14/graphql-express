import * as graphqlExpress from '../src/index';
import * as request from '../src/request';
import { RequestVariables } from '../src/models';
import * as utilities from '../src/utilities';
import { Observable } from 'rxjs';

describe('Query', () => {
  let requestMock: jest.SpyInstance;
  let fragmentsToStringMock: jest.SpyInstance;

  beforeEach(() => {
    requestMock = jest.spyOn(request, 'request');
    fragmentsToStringMock = jest.spyOn(utilities, 'fragmentsToString');

    requestMock.mockImplementationOnce((): any => ({
      test: 'testResult',
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls request function wirth passed arguments', () => {
    const endpoint: string = 'testEndpoint';
    const queryString: string = ' testQueryString ';
    const variables: RequestVariables = { testVariable: 'testValue' };
    const fragments: string[] = ['testFragment'];
    const extraOptions: RequestInit = { keepalive: true };

    const testResult: Observable<any> = graphqlExpress.query(
        endpoint,
        queryString,
        variables,
        fragments,
        extraOptions,
    );

    expect(testResult).toStrictEqual({
      test: 'testResult',
    });
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith(
        endpoint,
        {
          query: 'query testQueryString testFragment',
          variables,
        },
        extraOptions,
        false,
    );
    expect(fragmentsToStringMock).toHaveBeenCalledTimes(1);
    expect(fragmentsToStringMock).toHaveBeenCalledWith(fragments);
  });
});
