const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    comment: {
        type: String,
        required: true
    }
});

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Movie Title is required']
    },
    director: {
        type: String,
        required: [true, 'Movie Director is required']
    },
    year: {
        type: String,
        required: [true, 'Year released is required']
    },
    description: {
        type: String,
        required: [true, 'Movie description is required']
    },
    genre: {
        type: String,
        required: [true, 'Movie genre is required']
    },
    comments: [commentSchema] // Array of comment subdocuments
});

module.exports = mongoose.model('Movie', movieSchema);
