import React, { Component } from 'react';
import styles from './index.less';
import { Button, NavBar, InputItem, TextareaItem } from 'antd-mobile';
import HeadSelector from '../components/head-selector/head-selector';
import { connect, history } from 'umi';
import Cookies from 'js-cookie';
import user from '../models/user';

class Laobaninfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: '', //头像
      post: '', //职位
      info: '', //个人介绍
      company: '', //company
      salary: '', //工资
    };
  }
  handelChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  };
  save = () => {
    this.props.dispatch({
      type: 'user/updateAsync',
      payload: this.state,
    });
  };
  setHeader = header => {
    this.setState({
      header,
    });
  };
  render() {
    const userid = Cookies.get('userid');
    console.log(userid);
    const { header, type, username } = this.props.user;
    if (header) {
      const path = type == 'laoban' ? '/laoban' : '/dashen';
      history.push(path);
    }
    return (
      <div>
        <NavBar>老板信息完善</NavBar>
        <HeadSelector setHeader={this.setHeader} />
        <InputItem
          placeholder="招聘职位"
          onChange={val => this.handelChange('post', val)}
        >
          招聘职位
        </InputItem>
        <InputItem
          placeholder="公司名称"
          onChange={val => this.handelChange('company', val)}
        >
          公司名称
        </InputItem>
        <InputItem
          placeholder="薪资"
          onChange={val => this.handelChange('salary', val)}
        >
          薪资
        </InputItem>
        <TextareaItem
          title="职位要求"
          rows={3}
          onChange={val => this.handelChange('info', val)}
        ></TextareaItem>
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
export default connect(mapStateToProps)(Laobaninfo);
