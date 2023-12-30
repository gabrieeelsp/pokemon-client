import { useEffect, useState } from 'react';
import style from './SearchBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { cleanSearchedPokemon, setSearchedPokemon } from '../../redux/actions';

import loading from './image/loading.gif'

const SearchBar = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const handleChangeName = (event) => {
        setErrorSearch('')
        setName(event.target.value);
    }

    const handleSubmitSearch = () => {
        if (name) {
            setIsSearching(true);
            setErrorSearch('')
            dispatch(setSearchedPokemon(name))
                .then(() => {})
                .catch((error) => setErrorSearch('No se ha encontrado un Pokemon.'))
                .finally(() => setIsSearching(false))
        }
        
    }

    const handleSubmitClose = () => {
        dispatch(cleanSearchedPokemon())
        setName('')                
    }

    const pokemonSearched = useSelector(state => state.pokemonSearched);
    useEffect(() => {
        if ( pokemonSearched ) setName(pokemonSearched.nombre);
    },[])

    const [isSearching, setIsSearching] = useState(false);

    const [errorSearch, setErrorSearch] = useState('');

    return (
        <>
            <div className={style.searchBox}>
                <div className={style.searchInput}>
                    <div className={style.inputBox}>
                        <input type="text" onChange={handleChangeName} disabled={pokemonSearched} value={name}  />
                        { !isSearching && <img src={loading} className={style.searchingImage} style={{opacity: 0}} />}
                        { isSearching && <img src={loading} className={style.searchingImage} />}
                    </div>
                        
                    {!pokemonSearched && <button onClick={handleSubmitSearch}>Buscar</button>}
                    {pokemonSearched && <button onClick={handleSubmitClose}>Cerrar</button>}
                </div>
                <div className={style.errorBox} >
                    { !errorSearch && <span className={style.errorMessage} style={{opacity: 0}}>-</span>}
                    { errorSearch && <span className={style.errorMessage}>{errorSearch}</span>}
                </div>
            </div>

            
        </>
    )
}

export default SearchBar;