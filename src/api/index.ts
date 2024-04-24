import axios from 'axios'
import axiosRetry from 'axios-retry'

export enum ERROR_STATUS_CODES {}

const DEFAULT_RETRY_DELAY: number = 500

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000'
})

api.interceptors.response.use((response) => response)
api.interceptors.request.use((request) => request)

axiosRetry(api, { retries: 3, retryDelay: (retryCount) => retryCount * DEFAULT_RETRY_DELAY })
