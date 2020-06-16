import React, { Component } from 'react';
import styles from './index.less';
import { Button, NavBar, InputItem, TextareaItem } from 'antd-mobile';
import HeadSelector from '../components/head-selector/head-selector';
import { connect, history, Link, Redirect } from 'umi';

class Dasheninfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: '', //头像
      post: '', //职位
      info: '', //个人介绍
    };
  }
  handelChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  };
  setHeader = header => {
    this.setState({ header });
  };
  save = () => {
    this.props.dispatch({
      type: 'user/updateAsync',
      payload: this.state,
    });
  };

  render() {
    const { header, type, username } = this.props.user;
    if (!username) {
      history.push('/');
    }
    if (header) {
      const path = type == 'laoban' ? '/laoban' : '/dashen';
      history.push(path);
    }
    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeadSelector setHeader={this.setHeader} />
        <InputItem
          placeholder="请输入求职岗位"
          onChange={val => this.handelChange('post', val)}
        >
          求职岗位
        </InputItem>
        <TextareaItem
          placeholder="请输入个人介绍"
          rows={3}
          onChange={val => this.handelChange('info', val)}
        >
          个人介绍
        </TextareaItem>
        <Button type="primary" onClick={this.save}>
          保&nbsp;&nbsp;&nbsp;存
        </Button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.user.user };
}
export default connect(mapStateToProps)(Dasheninfo);
