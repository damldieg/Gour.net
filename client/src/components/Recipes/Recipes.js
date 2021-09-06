import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import {getRecipeDetail} from '../../actions/index'

function Recipes() {

    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipesLoaded.data)


    return (
        <div>
            <Navbar/>
            {
                 recipes && typeof recipes != 'string' ? recipes.map( r => {
                    return (
                        <div key={r.id}>
                        <Link to={`/recipes/${r.id}`}  onClick={() => dispatch(getRecipeDetail(r.id))}>
                        <h2>{r.title}</h2>
                        </Link>
                        <img src={r.image} alt={r.title}/>
                        {
                            r.diets.map( d => {
                                return (
                                    <li key={d}>{d}</li>
                                )
                            })    
                        }
                        </div>
                    )
                }) : typeof recipes === 'string' ? (<>
                    <h3>{recipes}</h3>
                </>) : (<>
                    <h3>Loading...</h3>
                </>)
            }
            
        </div>
    )
}


export default  Recipes
