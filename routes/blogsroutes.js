const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const blogsController = require("../controllers/blogscontroller");

router.get("/blogs", auth, blogsController.getblogs);
router.post("/postblogs", auth, blogsController.postblog);

module.exports = router;
