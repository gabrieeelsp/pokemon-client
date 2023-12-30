import style from './Detail.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { capitalize } from '../../utils/helpers';
import { IconType, ProgressBarsDetail } from '../../components';


import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTypes, removePokemon } from '../../redux/actions';

import { GiConfirmed } from 'react-icons/gi';
import { IoCloseCircleOutline } from 'react-icons/io5'

const Detail = (props) => {
    const {
        id,
        nombre, 
        imagen,
        types,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        origin,
    } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickEdit = () => {
        navigate(`/edit/${id}`)
    }


    const typesList = useSelector(state => state.types);
    useEffect( () => {
        if ( typesList.length === 0 ) dispatch(getTypes());
    }, [])
    const hasType = (type) => {
        for ( let t of types ) {
            if ( type.toLowerCase() === t.nombre.toLowerCase() ) {
                return true
            };
        }

        return false;
    }

    const [isImagenReady, setIsImagenReady] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setIsImagenReady(true);
        }
        img.src = imagen
    }, []);


    const [isRemoveOptionActive, setIsRemoveOptionActive] = useState(false);
    const handleClickRemoveOption = () => {
        setIsRemoveOptionActive(!isRemoveOptionActive);
    }

    const handleRemove = () => {
        dispatch(removePokemon(id))
            .then(() => navigate('/home'))
    }
    

    return (
        <>
            <div className={`${style.card} ${isImagenReady ? style.cardVisible : null}`}>
                <div className={style.cardImage}>
                    <img src={imagen} />
                </div>

                <div className={style.cardData}>
                    {origin === 'local' && 
                    <div className={style.editremoveButtons}>
                        <span className={`${style.editButton} ${isRemoveOptionActive ? style.hide : ''}`} onClick={handleClickEdit}>Edit</span>{isRemoveOptionActive ? <span className={style.confirmationButton}>Estas seguro de eliminar? <GiConfirmed onClick={handleRemove} style={{color: 'green'}} /> <IoCloseCircleOutline onClick={handleClickRemoveOption} style={{color:'black'}} /></span> : <span onClick={handleClickRemoveOption} className={style.removeButton}>Remove</span>}
                    </div>}

                    <h1 className={style.nameTitle}>{capitalize(nombre)}</h1>
                    
                    <div className={style.medidasBox}>
                        <div className={style.medidaBox}>
                            <span>Altura</span>
                            <span>{altura ? altura / 10 : '-'} M</span>
                        </div>
                        <div className={style.medidaBox}>
                            <span>Peso</span>
                            <span>{peso ? peso / 10 : '-'} Kg</span>
                        </div>
                    </div>

                    <div className={style.valuesBox}>
                        <ProgressBarsDetail
                            vida={vida}
                            ataque={ataque}
                            defensa={defensa}
                            velocidad={velocidad}
                        />

                        
                        
                    </div>
                    <div className={style.typesBox}>

                        {typesList?.map(item => {

                            if (hasType(item.nombre)) { 
                                return <div key={nombre + '-' + item.id} className={style.scale}><IconType  type={item.nombre} /></div> 
                        
                            } else {
                                return <div key={nombre + '-' + item.id}className={style.greyIcon} ><IconType type={item.nombre} /></div> 
                            }
                        }
                            
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail;