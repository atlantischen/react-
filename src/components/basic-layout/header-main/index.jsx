import React, { Component } from 'react'
import screenfull from 'screenfull'
import { withRouter } from 'react-router-dom'
import {Button,Icon,Modal } from 'antd'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl';
import dayjs from 'dayjs'


import menus from '$conf/menus';
import { removeItem } from '../../../utils/storage'
import { removeUser,changeLanguage } from '../../../redux/actions';
import './index.less'
@injectIntl
@connect(
  state=>({
    username: state.user.user && state.user.user.username,
    language:state.language
  }),
  { removeUser,
    changeLanguage}
)
@withRouter
class HeaderMain extends Component {
  state ={
    isScreenfull:false,
    date:Date.now()
  }
  // 全屏
  screenfull=()=>{
    screenfull.toggle()
  }
  componentDidMount(){
    screenfull.on('change',this.handleScreenChange);
    this.timerID = setInterval(() => {
      this.setState({
        date:Date.now()
      })
    }, 1000);

  }
  componentWillUnmount() {
    screenfull.off('change', this.handleScreenChange);
    clearInterval(this.timerID)
  }
  handleScreenChange=()=>{
    this.setState({
      isScreenfull:!this.state.isScreenfull
    })
  }
  logout=()=>{
    const { intl } = this.props;
    Modal.confirm({
      title:intl.formatMessage({ id: 'logout' }),
      onOk:()=>{
        removeItem('user');
        this.props.removeUser();
        this.props.history.replace('/login')
      }
    })
  }
  changeLanguage = () => {
    const language = this.props.language === 'en' ? 'zh-CN' : 'en';
    this.props.changeLanguage(language);
  }
  findTitle=(menus,pathname)=>{
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if(menu.children){
        for (let index = 0; index < menu.children.length; index++) {
          const cMenu = menu.children[index];
          if(cMenu.path === pathname){
            return cMenu.title
          }
        } 
      }else{
        if(menu.path === pathname){
          return menu.title
        }
      }
      
    }
  }
  render() {
    const {isScreenfull,date} = this.state
    const {username,language,location:{pathname}} = this.props
    const title = this.findTitle(menus,pathname)

    return (
      <div className='header-main'>
        <div className='header-top'>
          <Button size ='small' onClick={this.screenfull}>
            <Icon type={isScreenfull ?'fullscreen-exit':'fullscreen'}/>
          </Button>
          <Button className='header-main-lang' size ='small'
            onClick={this.changeLanguage}> {language === 'en' ? '中文' : 'English'}</Button>
          <span>hello,{username}</span>
          <Button type ='link' size='small' onClick={this.logout}>退出</Button>
        </div>
        <div className='header-bottom'>
          <span className='header-main-left'><FormattedMessage id={title} /></span>
          <span className='header-main-right'> {dayjs(date).format('YYYY/MM/DD HH:mm:ss')}</span>
        </div>
      </div>
    )
  }
}
export default HeaderMain
