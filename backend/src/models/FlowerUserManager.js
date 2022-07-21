const AbstractManager = require("./AbstractManager");

class FlowerUserManager extends AbstractManager {
  static table = "flower_user";

  findId(uuid) {
    return this.connection.query(
      `select userid from ${FlowerUserManager.table} where uuid=? `,
      [uuid]
    );
  }

  publishId(userid, uuid) {
    return this.connection.query(
      `insert into ${FlowerUserManager.table} (userid, uuid) values (?,?)`,
      [userid, uuid]
    );
  }
}

module.exports = FlowerUserManager;
