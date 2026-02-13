'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Input, Spin, Alert, Pagination } from 'antd';
import debounce from 'lodash/debounce';
import AntdLayout from './components/AntdLayout';
import MovieList from './components/MovieList';

const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_MOVIEDB_API_BASE_URL?.replace(/\/$/, '');

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('return');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchMovies = async (searchQuery: string, pageNumber: number) => {
    if (!API_KEY || !BASE_URL) {
      setError('API configuration error');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          searchQuery
        )}&page=${pageNumber}&language=ru-RU`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch movies');
      }
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
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

  return (
    <AntdLayout>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search movies..."
          defaultValue={query}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          style={{ marginBottom: 16 }}
        />
      )}

      <div style={{ marginTop: 56 }}>
        <Spin
          spinning={loading}
          tip="Loading movies..."
          style={{ color: 'black' }}
          wrapperClassName="custom-spin"
        >
          {!isInitialLoad && !loading && !error && movies.length > 0 && (
            <>
              <MovieList initialMovies={movies} />

              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <Pagination
                  current={page}
                  total={totalPages * 20}
                  pageSize={20}
                  onChange={(p) => setPage(p)}
                  showSizeChanger={false}
                />
              </div>
            </>
          )}

          {!isInitialLoad && !loading && !error && movies.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              No movies found
            </div>
          )}
        </Spin>
      </div>
    </AntdLayout>
  );
}
