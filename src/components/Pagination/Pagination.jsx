import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/actions";
import { useEffect, useState } from "react";

import { AiOutlineLeft } from 'react-icons/ai'

import style from './Pagination.module.css';

const Pagination = () => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.pokemons.info.page);
    const totalItems = useSelector(state => state.pokemons.info.totalItems);
    const limit = useSelector(state => state.pokemons.info.limit);

    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        setTotalPages(Math.ceil(totalItems / limit));
    },[page, totalItems, limit])

    const handleClick = (number) => {  
        console.log(number)      
        dispatch(setPage(number))        
    }

    return (
        <>
            <div className={style.paginationBox}>
                <button className={style.arrowButton} disabled={page === 1}  onClick={() => handleClick(1)}>First</button>

                <button className={style.arrowButton} disabled={page === 1} onClick={() => handleClick(page - 1)}>Prev</button>

                {page === totalPages && totalPages > 2 && <button className={style.numberButton} onClick={() => handleClick(page - 2)} >{page - 2}</button>}
                {page !== 1 && <button className={style.numberButton} onClick={() => handleClick(page - 1)}>{page - 1}</button>}

                <button className={`${style.selected} ${style.numberButton}`}>{page}</button>

                {page !== totalPages && <button className={style.numberButton} onClick={() => handleClick(page + 1)}>{page + 1}</button>}
                {page === 1 && totalPages > 2 && <button className={style.numberButton} onClick={() => handleClick(page + 2)}>{page + 2}</button>}

                <button className={style.arrowButton} disabled={totalPages === page} onClick={() => handleClick(page + 1)}>Next</button>

                <button className={style.arrowButton} disabled={page === totalPages} onClick={() => handleClick(totalPages)}>Last</button>

            </div>
            
            
            
        </>
    )
}

export default Pagination;