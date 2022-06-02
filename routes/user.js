const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getstudents", userController.getstudents);
// router
//   .route("/user/:id")
//   .get(userController.userInfo)
//   .put(userController.userInfoUpdate)
//   .delete(userController.userDelete);
module.exports = router;
