const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

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
  },
  food: {
    all: () => apiRequest('/food'),
  },
};

export { API_BASE_URL };
