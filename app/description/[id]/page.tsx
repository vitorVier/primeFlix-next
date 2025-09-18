'use client';
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import '../../description/description.css';

import api from '../../services/api';

function Description() {
    const { id } = useParams();
    const [filme, setFilme] = useState<any>({});
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: '270d7543bc152a288a52ddbb368eccf9',
                        language: 'pt-BR'
                    }
                });
                setFilme(response.data);
                setLoading(false);
            } catch (error) {
                router.push('/');
            }
        }

        loadFilme();

        return () => {
            console.log('O componente foi desmontado');
        }
    }, [router, id]);

    function saveMovie() {
        const minhaLista = localStorage.getItem('@primeFlix');
        let filmesSalvos = minhaLista ? JSON.parse(minhaLista) : [];

        // Verifica se o filme já está salvo
        const hasFilme = filmesSalvos.some((filmeSalvo: any) => filmeSalvo.id === filme.id);

        if (hasFilme) {
            toast.warn('Esse filme já está na sua lista');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeFlix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!');
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className="area-buttons">
                <button onClick={saveMovie} className="btn-save">
                    Salvar
                </button>

                <button className="btn-trailer">
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Description;