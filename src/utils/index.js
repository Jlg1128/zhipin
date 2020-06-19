import io from 'socket.io-client';
export function getRedirectTo(type, header) {
  let path;
  if (type == 'laoban') {
    path = '/clients/laoban';
  } else {
    path = '/clients/dashen';
  }
  if (!header) {
    path = type + 'info';
  }
  return path;
}
export function InitIO(payload) {
  if (!io.socket) {
    io.socket = io('ws://127.0.0.1:3000');
    io.socket.on('receiveMsg', function(chatMsg) {});
  }
  io.socket.emit('sendMsg', payload);
}
export function GetMsgList() {}
