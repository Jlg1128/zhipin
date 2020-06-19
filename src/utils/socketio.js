function InitIO() {
  if (!io.socket) {
    io.socket = io('ws://127.0.0.1:3000');
    io.socket.on('receiveMsg', function(data) {
      console.log('客户端就收服务器消息' + data);
    });
  }
  // 连接服务器
}

module.exports = InitIO;
