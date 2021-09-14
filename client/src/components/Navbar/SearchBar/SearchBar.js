import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {getQueryRecipes} from '../../../actions/index';
import style from './SearchBar.module.css'
import { ImSearch } from "react-icons/im";

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
        setRecipesQuery(recipesQuery.value = ''); ;
    }
    


    return (
        <div>
            <form onSubmit={handleSubmit} className={style.form}>
            <input placeholder="Search recipes..." type="text"  onChange={handleOnChange} className={style.input}/>
            <button className={style.buscar}><ImSearch/></button>
            </form>
        </div>
    )
}

export default SearchBar
