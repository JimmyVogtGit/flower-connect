const AbstractManager = require("./AbstractManager");

class DataManager extends AbstractManager {
  static table = "flower";

  find() {
    return this.connection.query(`select * from ${DataManager.table}`);
  }

  postPublish(datas) {
    const { uuid, temperature, humidity, luminosity, light, userid } = datas;
    return this.connection.query(
      `insert into ${DataManager.table} (uuid, temperature, humidity, luminosity, light, user_id) values (?,?,?,?,?,?)`,
      [uuid, temperature, humidity, luminosity, light, userid]
    );
  }
}

module.exports = DataManager;
