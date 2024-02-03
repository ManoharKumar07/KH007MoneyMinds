const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const roscaModel = require("../models/Roscamodel");
// const moment = require("moment");

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    //comparing the user entered password with the real password through the user which we got above
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }

    //generating token if we get correct usename and password
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

//

// authController.js

const authController = async (req, res) => {
  try {
    // Retrieve user data based on userId from the middleware
    const user = await userModel.findById(req.userData.id);
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      // Omit sensitive information (e.g., password) before sending the response
      const { _id, username, email, name, fundbalance } = user;
      res.status(200).send({
        success: true,
        data: { _id, username, email, name, fundbalance },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth error",
      success: false,
      error,
    });
  }
};

const updatefund = async (req, res) => {
  try {
    const { amount } = req.body;

    if (isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const userId = req.userData.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update the fundbalance
    user.fundbalance += parseFloat(amount);

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: "Fund balance updated successfully",
      newFundBalance: user.fundbalance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

const createRosca = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      roscaName,
      size,
      amount,
      isAdmin,
      duration,
      aadharNo,
      members,
      bid,
    } = req.body;

    // Create a new rosca document
    const newRosca = new roscaModel({
      roscaName,
      size,
      amount,
      isAdmin,
      duration,
      aadharNo,
      members,
      bid,
    });

    // Save the rosca to the database
    const savedRosca = await newRosca.save();

    res.status(201).json({
      success: true,
      message: "Rosca created successfully",
      data: savedRosca,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getallRosca = async (req, res) => {
  try {
    // Fetch all roscas from the database
    const allRoscas = await roscaModel.find();

    // Check if there are no roscas
    if (allRoscas.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No roscas found.",
      });
    }

    // Return the list of roscas
    res.status(200).json({
      success: true,
      roscas: allRoscas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = getallRosca;

module.exports = {
  loginController,
  registerController,
  authController,
  updatefund,
  createRosca,
  getallRosca,
};
