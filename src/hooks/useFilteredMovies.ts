import { Filters } from "../App";
import { MovieState } from "../redux/slices/movieSlice";
import { useMemo } from "react";

export const useFilteredMovies = (
  movies: MovieState['movies'],
  { currentPage, itemsPerPage, categories }: Filters,
) => {
  const startIndex = currentPage * itemsPerPage;
  const endIndex = currentPage * itemsPerPage + itemsPerPage;

  const filteredMovies = useMemo(() => {
    const filteredByCategories =
      categories.length > 0
        ? movies.filter((movie) => categories.includes(movie.category))
        : movies;

    const filteredByPage =
      itemsPerPage > 0
        ? filteredByCategories.slice(startIndex, endIndex)
        : filteredByCategories;

    return {
      filteredMovies: filteredByPage,
      finalPage:
        !itemsPerPage ||
        itemsPerPage > movies.length ||
        endIndex > filteredByCategories.length - 1,
    };
  }, [movies, categories, itemsPerPage, endIndex,startIndex]);

  return { ...filteredMovies };
};
