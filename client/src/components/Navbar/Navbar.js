import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navbar.module.css';




function Navbar() {
    return (
        <div className={style.container}>
            <Link className={style.create} to="/createRecipe">New Recipe</Link>
            <Link className={style.logo} to='/home'>GourNet</Link>
            <Link className={style.about} to="/about">About</Link>
            
        </div>
    )
}

export default Navbar
