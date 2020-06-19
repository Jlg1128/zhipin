import React, { Component } from 'react';
import { connect } from 'umi';
import UserList from '../../components/userlist/userlist';

class Laoban extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'user/getUserListAsync',
      payload: 'dashen',
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
export default connect(mapStateToProps)(Laoban);
