import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { validateName, validateAttack, validateVida, validateDefensa, validateVelocidad, validatePeso, validateAltura, validateTypes, validateImage } from "../../utils/Validations";
import { createPokemon, updatePokemon } from "../../redux/actions";

import loading from './image/loading.gif'

import style from './FormCreate.module.css';

import { AiOutlineCheck } from 'react-icons/ai';

import axios from 'axios';

const FormCreate = (props) => {
    const { pokemonEdit } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pokemonData, setPokemonData] = useState({nombre: '', ataque: '', vida: '', defensa: '', velocidad: '', altura: '', peso: '', imagen: '', types: {slot1: 0, slot2: 0}});
    const [errors, setErrors] = useState({nombre: '', ataque: '', vida: '', defensa: '', velocidad: '', altura: '', peso: '', imagen: '', types: ''});
    const [errorForm, setErrorForm] = useState('');

    useEffect(() => {
        if ( pokemonEdit ) {
            setPokemonData({
                ...pokemonData,
                nombre: pokemonEdit.nombre, 
                ataque: pokemonEdit.ataque, 
                vida: pokemonEdit.vida, 
                defensa: pokemonEdit.defensa, 
                velocidad: pokemonEdit.velocidad ? pokemonEdit.velocidad : '', 
                altura: pokemonEdit.altura ? pokemonEdit.altura : '', 
                peso: pokemonEdit.peso ? pokemonEdit.peso : '', 
                imagen: pokemonEdit.imagen, 
                types: {
                    slot1: pokemonEdit.types[0].id, 
                    slot2: pokemonEdit.types[1] ? pokemonEdit.types[1].id : 0,
                }
            })
        }
    }, []);

    const handleChange = (event) => {
        setErrorForm('');

        const value = event.target.value;
        const property = event.target.name;

        setPokemonData({...pokemonData, [property]: value});

        if ( property === 'nombre' ) setErrors({...errors, nombre: validateName(value)});
        if ( property === 'ataque' ) setErrors({...errors, ataque: validateAttack(value)});
        if ( property === 'vida' ) setErrors({...errors, vida: validateVida(value)});
        if ( property === 'defensa' ) setErrors({...errors, defensa: validateDefensa(value)});
        if ( property === 'velocidad' ) setErrors({...errors, velocidad: validateVelocidad(value)});
        if ( property === 'altura' ) setErrors({...errors, altura: validateAltura(value)});
        if ( property === 'peso' ) setErrors({...errors, peso: validatePeso(value)});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        const errorNombre = validateName(pokemonData.nombre);
        const errorVida = validateVida(pokemonData.vida);
        const errorAtaque = validateAttack(pokemonData.ataque);
        const errorDefensa = validateDefensa(pokemonData.defensa);
        const errorVelocidad = validateVelocidad(pokemonData.velocidad);
        const errorAltura = validateAltura(pokemonData.altura);
        const errorPeso = validatePeso(pokemonData.peso);
        const errorTypes = validateTypes(pokemonData.types);
        let errorImagen = '';
        if ( !pokemonData.imagen ) errorImagen = validateImage(image);

        setErrors({...errors, 
            nombre: errorNombre,
            vida: errorVida,
            ataque: errorAtaque,
            defensa: errorDefensa,
            velocidad: errorVelocidad,
            altura: errorAltura,
            peso: errorPeso,
            types: errorTypes,
            imagen: errorImagen
        })


        if ( 
            errorNombre === '' && 
            errorAtaque === '' &&
            errorVida === '' && 
            errorDefensa === '' && 
            errorVelocidad === '' && 
            errorAltura === '' && 
            errorPeso === '' &&
            errorTypes === '' && 
            errorImagen === ''
            
        ) {
            setErrorForm('')

            let imageUrl = '';
            if ( !pokemonData.imagen ) {
                //agrego la imagen si falla no sigo con el proceso de nuevo pokemon
                imageUrl = await submitImage();
                if ( !imageUrl ) {
                    setErrors({...errors, imagen: 'Se ha producido un error al cargar la imagen.'})
                    console.log('se ha producido un error al cargar la imagen.');
                    return
                }
                //setPokemonData({...pokemonData, imagen: imageUrl});
            }
            

            const types = [];
            if ( pokemonData.types.slot1 !== 0 ) types.push({typeId: pokemonData.types.slot1, slot: 1});
            if ( pokemonData.types.slot2 !== 0 ) types.push({typeId: pokemonData.types.slot2, slot: 2});


            setIsSendingForm(true)

            
            if ( pokemonEdit ) {
                dispatch(updatePokemon({...pokemonData, id: pokemonEdit.id, types: types, imagen: pokemonData.imagen ? pokemonData.imagen : imageUrl}))
                    .then((id) => {
                        console.log('Se ha actualizado la instancia.')
                        navigate(`/detail/${id}`)
                    })
                    .catch((error) => {
                        setErrorForm(error.message);
                        setIsImageUploaded(false);
                    })
                    .finally(() => {
                        setIsSendingForm(false);
                    });
            }else {
                dispatch(createPokemon({...pokemonData, types: types, imagen: imageUrl}))
                    .then((id) => {
                        console.log('Se ha creado la instancia.')
                        navigate(`/detail/${id}`)
                    })
                    .catch((error) => {
                        setErrorForm(error.message);
                        setIsImageUploaded(false);
                    })
                    .finally(() => {
                        setIsSendingForm(false);
                    });

            }

        } else {
            setErrorForm('Hay errores en el formulario.')
        }
    }

    const [typeOptions, setTypeOptions] = useState([]);
    useEffect(() => {
        axios.get('https://pokemon.backhub.net.ar/types')
            .then((resp) => setTypeOptions(resp.data) )
    }, [])
    
    const handleChangeType = (event) => {
        setErrorForm('');
        const value = event.target.value;
        const property = event.target.name;

        setPokemonData({...pokemonData, types: {...pokemonData.types, [property]: value}});

        setErrors({...errors, types: validateTypes({...pokemonData.types, [property]: value})});
 
    }

    const [image, setImage] = useState(null);
    const handleChangeImage = (event) => {
        setErrorForm('');
        setErrors({...errors, imagen: validateImage(event.target.files[0])})
        setImage(event.target.files[0]);
    }
    const handleRemoveImage = () => {
        setErrorForm('');
        setImage(null);
        setPokemonData({...pokemonData, imagen: ''});
        setErrors({...errors, imagen: validateImage(null)});
        
    }

    const [isSendingImage, setIsSendingImage] = useState(false);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const submitImage = async () => {
        setIsSendingImage(true);
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'gmi1gqdi');

        try {
            const resp = await axios.post('https://api.cloudinary.com/v1_1/dvwt2npb4/image/upload', formData);
            setIsImageUploaded(true);
            return resp.data.url;
        } catch (error) {
            return false;
        } finally {
            setIsSendingImage(false);
        }

    } 


    const [isSendingForm, setIsSendingForm] = useState(false);
    
    return (
        <>
            
            
            <form onSubmit={handleSubmit} >
                <div className={style.formBox}>

                    {/* Nombre -------------------------------------------- */}
                    <div className={style.attributeBox}>
                        <div className={style.inputLine}>
                            <div className={style.labelBox}>
                                <label htmlFor="nombre">Nombre</label>
                            </div>
                            <div className={style.inputBox}>
                                <input type="text" name="nombre" onChange={handleChange} value={pokemonData.nombre} />
                            </div>
                        </div>
                        <div className={style.errorLine}>
                            <div className={style.labelBox}></div>
                            <div className={style.errorBox}>
                                <div className={`${style.errorMessageBox} ${errors.nombre ? style.showError : null}`} > 
                                    { !errors.nombre && <span className={style.errorMessage} style={{opacity: 0}}>No error</span>}                                       
                                    { errors.nombre && <span className={`${style.errorMessage}`} >{errors.nombre}</span>}
                                </div>

                                
                            </div>
                        </div>

                    </div>



                    {/* Vida -------------------------------------------- */}
                    <div className={style.attributeBox}>
                        <div className={style.inputLine}>
                            <div className={style.labelBox}>
                                <label htmlFor="vida">Vida</label>
                            </div>
                            <div className={style.inputBox}>
                                <input type="text" name="vida" onChange={handleChange} value={pokemonData.vida} />
                            </div>
                        </div>
                        <div className={style.errorLine}>
                            <div className={style.labelBox}></div>
                            <div className={style.errorBox}>
                                <div className={`${style.errorMessageBox} ${errors.vida ? style.showError : null}`} > 
                                    { !errors.vida && <span className={style.errorMessage} style={{opacity: 0}}>No error</span>}
                                    { errors.vida && <span className={style.errorMessage}>{errors.vida}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ataque -------------------------------------------- */}
                    <div className={style.attributeBox}>
                        <div className={style.inputLine}>
                            <div className={style.labelBox}>
                                <label htmlFor="ataque">Ataque</label>
                            </div>
                            <div className={style.inputBox}>
                                <input type="text" name="ataque" onChange={handleChange} value={pokemonData.ataque} />
                            </div>
                        </div>
                        <div className={style.errorLine}>
                            <div className={style.labelBox}></div>
                            <div className={style.errorBox}>
                                <div className={`${style.errorMessageBox} ${errors.ataque ? style.showError : null}`} >
                                    { !errors.ataque && <span className={style.errorMessage} style={{opacity: 0}}>No error</span>}
                                    { errors.ataque && <span className={style.errorMessage}>{errors.ataque}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Defensa -------------------------------------------- */}
                    <div className={style.attributeBox}>
                        <div className={style.inputLine}>
                            <div className={style.labelBox}>
                                <label htmlFor="defensa">Defensa</label>
                            </div>
                            <div className={style.inputBox}>
                                <input type="text" name="defensa" onChange={handleChange} value={pokemonData.defensa} />
                            </div>
                        </div>
                        <div className={style.errorLine}>
                            <div className={style.labelBox}></div>
                            <div className={style.errorBox}>
                                <div className={`${style.errorMessageBox} ${errors.defensa ? style.showError : null}`} >
                                    { !errors.defensa && <span className={style.errorMessage} style={{opacity: 0}}>No error</span>}
                                    { errors.defensa && <span className={style.errorMessage}>{errors.defensa}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Velocidad -------------------------------------------- */}
                    <div className={style.attributeBox}>
                        <div className={style.inputLine}>
                            <div className={style.labelBox}>
                                <label htmlFor="velocidad">Velocidad</label>
                            </div>
                            <div className={style.inputBox}>
                                <input type="text" name="velocidad" onChange={handleChange} value={pokemonData.velocidad} />
                            </div>
                        </div>
                        <div className={style.errorLine}>
                            <div className={style.labelBox}></div>
                            <div className={style.errorBox}>
                                <div className={`${style.errorMessageBox} ${errors.velocidad ? style.showError : null}`} >   
                                    { !errors.velocidad && <span className={style.errorMessage} style={{opacity: 0}}>No error</span>}
                                    { errors.velocidad && <span className={style.errorMessage}>{errors.velocidad}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Altura -------------------------------------------- */}
                    <div className={style.attributeBox}>
                        <div className={style.inputLine}>
                            <div className={style.labelBox}>
                                <label htmlFor="altura">Altura</label>
                            </div>
                            <div className={style.inputBox}>
                                <input type="text" name="altura" onChange={handleChange} value={pokemonData.altura} />
                            </div>
                        </div>
                        <div className={style.errorLine}>
                            <div className={style.labelBox}></div>
                            <div className={style.errorBox}>
                                <div className={`${style.errorMessageBox} ${errors.altura ? style.showError : null}`} >
                                    { !errors.altura && <span className={style.errorMessage} style={{opacity: 0}}>No error</span>}
                                    { errors.altura && <span className={style.errorMessage}>{errors.altura}</span>}
                                </div>                        
                            </div>
                        </div>
                    </div>

                    {/* Peso -------------------------------------------- */}
                    <div className={style.attributeBox}>
                        <div className={style.inputLine}>
                            <div className={style.labelBox}>
                                <label htmlFor="peso">Peso</label>
                            </div>
                            <div className={style.inputBox}>
                                <input type="text" name="peso" onChange={handleChange} value={pokemonData.peso} />
                            </div>
                        </div>
                        <div className={style.errorLine}>
                            <div className={style.labelBox}></div>
                            <div className={style.errorBox}>
                                <div className={`${style.errorMessageBox} ${errors.peso ? style.showError : null}`} >
                                    { !errors.peso && <span className={style.errorMessage} style={{opacity: 0}}>No error</span>}
                                    { errors.peso && <span className={style.errorMessage}>{errors.peso}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Tipo -------------------------------------------- */}
                    <div className={style.attributeBox}>
                        <div className={style.inputLine}>
                            <div className={style.labelBox}>
                                <label htmlFor="slot1">Tipo de Pokemon</label>
                            </div>
                            <div className={style.selectBox}>
                            <select name="slot1" value={pokemonData.types.slot1} onChange={handleChangeType}>
                                <option value={0}>---</option>
                                {typeOptions?.map(type => <option key={type.id} value={type.id}>{type.nombre}</option>)}
                            </select>
                            <span>/</span>
                            <select name="slot2" value={pokemonData.types.slot2} onChange={handleChangeType}>
                                <option value={0}>---</option>
                                {typeOptions?.map(type => <option key={type.id} value={type.id}>{type.nombre}</option>)}
                            </select>

                                
                            </div>
                        </div>
                        <div className={style.errorLine}>
                            <div className={style.labelBox}></div>
                            <div className={style.errorBox}>
                                <div className={`${style.errorMessageBox} ${errors.types ? style.showError : null}`} >
                                    { !errors.types && <span className={style.errorMessage} style={{opacity: 0}}>No error</span>}
                                    { errors.types && <span className={style.errorMessage}>{errors.types}</span>}
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* Imagen -------------------------------------------- */}
                    <div className={style.attributeBox}>
                        <div className={style.inputLine}>
                            <div className={style.labelBox}>
                                <label >Imagen</label>
                            </div>

                            {pokemonEdit &&
                            <div className={style.imageBox}>
                                {!pokemonData.imagen && !image && <input name="image" type="file" onChange={handleChangeImage}   />}
                                {image && <img src={URL.createObjectURL(image)} className={style.imagena} /> } 
                                {pokemonData.imagen && <img src={pokemonData.imagen} className={style.imagen} />}

                                {(image || pokemonData.imagen ) && !isSendingImage && !isImageUploaded && <button onClick={handleRemoveImage}>Eliminar</button> }
                                {isImageUploaded && <AiOutlineCheck className={style.loadingFormImage} />}
                                {isSendingImage && <img src={loading} className={style.loadingFormImage} /> }
                            </div>}
                            
                            {!pokemonEdit &&
                            <div className={style.imageBox}>
                                {!image && <input name="image" type="file" onChange={handleChangeImage}   />}
                                {image && <img src={URL.createObjectURL(image)} className={style.imagen} /> } 

                                {image && !isSendingImage && !isImageUploaded && <button onClick={handleRemoveImage}>Eliminar</button> }
                                {isImageUploaded && <AiOutlineCheck className={style.loadingFormImage} />}
                                {isSendingImage && <img src={loading} className={style.loadingFormImage} /> }
                            </div>}
                        </div>
                        <div className={style.errorLine}>
                            <div className={style.labelBox}></div>
                            <div className={style.errorBox}>
                                <div className={`${style.errorMessageBox} ${errors.imagen ? style.showError : null}`} >
                                    { !errors.imagen && <span className={style.errorMessage} style={{opacity: 0}}>No error</span>}
                                    { errors.imagen && <span className={style.errorMessage}>{errors.imagen}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons -------------------------------------------- */}
                    <div className={style.attributeBox}>
                        <div className={style.inputLine}>
                            <div className={style.labelBox}>
                                
                            </div>
                            <div className={style.buttonsBox}>
                                <button type="submit">Enviar</button>
                                <div className={style.errorBox}>
                                    { isSendingForm && <img src={loading} className={style.loadingFormImage} />}
                                    <div className={`${style.errorMessageBox} ${errorForm ? style.showError : null}`} >                                        
                                        { errorForm && <span className={`${style.errorMessage}`} >{errorForm}</span>}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className={style.errorLine}>
                            <div className={style.labelBox}></div>
                            
                            <div className={style.errorBox}>

                            </div>
                        </div>
                    </div>
                   
                </div>
            </form>
            
            
        </>
    )
}

export default FormCreate;