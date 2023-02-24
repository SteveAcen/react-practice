const TOKEN_KEY = "geek_pc"

//获取TOKEN
const getToken = () => localStorage.getItem(TOKEN_KEY)

//设置TOKEN
const setToken = (token) => localStorage.setItem(TOKEN_KEY,token)

//删除TOKEN
const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export { getToken, setToken, removeToken}