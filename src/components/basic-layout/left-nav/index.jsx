import React, { Component } from "react";
import { Icon, Menu } from "antd";
import { withRouter, Link } from "react-router-dom";
import menus from "../../../config/menus";
const { SubMenu, Item } = Menu;
@withRouter
class LeftNav extends Component {
  createMenus = menus => {
    return menus.map(menu => {
      if (menu.children) {
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </span>
            }
          >
            {menu.children.map(MenuItem => this.createMenuItem(MenuItem))}
          </SubMenu>
        );
      } else {
        return this.createMenuItem(menu);
      }
    });
  };
  createMenuItem = menu => {
    return (
      <Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Item>
    );
  };
 
  findOpenKeys = (menus, pathname) => {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if (menu.children) {
        const cMenu = menu.children.find(cMenu => pathname === cMenu.path);
        if (cMenu) {
          return menu.path;
        }
      }
    }
  };
  render() {
    const { pathname } = this.props.location;
    const openkey = this.findOpenKeys(pathname, menus);
    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[openkey]}
        mode="inline"
      >
        {this.createMenus(menus)}
      </Menu>
    );
  }
}
export default LeftNav;
