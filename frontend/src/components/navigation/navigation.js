import React, { Component } from "react";

import "./navigation.scss";

export class Navigation extends Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <nav className="Navigation">
        <ul className="Navigation-items">
          <li className="Navigation-item">
            <a className="Navigation-link" href="#">
              Users
            </a>
          </li>
          <li className="Navigation-item">
            <a className="Navigation-link" href="#">
              Groups
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
