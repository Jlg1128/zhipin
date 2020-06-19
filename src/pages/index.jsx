import React, { Component } from 'react';
import styles from './index.less';
import { Button } from 'antd-mobile';
import { connect, history } from 'umi';

export default class Main extends Component {
  componentDidMount() {
    history.push('/login');
  }
  render() {
    return <div></div>;
  }
}
