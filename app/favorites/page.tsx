'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {toast} from 'react-toastify';
import type { Filme } from '../page';
import './favorites.css';

export default function Favorites() {

    const [filmes, setFilmes] = useState<Filme[]>([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeFlix');
        if (minhaLista) {
            setFilmes(JSON.parse(minhaLista));
        } else {
            setFilmes([]);
        }
    }, [])

    
    function excluirFilme(id: number) {
        let filtroFilmes = filmes.filter((item) => {
            return(item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem('@primeFlix', JSON.stringify(filtroFilmes));
        toast.success('Filme excluído com sucesso!')
    }


    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}

            <ul>
                {filmes.map((item) => {
                    return(
                        <article key={item.id}>
                            <span>{item.title}</span>
                            <section>
                                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                                <div className='actions'>
                                    <Link href={`/description/${item.id}`}>Ver detalhes</Link>
                                    <button id='excluir' onClick={() => excluirFilme(item.id)}>Excluir</button>
                                </div>
                            </section>  
                        </article>
                    );
                })}
            </ul>
        </div>
    )
}