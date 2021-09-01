const { Router } = require('express');
const model = require('../controllers/model')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//server.use(express.json());


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async (req, res) => {
  const name = req.query.name;
  const recipes = await model.getAllRecipes()
  if(name){
    let recipe = recipes.filter( r => r.title.toLowerCase().includes(name.toLowerCase()));
    recipe.length ? res.status(200).send(recipe) : res.send( "Receta no encontrada");

  }
  res.status(200).send(recipes);
});

router.get('/types', async (req, res) => {

  const diets = await model.getDiets();

  diets.length ? res.status(200).send(diets) : res.send( "No hay dietas")


});

router.post('/recipe', async (req, res) => {
  const {title, diet, image} = req.body;
  let recipe = await model.createRecipe(title, image, diet);
  res.send(recipe)
})





module.exports = router;
