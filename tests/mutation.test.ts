import * as graphqlExpress from '../src/index';
import * as request from '../src/request';
import { RequestVariables } from '../src/models';
import * as utilities from '../src/utilities';

describe('Mutation', () => {
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
        const endpoint = 'testEndpoint';
        const queryString = ' testQueryString ';
        const variables: RequestVariables = { testVariable: 'testValue' };
        const fragments = ['testFragment'];
        const extraOptions: RequestInit = { keepalive: true };

        const testResult = graphqlExpress.mutation(
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
                query: 'mutation testQueryString testFragment',
                variables,
            },
            extraOptions,
            false,
        );
        expect(fragmentsToStringMock).toHaveBeenCalledTimes(1);
        expect(fragmentsToStringMock).toHaveBeenCalledWith(fragments);
    });
});
