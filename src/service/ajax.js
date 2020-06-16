import { request } from 'umi';

export default function ajax(url, data = {}, type = 'get') {
  if (type == 'get') {
    let paramStr = '';
    Object.keys(data).forEach(key => {
      paramStr += key + '=' + data[key] + '&';
    });
    if (paramStr) {
      paramStr = paramStr.substring(0, paramStr.length - 1);
    }
    return request(url + '?' + paramStr, { method: 'get' });
  } else {
    return request(url + '?' + paramStr, { method: 'post' });
  }
}
