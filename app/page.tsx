'use client';
import { useState, useEffect } from "react";
import api from '../app/services/api';
import './globals.css'
import Link from "next/link";

export type Filme = {
  id: number;
  title: string;
  poster_path: string;
};

function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await api.get('/movie/now_playing', {
          params: {
            api_key: '270d7543bc152a288a52ddbb368eccf9',
            language: 'pt-BR',
            page: 1
          }
        });
        setFilmes(response.data.results?.slice(0,10) || []);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
        setFilmes([]);
      } finally {
        setLoading(false);
      }
    }

    loadFilmes();
  }, []);

  if(loading) {
    return(
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return(
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return(
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
              <Link href={`/description/${filme.id}`}>Acessar</Link>
            </article>
        );
      })}
      </div>
    </div>
  );
}

export default Home;