import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
//import Navbar from '../Navbar/Navbar';
import {getDiets, getRecipeDetail} from '../../actions/index'
import style from './Recipes.module.css'

function Recipes() {

    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipesLoaded.data);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [pageNumberLimit] = useState(3);
    const [maxPageNumberList, setMaxPageNumberList] = useState(3);
    const [minPageNumberList, setMinPageNumberList] = useState(0);
    const diets = useSelector((state) => state.diets.data)

    useEffect(() => {
        dispatch(getDiets());
      }, [dispatch]);

    const  handleChangePage = (e) => {
        setCurrentPage(Number(e.target.id));
    }

    const pages = [];

    for (let i = 1; i <= Math.ceil(recipes?.length/itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = typeof recipes === 'string' ? recipes : recipes?.slice(indexOfFirstItem, indexOfLastItem);


    const renderPagesNumber = pages.map(p => {
      if( p < maxPageNumberList + 1 && p > minPageNumberList){
          console.log(currentPage);
          console.log(p);
        return ( 
            <li key={p} id={p} onClick={handleChangePage} className={currentPage === parseInt(p) ? style.active : null}>{p}</li>
        )
      }else return null;
    });

    
    const handleNext = () => {
        setCurrentPage( currentPage + 1);
        
        if( currentPage + 1 > maxPageNumberList){
            setMaxPageNumberList( maxPageNumberList + pageNumberLimit);
            setMinPageNumberList( minPageNumberList + pageNumberLimit);
        }
    }
    
    const handlePrev= () => {
        setCurrentPage( currentPage - 1);
        
        if( (currentPage - 1) % pageNumberLimit === 0){
            setMaxPageNumberList( maxPageNumberList - pageNumberLimit);
            setMinPageNumberList( minPageNumberList - pageNumberLimit);
        }
    }
    
    let incrementBtn = null;
    if(pages.length > maxPageNumberList){
        incrementBtn = <li className={style.puntos} onClick={handleNext}> &hellip; </li>
    }
    
    let decrementBtn = null;
    if(minPageNumberList >= 1){
        decrementBtn = <li className={style.puntos} onClick={handlePrev}> &hellip; </li>
    }
    
    const handleSortAZ = () => {
        
    }
    
    const handleSortZA = () => {
        
    }
    
    const handleSortDiets = () => {
        
    }
    
    const renderDiets = diets?.map(d => {
        return (
            <div key={d}>
            <label >{d}</label>
            <input type="checkbox" value={d} id={d} onChange={handleSortDiets}/>
            </div>
        )
    })
    return (
        <div>
            <div className={style.image}>
                <h1>Welcome to GourNet <br/>what are you going to cook today?</h1>
            </div>

            <div className={style.contenedor}>
                <div className={style.filters}>
                    <div>
                        <ul className={style.pagination}>
                            <li>
                                <button onClick={handlePrev} disabled={ currentPage === pages[0] ? true : false}>Prev</button>
                            </li>
                            {decrementBtn}
                            {renderPagesNumber}
                            {incrementBtn}
                            <li>
                                <button onClick={handleNext} disabled={ currentPage === pages[pages.length - 1] ? true : false}>Next</button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                            <button onClick={handleSortAZ}>A-Z</button>
                            </li>
                            <li>
                            <button onClick={handleSortZA}>Z-A</button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {renderDiets}
                    </div>
                </div>
                <div className={style.recipes}>
                {
                    currentItems && typeof currentItems != 'string' ? currentItems.map( r => {
                        return (
                            <div key={r.id} className={style.recipe}>
                            <Link to={`/home/${r.id}`}  onClick={() => dispatch(getRecipeDetail(r.id))}>
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
                        <h3>{currentItems}</h3>
                    </>) : (<>
                        <h3>Loading...</h3>
                    </>)
                }
                </div>
                </div>
        </div>
    )
}


export default  Recipes
