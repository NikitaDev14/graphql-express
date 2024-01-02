import * as rxjs from 'rxjs';
import * as rxjs_fetch from 'rxjs/fetch';
import * as rxjs_operators from 'rxjs/operators';

import * as graphqlExpress from '../src/index';

describe('Request', () => {
    const constHeader = {
        'Content-Type': 'application/json',
    };

    let fromFetchMock: jest.SpyInstance;
    let fromMock: jest.SpyInstance;
    let ofMock: jest.SpyInstance;
    let switchMapMock: jest.SpyInstance;

    beforeEach(() => {
        fromFetchMock = jest.spyOn(rxjs_fetch, 'fromFetch');
        fromMock = jest.spyOn(rxjs, 'from');
        ofMock = jest.spyOn(rxjs, 'of');
        switchMapMock = jest.spyOn(rxjs_operators, 'switchMap');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should send request with extra options and return json response', (done: jest.DoneCallback) => {
        const rawResponse = {
            json: () => {
                return Promise.resolve({ testKey: 'testValue' });
            },
        };

        fromFetchMock.mockImplementationOnce(() => {
            return rxjs.scheduled([rawResponse], rxjs.asyncScheduler);
        });

        graphqlExpress.request(
            'testEndpoint',
            { testKey: 'test value' },
            { keepalive: true },
        )
            .pipe(rxjs_operators.first())
            .subscribe((result) => {
                try {
                    expect(result).toStrictEqual({
                        testKey: 'testValue',
                    });
                    expect(fromFetchMock).toHaveBeenCalledTimes(1);
                    expect(fromFetchMock).toHaveBeenCalledWith(
                        'testEndpoint',
                        {
                            body: JSON.stringify({ testKey: 'test value' }),
                            headers: constHeader,
                            keepalive: true,
                            method: 'POST',
                        },
                    );
                    expect(switchMapMock).toHaveBeenCalledTimes(1);
                    expect(ofMock).toHaveBeenCalledTimes(0);
                    expect(fromMock).toHaveBeenCalledTimes(1);
                    expect(fromMock).toHaveBeenCalledWith(rawResponse.json());
                } catch (error: any) {
                    throw error;
                } finally {
                    done();
                }
            });
    });

    it('should send request without extra options and return raw response', (done: jest.DoneCallback) => {
        const rawResponse = {
            json: () => {
                return Promise.resolve({ testKey: 'testValue' });
            },
        };

        fromFetchMock.mockImplementationOnce(() => {
            return rxjs.scheduled([rawResponse], rxjs.asyncScheduler);
        });

        graphqlExpress.request(
            'testEndpoint',
            { testKey: 'test value' },
            undefined,
            true,
        )
            .pipe(rxjs_operators.first())
            .subscribe((result) => {
                try {
                    expect(result).toStrictEqual(rawResponse);
                    expect(fromFetchMock).toHaveBeenCalledTimes(1);
                    expect(fromFetchMock).toHaveBeenCalledWith(
                        'testEndpoint',
                        {
                            body: JSON.stringify({ testKey: 'test value' }),
                            headers: constHeader,
                            method: 'POST',
                        },
                    );
                    expect(switchMapMock).toHaveBeenCalledTimes(1);
                    expect(ofMock).toHaveBeenCalledTimes(1);
                    expect(ofMock).toHaveBeenCalledWith(rawResponse);
                    expect(fromMock).toHaveBeenCalledTimes(0);
                } catch (error: any) {
                    throw error;
                } finally {
                    done();
                }
            });
    });
});
