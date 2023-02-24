//登录模块：该数据可能被多个组件共享，所以将其放在store中

import { makeAutoObservable } from 'mobx'; 
//安装：yarn add mobx mobx-react-lite
//mobx：状态管理
//mobx-react-lite：链接mobx和react的中间件

import { setToken, getToken, removeToken, http } from '@/utils'

class LoginStore {
    token = getToken() || "" //获取本地token
    constructor(){
        //响应式
        makeAutoObservable(this);
    }
    
    //登录
    login = async ({mobile,code}) => {
        //调用登录接口
        const res = await http.post('http://geek.itheima.net/v1_0/authorizations',{
            mobile,
            code
        });
        //存入token
        this.token = res.data.data.token;
        //存入本地
        setToken(this.token);
    }

    //退出
    loginOut = () => {
        this.token = ''
        removeToken()
    }
}

export default LoginStore