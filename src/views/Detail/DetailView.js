import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getPokemonById, cleanPokemon } from "../../redux/actions";
import { useParams } from "react-router-dom";

import { Detail, Error404 } from '../../components';

import loading from './image/loading.gif'

import style from './DetailView.module.css';

const DetailView = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const pokemon = useSelector(state => state.pokemon);

    

    useEffect(() => {
        setIsLoading(true)
        dispatch(getPokemonById(id))
            .then(() => setIsLoading(false));
        return () => dispatch(cleanPokemon());        
    }, [])

    const [isLoading, setIsLoading] = useState(false);
    

    return (
        <>
            {isLoading &&  <img src={loading} className={style.searchingImage} />}
            {!isLoading && !pokemon &&
                <div>
                    <Error404 />
                </div>
            }
            {pokemon && 
                <Detail 
                    id={pokemon.id}
                    nombre={pokemon.nombre}
                    imagen={pokemon.imagen}
                    types={pokemon.types}
                    vida={pokemon.vida}
                    ataque={pokemon.ataque}
                    defensa={pokemon.defensa}
                    velocidad={pokemon.velocidad}
                    altura={pokemon.altura}
                    peso={pokemon.peso}
                    origin={pokemon.origin}
                />
            }
        </>
    )
}

export default DetailView;