const express = require("express");
const router = express.Router();

router.get("/:movieId", (req, res) => {
  res.render("pages/details");
});

module.exports = router;
