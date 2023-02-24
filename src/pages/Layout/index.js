import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,  //首页
    DiffOutlined,  //差异
    EditOutlined,  //编辑
    LogoutOutlined //退出
} from '@ant-design/icons'
import './index.scss'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useStore } from '@/store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

const { Header, Sider } = Layout

const GeekLayout = () => {
    //用户信息
    const {userStore} = useStore()
    useEffect(() => {
        try{
            userStore.getUserInfo()
        }
        catch(err){
            console.log(err)
        }
    },[userStore])
    

    //导航数据
    const menuItems = [
        { key: '/', icon: <HomeOutlined />, label: <Link to="/">数据概览</Link>},
        { key: '/article', icon: <DiffOutlined />, label: <Link to="/article">内容管理</Link> },
        { key: '/publish', icon: <EditOutlined />, label: <Link to="/publish">发布文章</Link> },
    ]

     //导航高亮：获取当前激活的path路径
    const {pathname} = useLocation()
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{userStore.userInfo.name}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys = {pathname} //默认选中的菜单项，与key对应
                        selectedKeys={pathname}
                        style={{ height: '100%', borderRight: 0 }}
                        items={menuItems}
                    >
                    </Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet/> {/* Outlet是react-router-dom提供的组件，用于渲染路由对应的组件，外部传入的路由放在这里 */}
                </Layout>
            </Layout>
        </Layout>
    )
}

export default observer(GeekLayout)
//一个：export、import可以有多个，export default仅有一个，故而导入的时候可以取任何名字
//无号：通过export方式导出，在导入时要加{ }，并且名字要对应上、export default则不需要

