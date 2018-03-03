import React, { Component } from 'react';
import burger from './burger.png';
import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    }

    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapse() {
    this.setState(
      (prevState, props) => {
        return {collapsed: !prevState.collapsed}
      }
    );
  }

  render() {
    return (
      <div id="menu" collapsed={this.state.collapsed.toString()}>
        <img id="burger" collapsed={this.state.collapsed.toString()} src={burger} onClick={this.toggleCollapse}/>
        <a className="link" collapsed={this.state.collapsed.toString()} href="https://about.marketvote.co">About</a>
      </div>
    );
  }
}

export {
  Menu
}
