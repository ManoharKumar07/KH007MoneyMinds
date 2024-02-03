const express = require("express");
const {
  loginController,
  registerController,
  authController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
//router object
const router = express.Router();

//routes
//LOGIN
router.post("/login", loginController);

//REGISTER
router.post("/register", registerController);

//route to get user after login using token generated while logging in
router.post("/getUserData", authMiddleware, authController);

module.exports = router;
