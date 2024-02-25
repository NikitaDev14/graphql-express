import * as graphqlExpress from '../src/index';
import * as query from '../src/query';
import * as mutation from '../src/mutation';
import { RequestVariables } from '../src/models';

describe('QueryBuilder', () => {
    let queryMock: jest.SpyInstance;
    let mutationMock: jest.SpyInstance;

    beforeEach(() => {
        queryMock = jest.spyOn(query, 'query');
        mutationMock = jest.spyOn(mutation, 'mutation');

        queryMock.mockImplementationOnce((): any => {
            return { test: 'testResult' };
        });

        mutationMock.mockImplementationOnce((): any => {
            return { test: 'testResult' };
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('saves a host', () => {

    });
});
