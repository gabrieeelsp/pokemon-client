import { useSelector, useDispatch } from 'react-redux';
import style from './FilterSource.module.css';
import { setFilterByOrigin } from '../../redux/actions';

const FilterSource = (props) => {
    const { disabled } = props;
    const dispatch = useDispatch();

    const options = ['All', 'Local', 'Remote'];

    const filterByOrigin = useSelector(state => state.pokemons.info.filterByOrigin);
    
    const handleChange = (event) => {
        dispatch(setFilterByOrigin(event.target.value))
    }

    const list = useSelector(state => state.pokemons.list)
    const types = useSelector(state => state.pokemons.info.arrayFilterByType);
    const filterByTypeFunction = useSelector(state => state.pokemons.info.filterByTypeFunction);
    const getCount = (source) => {
        if ( filterByTypeFunction === 'OR' ) {
            return list.filter(p => {
                if ( types.length === 0 ) return true;
                for ( let type of p.types ) {
                    for ( let filterType of types ) {
                        if ( type.nombre === filterType ) return true;
                    }
                }
                return false;
            }).filter(item => item.origin.toLowerCase() === source.toLowerCase()).length; 
        } 

        if ( filterByTypeFunction === 'NOT' ) {
            return list.filter(p => {
                if ( types.length === 0 ) return true;
                for ( let type of p.types ) {
                    for ( let filterType of types ) {
                        if ( type.nombre === filterType ) return false;
                    }
                }
                return true;
            }).filter(item => item.origin.toLowerCase() === source.toLowerCase()).length; 
        } 

        if ( filterByTypeFunction === 'AND' ) {
            return list.filter(item => {
                let contCoincidencias = 0;
                for ( let type of item.types ) {
                    for (  let filterType of types ) {
                        if ( type.nombre === filterType ) contCoincidencias = contCoincidencias + 1;
                    }
                }
                if ( contCoincidencias === types.length ) return true;
                return false;
            }).filter(item => item.origin.toLowerCase() === source.toLowerCase()).length; 
        } 
        

    }

    return (
        <>
            <div className={style.filterBox}>
                <span className={style.title} >Source</span>
                {options.map((item) => {
                    return (
                        <div key={'filterByOrigin-'+item} className={style.optionBox}>
                            <label>
                                <input onChange={handleChange} disabled={disabled}  type="radio" name='source' value={item} checked={filterByOrigin == item} />
                                <span>{item}</span>
                                
                            </label>
                            <span className={style.count}>
                                {item !== 'All' && getCount(item)}
                            </span>
                        </div>
                    )
                })}

                
                

            </div>
            
        </>
    )
}

export default FilterSource;