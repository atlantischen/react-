// 封装storage

const localStorage=window.localStorage;

export function setItem(key,value){
  // 转换成json字符串
  value =JSON.stringify(value)
  localStorage.setItem(key,value)

}

export function getItem(key){
  let value = localStorage.getItem(key)
  try {
     return JSON.parse(value)
  } catch (error) {
    return value
  }
}
export function removeItem (key){
  localStorage.removeItem(key)
}