const express = require("express");
const dotenv = require("dotenv");
const shortid = require("shortid");
const router = express.Router();
const Link = require("../models/links");
const auth = require("../middleware/auth.middleware");

dotenv.config({ path: "../config/.env" });

router.post("/generate", auth, async (req, res) => {
  try {
    const baseURL = process.env.baseURL;
    const { from } = req.body;
    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.status(200).json({ link: existing });
    }

    const to = baseURL + "/t/" + code;

    const newLink = new Link({ code, to, from, owner: req.user.userId });

    await newLink.save();

    res.status(201).json({ newLink });
  } catch (e) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.status(200).send(links);
  } catch (e) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({ msg: "Not found" });
    }

    res.status(200).json({ link });
  } catch (e) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
