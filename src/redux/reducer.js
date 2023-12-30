import {
    CREATE_POKEMON,
    GET_POKEMONS,
    CLEAN_POKEMONS,
    SET_FILTER_BY_TYPE,
    SET_FILTER_BY_ORIGIN,
    SET_ORDER_BY,
    SET_ORDER_DIRECTION,
    GET_POKEMON_BY_ID,
    CLEAN_POKEMON,
    SET_PAGE,
    PAGINATE_LIST_POKEMONS,
    GET_TYPES,
    SET_ARRAY_FILTER_BY_TYPE,
    SET_ORDER_VALUE,
    SET_SEARCHED_POKEMON,
    CLEAN_SEARCHED_POKEMON,
    SET_FILTER_BY_TYPE_FUNCTION,
    RESET,
    CLEAN_POKEMON_TO_EDIT,
    GET_POKEMON_TO_EDIT_BY_ID,
    UPDATE_POKEMON,
    REMOVE_POKEMON,

} from './actions';

const initialState = {
    pokemons: {
        list: [],
        listView: [],
        listPaginated: [],
        
        info: {
            filterByType: 'All', 
            arrayFilterByType: [],
            filterByTypeFunction: 'OR', // ['AND', 'OR', 'NOT' ]
            filterByOrigin: 'All', // [ 'Remote', 'Local', 'All' ]
            

            orderBy: 'none', // ['Name', 'Attack', 'none']
            orderDirection: 'none', // ['ASC', 'DESC', 'none']

            orderValue: 'none', // ['None', 'Nombre ASC', 'Nombre DESC', 'Mayor Ataque', 'Menor Ataque'];

            page: 1,
            limit: 12,
            totalItems: 1,
        }
    },
    pokemon: null,
    pokemonEdit: null,

    types: [],

    pokemonSearched: null,
};

const setPokemonsListView = (filterByType, filterByOrigin, orderBy, orderDirection, list, arrayFilterByType, orderValue, filterByTypeFunction) => {
    let array = [...list];

    //if ( filterByType !== 'All' ) array = list.filter(item => item.types.filter(type => type.nombre === filterByType).length !== 0);

    // if ( filterByType !== 'All' ) array = list.filter(item => {
    //     let resp = false;
    //     for ( let typeFiñ )
    // })

    if ( filterByOrigin !== 'All' ) array = array.filter(item => item.origin === filterByOrigin.toLowerCase())

    if ( arrayFilterByType.length !== 0 && filterByTypeFunction === 'OR' ) {
        array = array.filter(item => {
            for( let type of item.types ) {
                for ( let filterType of  arrayFilterByType) {
                    if ( type.nombre === filterType ) return true;
                }
            }
            return false;
        })
    }

    if ( arrayFilterByType.length !== 0 && filterByTypeFunction === 'NOT' ) {
        array = array.filter(item => {
            for( let type of item.types ) {
                for ( let filterType of  arrayFilterByType) {
                    if ( type.nombre === filterType ) return false;
                }
            }
            return true;
        })
    }

    if ( arrayFilterByType.length !== 0 && filterByTypeFunction === 'AND') {
        array = array.filter(item => {
            let contCoincidencias = 0;
            for ( let type of item.types ) {
                for (  let filterType of arrayFilterByType ) {
                    if ( type.nombre === filterType ) contCoincidencias = contCoincidencias + 1;
                }
            }
            if ( contCoincidencias === arrayFilterByType.length ) return true;
            return false;
        })
    }

    if ( orderValue === 'Nombre ASC' ) array.sort((a, b) => a.nombre  < b.nombre ? -1 : 1)
    if ( orderValue === 'Nombre DESC' ) array.sort((a, b) => a.nombre  > b.nombre ? -1 : 1)
    if ( orderValue === 'Mayor Ataque' ) array.sort((a, b) => a.ataque  > b.ataque ? -1 : 1)
    if ( orderValue === 'Menor Ataque' ) array.sort((a, b) => a.ataque  < b.ataque ? -1 : 1)

    //if ( orderBy === 'Name' && orderDirection === 'ASC' ) array.sort((a, b) => a.nombre  < b.nombre ? -1 : 1)
    //if ( orderBy === 'Name' && orderDirection === 'DESC' ) array.sort((a, b) => a.nombre  > b.nombre ? -1 : 1)

    //if ( orderBy === 'Attack' && orderDirection === 'ASC' ) array.sort((a, b) => a.ataque  < b.ataque ? -1 : 1)
    //if ( orderBy === 'Attack' && orderDirection === 'DESC' ) array.sort((a, b) => a.ataque  > b.ataque ? -1 : 1)

    return array;
}

