import { fragmentsToString } from './../src/utilities';

describe('Utilities', () => {
	it('should return empty string', () => {
		const result = fragmentsToString([]);

		expect(result).toEqual('');
	});

	it('should return string joined with spaces', () => {
		const result = fragmentsToString(['abc', 'def']);

		expect(result).toEqual('abc def');
	});
});
