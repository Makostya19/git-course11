"use client";

import { Col, Row, Typography } from "antd";
import MovieCard from "./MovieCard";

const { Title } = Typography;

type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
};

export default function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "32px 24px",
      }}
    >
      <Title level={2} style={{ marginBottom: 32 }}>
        Movies
      </Title>

      <Row gutter={[24, 32]}>
        {movies.map((movie) => (
          <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
