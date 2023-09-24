import axios, { AxiosInstance } from 'axios'
import { setToken, getToken, setUsername, getUsername } from '@/utils/cookie'
import { v1 } from '@/config/http.api'
type HttpResult<T = any> = {
	code: Number
	message: string
	data: T
}

let baseURL = v1.path
const http = axios.create({
	baseURL,
	timeout: 5000,
	withCredentials: true
})

/* 拦截所有请求 */
http.interceptors.request.use(
	(config) => {
		// showLoading();
		if (!config.headers['token']) {
			config.headers['token'] = getToken()
		}
		if (!config.headers['username']) {
			config.headers['username'] = getUsername()
		}
		return config
	},
	(error) => {
		// errorMessage(NETWORK_ERROR)
		Promise.reject(new Error(error))
	}
)
/* 拦截相应 存储对应的token与username信息 */
http.interceptors.response.use(
	(config) => {
		const url = config.config.url as string
		const { headers, data } = config
		if (['/admin/login'].includes(url)) {
			setToken(headers.token)
			setUsername(headers.username)
		}
		// hideLoading();
		return data
	},
	(error) => {
		// hideLoading();
		// errorMessage(NETWORK_ERROR)
		Promise.reject(new Error(error))
	}
)

export const get = <T = any>(
	...args: Parameters<AxiosInstance['get']>
): Promise<HttpResult<T>> => http.get(...args)
export const post = <T = any>(
	...args: Parameters<AxiosInstance['post']>
): Promise<HttpResult<T>> => http.post(...args)
export const put = <T = any>(
	...args: Parameters<AxiosInstance['put']>
): Promise<HttpResult<T>> => http.put(...args)
export const del = <T = any>(
	...args: Parameters<AxiosInstance['delete']>
): Promise<HttpResult<T>> => http.delete(...args)
export const head = <T = any>(
	...args: Parameters<AxiosInstance['get']>
): Promise<HttpResult<T>> => http.get(...args)
export const request = <T = any>(
	...args: Parameters<AxiosInstance['request']>
): Promise<HttpResult<T>> => http.request(...args)
export const patch = <T = any>(
	...args: Parameters<AxiosInstance['patch']>
): Promise<HttpResult<T>> => http.patch(...args)
export const options = <T = any>(
	...args: Parameters<AxiosInstance['options']>
): Promise<HttpResult<T>> => http.options(...args)

export const $ = http
