import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../Navbar/Navbar'

function  RecipeDetail() {
    const recipe = useSelector((state) => state.recipeDetail.data)
    return (
        <div>
            <Navbar/>
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
                        recipe.dishTypes?.map( d => {
                            return (
                                <li key={d}>{d}</li>
                            )
                        })    
                    }
        
                    <h3>Score: {recipe.score}</h3>
                    <h3>Healthiness: {recipe.healthiness}</h3>
                    {recipe.resume}
                    {
                         recipe.instructions != null && recipe.instructions.length > 0 ? recipe.instructions.map( s => {
                            return (
                                <li key={s.number}>{s.number}: <br/> {s.step}</li>)
                            }) : recipe.instructions === null ? (
                                <>
                                    <h3>Not instructions for this recipe</h3>
                                </>
                            ) : (
                                <>
                                    <h6>Loading...</h6>
                                </>
                            )
                    }
                    </>
                     ) : ( <>
                        <h3>Loading...</h3>
                     </>)
                
            }
        </div>
    )
}

export default RecipeDetail
