import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
}

interface ApiResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
    Error?: string;
}

interface SearchParams {
    search: string;
    year?: string;
    type?: string;
    page: number;
}

interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    totalResults: number;
    searchParams: SearchParams;
}

const initialState: MovieState = {
    movies: [],
    loading: false,
    error: null,
    totalResults: 0,
    searchParams: {
        search: "",
        year: "",
        type: "",
        page: 1
    }
};

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async (params: SearchParams): Promise<ApiResponse> => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}`, {
            params: {
                apikey: process.env.REACT_APP_OMDB_API_KEY,
                s: params.search,
                y: params.year,
                type: params.type,
                page: params.page
            }
        });
        return response.data;
    }
);

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        clearMovies: (state) => {
            state.movies = [];
            state.totalResults = 0;
            state.searchParams = initialState.searchParams;
        },
        setSearchParams: (state, action: PayloadAction<SearchParams>) => {
            state.searchParams = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.Response === "True") {
                state.movies = action.payload.Search;
                state.totalResults = parseInt(action.payload.totalResults);
            } else {
                state.error = action.payload.Error || null;
                state.movies = [];
                state.totalResults = 0;
            }
        });
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Coś poszło nie tak";
        });
    }
});

export const {clearMovies, setSearchParams} = movieSlice.actions;
export default movieSlice.reducer;
