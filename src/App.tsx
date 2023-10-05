import "./App.css"

import { useAppDispatch, useAppSelector } from "./hooks/useAppDispatch";
import { useEffect, useState } from "react";

import { Button } from "antd";
import { Filters } from "./components/Filters";
import { Movie } from "./components/Movie";
import { RootState } from "./redux/store";
import { fetchMovies } from "./redux/slices/movieSlice";
import { useFilteredMovies } from "./hooks/useFilteredMovies";

export type Filters = {
  currentPage: number;
  categories: string[];
  itemsPerPage: number;
};

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  const movies = useAppSelector((state: RootState) => state.movies.movies);

  const [filters, setFilters] = useState<Filters>({
    currentPage: 0,
    itemsPerPage: 8,
    categories: [],
  });

  const { filteredMovies, finalPage } = useFilteredMovies(movies, filters);

  return (
    <div className="app" >
      <Filters filters={filters} onUpdateFilters={setFilters} />

      <div className="moviesCard" >
        {filteredMovies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="paginationButtons">
        <Button className="buttonPage"
          disabled={filters.currentPage === 0}
          onClick={() =>
            setFilters({ ...filters, currentPage: filters.currentPage - 1 })
          }
        >
          Précédent
        </Button>
        <Button className="buttonPage"
          disabled={finalPage}
          onClick={() =>
            setFilters({ ...filters, currentPage: filters.currentPage + 1 })
          }
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}

export default App;
