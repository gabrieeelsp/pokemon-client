import style from './InputText.module.css';

const InputText = (props) => {
    const {
        handleChange,

        label,
        value,
        name,

        error,

    } = props;
    return (
        <>
            <div className={style.attributeBox}>
                <div className={style.inputLine}>
                    <div className={style.labelBox}>
                        <label htmlFor={name}>{label}</label>
                    </div>
                    <div className={style.inputBox}>
                        <input type="text" name={name} onChange={handleChange(value)} value={value} />
                    </div>
                </div>
                <div className={style.errorLine}>
                    <div className={style.labelBox}>
                        
                    </div>
                    <div className={style.errorBox}>
                        { !error && <span className={style.errorMessage} style={{opacity: 0}}>No error</span>}
                        { error && <span className={style.errorMessage}>{error}</span>}
                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default InputText;