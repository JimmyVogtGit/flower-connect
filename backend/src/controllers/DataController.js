const models = require("../models");

class DataController {
  static findByUuid = (req, res) => {
    const { uuid } = req.params;
    models.flower
      .find(uuid)
      .then(([row]) => {
        if (row) {
          res.status(200).send(row);
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
    models.flower_user.findId(datas.uuid).then((response) => {
      const { userid } = response[0][0];

      models.flower
        .postPublish(datas, userid)
        .then(() => {
          const { affectedRows } = response[0];
          if (affectedRows === 1) {
            res.status(200).send("datas are publish");
          } else {
            res.status(400).send("error");
          }
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });
  };

  static findIot = (req, res) => {
    const { uuid } = req.params;
    models.flower
      .find(uuid)
      .then(([response]) => {
        const uuidExist = response.length;
        if (uuidExist > 0) {
          res.status(200).send(true);
        } else {
          res.status(200).send(false);
        }
      })
      .catch((err) => res.status(400).send(err));
  };

  static changeLight = (req, res) => {
    console.log(req.body);
    const { light, uuid } = req.body;
    models.flower.changeLight(light, uuid).then((response) => {
      res.status(200).send(true);
    });
  };
}

module.exports = DataController;
