import React, { Component } from 'react';
import { List, Badge } from 'antd-mobile';
import { connect, history } from 'umi';
import Cookies from 'js-cookie';

const Item = List.Item;
const Brief = Item.Brief;

function getLastMsg(chatMsgs) {
  const lastMsgObjs = {};
  chatMsgs.forEach(msg => {
    const chatId = msg.chat_id;
    let lastMsg = lastMsgObjs[chatId];
    if (!lastMsg) {
      lastMsgObjs[chatId] = msg;
    } else {
      if (msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatId] = msg;
      }
    }
  });
  //得到所有LastMsgs的数组
  const lastMsgs = Object.values(lastMsgObjs);
  //对数组进行降序（按creat_time降序）
  lastMsgs.sort(function(m1, m2) {
    //如果<0,将M1放在前面
    return m2.create_time - m1.create_time;
  });
  return lastMsgs;
}

class Personal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;
    const lastMsgs = getLastMsg(chatMsgs);
    return (
      <List style={{ marginTop: 42, marginBottom: 42 }}>
        {lastMsgs.map(msg => {
          const TargetId = msg.to == user._id ? msg.from : msg.to;
          const TargetUser = users[TargetId];
          return (
            <Item
              onClick={() => history.push(`/chat/${TargetId}`)}
              key={msg._id}
              extra={<Badge text={3}></Badge>}
              thumb={
                TargetUser
                  ? require(`../../assets/images/head/${TargetUser.header}.jpg`)
                  : null
              }
              arrow="horizontal"
            >
              {msg.content}
              <Brief>{TargetUser.username}</Brief>
            </Item>
          );
        })}
      </List>
    );
  }
}
function mapStateToProps(state) {
  return { chat: state.message, user: state.user.user };
}
export default connect(mapStateToProps)(Personal);
