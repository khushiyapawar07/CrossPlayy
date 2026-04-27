const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: string;
};

export async function apiRequest(path: string, options: RequestOptions = {}) {
  const { method = 'GET', body, token } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export const api = {
  auth: {
    login: (payload: { email: string; password: string }) => apiRequest('/auth/login', { method: 'POST', body: payload }),
    register: (payload: { username: string; email: string; password: string; phone?: string }) =>
      apiRequest('/auth/register', { method: 'POST', body: payload }),
    profile: (token: string) => apiRequest('/auth/profile', { token }),
  },
  stations: {
    all: () => apiRequest('/stations'),
    byType: (type: 'ps5' | 'pc') => apiRequest(`/stations/type/${type}`),
  },
  bookings: {
    create: (token: string, payload: unknown) => apiRequest('/bookings', { method: 'POST', token, body: payload }),
    my: (token: string) => apiRequest('/bookings/user/my-bookings', { token }),
    allAdmin: (token: string) => apiRequest('/bookings/admin/all', { token }),
    slots: (stationId: string, date: string) => apiRequest(`/bookings/slots/${stationId}/${date}`),
    update: (token: string, bookingId: string, payload: unknown) =>
      apiRequest(`/bookings/${bookingId}`, { method: 'PUT', token, body: payload }),
    cancel: (token: string, bookingId: string) =>
      apiRequest(`/bookings/${bookingId}/cancel`, { method: 'POST', token }),
  },
  food: {
    all: () => apiRequest('/food'),
  },
};

export { API_BASE_URL };
