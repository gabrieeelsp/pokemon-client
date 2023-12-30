import { useSelector, useDispatch } from 'react-redux';
import style from './Order.module.css';
import { setOrderValue } from '../../redux/actions';

const Order = (props) => {
    const { disabled } = props;
    const dispatch = useDispatch();

    const options = ['None', 'Nombre ASC', 'Nombre DESC', 'Mayor Ataque', 'Menor Ataque'];

    const orderValue = useSelector(state => state.pokemons.info.orderValue);
    
    const handleChange = (event) => {
        dispatch(setOrderValue(event.target.value));
    }

    return (
        <>
            <div className={style.filterBox}>
                <span className={style.title} >Order By</span>
                <div className={style.optionBox}>
                    <select disabled={disabled} value={orderValue} onChange={handleChange} >
                        {options.map(option => <option key={option} value={option} >{option}</option>)}
                    </select>
                </div>
            </div>
            
        </>
    )
}

export default Order;