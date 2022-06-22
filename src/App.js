import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Button from "./components/UI/Button/Button";
import MoviesList from "./components/movies/MoviesList";
import AddMovies from "./components/movies/AddMovies";

import CircularProgress from "@mui/material/CircularProgress";

const Section = styled.section`
  margin: 1rem auto;
  width: 90%;
  max-width: 40rem;
  text-align: center;
  background-color: #ccc;

  padding: 2rem;
  border-radius: 12px;
`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  // ---------------------------------------------------
  //  --------- Cleaner JSX code ---------
  // let content = <p>No movies Found</p>;

  // if (movies.length > 0) {
  //   content = <MoviesList movies={movies} />;
  // }

  // if (error) {
  //   content = <p>{error}</p>;
  // }

  // if (isFetching) {
  //   content = <CircularProgress />;
  // }
  // ---------------------------------------------------

  const fetchMovieHandler = useCallback(async () => {
    // A Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

    // 1. ' fetch(MOVIES_API) ' -> returns a promise that contains a response.
    // 2. ' .then((response) => response.json()) ' returns a promise with a response in JSON format which we transform to a JavaScript object
    // 3. ' .then((data) => console.log(data)) ' returns a JavaScript with the API data

    // --------------------
    // -- 🟡 using 'then()' method
    // fetch("https://swapi.dev/api/films")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const transformedData = data.results.map((movieData) => {
    //       return {
    //         id: movieData.episode_id,
    //         title: movieData.title,
    //         releaseDate: movieData.release_date,
    //         openingText: movieData.opening_crawl,
    //       };
    //     });

    //     setMovies(transformedData);
    //   });

    // --------------------
    // -- 🟢 using ASYNC/AWAIT

    // - Change the 'isFetching' state to 'true' when we start to load/fetch the data. And reset 'error' and 'movies' states.
    setIsFetching(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-sending-http-reque-bf87b-default-rtdb.firebaseio.com/movies.json"
      );

      // 🌟 manually throw an error to stop the execution of the rest of the code if we got error back
      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const data = await response.json();

      const movies = Object.values(data);

      const transformedData = movies.map((movieData, movieData_Index) => {
        return {
          id: movieData_Index,
          title: movieData.title,
          releaseDate: movieData.date,
          openingText: movieData.description,
        };
      });

      console.log(transformedData);

      setMovies(transformedData);
    } catch (error) {
      // error is the string that we added in ' throw new Error("Something wrong happened!!"); '
      setError(error.message);
    }

    // - Change the 'isFetching' state to 'false' once we're done fetching the data
    setIsFetching(false);
  }, []);

  // ---------------------------------------------------------------
  const submitHandler = async (movies) => {
    const response = await fetch(
      "https://react-sending-http-reque-bf87b-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movies),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // -- Firebase returns a promise after we SEND a post request
    const data = await response.json();

    console.log(data);

    // - Auto fetch movies when we submit a movie
    // NOTE ->  Since we have an await in the line before, it's guaranteed that 'fetchMoviesHandler()' won't be called before the movie has been added to the database.
    fetchMovieHandler();
  };

  // ---------------------------------------------------------------
  // -- 'useEffect' hook with Http requests
  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  return (
    <>
      <GlobalStyles />

      <Section>
        <AddMovies onSubmit={submitHandler} />
      </Section>

      <Section>
        <Button onClick={fetchMovieHandler}>Fetch Movies</Button>
      </Section>
      <Section>
        {/* if still fetching data -> show spinner  */}
        {isFetching && <CircularProgress />}

        {/* if done fetching data -> render 'MoviesList' */}
        {!isFetching && <MoviesList movies={movies} />}

        {/* if done fetching data AND there is NO movies AND there is no error -> Render Message */}
        {!isFetching && movies.length === 0 && !error && (
          <p>No Movies Found 😢</p>
        )}

        {/* if done fetching AND there is an error -> render error message */}
        {!isFetching && error && <p>{error}</p>}

        {/* {content} */}
      </Section>
    </>
  );
};

export default App;
