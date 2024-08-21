const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie");
const {verify, verifyAdmin} = require("../auth");

router.get("/all", verify, movieController.getAllMovies);
router.get("/:movieId", verify, movieController.getMovieById);
router.post("/", verify, verifyAdmin, movieController.addMovie);
router.patch("/:movieId", verify, verifyAdmin, movieController.updateMovie);
router.delete("/:movieId", verify, verifyAdmin, movieController.deleteMovie);
router.post("/addMovieComment/:movieId", verify, movieController.addMovieComment);
router.get("/getMovieComments/:movieId", verify, movieController.getMovieComments);

module.exports = router;