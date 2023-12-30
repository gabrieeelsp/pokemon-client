import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { CardList, Pagination, SideBar, EmptyList } from "../../components";

import { cleanPokemons, getPokemons, paginateListPokemons } from "../../redux/actions";

import style from './HomeView.module.css';

import loading from './image/loading.gif'

const HomeView = () => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.pokemons.list);
    const listView = useSelector(state => state.pokemons.listView);
    useEffect(() => {

        if ( list.length === 0 ) {
            setIsLoading(true)
            dispatch(getPokemons())
                .then(() => setIsLoading(false))
        } else {
            dispatch(paginateListPokemons());
        }

        return () => dispatch(cleanPokemons());
    }, []);

    const [isLoading, setIsLoading] = useState(false);

    const pokemonSearched = useSelector(state => state.pokemonSearched);

   

    return (
        <>
            <div className={style.container} >
                <div className={style.sidebar} >
                    <SideBar disabled={pokemonSearched}/>
                    
                </div>
                <div className={style.home} >
                    {isLoading &&  <img src={loading} className={style.searchingImage} />}

                    
                    <CardList  />
                    {!pokemonSearched && listView.length !== 0 &&
                        <Pagination />
                    }

                    { !isLoading && !pokemonSearched && listView.length === 0 &&
                        <EmptyList />
                    }
                </div>

            </div>            
        </>
    )
}

export default HomeView;