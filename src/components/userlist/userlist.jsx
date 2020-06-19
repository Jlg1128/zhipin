import React, { Component } from 'react';
import { TabBar, WingBlank, Card, WhiteSpace } from 'antd-mobile';
import { history } from 'umi';
import './index.less';
import propTypes from 'prop-types';
const Header = Card.Header;
const Body = Card.Body;
export default class NavFooter extends Component {
  static propTypes = {
    userlist: propTypes.array.isRequired,
  };

  render() {
    const { userlist } = this.props;

    return (
      <WingBlank style={{ marginBottom: 60, marginTop: 50 }}>
        {userlist.map((user, index) => (
          <div key={user.username}>
            <WhiteSpace />
            <Card onClick={() => history.push(`/chat/${user._id}`)}>
              <Header
                thumb={require(`../../assets/images/head/${user.header}.jpg`)}
                extra={user.username}
                thumbStyle={{ width: 50, height: 50 }}
              />
              <Body>
                <div>职位:&nbsp;&nbsp;&nbsp;{user.post}</div>
                <div>公司:&nbsp;&nbsp;&nbsp;{user.company}</div>
                <div>月薪:&nbsp;&nbsp;&nbsp;{user.salary}</div>
                <div>描述:&nbsp;&nbsp;&nbsp;{user.info}</div>
              </Body>
            </Card>
          </div>
        ))}
      </WingBlank>
    );
  }
}
