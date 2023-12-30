import { useEffect, useState } from 'react';
import style from './Error404.module.css';
import sadPikachu from './images/sadPikachu.png';

const Error404 = () => {

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
                <span>404</span>
            </div>
        </>
    )
}

export default Error404;