const setPagination = (page, limit, list) => {
    let array = [...list];

    const offset = (page - 1) * limit;

    array = array.filter((_, index) => index >= offset && index < offset + limit )

    return array;
} 

const indexOfList = (list, id) => {
    for ( let i = 0; i < list.length; i++ ) {
        if ( list[i].id === id ) return i;
    }

    return -1;
}

const rootReducer = (state = initialState ,action) => {
    switch (action.type) {

        case RESET: {
            return initialState;
        }

        case SET_FILTER_BY_TYPE_FUNCTION: {
            const listView = setPokemonsListView(state.pokemons.info.filterByType, state.pokemons.info.filterByOrigin, state.pokemons.info.orderBy, state.pokemons.info.orderDirection, state.pokemons.list, state.pokemons.info.arrayFilterByType, action.payload, action.payload);
            return {
                ...state, 
                pokemons: {
                    ...state.pokemons, 
                    info: {
                        ...state.pokemons.info, 
                        page: 1,
                        filterByTypeFunction: action.payload,
                        totalItems: listView.length,
                    },
                    listView: setPagination(1, state.pokemons.info.limit, listView),
                }
            }
        }

        case SET_SEARCHED_POKEMON: {
            return {
                ...state,
                pokemonSearched: action.payload,
            }
        }

        case CLEAN_SEARCHED_POKEMON: {
            return {
                ...state,
                pokemonSearched: null,
            }
        }

        case GET_TYPES: {
            return {
                ...state,
                types: action.payload,
            }
        }

        case CREATE_POKEMON: {
            const index = state.pokemons.list.filter(item => item.origin === 'local').length;
            const list = [...state.pokemons.list.slice(0, index), action.payload, ...state.pokemons.list.slice(index)];
            const listView = setPokemonsListView(state.pokemons.info.filterByType, state.pokemons.info.filterByOrigin, state.pokemons.info.orderBy, state.pokemons.info.orderDirection, state.pokemons.list, state.pokemons.info.arrayFilterByType, state.pokemons.info.orderValue, state.pokemons.info.filterByTypeFunction);
            return {
                ...state,
                pokemons: {
                    ...state.pokemons,
                    list: list,
                    info: {
                        ...state.pokemons.info,
                        totalItems: listView.length,
                        listView: setPagination(state.pokemons.info.page, state.pokemons.info.limit, listView ),
                    }
                }
            }
        }

        case REMOVE_POKEMON: {
            let list = [];
            if ( state.pokemons.list.length !== 0 ) {
                const index = indexOfList(state.pokemons.list, action.payload);
                
                list = [...state.pokemons.list.slice(0, index), ...state.pokemons.list.slice(index+1)]
            }

            //list = list.filter(item => item.id !== action.payload.id)
            const listView = setPokemonsListView(state.pokemons.info.filterByType, state.pokemons.info.filterByOrigin, state.pokemons.info.orderBy, state.pokemons.info.orderDirection, list, state.pokemons.info.arrayFilterByType, state.pokemons.info.orderValue, state.pokemons.info.filterByTypeFunction);
            return {
                ...state,
                pokemons: {
                    ...state.pokemons,
                    list: list,
                    info: {
                        ...state.pokemons.info,
                        totalItems: listView.length,
                        listView: setPagination(state.pokemons.info.page, state.pokemons.info.limit, listView ),
                    }
                }
            }

        }

        case UPDATE_POKEMON: {
            let list = [];
            if ( state.pokemons.list.length !== 0 ) {
                const index = indexOfList(state.pokemons.list, action.payload.id);
                
                list = [...state.pokemons.list.slice(0, index), action.payload, ...state.pokemons.list.slice(index+1)]
            } 
            
            
            const listView = setPokemonsListView(state.pokemons.info.filterByType, state.pokemons.info.filterByOrigin, state.pokemons.info.orderBy, state.pokemons.info.orderDirection, list, state.pokemons.info.arrayFilterByType, state.pokemons.info.orderValue, state.pokemons.info.filterByTypeFunction);
            return {
                ...state,
                pokemons: {
                    ...state.pokemons,
                    list: list,
                    info: {
                        ...state.pokemons.info,
                        totalItems: listView.length,
                        listView: setPagination(state.pokemons.info.page, state.pokemons.info.limit, listView ),
                    }
                }
            }
        }

        case GET_POKEMONS: {
            const listView = setPokemonsListView(state.pokemons.info.filterByType, state.pokemons.info.filterByOrigin, state.pokemons.info.orderBy, state.pokemons.info.orderDirection, action.payload, state.pokemons.info.arrayFilterByType, state.pokemons.info.orderValue, state.pokemons.info.filterByTypeFunction);
            return {
                ...state, 
                pokemons: {
                    ...state.pokemons, 
                    list: action.payload,
                    info: {
                        ...state.pokemons.info,
                        //page: 1,
                        totalItems: listView.length,
                    },
                    listView: setPagination(state.pokemons.info.page, state.pokemons.info.limit, listView ),
                }
            }
        }
            
        
        case CLEAN_POKEMONS:
            return {
                ...state,
                pokemons: {
                    ...state.pokemons,
                    //list: [],
                    info: {
                        ...state.pokemons.info,
                        //totalItems: 0,
                    },
                    listView: [],
                }
            }
        case PAGINATE_LIST_POKEMONS:
            const listView = setPokemonsListView(state.pokemons.info.filterByType, state.pokemons.info.filterByOrigin, state.pokemons.info.orderBy, state.pokemons.info.orderDirection, state.pokemons.list, state.pokemons.info.arrayFilterByType, state.pokemons.info.orderValue, state.pokemons.info.filterByTypeFunction);
            return {
                ...state,
                pokemons: {
                    ...state.pokemons,
                    listView: setPagination(state.pokemons.info.page, state.pokemons.info.limit, listView),
                }
            }
        case SET_ARRAY_FILTER_BY_TYPE: {
            const newTypes = state.pokemons.info.arrayFilterByType.indexOf(action.payload) === -1 ? [...state.pokemons.info.arrayFilterByType, action.payload] : state.pokemons.info.arrayFilterByType.filter(item => item !== action.payload);
            const listView = setPokemonsListView(state.pokemons.info.filterByType, state.pokemons.info.filterByOrigin, state.pokemons.info.orderBy, state.pokemons.info.orderDirection, state.pokemons.list, newTypes, state.pokemons.info.orderValue, state.pokemons.info.filterByTypeFunction);
            return {
                ...state,
                pokemons: {
                    ...state.pokemons,
                    info: {
                        ...state.pokemons.info,
                        page: 1,
                        totalItems: listView.length,
                        arrayFilterByType: newTypes,
                    },
                    listView: setPagination(1, state.pokemons.info.limit, listView),
                    
                }
            }
        }
        case SET_FILTER_BY_TYPE: {
            const listView = setPokemonsListView(action.payload, state.pokemons.info.filterByOrigin, state.pokemons.info.orderBy, state.pokemons.info.orderDirection, state.pokemons.list, state.pokemons.info.arrayFilterByType, state.pokemons.info.orderValue, state.pokemons.info.filterByTypeFunction);
            return {
                ...state,
                pokemons: {
                    ...state.pokemons,
                    info: {
                        ...state.pokemons.info,
                        page: 1,
                        totalItems: listView.length,
                        filterByType: action.payload,
                    },
                    listView: setPagination(1, state.pokemons.info.limit, listView),
                }
            }
        }

        case SET_FILTER_BY_ORIGIN: {
            const listView = setPokemonsListView(state.pokemons.info.filterByType, action.payload, state.pokemons.info.orderBy, state.pokemons.info.orderDirection, state.pokemons.list, state.pokemons.info.arrayFilterByType, state.pokemons.info.orderValue, state.pokemons.info.filterByTypeFunction);
            return {
                ...state, 
                pokemons: {
                    ...state.pokemons, 
                    info: {
                        ...state.pokemons.info, 
                        page: 1,
                        totalItems: listView.length,
                        filterByOrigin: action.payload
                    },
                    listView: setPagination(1, state.pokemons.info.limit, listView),
                }
            }
        }
            
        
        case SET_ORDER_BY: {
            const listView = setPokemonsListView(state.pokemons.info.filterByType, state.pokemons.info.filterByOrigin, action.payload, state.pokemons.info.orderDirection, state.pokemons.list, state.pokemons.info.arrayFilterByType, state.pokemons.info.orderValue, state.pokemons.info.filterByTypeFunction);
            return {
                ...state, 
                pokemons: {
                    ...state.pokemons, 
                    info: {
                        ...state.pokemons.info, 
                        page: 1,
                        orderBy: action.payload
                    },
                    listView: setPagination(1, state.pokemons.info.limit, listView),
                }
            }
        }

        case SET_ORDER_VALUE: {
            const listView = setPokemonsListView(state.pokemons.info.filterByType, state.pokemons.info.filterByOrigin, action.payload, state.pokemons.info.orderDirection, state.pokemons.list, state.pokemons.info.arrayFilterByType, action.payload, state.pokemons.info.filterByTypeFunction);
            return {
                ...state, 
                pokemons: {
                    ...state.pokemons, 
                    info: {
                        ...state.pokemons.info, 
                        page: 1,
                        orderValue: action.payload,

                    },
                    listView: setPagination(1, state.pokemons.info.limit, listView),
                }
            }
        }
            
        
        case SET_ORDER_DIRECTION: {
            const listView = setPokemonsListView(state.pokemons.info.filterByType, state.pokemons.info.filterByOrigin, state.pokemons.info.orderBy, action.payload, state.pokemons.list, state.pokemons.info.arrayFilterByType, state.pokemons.info.filterByTypeFunction)
            return {
                ...state, 
                pokemons: {
                    ...state.pokemons, 
                    info: {
                        ...state.pokemons.info, 
                        page: 1,
                        orderDirection: action.payload
                    },
                    listView: setPagination(1, state.pokemons.info.limit, listView),
                }
            }
        }
            
        
        case SET_PAGE: {
            const listView = setPokemonsListView(state.pokemons.info.filterByType, state.pokemons.info.filterByOrigin, state.pokemons.info.orderBy, state.pokemons.info.orderDirection, state.pokemons.list, state.pokemons.info.arrayFilterByType, state.pokemons.info.orderValue, state.pokemons.info.filterByTypeFunction);
            return {
                ...state, 
                pokemons: {
                    ...state.pokemons, 
                    info: {
                        ...state.pokemons.info, 
                        page: action.payload
                    },
                    listView: setPagination(action.payload, state.pokemons.info.limit, listView),
                }
            }
        }
        
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                pokemon: action.payload,
            }
        case CLEAN_POKEMON:
            return {
                ...state,
                pokemon: null,
            }
        
        case GET_POKEMON_TO_EDIT_BY_ID:
            return {
                ...state,
                pokemonEdit: action.payload,
            }
        case CLEAN_POKEMON_TO_EDIT:
            return {
                ...state,
                pokemonEdit: null,
            }

        default:
            return {...state}
    }
}

export default rootReducer;