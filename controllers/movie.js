const Movie = require("../models/Movie");

module.exports.getAllMovies = (req, res) => {

	return Movie.find()
	.then(movies => res.status(200).send({ movies }))
	.catch(err => res.status(500).send({ error: "Error in Find", details: err}))

};

module.exports.getMovieById = (req, res) => {
    const movieId = req.params.movieId;

    Movie.findById(movieId)
        .then(movie => {
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            res.status(200).json({ movie });
        })
        .catch(err => res.status(500).send({ error: "Error in Find", details: err}))
};

module.exports.addMovie = (req,res) => {
    
	let newMovie = new Movie({
		title : req.body.title,
		director : req.body.director,
		year : req.body.year,
		description : req.body.description,
		genre : req.body.genre,
	});

	return newMovie.save()
	.then((Movie) => res.status(201).send({Movie}))
	.catch(err => res.status(500).send({ error: "Error in Save", details: err}))  
};

module.exports.updateMovie = (req, res) => {

	let updatedMovie = {
		title : req.body.title,
		director : req.body.director,
		year : req.body.year,
		description : req.body.description,
		genre : req.body.genre,
	};

	return Movie.findByIdAndUpdate(req.params.movieId, updatedMovie, { new: true })
	.then((movie) => res.status(200).send({ 
    	message: 'Movie updated successfully', 
    	updatedMovie: movie
    	}))
	.catch(err => res.status(500).send({ error: "Error in Saving", details: err}))
};


module.exports.deleteMovie = (req, res) => {

	return Movie.deleteOne({ _id: req.params.movieId })
	.then((deleteStatus) => res.status(200).send({ 
    	message: 'Movie deleted successfully'
    }))
	.catch(err => res.status(500).send({ error: "Error in Saving", details: err}))  
};

module.exports.addMovieComment = (req, res) => {
    const movieId = req.params.movieId;

    const userId = req.user.id;
    const { comment } = req.body;

    if (!comment) {
        return res.status(400).send({ message: 'Comment text is required' });
    }

    const newComment = {
        userId: userId,
        comment: comment
    };

    return Movie.findByIdAndUpdate(
        movieId,
        { $push: { comments: newComment } },
        { new: true }
    )
    .then((movie) => {
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found' });
        }
        res.status(200).send({
            message: 'Comment added successfully',
            movie: movie
        });
    })
    .catch(err => res.status(500).send({ error: "Error in saving comment", details: err }));
};

module.exports.getMovieComments = (req, res) => {
    const movieId = req.params.movieId;

    Movie.findById(movieId)
        .then(movie => {
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            res.status(200).json({ comments: movie.comments });
        })
        .catch(err => res.status(500).send({ error: "Error in finding movie", details: err }));
};
