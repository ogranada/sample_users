import React, { Component } from "react";
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import 'whatwg-fetch';
import { User } from "components/user/user";
import "./userslist.scss";

export class Userslist extends Component {
  constructor(props) {
    super(props);
    this.dataProvider = props.dataProvider;
    this.state = {
      users: []
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    return this.updateInformation();
  }

  updateInformation() {
    return this.dataProvider.getUsers()
      .then(users => {
        this.setState({
          users
        });
      });
  }

  deleteUser(user) {
    return () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.dataProvider.deleteUser(user)
            .then(json => {
              this.updateInformation();
            })
        }
      })
    }
  }

  render() {
    const users = this.state.users;
    return (
      <div className="Userslist">
        <table className="Userslist-table">
          <thead className="Userslist-head">
            <tr>
              <th>Name</th>
              <th className="Userslist-centeredColumn">Status</th>
              <th className="Userslist-centeredColumn">Actions</th>
            </tr>
          </thead>
          <tbody className="Userslist-body">
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>
                  <User user={user} />
                </td>
                <td className="Userslist-centeredColumn">
                  <i className="fa fa-check"></i>
                </td>
                <td className="Userslist-centeredColumn">
                  <button className="Userslist-button">
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button className="Userslist-button Userslist-deleteButton" onClick={this.deleteUser(user)}>
                    <i className="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Userslist.propTypes = {
  dataProvider: PropTypes.any,
};
