import { request } from 'umi';
import user from '../models/user';
import ajax from './ajax';

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
export const update = payload => {
  return request('update', {
    method: 'post',
    params: payload,
  })
    .then(res => {
      return res;
    })
    .catch(err => {});
};
