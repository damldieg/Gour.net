require('dotenv').config();
const axios = require('axios');
const {Recipe, Diet} = require('../db')
const { Op } = require("sequelize");

 

module.exports = {

    getRecipesApi: async function(number) {
        const response =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=${number}&apiKey=80c19850d81e46918652d6e191deb51b`);
    
        const recipes = await response.data.results.map(r => {
            return {
                id: r.id,
                title: r.title,
                image: r.image
            }
        })
    
        return recipes;
    },

    getRecipesDb: async function () {
       return recipes =  await Recipe?.findAll({
            includes:{
                model: Diet,
                attributes: ['name'],
                through:{
                    atributes: []
                }

            }
        })
    },

    getAllRecipes: async function () {
        const dbRecipes = await this.getRecipesDb();
        let n = dbRecipes.length;
        const apiRecipes = await this.getRecipesApi(100 - n);

        const allRecipes = dbRecipes.concat(apiRecipes);
        return allRecipes;
    },


    getDiets:  async function () {
        let arrDiets = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo','Primal', 'Whole30']
        
        for(let i = 0; i < arrDiets.length; i++) {
            Diet.findOrCreate({
                where: {name: arrDiets[i]},
            })
        }
    
        let diets = await Diet?.findAll()

        return diets;
    }, 

    createRecipe: async function (title, image, diet) {
        this.getDiets()

        let recipeCreated = await Recipe.create({
            title,
            image,
        })

        let dietDb = await Diet.findAll({
            where : {name : diet}
        })
        recipeCreated.addDiets(dietDb);
        return recipeCreated;
    }

}


/*const recipes = response.data.results?.map(r => {
    return {
        id: r.id,
        title: r.title,
        image: r.image,
        diet: r.diets,
        score: r.healthScore,
        instructions: r.analyzedInstructions,
        ingredients: r.extendedIngredients.map(i => i.image),

    }
})

const response =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=5cd763840b7042f59b1961495d166e5a&addRecipeInformation=true&number=10&instructionsRequired=true&fillIngredients=true`);

*/
