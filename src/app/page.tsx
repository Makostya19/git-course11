import MovieList from "./components/MovieList";

type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
};

export default async function Page() {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=return&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  const movies: Movie[] = data.results || [];

  return <MovieList movies={movies} />;
}