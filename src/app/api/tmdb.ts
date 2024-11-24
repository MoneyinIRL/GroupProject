import axios from 'axios';

// Change to .env file
const TMDB_API_KEY = '1b82ee7efd9692cca0fcf64a2c0e2459';

if (!TMDB_API_KEY) {
    throw new Error('TMDB API key is missing');
}

// Function to search for movies using the TMDB API
export const searchMovies = async (query: string) => {
  if (!query) return [];
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: TMDB_API_KEY,
          query,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies from TMDB:', error);
    return [];
  }
};
