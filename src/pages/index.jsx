import React, { Component } from 'react';
import styles from './index.less';
import { Button } from 'antd-mobile';
import { connect, history } from 'umi';

class Main extends Component {
  render() {
    return (
      <div>
        <Button>登录</Button>
      </div>
    );
  }
}

function mapStateToprops(state) {
  return { user: state.user.user };
}
export default connect(mapStateToprops)(Main);
