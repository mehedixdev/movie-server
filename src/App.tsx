import React, { useEffect, useState } from "react";
import SearchIcon from "./search.svg";
import "./App.css";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=8d7429c";

// Define TypeScript types for Movie and API response
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface ApiResponse {
  Search?: Movie[];
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchMovies = async (title: string) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data: ApiResponse = await response.json();
      setMovies(data.Search || []); // Use empty array if no movies are found
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  return (
    <div className="app">
      <h1>Movie Server</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div>No movies found</div>
      )}
    </div>
  );
};

export default App;
