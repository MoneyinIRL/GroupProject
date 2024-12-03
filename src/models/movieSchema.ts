import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    movieId: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    overview: String,
    poster_path: String,
    genres: [String]
}, {
    timestamps: true
});

export const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
export default Movie;