

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
        const {data:{height, weight, id,sprites:{other:{"official-artwork":{"front_default":img}}},stats}} = await axios.get(api.data.results[i].url)
        const propeties=stats.reduce((acc, {stat:{name},base_stat:value})=>{
          if(name.includes('-'))return acc;
          return {  ...acc,
                    [name]:value
          }},{})
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
router.get('/types', async(req,res)=>{
    const apiTypes= await axios.get(`https://pokeapi.co/api/v2/type`)
  const formatTypes = []
  for(let i=0; i<apiTypes.data.results.length; i++){
    const {data:{id}}= await axios.get(apiTypes.data.results[i].url)
    const objTypes={
        type:apiTypes.data.results[i].name,
        id
        
}

formatTypes.push(objTypes)

}
Type.bulkCreate(formatTypes)
  res.json({msg: 'Success'})
  /*  try {
       axios.get('https://pokeapi.co/api/v2/type').then(response=>{
           let aux = response.data.results.map(ep=>{
               const obj ={
                   type: ep.name,
                   id: ep.id
               }
               return obj
           })
        res.send(aux)   
       })
   } catch (error) {
       console.log(error)
   } */
})

router.post('/create', async (req,res)=>{
    const {name, hp, attack, defense, speed, height, weight, img, types} = req.body;
    if (!name || !hp|| !attack || !defense || !speed || !height || !weight || !img) res.status(400).json({msg: 'faltan datos'})

        const newPokemon = await Pokemon.create({name, hp, attack, defense, speed, height, weight, img})
        newPokemon.addTypes(types)
        const aux = Pokemon.findByPk(newPokemon.id,{include: [{model:Type}]})
        res.send(aux)

})

//ruta para obtener personaje por id 
router.get('/get/:id',async (req,res)=>{
    const {id} =req.params

    if(!id) res.status(400).json({msg: "Missing ID"})
    try {
        const pk = await Pokemon.findByPk(id, {include: [{model: Type}]})
        res.send(pk)
    } catch (e) {
        console.log(e)
    }

})


module.exports = router;
