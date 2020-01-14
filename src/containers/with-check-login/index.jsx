import React, { Component } from 'react';
import {connect } from 'react-redux';
import { Redirect} from 'react-router-dom'

export default function withCheckLogin(WrappedComponent) {
 @connect (state=>({user:state.user}),null)
  class CheckLogin extends Component {
     // 给组件命名
     static displayName = `checkLogin(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;
      render(){
        const {user:{token},location:{pathname}} =this.props
        if(token){
          // 登录过
          if(pathname === '/login'){
            return <Redirect to='/' />
          }
        }else{
          if(pathname === '/'){
            return <Redirect to='/login' />
          }
        }
        return <WrappedComponent {...this.props}/>
      }
  }
  return CheckLogin;
}
