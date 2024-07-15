import { Container, Row, Col, } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, Form, Input, Checkbox, ConfigProvider, Space } from 'antd';
import { useForm } from "react-hook-form";
import '@ant-design/cssinjs'
import '../css/login.css'
import { useAuth } from '../Context/auth'
import Layout from "../Components/layout/Layout";

function Login() {
  const { setError,  formState: { errors} } = useForm();
  const navigate = useNavigate()
  const [auth,setAuth]=useAuth()
  console.log(auth)
  const [form] = Form.useForm();
  const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
  axios.defaults.withCredentials = true
  const onSubmit = async (values) => {
    console.log(values)
      try {
          await new Promise((resolve) => {
              setTimeout(resolve, 2000)
          })
          axios.post('https://part-time-job-react-js.onrender.com/login', { ...values}).then(async (user) => {
              if (user.data.message === 'Login Successfully') {
                  if (user.data.user.role === 'admin') {
                      localStorage.setItem('atoken', user.data.token);
                      navigate('/admin/layout')
                  }
                  if (user.data.user.role === 'user') {
                      console.log(user.data.user)
                      localStorage.setItem('utoken', user.data.token);
                      navigate('/userhome')
                      setAuth({
                        ...auth,
                        user:user.data.user,
                        token:user.data.token
                      })
                      localStorage.setItem('auth',JSON.stringify(user.data))
                  }
                  console.log(user.data.user.role)
                  if (user.data.user.role === 'Vendor') {
                      sessionStorage.setItem('vemail', user.data.user.email)
                      localStorage.setItem('vtoken', user.data.token);
                      navigate("/vendorhome")
                  }
              } else {
                
                  throw new Error()
              }
          }).catch(err => {
              console.log(err)
              setError('root', {
                  message: 'Incorrect password or email'
              })
          })
      } catch (err) {
          console.log(err)
      }
   }
  
  return (
    <Layout title={'Login'}>
    <section id="login-form" >
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" 
          
           />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
 
          />
        </Form.Item>
        {errors.root && <div className="text-danger">{errors.root.message}</div>}
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" to="/forgotpassword">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>

          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
                  colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
                  colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </ConfigProvider>
          Or <Link to="/signup" className="login-form-regi">register now!</Link>
        </Form.Item>
      </Form>

    </section>
    </Layout>
  )
};

export default Login;