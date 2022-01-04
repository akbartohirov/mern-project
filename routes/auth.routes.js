const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
require("dotenv").config({ path: "./config/.env" });

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Minimum characters should be 6").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({
          errors: error.array(),
          message: "Incorrect credentials",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ msg: "User with this email exists" });
      }

      const hashedPass = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPass });

      await user.save();

      res.status(201).json({ msg: "The user created", user });
    } catch (err) {
      res.status(500).send({
        msg: "Invalid credentials",
      });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Please provide your password").exists(),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        res.status(400).json({
          error: error.array(),
          message: "Incorrect credentials",
        });
      }

      console.log({ email, password });

      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({ msg: "Invalid credentials email" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(404).json({ msg: "Invalid credentials password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRETWORD, {
        expiresIn: "1d",
      });

      res.status(200).json({
        user,
        token,
      });
    } catch (err) {
      res.status(500).json({
        msg: "Incorrect credentials",
      });
    }
  }
);

module.exports = router;
