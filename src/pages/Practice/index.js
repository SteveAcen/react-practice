
import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import http from '@/utils/http'
import { useEffect, useState } from 'react'
import {history} from '@/utils/history'
import ReactFacts from "./ReactFacts"

const { Option } = Select
const { RangePicker } = DatePicker


const tableData = [
    {
        title: ReactFacts.title,
        summary: ReactFacts.summary,
        component: <ReactFacts.component></ReactFacts.component>,
    }
]

const Practice = () => {
    //表格列名
    const columns = [
        {
            title: "标题",
            dataIndex: "title",
        },
        {
            title: "总结",
            dataIndex: "summary",
        }
    ]
    return (
        <div>
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
                style={{ marginBottom: 20 }}
            >
                <Form
                    initialValues={{
                        status: 4,
                    }}>

                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={4}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{ width: 120 }}
                        >
                          
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
                            筛选
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
            <Card title={`根据筛选条件共查询到 count 条结果：`}>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={tableData}
                    expandable={{
                        expandedRowRender: (record) => (
                          <p
                            style={{
                              margin: 0,
                            }}
                          >
                            {record.component}
                          </p>
                        ),
                        rowExpandable: (record) => record.name !== 'Not Expandable',
                      }}
                />
            </Card>
        </div>
    )
}

export default Practice