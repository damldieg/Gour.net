require('dotenv').config();
const axios = require('axios');
const {Recipe, Diet} = require('../db')
const {API_KEY_1} = process.env;

 

module.exports = {

    getRecipesApi: async function(number) {
        const response =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=${number}&apiKey=${API_KEY_1}&addRecipeInformation=true`);
    
        const recipes = await response.data.results.map(r => {
            return {
                id: r.id,
                title: r.title,
                image: r.image,
                dishTypes: r.dishTypes,
                diets: r.diets,
                resume: r.summary,
                score: r.spoonacularScore,
                healthiness: r.healthScore,
                instructions: r.instructions,
            }
        })
        return recipes;
    },

    getRecipesDb: async function () {
      let recipes =  await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name']
            }
        });
        const recipesOk = [];

        for(let i = 0; i < recipes.length; i++) {
            recipesOk.push({
            id: recipes[i].dataValues.id,
            title: recipes[i].dataValues.title,
            image: recipes[i].dataValues.image,
            diets : recipes[i].dataValues.diets.map ( d => d.name),
            resume : recipes[i].dataValues.resume,
            instructions: recipes[i].dataValues.instructions,
            score: recipes[i].dataValues.score,
            healthiness: recipes[i].dataValues.healthiness,
        })}

        return recipesOk;
    },

    getAllRecipes: async function () {
        const dbRecipes = await this.getRecipesDb();
        const apiRecipes = await this.getRecipesApi(100);

        const allRecipes = dbRecipes.concat(apiRecipes);
        return allRecipes;
    },


    getDiets:  async function () {
        let arrDiets = ['gluten Free', 'ketogenic', 'vegetarian', 'lacto-Vegetarian', 'ovo-Vegetarian', 'vegan', 'pescetarian', 'paleo','primal', 'whole30']
        
        for(let i = 0; i < arrDiets.length; i++) {
            Diet.findOrCreate({
                where: {name: arrDiets[i]},
            })
        }

    
        let diets = await Diet.findAll();

        const dietsOk = [];

        for(let i = 0; i < diets.length; i++) {
            dietsOk.push(diets[i].dataValues.name);
        }

        return dietsOk;
    }, 

    createRecipe: async function (title, image, score, healthiness, resume, instructions, diets) {
        this.getDiets();

        let recipeCreated = await Recipe.create({
            title,
            image,
            score, 
            healthiness,
            resume, 
            instructions,
            diets
        })

        let dietDb = await Diet.findAll({
            where : {name : diets}
        })
        recipeCreated.addDiets(dietDb);
        return recipeCreated;
    }, 

    getRecipeById: async function(id) {

        if(id.length > 7){
            let recipeRq = await Recipe.findAll({
                where : {id : id},
                include :{
                    model: Diet,
                    attributes: ['name']
                }
            }).catch(err => {
                return err;
            })

            let recipeDb = {
            id: recipeRq[0].dataValues.id,
            title: recipeRq[0].dataValues.title,
            image: recipeRq[0].dataValues.image,
            diets : recipeRq[0].dataValues.diets.map ( d => d.name),
            resume : recipeRq[0].dataValues.resume,
            instructions: recipeRq[0].dataValues.instructions,
            score: recipeRq[0].dataValues.score,
            healthiness: recipeRq[0].dataValues.healthiness,
            }
            
            return recipeDb
        }
        
        let recipeApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY_1}`)
        .catch((err) => {
            return err;
        });

        recipeApi = {
            id: recipeApi.data.id,
            title: recipeApi.data.title,
            image: recipeApi.data.image,
            dishTypes: recipeApi.data.dishTypes,
            diets: recipeApi.data.diets,
            resume: recipeApi.data.summary,
            score: recipeApi.data.spoonacularScore,
            healthiness: recipeApi.data.healthScore,
            instructions: recipeApi.data.instructions,
        }

        return recipeApi;
    }

}
