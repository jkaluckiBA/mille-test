import type { AxiosResponse } from 'axios';

export type ApiResponse<T = unknown> = Promise<AxiosResponse<T>>;
