import { useGetGenresMoviesQuery } from "movie-app/Service/Movies";

const useGenreIdByName = (genreName: string) => {
  const { data: MovieGenres } = useGetGenresMoviesQuery();

  const findGenreIdByName = (genreName: string) => {
    const genre = MovieGenres?.genres.find(
      (g: { id: number; name: string }) => g.name === genreName
    );
    return genre ? genre.id : null;
  };

  return findGenreIdByName(genreName);
};

export default useGenreIdByName;
