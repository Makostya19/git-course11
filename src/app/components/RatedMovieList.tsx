'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Empty, Spin } from 'antd';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  rating: number;
}

export default function RatedMovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_MOVIEDB_API_BASE_URL;

  const fetchRated = useCallback(async () => {
    const guestSession = localStorage.getItem('guest_session_id');
    if (!guestSession) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/guest_session/${guestSession}/rated/movies?api_key=${API_KEY}&language=ru-RU`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Failed to fetch rated movies', error);
    } finally {
      setLoading(false);
    }
  }, [API_KEY, BASE_URL]);

  useEffect(() => {
    fetchRated();

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchRated();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [fetchRated]);

  if (!loading && movies.length === 0) {
    return <Empty description="No rated movies yet" />;
  }

  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        {movies.map((movie) => (
          <Col key={movie.id} xs={24} sm={24} md={12} lg={8} xl={8}>
            <MovieCard {...movie} />
          </Col>
        ))}
      </Row>
    </Spin>
  );
}
