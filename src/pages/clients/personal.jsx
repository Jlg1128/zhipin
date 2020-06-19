import React, { Component } from 'react';
import {
  Result,
  List,
  WhiteSpace,
  Button,
  Modal,
  WingBlank,
  Toast,
} from 'antd-mobile';
import { connect, history } from 'umi';
import Cookies from 'js-cookie';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

class Personal extends Component {
  constructor(props) {
    super(props);
  }
  showAlert = () => {
    alert('退出 ', '确定退出登录吗', [
      { text: '取消', onPress: () => {} },
      {
        text: '确定',
        onPress: () => {
          Cookies.remove('userid'),
            this.props.dispatch({ type: 'user/resetUser' });
        },
      },
    ]);
  };
  quit = () => {};
  render() {
    if (this.props.user.username == '') {
      history.push('/login');
    }
    const { username, type, company, post, salary, info } = this.props.user;
    let header =
      this.props.user.header == '' ? '头像1' : this.props.user.header;
    return (
      <div>
        <Result
          style={{ marginTop: 50 }}
          img={
            <img
              src={require(`../../assets/images/head/${header}.jpg`)}
              style={{ width: 60, height: 60, borderRadius: '50%' }}
            />
          }
          title={username}
          message={company}
        ></Result>
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位：{post}</Brief>
            <Brief>简介：{info}</Brief>
            {salary ? <Brief>薪资：{salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <Button type="warning" onClick={this.showAlert}>
          退出登录
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user.user };
}
export default connect(mapStateToProps)(Personal);
