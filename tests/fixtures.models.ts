export interface User {
	id: string;
}

export interface FullResponse<T> {
	headers: Headers;
	json: () => T;
}

export type DataResponse = User[];