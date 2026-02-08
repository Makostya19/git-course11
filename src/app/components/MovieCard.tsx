"use client";

import { Card, Typography, Tag, Rate } from "antd";
import Image from "next/image";
import { format } from "date-fns";
import { truncateText } from "../utils/truncateText";

const { Title, Paragraph, Text } = Typography;

type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  vote_average?: number;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Card
      hoverable
      cover={
        movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            style={{ objectFit: "cover" }}
          />
        ) : null
      }
    >
      <Title level={5}>{movie.title}</Title>

      <Text type="secondary">
        {movie.release_date
          ? format(new Date(movie.release_date), "dd MMM yyyy")
          : "—"}
      </Text>

      <div style={{ margin: "8px 0" }}>
        <Tag>Action</Tag>
        <Tag>Drama</Tag>
        <Tag>Comedy</Tag>
      </div>

      <Rate
        disabled
        allowHalf
        value={(movie.vote_average ?? 0) / 2}
        style={{ fontSize: 14, marginBottom: 8 }}
      />

      <Paragraph>
        {truncateText(movie.overview, 120)}
      </Paragraph>
    </Card>
  );
}
