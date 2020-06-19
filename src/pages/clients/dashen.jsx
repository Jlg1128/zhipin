import React, { Component } from 'react';

import { Button, NavBar, InputItem, TextareaItem } from 'antd-mobile';
import { connect, history } from 'umi';
import Cookies from 'js-cookie';
import UserList from '../../components/userlist/userlist';

class Dashen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'user/getUserListAsync',
      payload: 'laoban',
    });
  }
  render() {
    return (
      <div>
        <UserList userlist={this.props.userlist} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user.user, userlist: state.user.userlist };
}
export default connect(mapStateToProps)(Dashen);
