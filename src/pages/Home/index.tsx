import React, {useState, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {fetchMovies, setSearchParams} from "../../store/movieSlice";
import SearchBar from "../../components/SearchBar";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../components/Pagination";
import FilterOptions from "../../components/FilterOptions";
import MovieModal from "../../components/MovieModal";
import NoResults from "../../components/NoResults";
import {scrollToTop} from "src/utils/scrollToTop";

interface SearchParams {
    search: string;
    year?: string;
    type?: string;
    page: number;
}

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const {movies, loading, error, totalResults, searchParams, noResults} = useAppSelector(
        (state) => state.movies
    );

    const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

    const handleSearch = (params: {search: string}) => {
        const updatedParams: SearchParams = {
            search: params.search,
            year: "",
            type: "",
            page: 1
        };
        dispatch(setSearchParams(updatedParams));
        dispatch(fetchMovies(updatedParams));
        scrollToTop();
    };

    const handlePageChange = (page: number) => {
        const updatedParams: SearchParams = {
            ...searchParams,
            page
        };
        dispatch(setSearchParams(updatedParams));
        dispatch(fetchMovies(updatedParams));
        scrollToTop();
    };

    const handleMovieClick = (imdbID: string) => {
        setSelectedMovieId(imdbID);
    };

    const handleModalClose = () => {
        setSelectedMovieId(null);
    };

    const handleFilterUpdate = (filters: {year: string; type: string}) => {
        const updatedParams: SearchParams = {
            ...searchParams,
            year: filters.year,
            type: filters.type,
            page: 1
        };
        dispatch(setSearchParams(updatedParams));
        dispatch(fetchMovies(updatedParams));
        scrollToTop();
    };

    const handleFilterReset = () => {
        const updatedParams: SearchParams = {
            ...searchParams,
            year: "",
            type: "",
            page: 1
        };
        dispatch(setSearchParams(updatedParams));
        dispatch(fetchMovies(updatedParams));
        scrollToTop();
    };

    useEffect(() => {
        if (searchParams.search) {
            dispatch(fetchMovies(searchParams));
        }
    }, [dispatch, searchParams]);

    return (
        <div className="container mx-auto p-4">
            <SearchBar onSearch={handleSearch} />
            {loading && <p className="text-center">Ładowanie...</p>}
            {error && !noResults && <p className="text-center text-red-500">Błąd: {error}</p>}

            {movies.length > 0 ? (
                <>
                    <div className="flex flex-col md:flex-row items-center justify-between mt-6">
                        <FilterOptions
                            onFilterUpdate={handleFilterUpdate}
                            onFilterReset={handleFilterReset}
                            currentFilters={{year: searchParams.year, type: searchParams.type}}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                                onMovieClick={handleMovieClick}
                            />
                        ))}
                    </div>

                    {totalResults > 10 && (
                        <Pagination
                            currentPage={searchParams.page}
                            totalResults={totalResults}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            ) : (
                !loading &&
                searchParams.search &&
                noResults && <NoResults onResetFilters={handleFilterReset} />
            )}

            {selectedMovieId && <MovieModal imdbID={selectedMovieId} onClose={handleModalClose} />}
        </div>
    );
};

export default Home;
