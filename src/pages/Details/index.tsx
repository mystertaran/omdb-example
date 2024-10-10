import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

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

const Details: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("API URL:", process.env.REACT_APP_API_URL);
        console.log("OMDB API Key:", process.env.REACT_APP_OMDB_API_KEY);

        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}`, {
                    params: {
                        apikey: process.env.REACT_APP_OMDB_API_KEY,
                        i: id,
                        plot: "full"
                    }
                });
                setMovie(response.data);
            } catch (err) {
                setError("Nie udało się pobrać danych filmu.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [id]);

    if (loading) return <p>Ładowanie...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>{movie?.Title}</h1>
            <p>{movie?.Plot}</p>
        </div>
    );
};

export default Details;
