const { Router } = require("express");
const Link = require("../models/links");
const router = Router();

router.get("/:code", async (req, res) => {
  try {
    const code = req.params.code;

    const link = await Link.findOne({ code });

    if (!link) {
      return res.status(404).json({ msg: "Link is not found" });
    }

    link.clicks = link.clicks + 1;
    await link.save();
    res.status(200).redirect(link.from);
  } catch (err) {}
});

module.exports = router;
