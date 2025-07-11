import axios from "axios";
import queryString from "query-string";
import apiConfig from "./apiConfig";
import cacheService from "../services/cacheService";

const axiosClientOptimized = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

// Request interceptor for caching
axiosClientOptimized.interceptors.request.use(async (config) => {
  // Skip caching for non-GET requests
  if (config.method !== 'get') {
    return config;
  }

  // Generate cache key
  const cacheKey = cacheService.generateKey(config.url, config.params);
  
  // Check cache
  const cachedData = cacheService.get(cacheKey);
  if (cachedData) {
    // Return cached data
    const response = {
      data: cachedData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
      request: {}
    };
    return Promise.reject({
      __cached: true,
      response
    });
  }

  return config;
});

// Response interceptor for caching
axiosClientOptimized.interceptors.response.use(
  (response) => {
    // Cache successful GET responses
    if (response.config.method === 'get' && response.status === 200) {
      const cacheKey = cacheService.generateKey(
        response.config.url, 
        response.config.params
      );
      cacheService.set(cacheKey, response.data);
    }

    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle cached responses
    if (error.__cached) {
      return error.response.data;
    }
    
    throw error;
  }
);

export default axiosClientOptimized; 