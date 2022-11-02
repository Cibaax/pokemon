import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import Card from './Card'
import { Link } from 'react-router-dom'
import { getAllPokemons} from '../redux/actions'
import './AllCards.css'
 
export default function AllCards(){
  let statusPokemons = useSelector((state)=> state.pokemons)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getAllPokemons())
  },[dispatch])

  return(
    <div className="container">
      <div className="cards">
        {statusPokemons != null ? 
          statusPokemons.map(poke=>
            <Link key={poke.id}to={`/${poke.name}`}>
              <Card name={poke.name} hp={poke.hp} attack={poke.attack} img={poke.img} height={poke.height} defense={poke.defense} speed={poke.speed} weight={poke.weight}/>
            </Link>
          )
        :'Pokemons Not Founds'}
      </div>
    </div>
  )
}