import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getPokemonById, cleanPokemon, getPokemonToEditById, cleanPokemonToEdit } from "../../redux/actions";
import { useParams } from "react-router-dom";

import { FormCreate, Error404 } from '../../components';

import loading from '../Detail/image/loading.gif'

import style from './EditView.module.css';

const EditView = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const pokemonEdit = useSelector(state => state.pokemonEdit);

    

    useEffect(() => {
        setIsLoading(true)
        dispatch(getPokemonToEditById(id))
            .then(() => setIsLoading(false));
        return () => dispatch(cleanPokemonToEdit());        
    }, [])

    const [isLoading, setIsLoading] = useState(false);
    

    return (
        <>
            {isLoading &&  <img src={loading} className={style.searchingImage} />}
            {!isLoading && !pokemonEdit &&
                <div>
                    <Error404 />
                </div>
            }
            {pokemonEdit && 
                <FormCreate pokemonEdit= {pokemonEdit} />
            }
        </>
    )
}

export default EditView;