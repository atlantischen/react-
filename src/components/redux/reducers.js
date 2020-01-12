/**
 * 用来根据prevState和action生成newState函数模块
 */
import {
  combineReducers
} from 'redux';

function aaa(prveState = 111, action) {
  switch (action.type) {
    default: 
      return prveState
  }

}
function bbb(prveState = 222, action) {
  switch (action.type) {
    default: 
      return prveState
  }

}
export default combineReducers({
aaa,bbb
});