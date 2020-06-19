import React, { Component } from 'react';
import { List, Grid } from 'antd-mobile';
import { connect } from 'umi';
import cssobj from './head-selector';

export default class Headselector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: null,
    };
    this.headlist = [];
    for (let i = 0; i < 20; i++) {
      this.headlist.push({
        text: '头像' + (i + 1),
        icon: require(`../../assets/images/head/头像${i + 1}.jpg`),
      });
    }
  }
  handelClick = ({ text, icon }) => {
    this.setState({ icon });
    this.props.setHeader(text);
  };
  render() {
    const { icon } = this.state;
    const listHeader = !this.state.icon ? (
      '请选择头像'
    ) : (
      <div>
        已选择头像
        <img
          style={{ width: 50, height: 50, borderRadius: '50%' }}
          src={icon}
          alt=""
        />
      </div>
    );
    return (
      <List renderHeader={() => listHeader}>
        <Grid
          data={this.headlist}
          onClick={this.handelClick}
          columnNum={5}
          itemStyle={{ height: 80, width: 80 }}
        ></Grid>
      </List>
    );
  }
}
