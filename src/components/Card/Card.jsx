import { Link } from 'react-router-dom';
import style from './Card.module.css';
import { capitalize, colorByType } from '../../utils/helpers';

import { IconType } from '../../components';
import { useEffect, useState } from 'react';

import deafultImage from './images/default.png';

const Card = (props) => {
    const {
        id,
        nombre,
        imagen,
        types,
    } = props;

    const [isImagenReady, setIsImagenReady] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setTimeout(() => {
                setIsImagenReady(true);

            }, Math.random() * 800 + 300)
        }
        img.src = imagen
    }, []);

    const width = 16;

    return (
        <>
            <div className={`${style.card} ${isImagenReady ? style.cardVisible : null}`}  >                
                <div className={style.cardImage}>
                    {!isImagenReady && <img src={deafultImage} />}

                    {isImagenReady && <img src={imagen} /> }
                </div>
                <div className={style.extCardName} >
                    <div className={style.cardName}>
                        <Link to={`/detail/${id}`} className={style.name}>{capitalize(nombre)}</Link>
                        
                    </div>
                    <div className={style.cardTypes}>
                        {types?.map(item => <div key={nombre + '-' + item.id} className={style.iconBox}> <IconType  type={item.nombre} /><span style={{color: colorByType(item.nombre)}}>{capitalize(item.nombre)}</span> </div>)}
                        
                    </div>
                </div>
                
            </div>          
            
        </>
    )
}

export default Card;