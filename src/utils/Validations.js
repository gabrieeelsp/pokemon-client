export const validateName = (name) => {
    if ( !name) return 'El nombre no puede estar vacío';
    return '';
}

export const validateAttack = (ataque) => {
    if ( !ataque ) return 'No puede quedar vacío.';
    if ( isNaN(ataque) ) return 'Debe ingresar un numero.';
    if ( Number(ataque) > 260 ) return 'No puede ser mayor a 260';
    return '';
}

export const validateVida = (vida) => {
    if ( !vida ) return 'No puede quedar vacío.';
    if ( isNaN(vida) ) return 'Debe ingresar un numero.';
    if ( Number(vida) > 260 ) return 'No puede ser mayor a 260';
    return '';
}

export const validateDefensa = (defensa) => {
    if ( !defensa ) return 'No puede quedar vacío.';
    if ( isNaN(defensa) ) return 'Debe ingresar un numero.';
    if ( Number(defensa) > 260 ) return 'No puede ser mayor a 260';
    return '';
}

export const validateVelocidad = (velocidad) => {
    if ( isNaN(velocidad) ) return 'Debe ingresar un numero.';
    if ( Number(velocidad) > 260 ) return 'No puede ser mayor a 260';
    return '';
}

export const validateAltura = (altura) => {
    if ( isNaN(altura) ) return 'Debe ingresar un numero.';
    return '';
}

export const validatePeso = (peso) => {
    if ( isNaN(peso) ) return 'Debe ingresar un numero.';
    return '';
}

export const validateTypes = (types) => {
    if ( types.slot1 == 0 && types.slot2 == 0 ) return 'Debe seleccionar un tipo';
    if ( types.slot1 == 0 && types.slot2 != 0 ) return 'El primer tipo no puede quedar vacío';
    if ( types.slot1 === types.slot2 ) return 'Los dos tipos no pueden ser identicos';
    return '';
}

export const validateImage = (image) => {
    if ( !image ) return 'Se debe seleccionar una imagen.';
    return '';
}