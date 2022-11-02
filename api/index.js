
const server = require('./src/app.js');
const { conn, Type} = require('./src/db.js');
const axios = require('axios');

// Syncing all the models at once.
async function preCharge(){
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
}

conn.sync({ force: true }).then(async() => {
  await preCharge()
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
