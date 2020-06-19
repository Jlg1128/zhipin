import React, { Component } from 'react';
import Navfooter from '../../components/nav_footer/nav_footer';
import { NavBar } from 'antd-mobile';
import { connect, history } from 'umi';
import Cookies from 'js-cookie';
import { getRedirectTo } from '../../utils/index';

class Main extends Component {
  render() {
    const { user } = this.props;
    if (user.type) {
      const { type, header } = this.props.user;
      let path = getRedirectTo(type, header);
      history.push(path);
    } else {
      history.push('/login');
    }
    return <div></div>;
  }
}

function mapStateToProps(state) {
  return { user: state.user.user };
}

export default connect(mapStateToProps)(Main);
