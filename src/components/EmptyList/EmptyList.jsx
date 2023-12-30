import { useEffect, useState } from 'react';
import style from './EmptyList.module.css';
import sadPikachu from './images/sadPikachu.png';

const EmptyList = () => {

    const [ isShowed, setIsShowed] = useState(false);
    useEffect(() => {
        setIsShowed(true)
        return (() => {
            setIsShowed(false)
        })
    }, [])
    return (
        <>
            <div className={`${style.emptyBox} ${isShowed ? style.show : ''}`}>
                <div className={style.imageBox}>
                    <img src={sadPikachu} alt="" />
                </div>
                <span>No hay nada para mostrar.</span>
            </div>
        </>
    )
}

export default EmptyList;