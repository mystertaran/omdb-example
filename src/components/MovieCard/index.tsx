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
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
            onClick={() => onMovieClick(movie.imdbID)}
        >
            <div className="flex items-center justify-center bg-gray-200 p-4 h-96">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : placeholderImage}
                    alt={movie.Title}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            <div className="p-4 flex flex-col justify-center flex-grow">
                <h3 className="text-lg font-semibold mb-2">{movie.Title}</h3>
                <p className="text-gray-600">{movie.Year}</p>
            </div>
        </div>
    );
};

export default MovieCard;
