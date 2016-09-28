// 一个参数时,将参数作为key取出值
// 两个参数时,以key value的形式存储
const prefix = 'edonc_';
function storeToken (...args) {
    if (args.length === 1) {
        return window.localStorage.getItem(prefix + args[0])
    }
    window.localStorage.setItem(prefix + args[0], args[1]);
}

// 删除localstorage中的token
function deleteToken(key) {
    window.localStorage.removeItem(prefix + key)
}

export { storeToken, deleteToken }
