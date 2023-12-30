import { FilterSource, FilterType, Order } from '../../components';
import style from './Sidebar.module.css';

const SideBar = (props) => {
    const { disabled } = props;
    return (
        <>
            <div className={`${style.container} ${disabled ? style.disabled : ''}`}>
                <FilterSource disabled={disabled} />
                <FilterType disabled={disabled} />
                <Order disabled={disabled} />

            </div>
        </>
    )
}

export default SideBar;