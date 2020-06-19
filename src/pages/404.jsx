import React, { Component } from 'react';
import styles from './index.less';
import { Button, NavBar, InputItem, TextareaItem } from 'antd-mobile';
import { connect, history } from 'umi';
import Cookies from 'js-cookie';

class Notfound extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>抱歉找不到该页面</h2>
        <Button type="primary" onClick={() => history.push('/')}>
          回到首页
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userinfo: state };
}
export default connect(mapStateToProps)(Notfound);
