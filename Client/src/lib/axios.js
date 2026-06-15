import axios from 'axios'
import { API_URL } from '../utils/env'
import { getStoredToken, clearStoredAuth } from '../utils/authStorage'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// Attach the JWT as a Bearer token on every request when present.
api.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// On 401, clear the stale session so route guards redirect to login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearStoredAuth()
    }
    return Promise.reject(error)
  }
)

export default api
