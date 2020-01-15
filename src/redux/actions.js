import {
  reqLogin,
  getCategoryList
} from '../api';
import {
  setItem
} from '../utils/storage';
import {
  SAVE_USER,
  REMOVE_USER,
  CHANGE_LANGUAGE,
  GET_CATEGORY_LIST

} from './action-types'
const saveUser = (user) => ({
  type: SAVE_USER,
  data:user
})
export const removeUser =()=>({type:REMOVE_USER})
export const getCategory =(categories)=>({type:GET_CATEGORY_LIST,data:categories})
export const changeLanguage = lang => ({ type: CHANGE_LANGUAGE, data: lang });

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

export const getCategoryAsync = () => {
  return dispatch => {
    getCategoryList().then(res=>{
      
      dispatch(getCategory(res))
    })
  }
}