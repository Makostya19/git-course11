import AntdLayout from './components/AntdLayout';
import MovieList from './components/MovieList';

async function getMovies() {
  const apiKey = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY; // исправлено
  const baseUrl = process.env.NEXT_PUBLIC_MOVIEDB_API_BASE_URL?.replace(/\/$/, ''); // убираем лишний слэш

  if (!apiKey || !baseUrl) {
    console.error('API key or Base URL is missing');
    return { results: [] };
  }

  try {
    const query = encodeURIComponent('return'); // безопасный query
    const response = await fetch(
      `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&language=ru-RU`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      console.error('Response status:', response.status, response.statusText);
      throw new Error('Failed to fetch movies');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { results: [] };
  }
}

export default async function Page() {
  const moviesData = await getMovies();

  return (
    <AntdLayout>
      <MovieList initialMovies={moviesData.results} />
    </AntdLayout>
  );
}
