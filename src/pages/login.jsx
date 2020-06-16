import React, { Component } from 'react';
import {
  Button,
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
} from 'antd-mobile';
import Logo from '../components/logo/logo';
import { history } from 'umi';
import { connect } from 'dva';
const ListItem = List.Item;
class Login extends Component {
  state = {
    username: '',
    password: '',
  };
  handleChange = (name, val) => {
    this.setState({ [name]: val });
  };
  login = () => {
    const user = this.state;
    this.props.dispatch({
      type: 'user/getLoginAsync',
      payload: user,
    });
  };
  toRegister = () => {
    history.push('/register');
  };
  render() {
    const { redirect } = this.props.user;

    redirect == '' ? null : history.push(redirect);
    return (
      <div>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <InputItem
              placeholder="请输入用户名"
              onChange={val => this.handleChange('username', val)}
            >
              用户名:
            </InputItem>
            <WhiteSpace />
            <InputItem
              placeholder="密码"
              type="password"
              onChange={val => this.handleChange('password', val)}
            >
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.login}>
              登&nbsp;&nbsp;&nbsp;录
            </Button>
            <WhiteSpace />
            <Button onClick={this.toRegister}>还没有账户?</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.user.user };
}
export default connect(mapStateToProps)(Login);
