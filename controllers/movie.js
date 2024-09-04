const Movie = require("../models/Movie");

module.exports.getAllMovies = (req, res) => {
    if (!Array.isArray(library)) {
        return res.status(500).send({ error: "Invalid library format" });
    }

    return Movie.find()
        .then(movies => res.status(200).json(movies)) // Return the array directly
        .catch(err => res.status(500).send({ error: "Error in Find", details: err }));
};

module.exports.getMovieById = (req, res) => {
    const movieId = req.params.movieId;

    Movie.findById(movieId)
        .then(movie => {
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            res.status(200).json(movie); // Return the movie directly
        })
        .catch(err => res.status(500).send({ error: "Error in Find", details: err }));
};

module.exports.addMovie = (req, res) => {
    const { title, director, year, description, genre } = req.body;

    const newMovie = new Movie({ title, director, year, description, genre });

    return newMovie.save()
        .then(movie => res.status(201).json(movie)) // Return the movie directly
        .catch(err => res.status(500).send({ error: "Error in Save", details: err }));
};

module.exports.updateMovie = (req, res) => {
    const updatedMovie = {
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        description: req.body.description,
        genre: req.body.genre
    };

    return Movie.findByIdAndUpdate(req.params.movieId, updatedMovie, { new: true })
        .then(movie => {
            if (!movie) {
                return res.status(404).send({ message: 'Movie not found' });
            }
            res.status(200).json({ message: 'Movie updated successfully', movie });
        })
        .catch(err => res.status(500).send({ error: "Error in Saving", details: err }));
};

module.exports.deleteMovie = (req, res) => {
    return Movie.findByIdAndDelete(req.params.movieId)
        .then(result => {
            if (!result) {
                return res.status(404).send({ message: 'Movie not found' });
            }
            res.status(200).send({ message: 'Movie deleted successfully' });
        })
        .catch(err => res.status(500).send({ error: "Error in Deleting", details: err }));
};

module.exports.addMovieComment = (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.user.id;
    const { comment } = req.body;

    if (!comment) {
        return res.status(400).send({ message: 'Comment text is required' });
    }

    const newComment = { userId, comment };

    return Movie.findByIdAndUpdate(
        movieId,
        { $push: { comments: newComment } },
        { new: true }
    )
    .then(movie => {
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found' });
        }
        res.status(200).send({ message: 'Comment added successfully', movie });
    })
    .catch(err => res.status(500).send({ error: "Error in saving comment", details: err }));
};

module.exports.getMovieComments = (req, res) => {
    const movieId = req.params.movieId;

    Movie.findById(movieId)
        .then(movie => {
            if (!movie) {
                return res.status(404).send({ message: 'Movie not found' });
            }
            res.status(200).json(movie.comments); // Return comments array directly
        })
        .catch(err => res.status(500).send({ error: "Error in finding movie", details: err }));
};
