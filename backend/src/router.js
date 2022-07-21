const express = require("express");
const validation = require("./middlewares/serviceMiddleware");
const schema = require("./services/userSchema");

const {
  ItemController,
  DataController,
  UserController,
} = require("./controllers");

const router = express.Router();

router.get("/items", ItemController.browse);
router.get("/items/:id", ItemController.read);
router.put("/items/:id", ItemController.edit);
router.post("/items", ItemController.add);
router.delete("/items/:id", ItemController.delete);

router.get("/api/datas/:uuid", DataController.findByUuid);
router.post("/api/datas", DataController.publish);

router.get("/api/users/:uuid");
router.post("/api/user", validation(schema), UserController.register);

router.get("/api/find-iot/:uuid", DataController.findIot);
module.exports = router;
