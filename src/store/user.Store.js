import { makeAutoObservable } from 'mobx'; 
import { http } from '@/utils'

class UserStore {
    constructor(){
        //响应式
        makeAutoObservable(this);
    }
    userInfo = {}
    async getUserInfo(){
        //调用登录接口
        const res = await http.get('/user/profile');
        //保存数据
        this.userInfo = res.data.data 
    }
}

export default UserStore