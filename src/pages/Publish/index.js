import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import http from '@/utils/http'

const { Option } = Select

const Publish = () => {
  //1、频道数据
  const [channels, setChannels] = useState([])
  useEffect(() => {
    async function getChannels() {
      const res = await http.get('/channels')
      setChannels(res.data.data.channels)
    }
    getChannels()
  }, [])

  //2、图片数据
  const fileListRef = useRef([]) //暂存图片地址的仓库
  const [fileList, setFileList] = useState([])
  const onUploadChange = info => {
    console.log(info)
    const fileList = info.fileList.map(file => {
      if (file.response) {
        console.log(file.response) //注意这里不能上传太大的图片，会直接报错！！！
        return {
          url: file.response.data.url
        }
      }
      return file
    })
    fileListRef.current = fileList //暂存仓库
    setFileList(fileList)
  }

  //3、图片数量
  const [imgCount, setImgCount] = useState(1)
  const changeType = e => {
    const count = e.target.value
    setImgCount(count)
    //选一张图片
    if (count === 0) {
      setFileList([])
    }
    else if (count === 1) {
      setFileList(fileListRef.current.slice(0, 1))
    }
    //选三张图片
    else if (count === 3) {
      setFileList(fileListRef.current)
    }
  }

  //4、表单提交
  const onFinish = async (values) => {
    console.log(values)
    const { type, ...rest } = values
    const data = {
      ...rest,
      // 注意：接口会按照上传图片数量来决定单图 或 三图
      cover: {
        type,
        images: fileList.map(item => item.url)
      }
    }
    if (articleId) {
      // 编辑
      await http.put(`/mp/articles/${data.id}?draft=false`, data)
    } else {
      // 新增
      await http.post('/mp/articles?draft=false', data)
    }
  }

  //5、路由数据：是否存在文章ID  
  const [params] = useSearchParams()
  const articleId = params.get('id')
  // 获取文章数据
  const [form] = Form.useForm()
  useEffect(() => {
    async function getArticle() {
      const res = await http.get(`/mp/articles/${articleId}`)
      console.log(res.data.data)
      const { cover, ...formValue } = res.data.data
      form.setFieldsValue({ ...formValue, type: cover.type })
    }
    if (articleId) {
      // 拉取数据回显
      getArticle()
    }
  }, [form, articleId])
  //设置图片列表
  useEffect(() => {
    async function getArticle() {
      const res = await http.get(`/mp/articles/${articleId}`)
      const { cover, ...formValue } = res.data.data
      // 动态设置表单数据
      form.setFieldsValue({ ...formValue, type: cover.type })
      // 格式化封面图片数据
      const imageList = cover.images.map(url => ({ url }))
      setFileList(imageList)
      setImgCount(cover.type)
      fileListRef.current = imageList
    }
    if (articleId) {
      // 拉取数据回显
      getArticle()
    }
  }, [articleId])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {articleId ? '修改文章' : '发布文章'}
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: '' }}
          onFinish={onFinish}
          form={form}
        >
          {/* 输入 */}
          <Form.Item
            label="文章标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>

          {/* 选择：频道 */}
          <Form.Item
            label="文章频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {
                channels.map((item, index) => {
                  return <Option key={item.id} value={item.id}>{item.name}</Option>
                })
              }
            </Select>
          </Form.Item>

          {/* 选择：封面 */}
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (  //如果imgCount大于0，就显示上传图片的按钮
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          {/* 文本：文本编辑器 */}
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          {/* 按钮：提交 */}
          <Form.Item>
            <Button type="primary" htmlType="submit"  >
              {articleId ? '修改文章' : '发布文章'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish