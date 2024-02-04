const express = require("express");
const {
  loginController,
  registerController,
  authController,
  updatefund,
  createRosca,
  getallRosca,
  joinRosca,
  getSpecific,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
//router object
const router = express.Router();

//routes
//LOGIN
router.post("/login", loginController);

//REGISTER
router.post("/register", registerController);

// router.post("/getUserData", authMiddleware, authController);
router.post("/getUserData", authMiddleware, authController);

router.post("/updatefund", authMiddleware, updatefund);

router.post("/createrosca", createRosca);

router.post("/getallrosca", getallRosca);

router.post("/join", authMiddleware, joinRosca);

router.post("/getspecific", authMiddleware, getSpecific);

module.exports = router;
