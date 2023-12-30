import axios from 'axios';

export const RESET = 'RESET';
export const reset = () => {
    return {type: RESET};
}

export const SET_FILTER_BY_TYPE_FUNCTION = 'SET_FILTER_BY_TYPE_FUNCTION';
export const setFilterByTypeFunction = (value) => {
    return {type: SET_FILTER_BY_TYPE_FUNCTION, payload: value}
}

export const SET_SEARCHED_POKEMON = 'SET_SEARCHED_POKEMON';
export const setSearchedPokemon = (name) => {
    return async (dispatch) => {
        try {
            const resp = await axios.get(`https://pokemon.backhub.net.ar/pokemons?name=${name}`);
            //const resp = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            dispatch({type: SET_SEARCHED_POKEMON, payload:resp.data});
        }  catch (error) {
            throw new Error(error.message);
        }
    }
}

export const CLEAN_SEARCHED_POKEMON = 'CLEAN_SEARCHED_POKEMON';
export const cleanSearchedPokemon = () => {
    return {type: CLEAN_SEARCHED_POKEMON}
}

export const GET_TYPES = 'GET_TYPES';
export const getTypes = () => {
    return async (dispatch) => {
        try {
            const resp = await axios.get('https://pokemon.backhub.net.ar/types');
            //const resp = await axios.get('http://localhost:3001/types');
            const listOrdered = resp.data.sort((a, b) => {
                if ( a.nombre < b.nombre ) return -1;
                if ( a.nombre > b.nombre ) return 1;
                return 0; 
            } )
            dispatch({type: GET_TYPES, payload: resp.data});
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const REMOVE_POKEMON = 'REMOVE_POKEMON';
export const removePokemon = (id) => {
    return async (dispatch) => {
        try {
            const resp = await axios.delete(`https://pokemon.backhub.net.ar/pokemons/${id}`);
            //const resp = await axios.delete(`http://localhost:3001/pokemons/${id}`);
            dispatch({type: REMOVE_POKEMON, payload: id});
            return true;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
}
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const createPokemon = (pokemonData) => {
    return async (dispatch) => {
        try {
            const resp = await axios.post('https://pokemon.backhub.net.ar/pokemons', pokemonData);
            //const resp = await axios.post('http://localhost:3001/pokemons', pokemonData);

            dispatch({type: CREATE_POKEMON, payload: resp.data});
            return resp.data.id;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
}

export const UPDATE_POKEMON = 'UPDATE_POKEMON';
export const updatePokemon = (pokemonData) => {
    return async (dispatch) => {
        try {
            const resp = await axios.put(`https://pokemon.backhub.net.ar/pokemons/${pokemonData.id}`, pokemonData);
            //const resp = await axios.put(`http://localhost:3001/pokemons/${pokemonData.id}`, pokemonData);
            
            dispatch({type: UPDATE_POKEMON, payload: resp.data});
            return resp.data.id;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
}

export const GET_POKEMONS = 'GET_POKEMONS';
export const getPokemons = () => {
    return async (dispatch) => {
        try {
            const resp = await axios.get('https://pokemon.backhub.net.ar/pokemons');
            //const resp = await axios.get('http://localhost:3001/pokemons');
            dispatch({type: GET_POKEMONS, payload: resp.data});
            return true;
        } catch (error) {
            throw new Error(error.message)
            //return false;
        }
    }
}

export const CLEAN_POKEMONS = 'CLEAN_POKEMONS';
export const cleanPokemons = () => {
    return {type: CLEAN_POKEMONS};
}

export const PAGINATE_LIST_POKEMONS = 'PAGINATE_LIST_POKEMONS';
export const paginateListPokemons = () => {
    return {type: PAGINATE_LIST_POKEMONS};
}

export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const getPokemonById = (id) => {
    return async (dispatch) => {
        try {
            const resp = await axios.get(`https://pokemon.backhub.net.ar/pokemons/${id}`);
            //const resp = await axios.get(`http://localhost:3001/pokemons/${id}`);
            dispatch({type: GET_POKEMON_BY_ID, payload: resp.data});
            return true;
        } catch (error) {
            return false;
        }
    }
}

export const CLEAN_POKEMON = 'CLEAN_POKEMON';
export const cleanPokemon = () => {
    return {type: CLEAN_POKEMON};
}

export const GET_POKEMON_TO_EDIT_BY_ID = 'GET_POKEMON_TO_EDIT_BY_ID';
export const getPokemonToEditById = (id) => {
    return async (dispatch) => {
        try {
            const resp = await axios.get(`https://pokemon.backhub.net.ar/pokemons/${id}`);
            //const resp = await axios.get(`http://localhost:3001/pokemons/${id}`);
            dispatch({type: GET_POKEMON_TO_EDIT_BY_ID, payload: resp.data});
            return true;
        } catch (error) {
            return false;
        }
    }
}

export const CLEAN_POKEMON_TO_EDIT = 'CLEAN_POKEMON_TO_EDIT';
export const cleanPokemonToEdit = () => {
    return {type: CLEAN_POKEMON_TO_EDIT};
}

export const SET_ARRAY_FILTER_BY_TYPE = 'SET_ARRAY_FILTER_BY_TYPE';
export const setArrayFilterByType = (type) => {
    return {type: SET_ARRAY_FILTER_BY_TYPE, payload: type}
}

export const SET_FILTER_BY_TYPE = 'SET_FILTER_BY_TYPE';
export const setFilterByType = (type) => {
    return {type: SET_FILTER_BY_TYPE, payload: type}
}

export const SET_FILTER_BY_ORIGIN = 'SET_FILTER_BY_ORIGIN';
export const setFilterByOrigin = (origin) => {
    return {type: SET_FILTER_BY_ORIGIN, payload: origin}
}

export const SET_ORDER_VALUE = 'SET_ORDER_VALUE';
export const setOrderValue = (order) => {
    return {type: SET_ORDER_VALUE, payload: order}
}

export const SET_ORDER_BY = 'SET_ORDER_BY';
export const setOrderBy = (order) => {
    return {type: SET_ORDER_BY, payload: order}
}

export const SET_ORDER_DIRECTION = 'SET_ORDER_DIRECTION';
export const setOrderDirection = (direction) => {
    return {type: SET_ORDER_DIRECTION, payload: direction}
}

export const SET_PAGE = 'SET_PAGE';
export const setPage = (page) => {
    return {type: SET_PAGE, payload: page}
}