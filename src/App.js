//导入路由
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'

//导入组件
import Login from './pages/Login'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Article from './pages/Article'
import Publish from './pages/Publish'
import { HistoryRouter, history } from './utils/history'


export default function App() {
  return (
    /* 历史路由容器：history用来记录路由的访问记录 */
    <HistoryRouter history={history}>
        {/* 路由出口： */}
        <Routes>
          {/* 直接访问 */}
          <Route path="/login" element={<Login />} />

          {/* 鉴权访问：鉴权组件通过传入children决定是否有权限访问 */}
          <Route path="/" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }>
            {/*  二级路由 */}
            <Route index element={<Home />} /> {/* 默认路由 */}
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
        </Routes>
    </HistoryRouter>
  )
}