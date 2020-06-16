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
import { connect } from 'dva';
import { history } from 'umi';
import cssobj from './index.less';
const ListItem = List.Item;
class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    type: '', //大神,老板,
    msg: '',
  };
  handleChange = (name, val) => {
    this.setState({ [name]: val });
  };
  register = () => {
    const user = this.state;
    if (
      user.username == '' ||
      user.password == '' ||
      user.type == '' ||
      user.password2 == ''
    ) {
      this.props.dispatch({
        type: 'user/getUser',
        payload: { ...user, msg: '必填项不能为空' },
      });
    } else if (user.password !== user.password2) {
      this.props.dispatch({
        type: 'user/getUser',
        payload: { ...user, msg: '两次密码不一致' },
      });
    } else {
      this.props.dispatch({
        type: 'user/getRegisterAsync',
        payload: user,
      });
    }
  };

  toLogin = () => {
    history.push('/login');
  };
  isRedirect = () => {
    const { redirect } = this.props.user;
    if (redirect == '') {
      return null;
    } else {
      history.push(redirect);
    }
  };
  render() {
    const { type } = this.state;
    const { msg, redirect } = this.props.user;
    this.isRedirect();

    return (
      <div>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <div className={cssobj.tishi}>{msg == '' ? null : msg}</div>
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
            <InputItem
              placeholder="请确认密码"
              type="password"
              onChange={val => this.handleChange('password2', val)}
            >
              确认密码:
            </InputItem>
            <WhiteSpace />
            <ListItem>
              <span>用户类型</span>
              &nbsp;&nbsp;&nbsp;
              <Radio
                checked={type === 'dashen'}
                onChange={val => this.handleChange('type', 'dashen')}
              >
                大神
              </Radio>
              &nbsp;&nbsp;&nbsp;
              <Radio
                checked={type === 'laoban'}
                onChange={val => this.handleChange('type', 'laoban')}
              >
                老板
              </Radio>
            </ListItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>
              注 &nbsp;&nbsp;&nbsp;册
            </Button>
            <WhiteSpace />
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user.user };
}
export default connect(mapStateToProps)(Register);
