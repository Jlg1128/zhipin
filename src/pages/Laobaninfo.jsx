import React, { Component } from 'react';
import styles from './index.less';
import { Button, NavBar, InputItem, TextareaItem } from 'antd-mobile';
import HeadSelector from '../components/head-selector/head-selector';
import { connect, history } from 'umi';
import Cookies from 'js-cookie';
import { getRedirectTo } from '../utils/index';

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
  componentDidMount() {
    const userid = Cookies.get('userid');
    const { _id } = this.props.user;
    if (userid && !_id) {
      this.props.dispatch({
        type: 'user/getUserAsync',
      });
    }
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
    const { header, type } = this.props.user;
    if (!userid) {
      history.push('/login');
    } else {
      let path = this.props.history.location.pathname;
      if (path == '/') {
        path = getRedirectTo(header, type);
        history.push(path);
      }
    }
    if (header) {
      const path2 = type == 'laoban' ? '/clients/laoban' : '/clients/dashen';
      history.push(path2);
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
