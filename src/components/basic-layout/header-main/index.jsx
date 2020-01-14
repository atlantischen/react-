import React, { Component } from 'react'
import screenfull from 'screenfull'
import { withRouter } from 'react-router-dom'
import {Button,Icon,Modal } from 'antd'
import { connect } from 'react-redux'

import { removeItem } from '../../../utils/storage'
import { removeUser } from '../../../redux/actions';
import './index.less'

@connect(
  state=>({username: state.user.user && state.user.user.username}),
  {removeUser}
)
@withRouter
class HeaderMain extends Component {
  state ={
    isScreenfull:false
  }
  // 全屏
  screenfull=()=>{
    screenfull.toggle()
  }
  componentDidMount(){
    screenfull.on('change',this.handleScreenChange)
  }
  componentWillUnmount() {
    screenfull.off('change', this.handleScreenChange);
  }
  handleScreenChange=()=>{
    this.setState({
      isScreenfull:!this.state.isScreenfull
    })
  }
  logout=()=>{
    Modal.confirm({
      title:'您确定退出登录吗',
      cancelText:'取消',
      okText:'确认',
      onOk:()=>{
        removeItem('user');
        this.props.removeUser();
        this.props.history.replace('/login')
      }
    })
  }
  render() {
    const {isScreenfull} = this.state
    const {username} = this.props
    return (
      <div className='header-main'>
        <div className='header-top'>
          <Button size ='small' onClick={this.screenfull}>
            <Icon type={isScreenfull ?'fullscreen-exit':'fullscreen'}/>
          </Button>
          <Button className='header-main-lang' size ='small'>English</Button>
          <span>hello,{username}</span>
          <Button type ='link' size='small' onClick={this.logout}>退出</Button>
        </div>
        <div className='header-bottom'>
          <span className='header-main-left'>商品管理</span>
          <span className='header-main-right'>2020/01/14 15:58:37</span>
        </div>
      </div>
    )
  }
}
export default HeaderMain
