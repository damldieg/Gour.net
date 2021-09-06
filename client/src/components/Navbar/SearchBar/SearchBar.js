import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {getQueryRecipes} from '../../../actions/index'

export const SearchBar = () => {

    const [recipesQuery, setRecipesQuery] = useState({value: ''});
    const dispatch = useDispatch();

    function handleOnChange(e) {
        setRecipesQuery({ 
            ...recipesQuery,
            value: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getQueryRecipes(recipesQuery.value));
        setRecipesQuery('');
    }
    


    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input placeholder="Buscar recetas..." type="text" onChange={handleOnChange}/>
            <button>Buscar</button>
            </form>
        </div>
    )
}

export default SearchBar
