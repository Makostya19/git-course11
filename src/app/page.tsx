'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Input, Spin, Alert, Pagination, Tabs } from 'antd';
import debounce from 'lodash/debounce';
import AntdLayout from './components/AntdLayout';
import MovieList from './components/MovieList';
import RatedMovieList from './components/RatedMovieList';

const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_MOVIEDB_API_BASE_URL?.replace(/\/$/, '');

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
  rating?: number;
}

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('return');
  const [page, setPage] = useState(1);

  const fetchMovies = async (searchQuery: string, pageNumber: number) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          searchQuery
        )}&page=${pageNumber}&language=ru-RU`
      );

      const data = await response.json();
      setMovies(data.results || []);
    } catch {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setQuery(value);
      }, 500),
    []
  );

  useEffect(() => {
    fetchMovies(query, page);
  }, [query, page]);

  const tabItems = [
    {
      key: '1',
      label: 'Search',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder="Search movies..."
              defaultValue={query}
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          {error && <Alert type="error" message={error} />}

          <Spin spinning={loading}>
            <MovieList initialMovies={movies} />

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Pagination current={page} pageSize={20} total={200} onChange={(p) => setPage(p)} />
            </div>
          </Spin>
        </>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedMovieList />,
    },
  ];

  return (
    <AntdLayout>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </AntdLayout>
  );
}
