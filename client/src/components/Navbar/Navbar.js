import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar/SearchBar';




function Navbar() {
    return (
        <div>
            <div>Logo</div>
            <Link to="/favRecipes">Favoritos</Link>
            <Link to="/createRecipe">New Recipe</Link>
            <SearchBar />
        </div>
    )
}

export default Navbar
