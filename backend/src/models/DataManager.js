const AbstractManager = require("./AbstractManager");

class DataManager extends AbstractManager {
  static table = "flower";

  find(uuid) {
    return this.connection.query(
      `select * from ${DataManager.table} where uuid=? ORDER BY id DESC LIMIT 0,1`,
      [uuid]
    );
  }

  postPublish(datas, userid) {
    const { uuid, temperature, humidity, luminosity, light } = datas;
    return this.connection.query(
      `insert into ${DataManager.table} (uuid, temperature, humidity, luminosity, light, user_id) values (?,?,?,?,?,?)`,
      [uuid, temperature, humidity, luminosity, light, userid]
    );
  }
}

module.exports = DataManager;
