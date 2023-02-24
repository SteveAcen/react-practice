import React from 'react';
import LoginStore from './login.Store'
import UserStore from './user.Store'


//根存储模块
class RootStore{
    constructor(){
        //登录信息
        this.loginStore = new LoginStore();
        //用户信息
        this.userStore = new UserStore();   
    }
}

const StoresContext = React.createContext(new RootStore());     //创建上下文对象，当没有提供Provider时，使用传入的默认值
export const useStore = () => React.useContext(StoresContext);  
//当使用useContext时，会往上找到最近的Provider，然后使用它的value值作为useContext的返回值
//如果没有找到Provider，就使用传入的默认值，即这里的new RootStore()作为useContext的返回值