const models = require("../models");

class DataController {
  static find = (req, res) => {
    models.flower
      .find()
      .then(([rows]) => {
        if (rows) {
          res.status(200).send(rows);
        } else {
          res.status(404);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  };

  static publish = (req, res) => {
    const datas = req.body;

    models.flower
      .postPublish(datas)
      .then((response) => {
        if (response) {
          res.status(200);
        } else {
          res.status(400);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  };
}

module.exports = DataController;
