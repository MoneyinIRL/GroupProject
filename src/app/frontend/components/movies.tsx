import Movie from './movie';
import { movieListProps } from './types';


const Movies = ({movies}: movieListProps) => {
    return (
        <div>
            {movies.map(movie => (
                <Movie key={movie.id} movie={movie} />
            ))}

        </div>



    );




};


export default  Movies;