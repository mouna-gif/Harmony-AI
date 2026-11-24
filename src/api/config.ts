const API_BASE_URL = 'http://localhost:5000/api';

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Une erreur est survenue');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erreur de connexion au serveur');
  }
};

export const api = {
  // Auth
  auth: {
    login: (email: string, password: string) =>
      apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      }),
    register: (userData: { name: string; email: string; password: string; company?: string }) =>
      apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      })
  },

  // Agents
  agents: {
    get: (agentType: string) => apiRequest(`/agents/${agentType}`),
    getAll: () => apiRequest('/agents'),
    sendMessage: (agentType: string, message: string) =>
      apiRequest(`/agents/${agentType}/message`, {
        method: 'POST',
        body: JSON.stringify({ message })
      }),
    clearConversation: (agentType: string) =>
      apiRequest(`/agents/${agentType}/conversation`, {
        method: 'DELETE'
      })
  },

  // Analytics
  analytics: {
    get: () => apiRequest('/analytics'),
    create: (data: any) =>
      apiRequest('/analytics', {
        method: 'POST',
        body: JSON.stringify(data)
      })
  },

  // Sentiment
  sentiment: {
    analyze: (text: string) =>
      apiRequest('/sentiment/analyze', {
        method: 'POST',
        body: JSON.stringify({ text })
      }),
    getHistory: () => apiRequest('/sentiment/history')
  },

  // Risk
  risk: {
    assess: (scenario: string) =>
      apiRequest('/risk/assess', {
        method: 'POST',
        body: JSON.stringify({ scenario })
      }),
    getHistory: () => apiRequest('/risk/history')
  },

  // Predictions
  predictions: {
    get: (timeframe: string = '7days') => apiRequest(`/predictions?timeframe=${timeframe}`),
    create: (data: any) =>
      apiRequest('/predictions', {
        method: 'POST',
        body: JSON.stringify(data)
      })
  },

  // Recommendations
  recommendations: {
    getBySegment: (segment: string) => apiRequest(`/recommendations/${segment}`),
    generateActionPlan: (segment: string) =>
      apiRequest(`/recommendations/${segment}/action-plan`, {
        method: 'POST'
      })
  },

  // Digital Twin
  digitalTwin: {
    simulate: (scenario: string) =>
      apiRequest('/digital-twin/simulate', {
        method: 'POST',
        body: JSON.stringify({ scenario })
      }),
    getHistory: () => apiRequest('/digital-twin/history')
  },

  // Users
  users: {
    getAll: () => apiRequest('/users'),
    getById: (id: string) => apiRequest(`/users/${id}`),
    update: (id: string, data: any) =>
      apiRequest(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    delete: (id: string) =>
      apiRequest(`/users/${id}`, {
        method: 'DELETE'
      }),
    search: (query: string) => apiRequest(`/users/search/${query}`)
  },

  // Monitoring
  monitoring: {
    getMetrics: () => apiRequest('/monitoring/metrics'),
    getDatabaseStatus: () => apiRequest('/monitoring/database'),
    getHistory: () => apiRequest('/monitoring/history')
  }
};

export default api;
