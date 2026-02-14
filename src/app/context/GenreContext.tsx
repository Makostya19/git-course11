'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface Genre {
  id: number;
  name: string;
}

interface GenreContextType {
  genres: Genre[];
}

const GenreContext = createContext<GenreContextType>({ genres: [] });

export function GenreProvider({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState<Genre[]>([]);

  const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_MOVIEDB_API_BASE_URL;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ru-RU`);
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error('Failed to fetch genres', error);
      }
    };

    fetchGenres();
  }, [API_KEY, BASE_URL]);

  return <GenreContext.Provider value={{ genres }}>{children}</GenreContext.Provider>;
}

export const useGenres = () => useContext(GenreContext);
