import axios from 'axios'

export const getAllPokemons = ()=>async(dispatch) => {
    const response = await axios.get('http://localhost:3001/getAll')
    dispatch({type: 'getAllPokemons', payload: response.data})
}
export const createPokemon = async (id)=>{

}