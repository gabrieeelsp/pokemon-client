import { useSelector, useDispatch } from "react-redux";
import { setFilterByOrigin, setOrderBy, setOrderDirection, getTypes, setFilterByType } from "../../redux/actions";
import { useEffect } from "react";

import style from './FilterAndOrder.module.css';

const FilterAndOrder = () => {
    const dispatch = useDispatch();

    const origin = useSelector(state => state.pokemons.info.filterByOrigin);
    const optionsOrigin = ['All', 'Remote', 'Local'];
    const handleChangeOrigin = (event) => {
        dispatch(setFilterByOrigin(event.target.value));
    }

    const orderBy = useSelector(state => state.pokemons.info.orderBy);
    const optionsOrderBy = ['none', 'Name', 'Attack'];
    const handleChangeOrderBy = (event) => {
        dispatch(setOrderBy(event.target.value));
    }

    const orderDirection = useSelector(state => state.pokemons.info.orderDirection);
    const optionsOrderDirection = ['none', 'ASC', 'DESC'];
    const handleChangeOrderDirection = (event) => {
        dispatch(setOrderDirection(event.target.value));
    }

    const type = useSelector(state => state.pokemons.info.filterByType);
    const optionsType = useSelector(state => state.types);
    useEffect(() => {
        if ( optionsType.length === 0 ) dispatch(getTypes());
    }, [])
    const handleChangeType = (event) => {
        dispatch(setFilterByType(event.target.value));
    }


    return (
        <>
            <div className={style.container}>
                <div className={style.filterBox}>
                    <span className={style.title}>SOURCE</span>
                    <select value={origin} onChange={handleChangeOrigin}>
                        {optionsOrigin.map((option) => <option key={option} value={option} >{option}</option>)}
                    </select>
                </div>
                <div className={style.filterBox}>
                    <span className={style.title}>TIPO</span>
                    <select value={type} onChange={handleChangeType}>
                        <option value="All">All</option>
                        {optionsType.map(option => <option key={option.nombre} value={option.nombre}>{option.nombre}</option>)}
                    </select>
                </div>

                <div className={style.orders}>

                </div>
            </div>
            

            

            <select value={orderBy} onChange={handleChangeOrderBy}>
                {optionsOrderBy.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>

            <select value={orderDirection} onChange={handleChangeOrderDirection}>
                {optionsOrderDirection.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
        </>
    )
}

export default FilterAndOrder;