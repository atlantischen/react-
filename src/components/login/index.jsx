import React, { Component } from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button, message } from 'antd';
import './index.less';
import logo from './img/logo.png';

// 使用高阶组件获取form属性
@Form.create()
class Login extends Component {
  // 自定义验证规则
  validator = (rule, value, callback) => {
    const name = rule.field === 'username' ? '用户名' : '密码';
    if (!value) {
      callback('请输入' + name);
    } else if (value.length < 4) {
      callback(name + '长度至少大于4位');
    } else if (value.length > 13) {
      callback(name + '长度至少小于13位');
    } else if (!/^\w+$/.test(value)) {
      callback(name + '只能包含英文、数字和下划线');
    } else {
      callback();
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    // 校验并获取一组输入域的值与 Error
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        axios
          .post('/api/login', { username, password })
          .then(res => {
            console.log(res.data);
            if (res.data.status === 0) {
              // 编程时跳转
              this.props.history.push('/');
            } else {
              // 全局提示
              message.error(res.data.msg);
              // 清空
              this.props.form.resetFields(['password']);
            }
          })
          .catch(error => {
            message.error('网络错误');
            this.props.form.resetFields(['password']);
          });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt=' ' />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className='header-section'>
          <h3>用户登录</h3>
          <Form onSubmit={this.handleSubmit} className='login-form'>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  // { required: true, message: 'Please input your username!' }
                  { validator: this.validator }
                ]
              })(
                <Input
                  prefix={
                    <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='请输入用户名'
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  // { required: true, message: 'Please input your Password!' }
                  { validator: this.validator }
                ]
              })(
                <Input
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type='password'
                  placeholder='请输入密码'
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
export default Login;
