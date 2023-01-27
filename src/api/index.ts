import axios from 'axios';

import type { ApiResponse } from '@/types';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

function get<Response>(url: string): ApiResponse<Response> {
  return axiosInstance.get<Response>(url);
}

export { get };
