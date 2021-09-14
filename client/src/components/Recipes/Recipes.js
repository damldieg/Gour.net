import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { SearchBar } from '../Navbar/SearchBar/SearchBar';
import {filterRecipes, getDiets, getRecipeDetail, getRecipes, orderRecipes} from '../../actions/index';
import style from './Recipes.module.css';
import styled from 'styled-components';
import { BiChevronsRight, BiChevronsLeft } from "react-icons/bi";
import { GiHeartPlus, GiStarsStack } from "react-icons/gi";

function Recipes() {

    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipesLoaded);
    const recipesOrder = useSelector((state) => state.recipesOrder);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [pageNumberLimit] = useState(3);
    const [maxPageNumberList, setMaxPageNumberList] = useState(3);
    const [minPageNumberList, setMinPageNumberList] = useState(0);
    const [filterDiets, setFilterDiets] = useState({diets: []});
    const diets = useSelector((state) => state.diets);
    
    useEffect(() => {
        dispatch(getDiets(), getRecipes());
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
    let currentItems = typeof recipes === 'string' ? recipes : recipes?.slice(indexOfFirstItem, indexOfLastItem);


    const renderPagesNumber = pages.map(p => {
      if( p < maxPageNumberList + 1 && p > minPageNumberList){
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
    
    
   const handleSortDiets = (e) => {
        let dietsCheck = filterDiets.diets;
        if(e.target.checked){
            dietsCheck?.push(e.target.name)
        }else{
          dietsCheck =  dietsCheck?.filter(d => d !== e.target.name);
        }
        setFilterDiets({diets: dietsCheck});
        dispatch(filterRecipes(dietsCheck));
    }
   
    const orderRecipesSelect = (e) => {
        e.preventDefault();
        dispatch(orderRecipes(e.target.value));
        currentItems = typeof recipesOrder === 'string' ? recipesOrder : recipesOrder?.slice(indexOfFirstItem, indexOfLastItem);
        e.target.value = 'Default'
    }

    const RecipeContainer = styled(Link) `
        background-image: url(${props => props.img});
        background-repeat: no-repeat;
        background-size: cover;
        width: 30%;
        height: 17em;
        margin: 1em;
        border-radius: 8px;
        padding-top: 1em;
        border: 4px solid #FCDEC0;
        color: white;

    `;

    
    return (
        <div className={style.first}>
            <div className={style.image}>
                <h1>Welcome to GourNet <br/>what are you going to cook today?</h1>
            </div>

            <div className={style.contenedor}>
                <div className={style.filters}>
                        <div className={style.search}>
                        <SearchBar />
                        </div>
                    <div className={style.order}>
                        <label className={style.by}>Order by:</label>
                        <select className={style.orderBy} onChange={orderRecipesSelect}>
                            <option value="Default" className={style.option}>Select: </option>
                            <option value="AZ" className={style.option}>AZ</option>
                            <option value="ZA" className={style.option}>ZA</option>
                            <option value="Highest Score" className={style.option}>SCORE +</option>
                            <option value="Lowest Score" className={style.option}>SCORE -</option>
                            <option value="More healthiness" className={style.option}>HEALTHINESS +</option>
                            <option value="Less healthiness" className={style.option}>HEALTHINESS -</option>
                        </select>
                    </div>
                    <div className={style.filterdiets}>Get recipes by diets:

                        {
                            diets?.map(d => {
                                return (
                                    <label className={style.dietsTitle} key={d}>
                                    <input type="checkbox" id={d} name={d} className={style.checkbox} onChange={handleSortDiets}/>
                                    <span className={style.dietsF}>{d}</span> 
                                    </label>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={style.paginationC}>
                        <ul className={style.pagination}>
                            
                                <button onClick={handlePrev} disabled={ currentPage === pages[0] ? true : false}><BiChevronsLeft/></button>
                            
                            {decrementBtn}
                            {renderPagesNumber}
                            {incrementBtn}
                            
                                <button onClick={handleNext} disabled={ currentPage === pages[pages.length - 1] ? true : false}><BiChevronsRight/></button>
                            
                        </ul>
                </div>
                <div className={style.recipes}>
                {
                    currentItems && typeof currentItems != 'string' ? currentItems?.map( r => {
                        return (
                            <RecipeContainer to={`/home/${r.id}`} className={style.fadeInUp} key={r.id} img={r.image} onClick={() => dispatch(getRecipeDetail(r.id))}>
                                <div className={style.blurC}>
                                <div>
                                <div>
                                <h3 className={style.recipeTitle}>{r.title}</h3>
                                </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <h5 className={style.score}><GiStarsStack/> {r.score}</h5>
                                    <h5 className={style.healthiness}><GiHeartPlus/> {r.healthiness}</h5>
                                </div>
                                <div className={style.dietsR}> 
                                        {
                                            r.diets?.map( d => {
                                                return (
                                                    <span className={style.diet} key={d}>{d} </span>
                                                )
                                            })    
                                        }
                                        </div>
                                </div>
                            </RecipeContainer>
                        )
                    }) : typeof recipes === 'string' ? (<div className={style.containerNF}>
                        <h3 className={style.notFound}>{currentItems}</h3>
                    </div>) : (<>
                        <h3>Loading...</h3>
                    </>)
                }
                </div>
                <div className={style.paginationC}>
                        <ul className={style.pagination}>
                            
                                <button onClick={handlePrev} disabled={ currentPage === pages[0] ? true : false}><BiChevronsLeft/></button>
                            
                            {decrementBtn}
                            {renderPagesNumber}
                            {incrementBtn}
                            
                                <button onClick={handleNext} disabled={ currentPage === pages[pages.length - 1] ? true : false}><BiChevronsRight/></button>
                            
                        </ul>
                </div>
                </div>
        </div>
    )
}


export default  Recipes
