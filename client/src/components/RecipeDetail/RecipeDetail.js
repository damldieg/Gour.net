import React from 'react'
import { useSelector } from 'react-redux'

function  RecipeDetail() {
    const recipe = useSelector((state) => state.recipeDetail.data)
    return (
        <div>

            {
                recipe ?  (
                    <>
                    <h1>{recipe.title}</h1>
                    <img src={recipe.image} alt={recipe.title}/>
                    <br/>
                    <label>Diets:</label>
                    {
                        recipe.diets.map( d => {
                            return (
                                <li key={d}>{d}</li>
                            )
                        })    
                    }
                    <label>Dish Types:</label>
                    {
                        recipe.dishTypes.map( d => {
                            return (
                                <li key={d}>{d}</li>
                            )
                        })    
                    }
        
                    <h3>Score: {recipe.score}</h3>
                    <h3>Healthiness: {recipe.healthiness}</h3>
                    <p>{recipe.resume}</p>
                    <p>{recipe.instructions}</p>
                    </>
                     ) : ( <>
                        <h3>Loading...</h3>
                     </>)
                
            }


            
        </div>
    )
}

export default RecipeDetail
