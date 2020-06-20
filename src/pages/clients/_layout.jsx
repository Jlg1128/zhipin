import React, { Component } from 'react';
import Navfooter from '../../components/nav_footer/nav_footer';
import { NavBar } from 'antd-mobile';
import { connect, history } from 'umi';
import Cookies from 'js-cookie';
import './_layout.less';
import '../../test/socketio_test';
import message from './message';

class Main extends Component {
  state = {
    Navlist: [
      {
        path: '/clients/laoban',
        title: '大神列表',
        icon: 'dashen',
        text: '大神',
      },
      {
        path: '/clients/dashen',
        title: '老板列表',
        icon: 'laoban',
        text: '老板',
      },
      {
        path: '/clients/message',
        title: '消息列表',
        icon: 'message',
        text: '消息',
      },
      {
        path: '/clients/personal',
        title: '个人中心',
        icon: 'personal',
        text: '个人',
      },
    ],
    type: '',
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'message/getChatMsgAsync',
    });
    const userid = Cookies.get('userid');
    if (!userid) {
      history.push('/login');
    } else {
      this.props.user.username != ''
        ? null
        : this.props.dispatch({
            type: 'user/getUserAsync',
          });
    }
  }
  render() {
    const { Navlist } = this.state;
    const { user } = this.props;
    const pathname = this.props.history.location.pathname;
    const currentNav = Navlist.find(nav => nav.path === pathname);
    const navbar = currentNav ? (
      <NavBar className="sticky-header">{currentNav.title}</NavBar>
    ) : null;
    if (currentNav) {
      if (user.type == 'laoban') {
        Navlist[0].hide = false;
        Navlist[1].hide = true;
      } else {
        Navlist[0].hide = true;
        Navlist[1].hide = false;
      }
    }
    const Navfoot = currentNav ? (
      <Navfooter
        Navlist={Navlist.filter(nav => !nav.hide)}
        pathname={pathname}
        unReadCount={this.props.unReadCount}
      />
    ) : null;
    return (
      <div>
        {navbar}
        {Navfoot}
        {this.props.children}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.user.user, unReadCount: state.message.unReadCount };
}
export default connect(mapStateToProps)(Main);
