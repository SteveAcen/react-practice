import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 导入antd样式文件
import 'antd/dist/antd.min.css' //注意这里需要安装低版本的antd才行：yarn add antd@^4.24.2
// 引入index.scss文件：用来覆盖antd的样式
import './index.scss'; //注意安装完成后需要重新启动yarn start才行


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
    <App />
);
