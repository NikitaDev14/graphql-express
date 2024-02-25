import * as query from '../src/query';
import * as mutation from '../src/mutation';
import { QueryBuilder } from '../src';

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

    it('should build a query with variables, fragments, extra options and full response', () => {
        QueryBuilder.registerHost('test host', '', true);

        QueryBuilder.registerArguments({
            argument1: 'argumentType1',
        });

        const qb: QueryBuilder = QueryBuilder.from('query string')
            .addVariables({
                variable1: 'value1',
            })
            .addFragments(['fragment1']);

        const testResult: any = qb.query();

        expect(testResult).toStrictEqual({ test: 'testResult' });
        expect(queryMock).toHaveBeenCalledTimes(1);
        expect(queryMock).toHaveBeenCalledWith(
            'test host',
            '{ query string }',
            { variable1: 'value1' },
            ['fragment1'],
            undefined,
            false,
        );
    });

    it('should build a mutation with variables, fragments, extra options and full response', () => {
        QueryBuilder.registerHost('test host', 'host1');

        QueryBuilder.registerArguments({
            argument1: 'argumentType1',
        });

        const qb: QueryBuilder = QueryBuilder.from('query string')
            .addVariables({
                variable1: 'value1',
            })
            .addFragments(['fragment1']);

        const testResult: any = qb.mutation();

        expect(testResult).toStrictEqual({ test: 'testResult' });
        expect(mutationMock).toHaveBeenCalledTimes(1);
        expect(mutationMock).toHaveBeenCalledWith(
            'test host',
            '{ query string }',
            { variable1: 'value1' },
            ['fragment1'],
            undefined,
            false,
        );
    });
});
