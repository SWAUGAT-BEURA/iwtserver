const express = require("express");
const router = express.Router();

const facultyController = require("../controllers/facultyController");

router.post("/facultyregister", facultyController.register);
router.post("/facultylogin", facultyController.login);
router.get("/getfaculties", facultyController.getfaculties);
// router
//   .route("/faculty/:id")
//   .get(facultyController.userInfo)
//   .put(facultyController.userInfoUpdate)
//   .delete(facultyController.userDelete);
module.exports = router;
