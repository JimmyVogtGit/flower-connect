const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  findUserId(uuid) {
    return this.connection.query(`SELECT id FROM user where uuid=?`, [uuid]);
  }
}

module.exports = UserManager;
