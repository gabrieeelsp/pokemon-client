import { useSelector } from "react-redux";

import { Link } from 'react-router-dom';

import { Card } from '../../components';

import style from './CardList.module.css';

const CardList = () => {
    const pokemons = useSelector(state => state.pokemons.listView);

    const pokemonSearched = useSelector(state => state.pokemonSearched);

    return (
        <> 
            {pokemonSearched && 
                <div className={style.oneCardList}>
                    <Card key={pokemonSearched.id} 
                        id={pokemonSearched.id}
                        nombre={pokemonSearched.nombre}
                        imagen={pokemonSearched.imagen}
                        types={pokemonSearched.types}
                    
                    />
                </div> 
            }

            {!pokemonSearched && pokemons && 
                <div className={style.list}>
                    {pokemons.map((item) => <Card key={item.id} 
                        id={item.id}
                        nombre={item.nombre}
                        imagen={item.imagen}
                        types={item.types}
                    
                    />)}
                </div>            
            }
            
            
        </>
    )
}

export default CardList;