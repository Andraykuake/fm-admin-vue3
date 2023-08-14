import jsCookie from "js-cookie"

const TOKEN = 'TOKEN';
const USERNAME = 'USERNAME';
/**
 * 存储 Token 到 cookie
 * @param token 
 */
export function setToken(token: string) {
    jsCookie.set(TOKEN, token, { expires: 1 }) // 过期时间一天
}

/**
 * 从 cookie 中获取 Token
 * @returns 
 */
export function getToken() {
    return jsCookie.get(TOKEN)
}

/**
 * 从 cookie 中移除 Token
 */
export function removeToken() {
    jsCookie.remove(TOKEN)
}

/**
 * 存储 username 到 cookie
 * @param username 
 */
export function setUsername(username: string) {
    jsCookie.set(USERNAME, username, { expires: 1 }) // 过期时间一天
}

/**
 * 从 cookie 中获取 username
 * @returns 
 */
export function getUsername() {
    return jsCookie.get(USERNAME)
}

/**
 * 从 cookie 中移除 username
 */
export function removeUsername() {
    jsCookie.remove(USERNAME)
}