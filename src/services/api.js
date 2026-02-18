import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/banking';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.error('Resource not found');
    }
    return Promise.reject(error);
  }
);

// Banking API calls
export const bankingAPI = {
  // Create customer endpoints
  createAccountSimple: (data) => apiClient.post('/CreateAccount', data),
  createCustomer: (data) => apiClient.post('/', data),

  // Read endpoints
  getAllCustomers: () => apiClient.get('/View'),
  getCustomerById: (id) => apiClient.get(`/search/${id}`),
  getActiveCustomers: () => apiClient.get('/active'),
  getHighIncomeCustomers: () => apiClient.get('/highincome'),
  getSortedCustomers: (sortBy = 'name', order = 'asc') =>
    apiClient.get('/', { params: { sortBy, order } }),

  // Update endpoints
  updateCustomer: (id, data) => apiClient.put(`/update/${id}`, data),

  // Deactivate endpoint
  deactivateCustomer: (id) => apiClient.get(`/deactive/${id}`),
};

export default apiClient;
