import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    movieId: { 
        type: Number, 
        required: true,
        unique: true
    },
    title: { 
        type: String, 
        required: true 
    },
    overview: String,
    poster_path: String,
    genres: [String],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
export default Movie;