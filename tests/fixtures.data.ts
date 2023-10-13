import { DataResponse, FullResponse } from './fixtures.models';

export const dataResponse: DataResponse = [{ id: '1' }, { id: '2' }, { id: '3' }];

export const fullResponse: FullResponse<DataResponse> = {
	headers: new Headers({
		'Content-Type': 'application/json',
		'x-xss-protection': '1; mode=block',
	}),
	json(): DataResponse {
		return dataResponse;
	},
};