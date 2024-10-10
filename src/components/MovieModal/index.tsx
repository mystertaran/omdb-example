import React, {useEffect, useState} from "react";
import axios from "axios";
import Loader from "components/Loader";

interface Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Array<{Source: string; Value: string}>;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

interface MovieModalProps {
    imdbID: string;
    onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({imdbID, onClose}) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}`, {
                    params: {
                        apikey: process.env.REACT_APP_OMDB_API_KEY,
                        i: imdbID,
                        plot: "full"
                    }
                });
                if (response.data.Response === "True") {
                    setMovie(response.data);
                } else {
                    setError(response.data.Error || "Nie udało się pobrać danych filmu.");
                }
            } catch (err) {
                setError("Nie udało się pobrać danych filmu.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [imdbID]);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg overflow-auto max-w-2xl w-full max-h-full p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="text-gray-500 hover:text-gray-700 absolute top-4 right-4 text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <div className="flex flex-col md:flex-row">
                        <img
                            src={
                                movie?.Poster !== "N/A"
                                    ? movie.Poster
                                    : "https://via.placeholder.com/300x450?text=No+Image+Available"
                            }
                            alt={movie?.Title}
                            className="w-full md:w-1/2 object-cover rounded-lg"
                        />
                        <div className="md:ml-6 mt-4 md:mt-0">
                            <h2 className="text-2xl font-bold">{movie?.Title}</h2>
                            <p className="text-gray-600">
                                {movie?.Year} | {movie?.Genre} | {movie?.Runtime}
                            </p>
                            <p className="mt-4">{movie?.Plot}</p>
                            <p className="mt-4">
                                <strong>Reżyser:</strong> {movie?.Director}
                            </p>
                            <p>
                                <strong>Aktorzy:</strong> {movie?.Actors}
                            </p>
                            <p>
                                <strong>Język:</strong> {movie?.Language}
                            </p>
                            <p>
                                <strong>Nagrody:</strong> {movie?.Awards}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieModal;
