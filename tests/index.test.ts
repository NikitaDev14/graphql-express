import * as index from '../src';
import {QueryTypes} from '../src';

describe('Index', () => {
    it('should export the public API', () => {
        expect(Object.keys(index)).toStrictEqual([
            'request',
            'query',
            'mutation',
            'QueryBuilder',
            'QueryTypes',
        ]);
    });

    it('public API should have exact types', () => {
        expect(index.request).toBeInstanceOf(Function);
        expect(index.query).toBeInstanceOf(Function);
        expect(index.mutation).toBeInstanceOf(Function);
        expect(index.QueryBuilder).toBeInstanceOf(Function);
        expect(QueryTypes).toBeInstanceOf(Object);
    });
});
