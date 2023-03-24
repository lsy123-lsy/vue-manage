/**
 * 对进行网路请求的方法，进行处理
 */
import { baseUrl } from "./env";

export default async(url = '',data = {},type = 'GET',method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;

  // 拼接url地址包括携带的参数
  if(type == 'GET') {
    let dataStr = ''
    Object.keys(data).forEach( key => {
      dataStr += dataStr + '='+ data[key] + '&'
    })

    if(dataStr !== '') {
      dataStr = dataStr.substr(0,dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr;
    }
  }

  if(window.fetch && method == 'fetch') {
    // 请求设置
    let requestConfig = {
      //credentials认证信息， 传递cookie时设置，解决跨域问题
      // 先发起预请求，得到允许请求的方式，允许访问的域，还有是否需要credentials认证信息
      // 之后才进行正式的跨域请求
      credentials:'include',
      method:type,
      // 自定义请求头
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      // 跨域请求的模式
      mode:"CROS",
      // 现在浏览器中查找缓存，无论新旧都使用，如没有匹配项，则重新向服务器请求
      cache:"force-cache"
    }

    if(type == 'POST') {
      // 为requestConfig新增属性并赋值
      // 监听对象属性值得变化，可以为对象添加属性，也可以删除，修改属性
      Object.defineProperty(requestConfig,'body',{
        // 将data转变化json数据，并赋予value
        value:JSON.stringify(data)
      })
    }

    try {
      // 进行fetch请求
      const response = await fetch(url,requestConfig)
      // 设置数据格式，将相应的结果转变为json格式的promise对象
      const responseJson = await response.json()
    } catch (error) {
      throw new Error(error)
    }
  }else {
    return new Promise( (resolve,reject) => {
      let requestObj = new XMLHttpRequest();
      let sendData = ''
      if(type == 'POST') 
      // 设置携带的请求参数
        sendData = JSON.stringify(data)
      requestObj.open(type,url,true)
      requestObj.setRequestHeader("Content-type","application/x-www-form-urlencoded")
      requestObj.send(sendData)

      requestObj.onreadystatechange = () => {
        if(requestObj.readyState === 4) {
          if(requestObj.status === 200) {
            // 获响应结果
            let obj = requestObj.response
            if(typeof obj !== 'object') {
              // 将返回的结果数据类型转换为对象类型
              obj = JSON.parse(obj)
            }
            // 设置异步对象promise请求成功的结果
            resolve(obj)
          }else {
            // 失败的结果
            reject(requestObj)
          }
        }
      }
    })
  }
}