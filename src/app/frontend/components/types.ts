export type movie = {
    id: number;
    genre: string;
    title: string;
    synopsis: string;
    imageUrl: string;
    platform: string;

};

export type movieProps = {
    movie: movie;
}

export type movieListProps = {
    movies: movie[];

}

export type user = {
    username: string;
    password: string;
    email: string;
}