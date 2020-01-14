import {
  reqLogin
} from '../api';
import {
  setItem
} from '../utils/storage';
import {
  SAVE_USER,
  REMOVE_USER
} from './action-types'
const saveUser = (user) => ({
  type: SAVE_USER,
  data:user
})
export const removeUser =()=>({type:REMOVE_USER})
export const saveUserAsync = (username, password) => {
  return dispatch => {
    return reqLogin(username, password).then(res => {
      
      // 把数据存到localstorage中
      setItem('user', res);
      // 让redux也更新
      dispatch(saveUser(res))
      
    })
  }
}