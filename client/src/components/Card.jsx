import React from 'react'
import './Card.css'
export default function Card({name, hp, attack, img, weight, defense, speed, height}){
  return(

      <div className='cardPokemon'>
        <img src={img} alt={img} />
        <div className='statsCard'>
          <h2>{name}</h2>
          <p>hp: {hp}</p>
          <p>attack: {attack}</p>
          <p>defense: {defense}</p>
          <p>speed: {speed}</p>
          <p>height: {height}</p>
          <p>weight: {weight}</p>
        </div>
      </div>
      )
}