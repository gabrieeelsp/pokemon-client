import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getPokemons } from '../../redux/actions';

import style from './IndexView.module.css';

import loading from './image/loading.gif'

const IndexView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);

    const handClickStart = async () => {
        setIsSearching(true);
        dispatch(getPokemons())
            .then(() => {
                navigate('/home');
            } )
            .catch((error) => {
                setIsSearching(false);
                console.log(error.message)
            })

    }

    return (
        <>
            <div className={style.container}>
                <div className={style.logoBox}>
                    <img src='/logo.png' />
                </div>
                <div className={style.buttonBox} >
                    
                    <div className={style.buttonExt} >
                        <img src={loading} className={style.searchingImage} style={{opacity:0}} />
                        <button onClick={handClickStart} className={style.buttonStart} >Let's start</button>
                        {isSearching && <img src={loading} className={style.searchingImage} /> }
                        {!isSearching && <img src={loading} className={style.searchingImage} style={{opacity:0}} />}
                    </div>
                    
                </div>
                <div className={style.imagesBox} >
                    <img className={style.character} src='/images/30.png' />
                    <img className={style.character} src='/images/122.png' />
                    <img className={style.character} src='/images/25.png' />
                    <img className={style.character} src='/images/8.png' />
                    <img className={style.character} src='/images/40.png' />
                    <img className={style.character} src='/Pikachu1.png' />
                </div>
            </div>
            


            
        </>
    )
}

export default IndexView;