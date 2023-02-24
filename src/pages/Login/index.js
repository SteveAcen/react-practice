
import { Card, Form, Checkbox, Button, Input } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useContext } from 'react'

export default function Login() {
    const navigate = useNavigate()     //路由跳转
    const { loginStore } = useStore()  //登录模块的API
    const onFinish = async (values) => {
        const { mobile, code } = values
        try {
            await loginStore.login({ mobile, code })
            navigate('/')
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="login">
            <Card className="login-container">
                {/* LOGO */}
                <img className='login-logo' src={logo} alt="" />
                {/* 表单 */}
                <Form
                    initialValues={{
                        mobile: '13911111111',
                        code: '246810',
                        remember: false,
                    }}
                    onFinish={onFinish}
                >
                    {/* 输入框：手机号 */}
                    <Form.Item
                        name="mobile" //代表表单项的名称
                        rules={[
                            //必填项
                            { required: true, message: '请输入手机号' },
                            //纯数字：13位的纯数字
                            //^1[3-9]\d{9}$代表 ^1[3-9]代表以1开头，[3-9]代表第二位是3-9的任意一个数字，\d{9}代表后面跟着9个数字，$代表以这个数字结尾
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号',
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    {/* 输入框：验证码 */}
                    <Form.Item
                        name="code"
                        rules={[
                            //必填
                            { required: true, message: '请输入验证码' },
                            //纯数字：6位的纯数字
                            {
                                pattern: /^\d{6}$/,
                                message: '请输入6位数字验证码',
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入验证码" />
                    </Form.Item>
                    {/* 勾选框 */}
                    <Form.Item
                        name="remember"       //代表表单项的名称 
                        valuePropName="checked" //valuePropName用来指定表单项的值的属性
                    >
                        <Checkbox className="login-checkbox-label">
                            我已阅读并同意「用户协议」和「隐私条款」
                        </Checkbox>
                    </Form.Item>
                    {/* 提交项：htmlType代表作为表单的提交，block代表属性将使按钮适合其父宽度*/}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>登录</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}


