// API client for backend communication
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

class ApiClient {
  private async request(url: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE}${url}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Something went wrong');
    }

    return response;
  }

  async get(url: string) {
    const response = await this.request(url);
    return response.json();
  }

  async post(url: string, data?: unknown) {
    const response = await this.request(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  }

  async patch(url: string, data: unknown) {
    const response = await this.request(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async delete(url: string) {
    const response = await this.request(url, {
      method: 'DELETE',
    });
    return response.json();
  }
}

export const apiClient = new ApiClient();