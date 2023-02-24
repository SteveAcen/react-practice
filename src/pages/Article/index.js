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

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    //频道数据
    const [channels, setChannels] = useState([])

    //获取数据：获取频道数据
    useEffect(() => {
        async function getChannels() {
            const res = await http.get("/channels")
            setChannels(res.data.data.channels)
        }
        getChannels()
    }, [])

    //表格列名
    const columns = [
        {
            title: "封面",
            dataIndex: "cover",
            width: 120, //设置列宽
            //render的参数：当前单元格的值，当前行的数据，当前行的索引
            render: cover => <img src={cover.images[0] || img404} alt="封面" style={{ width: 80, height: 60 }} />
        },
        {
            title: "标题",
            dataIndex: "title",
            width: 220,
        },
        {
            title: "状态",
            dataIndex: "status",
            render: status => status === 1 ? <Tag color="green">审核通过</Tag> : <Tag color="red">审核失败</Tag>
        },
        {
            title: "发布时间",
            dataIndex: "pubdate",
        }, {
            title: "阅读数",
            dataIndex: "read_count",
        },
        {
            title: "点赞数",
            dataIndex: "like_count",
        },
        {
            title: "评论数",
            dataIndex: "comment_count",
        },
        //对于没有对应关系的，render传入的数据是整行的数据
        {
            title: '操作',
            render: row => {
                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => history.push(`/publish?id=${row.id}`)}
                        />
                        <Popconfirm
                            title="确认删除该条文章吗?"
                            onConfirm={() => delArticle(row)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }

    ]

    //筛选条件：数据量、偏移量、状态、频道、日期等等.....如果没有代表对应字段无需筛选
    const [params, setParams] = useState({
        page: 1,
        per_page: 10
    })

    //条件修改 → 表单提交：修改筛选条件
    const onSearch = values => {
        const { status, channel_id, date } = values
        // 格式化表单数据
        const _params = {}
        // 格式化status
        _params.status = status
        if (channel_id) {
            _params.channel_id = channel_id
        }
        if (date) {
            _params.begin_pubdate = date[0].format('YYYY-MM-DD')
            _params.end_pubdate = date[1].format('YYYY-MM-DD')
        }
        // 修改params参数 触发接口再次发起，将筛选条件追加到params中
        //筛选条件包括：status、channel_id、begin_pubdate、end_pubdate
        //后台会根据这些条件进行筛选出合适的数据到前台呈现出来
        setParams({
            ...params,
            ..._params
        })
    }

    //条件修改 → 分页提交：修改分页条件
    const pageChange = (page) => {
        // 拿到当前页参数 修改params 引起接口更新
        setParams({
            ...params,
            page
        })
    }

    //条件修改 → 删除数据
    const delArticle = async (data) => {
        await http.delete(`/mp/articles/${data.id}`)
        // 更新列表
        setParams({
            page: 1,
            per_page: 10
        })
    }

    //表格数据
    const [article, setArticleList] = useState({
        list: [],
        count: 0
    })
    //表格数据：获取表格数据
    useEffect(() => {
        async function fetchArticleList() {
            const res = await http.get('/mp/articles', { params }) //这里的params代表筛选条件
            const { results, total_count } = res.data.data
            setArticleList({
                list: results,     //当前页数据 
                count: total_count //总条数
            })
        }
        fetchArticleList()
    }, [params])

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
                    onFinish={onSearch}
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
                            {
                                channels.map((item, index) => {
                                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                                })
                            }
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
                    dataSource={article.list}
                    pagination={{
                        position: ['bottomCenter'],
                        current: params.page,
                        pageSize: params.per_page,
                        onChange: pageChange,
                        total: article.count
                    }}
                />
            </Card>
        </div>
    )
}

export default Article