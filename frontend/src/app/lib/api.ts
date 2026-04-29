import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Request failed';
    return Promise.reject(new Error(message));
  }
);

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: string;
};

export async function apiRequest(path: string, options: RequestOptions = {}) {
  const { method = 'GET', body, token } = options;

  const response = await http.request({
    url: path,
    method,
    data: body,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  return response.data;
}

export const api = {
  auth: {
    login: (payload: { email: string; password: string }) => apiRequest('/auth/login', { method: 'POST', body: payload }),
    register: (payload: { username: string; email: string; password: string; phone?: string }) =>
      apiRequest('/auth/register', { method: 'POST', body: payload }),
    profile: (token: string) => apiRequest('/auth/profile', { token }),
    updateProfile: (token: string, payload: { phone?: string; email?: string }) =>
      apiRequest('/auth/profile', { method: 'PUT', token, body: payload }),
  },
  stations: {
    all: () => apiRequest('/stations'),
    byType: (type: 'ps5' | 'pc') => apiRequest(`/stations/type/${type}`),
    byId: (stationId: string) => apiRequest(`/stations/${stationId}`),
    create: (token: string, payload: unknown) => apiRequest('/stations', { method: 'POST', token, body: payload }),
    update: (token: string, stationId: string, payload: unknown) =>
      apiRequest(`/stations/${stationId}`, { method: 'PUT', token, body: payload }),
    remove: (token: string, stationId: string) => apiRequest(`/stations/${stationId}`, { method: 'DELETE', token }),
  },
  bookings: {
    create: (token: string, payload: unknown) => apiRequest('/bookings', { method: 'POST', token, body: payload }),
    my: (token: string) => apiRequest('/bookings/user/my-bookings', { token }),
    byId: (token: string, bookingId: string) => apiRequest(`/bookings/${bookingId}`, { token }),
    allAdmin: (
      token: string,
      params?: { page?: number; limit?: number; status?: string; dateFrom?: string; dateTo?: string }
    ) => {
      const query = new URLSearchParams();

      if (params?.page) query.set('page', String(params.page));
      if (params?.limit) query.set('limit', String(params.limit));
      if (params?.status) query.set('status', params.status);
      if (params?.dateFrom) query.set('dateFrom', params.dateFrom);
      if (params?.dateTo) query.set('dateTo', params.dateTo);

      const suffix = query.toString();
      return apiRequest(`/bookings/admin/all${suffix ? `?${suffix}` : ''}`, { token });
    },
    slots: (stationId: string, date: string) => apiRequest(`/bookings/slots/${stationId}/${date}`),
    update: (token: string, bookingId: string, payload: unknown) =>
      apiRequest(`/bookings/${bookingId}`, { method: 'PUT', token, body: payload }),
    cancel: (token: string, bookingId: string) =>
      apiRequest(`/bookings/${bookingId}/cancel`, { method: 'POST', token }),
    remove: (token: string, bookingId: string) => apiRequest(`/bookings/${bookingId}`, { method: 'DELETE', token }),
  },
  food: {
    all: () => apiRequest('/food'),
    byCategory: (category: string) => apiRequest(`/food/category/${category}`),
    byId: (foodId: string) => apiRequest(`/food/${foodId}`),
    create: (token: string, payload: unknown) => apiRequest('/food', { method: 'POST', token, body: payload }),
    update: (token: string, foodId: string, payload: unknown) =>
      apiRequest(`/food/${foodId}`, { method: 'PUT', token, body: payload }),
    remove: (token: string, foodId: string) => apiRequest(`/food/${foodId}`, { method: 'DELETE', token }),
  },
};

export { API_BASE_URL };
