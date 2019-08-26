const alasql = require("alasql");
const fetch = require("node-fetch");

function Database() {
  this.db = new alasql.Database();
  this._id = 0;
  const r = this.db.exec(`CREATE TABLE users (
    id INT NOT NULL,
    firstname VARCHAR(20), 
    lastname VARCHAR(20),
    picture TEXT,
    fullname VARCHAR(40),
    active BOOLEAN(40)
  )`);
  fetch("https://randomuser.me/api/?page=3&results=100&seed=abc")
    .then(resp => resp.json())
    .then(data => {
      const users = data.results.map((elm, id) => ({
        id: id,
        firstname: elm.name.first,
        lastname: elm.name.last,
        picture: elm.picture.thumbnail,
        fullname: `${elm.name.first} ${elm.name.last}`,
        active: true
      }));
      this._id = users.length;
      this.db.tables.users.data = users;
    })
    .catch(error => {
      console.error(error);
    });
}

Database.prototype.execute = function(query) {
  if (process.argv.includes("--debug")) {
    console.log(query);
  }
  return this.db.exec(query);
};

Database.prototype.getUsers = function(id) {
  let where = "WHERE active=true";
  if (id) {
    where = `WHERE id=${id} AND active=true`;
  }
  return this.execute(`SELECT * FROM users ${where} ORDER BY id DESC`);
};

Database.prototype.saveUser = function(firstname, lastname, picture) {
  const fullname = `${firstname} ${lastname}`;
  const res = this.execute(`INSERT INTO users (
    id,
    firstname,
    lastname,
    picture,
    fullname,
    active) VALUES(
      "${this._id++}",
      "${firstname}",
      "${lastname}",
      "${picture}",
      "${fullname}",
      true
    )`);
  if (res) {
    return this.execute(`SELECT * FROM users WHERE 
      firstname="${firstname}" AND
      lastname="${lastname}" AND
      picture="${picture}" AND
      fullname="${fullname}" AND
      active=true`);
  }
};

Database.prototype.deleteUser = function(id) {
  // const res = this.execute(`UPDATE users SET active=false WHERE id=${1}`);
  const res = this.execute(`DELETE FROM users WHERE id=${id}`);
  return {
    message: res ? "deleted" : "failure deleting file"
  };
};

const db = new Database();

function getUsers(req, res) {
  res.status(200).json(db.getUsers(req.params.id));
}

function saveUser(req, res) {
  const { firstname, lastname, picture } = req.body;
  if (!firstname || !lastname || !picture) {
    return res.status(400).json({ message: "Missing values" });
  }
  res.status(200).json(db.saveUser(firstname, lastname, picture));
}

function deleteUser(req, res) {
  try {
    const resp = db.deleteUser(req.params.id);
    res.status(201).json(resp);
  } catch (error) {
    console.log(error);
    res.status(406).json({ message: error.message });
  }
}

/**
 * Routes format is created to order all API endpoints.
 * {
 *   "<ROUTE>": {
 *     "<METHOD>": function(req, res) {}
 *   }
 * }
 *
 * E.g.
 * {
 *   "user": {
 *     "get": function(req, res) {
 *       res.status(401).json({message: 'invalis credentials'});
 *     }
 *   }
 * }
 */
const routes = {
  "/": {
    get: (req, res) => res.json({ status: "Ok" })
  },
  "/user": {
    get: getUsers,
    post: saveUser
  },
  "/user/:id": {
    get: getUsers,
    // put
    delete: deleteUser
  }
};

module.exports = routes;
