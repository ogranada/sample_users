export class DataProvider {
  constructor() {
    this.host =
      localStorage.getItem("API_HOST") || "http://localhost:3000/api/v1";
  }

  getUsers() {
    return fetch(`${this.host}/user`)
      .then(resp => resp.json())
      .then(data => {
        return Promise.resolve(data);
      });
  }

  deleteUser(user) {
    return fetch(`${this.host}/user/${user.id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
      .then(json => {
        return Promise.resolve(json);
      });
  }
}
