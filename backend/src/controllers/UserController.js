const models = require("../models");
const { verifyPassword } = require("../services/hashedPassword");
const createToken = require("../services/createJwt");
const verifyToken = require("../services/verifyToken");

class UserController {
  static register = (req, res) => {
    const { email, password, uuid } = req.body;

    models.user.findUser(email).then(([row]) => {
      const findEmail = row.length;
      console.log(findEmail);
      if (findEmail > 0) {
        res.status(400).send("Ce mail existe déjà");
      } else {
        models.user
          .createUser(email, password)
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

  static verifyUser = (req, res) => {
    const { email, password, uuid } = req.body;
    models.user
      .verifyUser(email)
      .then(([user]) => {
        const userid = user[0].id;

        const { password: hash } = user[0];
        if (user.length > 0) {
          verifyPassword(password, hash).then((passwordOk) => {
            if (passwordOk) {
              models.flower_user.publishId(userid, uuid);
              const token = createToken(email);
              res
                .cookie("userCookie", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                })
                .status(200)
                .send(true);
            }
          });
        } else {
          res.status(400).send(false);
        }
      })
      .catch((err) => res.status(400).send(err));
  };

  static authorization = (req, res) => {
    const userEmail = verifyToken(req.cookies.userCookie);

    res.status(200).send(userEmail);
  };

  static logout = (req, res) => {
    res.clearCookie("userCookie");
    res.send(true);
  };
}

module.exports = UserController;
