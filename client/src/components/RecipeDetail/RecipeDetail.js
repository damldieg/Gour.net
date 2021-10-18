import React from 'react'
import { useSelector } from 'react-redux'
import style from './RecipeDetail.module.css'
import { GiHeartPlus, GiStarsStack } from "react-icons/gi";

function  RecipeDetail() {
    const recipe = useSelector((state) => state.recipeDetail.data)
    return (
        <div className={style.container}>
            {
                recipe ?  (
                    <div className={style.containerT}>
                        <div className={style.info}>
                           <div className={style.infoT}>
                            <div className={style.title}>
                                <h1>{recipe.title}</h1>
                            </div>
                            <p className={style.resume}>{recipe.resume}</p>
                            <div className={style.diets}>
                                <label>Diets:</label>
                                {
                                    recipe.diets?.map( d => {
                                        return (
                                            <li key={d}>{d}</li>
                                        )
                                    })    
                                }
                            </div>
                            <div className={style.types}>    
                                <label>Dish Types:</label>
                                {
                                    recipe.dishTypes?.map( d => {
                                        return (
                                            <li key={d}>{d}</li>
                                        )
                                    })    
                                }
                            </div>
                            <div className={style.points}>
                                <h3><GiStarsStack/> {recipe.score}</h3>
                                <h3 className={style.heart}><GiHeartPlus/> {recipe.healthiness}</h3>
                            </div>
                         </div>       
                            <img src={recipe.image} alt={recipe.title} className={style.image}/>
                        </div>
                        <div className={style.instructions}>STEPS:
                            {
                                recipe.instructions != null && recipe.instructions.length > 0 ? recipe.instructions.map( s => {
                                    return (
                                        <li key={s.number}>Step {s.number}: <br/> {s.step}</li>)
                                    }) : (
                                        <>
                                            <h3>Not instructions for this recipe</h3>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                     ) : ( <>
                       <div className={style.loader}>
                        <span>L</span>
                        <span>O</span>
                        <span>A</span>
                        <span>D</span>
                        <span>I</span>
                        <span>N</span>
                        <span>G</span>
                    </div>
                     </>)
                
            }
        </div>
    )
}

export default RecipeDetail
