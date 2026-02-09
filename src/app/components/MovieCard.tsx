'use client';

import React from 'react';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { truncateText } from '../utils/truncateText';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

const GENRES = ['Action', 'Drama', 'Thriller'];

export default function MovieCard({
  title,
  overview,
  poster_path,
  release_date,
}: MovieCardProps) {
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/150x200?text=No+Image';

  const releaseDate = release_date
    ? format(parseISO(release_date), 'MMMM d, yyyy', { locale: ru })
    : 'N/A';

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={title}
          width={150}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>{releaseDate}</p>

        <div className={styles.genres}>
          {GENRES.map((genre) => (
            <span key={genre} className={styles.genre}>
              {genre}
            </span>
          ))}
        </div>

        <p className={styles.overview}>{truncateText(overview, 150)}</p>
      </div>
    </div>
  );
}
