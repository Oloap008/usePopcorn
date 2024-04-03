import { useState } from "react";
import { useMovies } from "../hooks/useMovies";

import Box from "./Box";
import Main from "./Main";
import MovieList from "./MovieList";
import NavBar from "./NavBar";
import NumResults from "./NumResults";
import SearchBar from "./SearchBar";
import WatchedSummary from "./WatchedSummary";
import WatchedMovieList from "./WatchedMovieList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import { useLocalStorage } from "../hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const [watched, setWatched] = useLocalStorage([], "watched");
  const { movies, isLoading, error } = useMovies(query);

  function handleSelectMovie(id) {
    setSelectedMovieId(id);
  }

  function handleCloseMovieDetails() {
    setSelectedMovieId(null);
  }

  function handleAddWatched(movie) {
    setWatched((movies) => [...movies, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <SearchBar query={query} onQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              onCloseMovieDetails={handleCloseMovieDetails}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
