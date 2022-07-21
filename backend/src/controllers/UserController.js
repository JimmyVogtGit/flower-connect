const models = require("../models");

class UserController {
  static register = (req, res) => {
    const { email, password, uuid } = req.body;

    models.user.findUser(email).then((row) => {
      const findEmail = row[0][0];
      if (findEmail) {
        res.status(400).send("Ce mail existe déjà");
      } else {
        models.user
          .createUser(email, password, uuid)
          .then((response) => {
            if (response[0].affectedRows === 1) {
              res.status(200).send("Utilisateur crée");
            } else {
              res.status(400).send("bad request");
            }
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    });
  };
}

module.exports = UserController;
