import React from 'react'
import './Home.css'
import pokemonsBackground from '../../img/pokemonsBackground.png'
import buttonStart from '../../img/buttonStart.png'

const Home = () => {
    return(
        <div className='containerHome'>
            <img className='pokemonsBackground' src={pokemonsBackground} alt="" />
            <a href='/home' className='buttonStart' >
              <img src={buttonStart} alt="" />
            </a>
            
        </div>
    )
}

export default Home