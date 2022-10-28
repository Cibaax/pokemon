
const { Router } = require('express');
const axios = require('axios');
const {Pokemon, Type} = require('../db');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//obtener los personajes
router.get('/getAll', async (req, res) => {
 
  const api= await axios.get(`https://pokeapi.co/api/v2/pokemon`)
  const format = []
  for(let i=0; i<api.data.results.length; i++){
        const {data:{height, weight, id,sprites:{other:{"official-artwork":{"front_default":img}}},stats}}= await axios.get(api.data.results[i].url)
        const propeties=stats.reduce((acc, {stat:{name},base_stat:value})=>{
          if(name.includes('-'))return acc;
          return {
            ...acc,
            [name]:value
          }
        },{})
        const obj={
                name:api.data.results[i].name,
                height,
                weight,
                img,
                ...propeties,
                id
        }
        format.push(obj)
        
      }
    /* const db = await Pokemon.findAll({include: [{model:Types}]})
    const add = [...format,...db] */
    res.json(format)

})

router.post('/create', async(req,res)=>{
    const {name, hp, attack, defense, speed, height, weight, img, type} = req.body;
    if (!name || !hp|| !attack || !defense || !speed || !height || !weight || !img) res.status(400).json({msg: 'faltan datos'})
    try {
        const newPokemon = await Pokemon.create({name, hp, attack, defense, speed, height, weight, img})

        newPokemon.addTypes(type)
        res.send(newPokemon)
    } catch (e) {
        console.log(e)
    }
})


//ruta para obtener personaje por id 
router.get('/get/',(req,rest)=>{

})
//route create pokemon

/* router.post('/create', async (req,res)=>{
    const{
        name, health, attack, defense, speed, height, weight, img
    }=req.body
    if(!name || !health || !attack || !defense || !speed || !height || !weight || !img){
        return res.status(400).json()({
            info: 'no values'
        })
    }
    let arrType =[]
    req.body.types.map(e=> arrType.push({name:e}))
    if(!arrType.length){return res.status(400).json({info: 'choose a type'})}
    const exist = await pokemon.findOne({where: {name:req.body.name}})
    if(exist) return res.json ({info: 'already exists'})
}) */

module.exports = router;