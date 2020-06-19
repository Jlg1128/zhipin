import { reqChatMsg, reqReadMsg } from '../service/services';
import io from 'socket.io-client';
import { GetMsgList, InitIO } from '../utils/index';
import user from './user';
import Cookies from 'js-cookie';

export default {
  namespace: 'message',
  state: {
    users: {},
    chatMsgs: [],
    unReadCount: 0,
  },
  reducers: {
    getMsg(state, action) {
      const newstate = deepClone(state);
      newstate.users = action.payload.users;
      newstate.chatMsgs = action.payload.chatMsgs;
      return newstate;
    },
    receiveMsg(state, action) {
      const newstate = deepClone(state);
      const chatMsgs = action.payload;
      newstate.chatMsgs = chatMsgs;
      return newstate;
    },
    getUpdataMsg(state, action) {
      const newstate = deepClone(state);
      return newstate;
    },
  },
  effects: {
    *getMessageAsync({ payload }, { call, put }) {
      InitIO(payload);
      const userid = Cookies.get('userid');

      if (userid == payload.from || userid == payload.to) {
        yield put({
          type: 'getChatMsgAsync',
        });
      }
    },
    *getChatMsgAsync({ payload }, { call, put }) {
      const response = yield call(reqChatMsg, payload);
      const result = response.data;
      if (response.code === 0) {
        const { users, chatMsgs } = result;
        yield put({
          type: 'getMsg',
          payload: { users, chatMsgs },
        });
      }
    },
    //监听消息
    *receiveChatMsgAsync({ payload }, { call, put }) {
      const response = yield call(reqChatMsg, payload);
      const result = response.data;
      if (response.code === 0) {
        const { users, chatMsgs } = result;
        yield put({
          type: 'getMsg',
          payload: { users, chatMsgs },
        });
      }
    },
    *updataChatMsgAsync({ payload }, { call, put }) {
      const result = yield call(reqReadMsg, payload);
      yield put({
        type: 'getUpdataMsg',
        payload: result,
      });
    },
  },
};
function deepClone(obj) {
  let newobj = JSON.stringify(obj),
    currentObj = JSON.parse(newobj);
  return currentObj;
}
