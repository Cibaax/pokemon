

let initialState ={
    pokemons: [],
    detail:[],
}
export default function rootReducer(state= initialState, action){
    switch(action.type){
        case 'getAllPokemons': return {...state, pokemons: action.payload}
        default: return state
    }
}