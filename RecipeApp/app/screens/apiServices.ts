const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions {
  method?: HttpMethod;
  body?: any;
  headers?: HeadersInit;
}

const fetchAPI = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const { method = 'GET', body, headers } = options;

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
};

export const api = {
  getMealsByCategory: (category: string) => fetchAPI<{ meals: any[] }>(`filter.php?c=${category}`),
  getMealById: (id: string) => fetchAPI<{ meals: any[] }>(`lookup.php?i=${id}`),
  getRandomMeal: () => fetchAPI<{ meals: any[] }>('random.php'),
};

export default api;
