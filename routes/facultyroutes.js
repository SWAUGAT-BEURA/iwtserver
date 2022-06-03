const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const facultyController = require("../controllers/facultycontroller");

router.post("/facultyregister", facultyController.register);
router.post("/facultylogin", facultyController.login);
router.get("/getfaculties", auth, facultyController.getfaculties);
router
  .route("/faculty/:id")
  .get(facultyController.userInfo)
  .put(facultyController.userInfoUpdate)
  .delete(facultyController.userDelete);
module.exports = router;
