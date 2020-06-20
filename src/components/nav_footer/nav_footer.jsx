import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { history } from 'umi';
import './index.less';

const Item = TabBar.Item;
export default class NavFooter extends Component {
  render() {
    const { Navlist, pathname, unReadCount } = this.props;

    return (
      <div>
        <TabBar>
          {Navlist.map((nav, index) => (
            <Item
              key={index}
              badge={nav.path == '/clients/message' ? unReadCount : 0}
              title={nav.title}
              icon={{ uri: require(`../../assets/foot_icon/${nav.icon}.png`) }}
              selectedIcon={{
                uri: require(`../../assets/foot_icon/${nav.icon}-selected.png`),
              }}
              selected={nav.path === pathname}
              onPress={() => history.push(nav.path)}
            ></Item>
          ))}
        </TabBar>
      </div>
    );
  }
}
