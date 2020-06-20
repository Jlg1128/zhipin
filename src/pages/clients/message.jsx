import React, { Component } from 'react';
import { List, Badge } from 'antd-mobile';
import { connect, history } from 'umi';

const Item = List.Item;
const Brief = Item.Brief;

function getLastMsg(chatMsgs, userid) {
  const lastMsgsobj = {};
  chatMsgs.map(msg => {
    const chatid = msg.chat_id;
    let lastMsg = lastMsgsobj[chatid];
    if (msg.to == userid && !msg.read) {
      msg.unReadCount = 1;
    } else {
      msg.unReadCount = 0;
    }
    if (!lastMsg) {
      lastMsgsobj[chatid] = msg;
    } else {
      const unReadCount = lastMsg.unReadCount + msg.unReadCount;
      if (msg.create_time > lastMsg.create_time) {
        lastMsgsobj[chatid] = msg;
      }
      lastMsgsobj[chatid].unReadCount = unReadCount;
    }
  });

  let lastMsgs = Object.values(lastMsgsobj);
  lastMsgs.sort((m1, m2) => {
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
    const lastMsgs = getLastMsg(chatMsgs, user._id);
    return (
      <List style={{ marginTop: 42, marginBottom: 42 }}>
        {lastMsgs.map(msg => {
          const TargetId = msg.to == user._id ? msg.from : msg.to;
          const TargetUser = users[TargetId];
          return (
            <Item
              onClick={() => history.push(`/chat/${TargetId}`)}
              key={msg._id}
              extra={<Badge text={msg.unReadCount}></Badge>}
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
