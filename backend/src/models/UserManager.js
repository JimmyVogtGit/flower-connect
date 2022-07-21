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

  createUser(email, password, uuid) {
    return hashPassword(password).then((hash) => {
      return this.connection.query(
        `INSERT INTO ${UserManager.table} (email, password, uuid) values (?,?,?)  `,
        [email, hash, uuid]
      );
    });
  }
}

module.exports = UserManager;
