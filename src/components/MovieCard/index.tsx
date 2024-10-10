import React from "react";

interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
}

interface MovieCardProps {
    movie: Movie;
    onMovieClick: (imdbID: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({movie, onMovieClick}) => {
    const placeholderImage = "https://via.placeholder.com/300x450?text=No+Image+Available";

    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => onMovieClick(movie.imdbID)}
        >
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : placeholderImage}
                alt={movie.Title}
                className="w-full h-64 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.Title}</h3>
                <p className="text-gray-600">{movie.Year}</p>
            </div>
        </div>
    );
};

export default MovieCard;
