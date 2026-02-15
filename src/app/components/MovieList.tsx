'use client';

import React from 'react';
import { Row, Col, Empty } from 'antd';
import MovieCard from './MovieCard';
import styles from './MovieList.module.css';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[]; // ✅ ДОБАВЛЕНО
  rating?: number; // (если нужно)
}

interface MovieListProps {
  initialMovies: Movie[];
}

export default function MovieList({ initialMovies }: MovieListProps) {
  if (!initialMovies || initialMovies.length === 0) {
    return <Empty description="No movies found" />;
  }

  return (
    <div className={styles.container}>
      <h2>Popular Movies</h2>
      <Row gutter={[16, 16]}>
        {initialMovies.map((movie) => (
          <Col key={movie.id} xs={24} sm={24} md={12} lg={8} xl={8}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
              genre_ids={movie.genre_ids} 
              rating={movie.rating}    
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
