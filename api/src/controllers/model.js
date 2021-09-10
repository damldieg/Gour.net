require('dotenv').config();
const axios = require('axios');
const {Recipe, Diet, Instructon} = require('../db')
const {API_KEY_1} = process.env;

 

module.exports = {

    getRecipesApi: async function() {
        const response =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY_1}&addRecipeInformation=true`);
        
        const recipes = await response.data.results.map(r => {
                return  {
                id: r.id,
                title: r.title,
                image: r.image,
                dishTypes: r.dishTypes,
                diets: r.diets,
                resume: r.summary.replace(/<[^>]*>?/g, ""),
                score: r.spoonacularScore,
                healthiness: r.healthScore,
                instructions: r.analyzedInstructions[0] != undefined ? r.analyzedInstructions[0].steps : null,
            }


        })
        return recipes;
    },

    getRecipesDb: async function () {
      let recipes =  await Recipe.findAll({
            include :{
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
            score: recipes[i].dataValues.score,
            healthiness: recipes[i].dataValues.healthiness,
            instructions: recipes[i].dataValues.instructions.map(s => {
                return {
                    number: parseInt(s[0]),
                    step: s[1],
                }
            })
        })}

        return recipesOk;
    },

    getAllRecipes: async function () {
        const dbRecipes = await this.getRecipesDb();
        const apiRecipes = await this.getRecipesApi();

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
                
        });

      
        
      

        let dietDb = await Diet.findAll({
            where : {name : diets}
        })
        recipeCreated.addDiets(dietDb);
        return recipeCreated;
    }, 

    getRecipeById: async function(id) {

      /*  id.length === 6  && parseInt(id);

        let recipes = await this.getAllRecipes();

        
        recipes = recipes.find( r => r.id === id);
        
        console.log(recipes)

        return recipes;*/

        if(id.length > 6){
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
            score: recipeRq[0].dataValues.score,
            healthiness: recipeRq[0].dataValues.healthiness,
            instructions: recipeRq[0].dataValues.instructions.map(s => {
                return {
                    number: parseInt(s[0]),
                    step: s[1],
                }
            })
            }
            
            return recipeDb
        }
        
        let recipeApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY_1}`)
        .catch((err) => {
            return err;
        });

        
        let recipeApiOk = {
            id: recipeApi.data.id,
            title: recipeApi.data.title,
            image: recipeApi.data.image,
            dishTypes: recipeApi.data.dishTypes,
            diets: recipeApi.data.diets,
            resume: recipeApi.data.summary.replace(/<[^>]*>?/g, ""),
            score: recipeApi.data.spoonacularScore,
            healthiness: recipeApi.data.healthScore,
            instructions: recipeApi.data.analyzedInstructions[0] != undefined && recipeApi.data.analyzedInstructions.length > 0 ? recipeApi.data.analyzedInstructions[0].steps : null,
        }
        


        return recipeApiOk;
    }

}
