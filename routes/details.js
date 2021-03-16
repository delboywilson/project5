const express = require("express");
const router = express.Router();

router.get("/:movieId", (req, res) => {
  res.render("pages/details");
});

// router.get("/averageRating/:movieId", async (req, res) => {
//   let average = await db
//     .any(
//       "SELECT AVG(rating)::numeric(10,1) from ratings WHERE movie_id = $1;",
//       [req.params.movieId]
//     )
//     .then((average) => {
//       let aveValue = average[0].avg;
//       res.send(aveValue);
//     });
// });

module.exports = router;
