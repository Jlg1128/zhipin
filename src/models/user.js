import {
  reqRegister,
  reqLogin,
  update,
  getUser,
  getList,
} from '../service/services';
import { getRedirectTo, GetMsgList } from '../utils/index';

export default {
  namespace: 'user',
  state: {
    user: {
      username: '',
      type: '',
      msg: '',
      redirect: '',
      header: '', //头像
      post: '', //职位
      info: '', //个人介绍
      company: '', //company
      salary: '', //工资
      _id: '',
    },
    userlist: [
      {
        username: '',
        type: '',
        msg: '',
        redirect: '',
        header: '头像1', //头像
        post: '', //职位
        info: '', //个人介绍
        company: '', //company
        salary: '', //工资
      },
    ],
    inituser: {
      username: '',
      type: '',
      msg: '',
      redirect: '',
      header: '', //头像
      post: '', //职位
      info: '', //个人介绍
      company: '', //company
      salary: '', //工资
    },
  },
  reducers: {
    getUser(state, action) {
      const newstate = deepClone(state);
      const user = newstate.user;
      newstate.user = { ...user, ...action.payload };
      return newstate;
    },
    getUserlist(state, action) {
      const newstate = deepClone(state);
      const userlist = newstate.userlist;
      newstate.userlist = [...action.payload];

      return newstate;
    },
    resetUser(state, action) {
      const newstate = deepClone(state);
      newstate.user = state.inituser;
      return newstate;
    },
  },
  effects: {
    *getRegisterAsync({ payload }, { call, put }) {
      const result = yield call(reqRegister, payload);
      const { type, header } = payload;
      if (result.code === 1) {
        yield put({
          type: 'getUser',
          payload: { msg: '用户名已存在', code: 1 },
        });
      } else {
        yield put({
          type: 'getUser',
          payload: {
            ...result.data,
            msg: '注册成功',
            code: 0,
            redirect: getRedirectTo(type, header),
          },
        });
      }
    },
    *getLoginAsync({ payload }, { call, put }) {
      const result = yield call(reqLogin, payload);
      if (result.code === 0) {
        yield put({
          type: 'getUser',
          payload: {
            ...result.data,
            msg: '成功',
            code: 0,
            redirect: '/clients',
          },
        });
      } else {
        yield put({
          type: 'getUser',
          payload: { msg: result.msg, code: 1, redirect: '/login' },
        });
      }
    },
    *updateAsync({ payload }, { call, put }) {
      const result = yield call(update, payload);

      if (result.code === 0) {
        yield put({
          type: 'getUser',
          payload: { ...result.data, msg: '成功', code: result.code },
        });
      } else {
        yield put({
          type: 'getUser',
          payload: { msg: result.msg, code: result.code },
        });
      }
    },
    *getUserAsync({ payload }, { call, put }) {
      const result = yield call(getUser, payload);
      if (result.code === 0) {
        yield put({
          type: 'getUser',
          payload: { ...result.data, msg: '成功', code: result.code },
        });
      } else {
        yield put({
          type: 'getUser',
          payload: { msg: result.msg, code: result.code },
        });
      }
    },
    *getUserListAsync({ payload }, { call, put }) {
      const result = yield call(getList, payload);

      if (result.code === 0) {
        yield put({
          type: 'getUserlist',
          payload: result.data,
        });
      } else {
        yield put({
          type: 'getUserlist',
          payload: { msg: '失败', code: result.code },
        });
      }
    },
  },
};
function deepClone(obj) {
  let newobj = JSON.stringify(obj),
    currentObj = JSON.parse(newobj);
  return currentObj;
}
