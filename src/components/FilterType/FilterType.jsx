import { useSelector, useDispatch } from 'react-redux';
import style from './FilterType.module.css';
import { getTypes, setArrayFilterByType, setFilterByTypeFunction } from '../../redux/actions';
import { useEffect } from 'react';

import { IconType } from '../../components';

const FilterType = (props) => {
    const { disabled } = props;
    const dispatch = useDispatch();

    const arrayFilterByType = useSelector(state => state.pokemons.info.arrayFilterByType);
    const options = useSelector(state => state.types);

    useEffect(() => {
        if ( options.length === 0 ) dispatch(getTypes());
    }, [])

    const handleChange = (event) => {
        //console.log(event.target.name, event.target.value)
        dispatch(setArrayFilterByType(event.target.name));
    }

    const isChecked = (nombre) => {
        return arrayFilterByType.indexOf(nombre) !== -1 ? true : false;
    }


    const filterByTypeFunction = useSelector(state => state.pokemons.info.filterByTypeFunction)
    const functionOptions = ['OR', 'AND', 'NOT' ];
    const handleChangeFunction = (event) => {
        dispatch(setFilterByTypeFunction(event.target.value));
    }

    return (
        <>
            <div className={style.filterBox}>
                <span className={style.title} >Types</span>
                <div className={style.optionsList}>

                {functionOptions.map((i) => {
                    return (
                        <div key={'filterByTypeFunction-'+i} className={style.optionBoxFunction}>
                            <button disabled={disabled} value={i} onClick={handleChangeFunction} className={`${style.buttonFunction} ${filterByTypeFunction == i ? style.selected : ''}`}>{i}</button>
                        </div>
                    )
                })}
                
                </div>

                <div className={style.optionsList}>
                    {options.map(item => {
                        return (
                            <div key={'Type-'+item.id} className={style.optionBox}>
                            <label >
                                <input disabled={disabled} type="checkbox" onChange={handleChange} name={item.nombre} value={item.nombre} checked={isChecked(item.nombre)} />
                                    <IconType size={'x-small'} disabled={disabled}  type={item.nombre} />
                                <span>{item.nombre}</span>
                            </label>
                            </div>
                            
                        )
                    })}
                </div>
                <div className={style.selectAllBox}></div>

                
            </div>            
        </>
    )
}

export default FilterType;