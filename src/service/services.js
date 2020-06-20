import { request } from 'umi';

//注册接口
export const reqRegister = payload => {
  return request('/doregister', {
    method: 'post',
    params: payload,
  })
    .then(res => {
      return res;
    })
    .catch(err => {});
};

//登录接口
export const reqLogin = payload => {
  return request('/doLogin', {
    method: 'post',
    params: payload,
  })
    .then(res => {
      return res;
    })
    .catch(err => {});
};

//更新用户接口
export const update = payload => {
  return request('/update', {
    method: 'post',
    params: payload,
  })
    .then(res => {
      return res;
    })
    .catch(err => {});
};

//获取用户信息
export const getUser = () => {
  return request('/user', {
    method: 'get',
  })
    .then(res => {
      return res;
    })
    .catch(err => {});
};

//获取用户列表
export const getList = payload => {
  return request('/list', {
    method: 'get',
    params: payload,
  })
    .then(res => {
      return res;
    })
    .catch(err => {});
};

//获取当前用户的聊天消息列表
export const reqChatMsg = () => {
  return request('/msglist', {
    method: 'get',
  })
    .then(res => {
      return res;
    })
    .catch(err => {});
};

//修改消息为已读
export const reqReadMsg = payload => {
  return request('/readMsg', {
    method: 'post',
    params: payload,
  })
    .then(res => {
      return res;
    })
    .catch(err => {});
};

export const doReadMsgs = payload => {
  console.log(payload);
  return request('/readMsg', {
    method: 'post',
    params: payload,
  })
    .then(res => {
      return res;
    })
    .catch(err => {});
};
