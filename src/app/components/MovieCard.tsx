'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Rate, Tag } from 'antd';
import { truncateText } from '../utils/truncateText';
import { useGenres } from '../context/GenreContext';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
  rating?: number;
}

export default function MovieCard({
  id,
  title,
  overview,
  poster_path,
  release_date,
  vote_average,
  genre_ids = [],
  rating,
}: MovieCardProps) {
  const { genres } = useGenres();
  const [userRating, setUserRating] = useState<number>(rating || 0);

  const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_MOVIEDB_API_BASE_URL;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/150x200?text=No+Image';

  const releaseDate = release_date
    ? format(parseISO(release_date), 'MMMM d, yyyy', { locale: ru })
    : 'N/A';

  const getRatingColor = (vote: number) => {
    if (vote <= 3) return '#E90000';
    if (vote <= 5) return '#E97E00';
    if (vote <= 7) return '#E9D100';
    return '#66E900';
  };

  const handleRate = async (value: number) => {
    const guestSession = localStorage.getItem('guest_session_id');
    if (!guestSession) return;

    try {
      await fetch(
        `${BASE_URL}/movie/${id}/rating?api_key=${API_KEY}&guest_session_id=${guestSession}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value }),
        }
      );
      setUserRating(value);
    } catch (error) {
      console.error('Failed to rate movie', error);
    }
  };

  const movieGenres = genres.filter((g) => genre_ids.includes(g.id));

  return (
    <div className={styles.card}>
      {/* рейтинг — как было */}
      <div
        className={styles.ratingCircle}
        style={{ backgroundColor: getRatingColor(vote_average) }}
      >
        {vote_average.toFixed(1)}
      </div>

      <div className={styles.imageContainer}>
        <Image src={imageUrl} alt={title} width={150} height={200} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>{releaseDate}</p>

        <div className={styles.genreContainer}>
          {movieGenres.map((genre) => (
            <Tag key={genre.id}>{genre.name}</Tag>
          ))}
        </div>

        <p className={styles.overview}>{truncateText(overview, 150)}</p>

        <Rate
          allowHalf
          count={10}
          value={userRating}
          onChange={handleRate}
          style={{ fontSize: 14 }}
        />
      </div>
    </div>
  );
}
