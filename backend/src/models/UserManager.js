const AbstractManager = require("./AbstractManager");
const { hashPassword } = require("../services/hashedPassword");

class UserManager extends AbstractManager {
  static table = "user";

  findUserId(uuid) {
    return this.connection.query(
      `SELECT id FROM ${UserManager.table} where uuid=?`,
      [uuid]
    );
  }

  findUser(email) {
    return this.connection.query(
      `SELECT email FROM ${UserManager.table} where email=?`,
      [email]
    );
  }

  verifyUser(email) {
    return this.connection.query(
      `SELECT * FROM ${UserManager.table} WHERE email=?`,
      [email]
    );
  }

  createUser(email, password) {
    return hashPassword(password).then((hash) => {
      return this.connection.query(
        `INSERT INTO ${UserManager.table} (email, password) values (?,?)  `,
        [email, hash]
      );
    });
  }
}

module.exports = UserManager;
