import React, {useState} from "react";

export default function Form(){
  const[pokemon, setPokemon] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    type: []
  })
  const [statusButton, setStatusBotton] = useState(true)
  
  function handleChange(e){
    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value,
    })
    console.log(pokemon)
  }
  function handleSubmit(){

  }
  function handleTypes(e){
    setPokemon({
      ...pokemon,
      type: [new Set([...pokemon.type, e.target.value])]
      
    })
    console.log(pokemon)
  }
  function validation(){

  }
  return(
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">name</label>
            <input name='name' value={pokemon.name} onChange={handleChange} type="text" />
            <label htmlFor="">health</label>
            <input name='hp' value={pokemon.hp} onChange={handleChange} type="text" />
            <label htmlFor="">attack</label>
            <input name='attack' value={pokemon.attack} onChange={handleChange} type="text" />
            <label htmlFor="">defense</label>
            <input name='defense' value={pokemon.defense} onChange={handleChange} type="text" />
            <label htmlFor="">speed</label>
            <input name='speed' value={pokemon.speed} onChange={handleChange} type="text" />
            <label htmlFor="">height</label>
            <input name='height' value={pokemon.height} onChange={handleChange} type="text" />
            <label htmlFor="">weight</label>
            <input name='weight' value={pokemon.weight} onChange={handleChange} type="text" />
            <label htmlFor="">type</label>
            <select name="type" value={pokemon.types} onChange={handleTypes} required>
              <option value={1}>Normal</option>
              <option value={2}>Fighting</option>
              <option value={3}>Flying</option>
              <option value={4}>Poison</option>
              <option value={5}>Ground</option>
              <option value={6}>Rock</option>
              <option value={7}>Bug</option>
              <option value={8}>Ghost</option>
              <option value={9}>Steel</option>
              <option value={10}>Fire</option>
              <option value={11}>Water</option>
              <option value={12}>Grass</option>
              <option value={13}>Electric</option>
              <option value={14}>Psychic</option>
              <option value={15}>Ice</option>
              <option value={16}>Dragon</option>
              <option value={17}>Dark</option>
              <option value={18}>Fairy</option>
              <option value={10001}>Unknown</option>
              <option value={10002}>Shadow</option>
              
              
            </select>
            <button type="submit" disabled={statusButton ? true : false} >Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}