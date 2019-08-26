import React, { Component } from "react";
import { toTitleCase } from "components/utils.js";

import "./user.scss";

export class User extends Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    const user = this.props.user;
    return (
      <div className="User">
        <img className="User-picture" src={user.picture} alt="" />
        <span className="User-name">
          {`${toTitleCase(user.firstname)} ${toTitleCase(user.lastname)}`}
        </span>
      </div>
    );
  }
}
