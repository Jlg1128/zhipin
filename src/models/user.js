import { reqRegister, reqLogin, update } from '../service/services';
import { getRedirectTo } from '../utils/index';
export default {
  namespace: 'user',
  state: {
    user: {
      username: '',
      type: '',
      msg: '',
      redirect: '',
    },
  },
  reducers: {
    getUser(state, action) {
      const newstate = deepClone(state);
      const user = newstate.user;
      newstate.user = { ...user, ...action.payload };
      console.log(newstate);
      return newstate;
    },
  },
  effects: {
    *getRegisterAsync({ payload }, { call, put }) {
      const result = yield call(reqRegister, payload);

      const { type, header } = payload;
      console.log(type);
      if (result.code === 1) {
        yield put({
          type: 'getUser',
          payload: { ...result.msg, msg: '用户名已存在', code: 1 },
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
          payload: { ...result.data, code: 0, redirect: '/' },
        });
      } else {
        yield put({
          type: 'getUser',
          payload: { ...result.msg, code: 1, redirect: '/' },
        });
      }
    },
    *updateAsync({ payload }, { call, put }) {
      const result = yield call(update, payload);

      if (result.code === 0) {
        console.log(result.data);
        yield put({
          type: 'getUser',
          payload: { ...result.data, code: result.code },
        });
      } else {
        yield put({
          type: 'getUser',
          payload: { ...result.msg, code: result.code },
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
