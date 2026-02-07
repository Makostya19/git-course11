"use client";

import { Card, Typography, Tag } from "antd";
import Image from "next/image";
import { format } from "date-fns";
import { truncateText } from "../utils/truncateText";

const { Title, Text } = Typography;

type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Card
      hoverable
      style={{ width: 240, borderRadius: 12, overflow: "hidden" }}
      cover={
        movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            width={240}
            height={360}
          />
        ) : null
      }
    >
      <Title level={5}>{movie.title}</Title>
      <Text type="secondary">
        {movie.release_date
          ? format(new Date(movie.release_date), "MMMM d, yyyy")
          : "No date"}
      </Text>
      <p style={{ marginTop: 8 }}>
        {truncateText(movie.overview || "No description", 100)}
      </p>
      <div style={{ marginTop: 8 }}>
        <Tag>Action</Tag>
        <Tag>Drama</Tag>
      </div>
    </Card>
  );
}