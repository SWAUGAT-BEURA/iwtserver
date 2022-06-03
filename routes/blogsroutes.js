const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const blogsController = require("../controllers/blogscontroller");

router.get("/blogs", blogsController.getblogs);
router.post("/postblogs", blogsController.postblog);

module.exports = router;
