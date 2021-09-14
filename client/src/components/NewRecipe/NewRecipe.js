import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDiets } from '../../actions/index';
import { createRecipe } from '../../actions/services';
import style from './NewRecipe.module.css';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {Link} from 'react-router-dom';




function NewRecipe() {

    const [formData, setFormData] = useState({title: '', score: '', healthiness: '', resume: '', instructions: [], diets: [], image: ''});
    const diets = useSelector((state) => state.diets);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(diets.length === 0) dispatch(getDiets());
      }, [dispatch, diets.length])


    function  handleAddCount(e) { 
        e.preventDefault()

        setFormData({
            ...formData,
            instructions: [...formData.instructions, []]
        })
    }

    function handleRemoveCount(e) {
        e.preventDefault()
        let newCount = formData.instructions;
        if(newCount.length > 1) newCount.pop();
        setFormData(
            {...formData, 
            instructions: newCount}
        )
    }
    
    function handleOnChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleBlur (e) {
        handleOnChange(e);

        let errors = {}

        if(!formData.title.trim()){
            errors.title = "El campo TITLE es requerido";
        }

        if(!formData.score.trim()){
            errors.score = "El campo SCORE es requerido";
        }

        if(!formData.healthiness.trim()){
            errors.healthiness = "El campo HEALTHINESS es requerido";
        }

        if(!formData.resume.trim()){
            errors.resume = "El campo RESUME es requerido";
        }
        
        if(!formData.image.trim()){
            errors.image = "El campo IMAGE es requerido";
        }

        setErrors(errors);
    }

    function handleChangeCheckbox(e) {
        let dietsCheck = formData.diets;

        if(e.target.checked){
            dietsCheck.push(e.target.name)
        }else{
          dietsCheck =  dietsCheck.filter(d => d !== e.target.name);
        }

        setFormData({
            ...formData,
            diets: dietsCheck
        })
    }

    const handleChangeInstructions = (e) => {
        e.preventDefault();  
        let inputValue = e.target.value;
        let inputId = e.target.id;
        let arrInstructions = [1 + parseInt(inputId), inputValue];
        let copyInstructions = formData.instructions;

        copyInstructions[inputId] = arrInstructions;

        setFormData({...formData, instructions: copyInstructions})
    }

    function handleSubmit(e){
        e.preventDefault();
        createRecipe(formData)
        .then( (res) => {
            setFormData({title: '', score: '', healthiness: '', resume: '', instructions: [], diets: [], image:''});
        }).catch(err => console.log(err));

        setMessage('RECIPE CREATED!!!');

      }

    function disabledButton (){
        let bool = true;
        if(formData.image.length > 0  && formData.title.length > 0  && formData.resume.length > 0  && formData.healthiness.length > 0  && formData.score.length > 0 ){
            bool = false;
        }

        return bool;
    } 

    return (
        <div className={style.container}>
            { message?.length === 0 ?  (
            <div className={style.containerT}>
            <h1>Create your own recipe</h1>
            <form onSubmit={handleSubmit}>
                <div className={style.inputs}>
                <label>Title: </label>
                <br/>
                <input type="text"  placeholder="Title" name="title" value={formData.title} onChange={handleOnChange} onBlur={handleBlur}/>
                {errors.title && <p>{errors.title}</p>}
                <br/>
                <label>Score: </label>
                <br/>
                <input type="number"  placeholder="Score"  name="score"  value={formData.score}onChange={handleOnChange} onBlur={handleBlur}/>
                {errors.score && <p>{errors.score}</p>}
                <br/>
                <label>Healthiness: </label>
                <br/>
                <input type="number"  name="healthiness" placeholder="Healthiness" value={formData.healthiness} onChange={handleOnChange} onBlur={handleBlur}/>
                {errors.healthiness && <p>{errors.healthiness}</p>}
                <br/>
                <label>Resume: </label>
                <br/>
                <textarea type="text"  name="resume" placeholder="Resume" value={formData.resume} onChange={handleOnChange} onBlur={handleBlur}/>
                {errors.resume && <p>{errors.resume}</p>}
                <br/>
                <label>Add instructions:  </label><button type="button" onClick={handleAddCount}><AiOutlinePlus/></button> <button type="button" onClick={handleRemoveCount}><AiOutlineMinus/></button>
                <br/>
                <br/>
                {
                    formData.instructions?.map( (i, index) => {
                        return (        
                            <div key={index + 1}>
                            <label>Instruction {index + 1}</label>
                            <br/>
                            <input type="text"  name="instructions" placeholder="Instructions" id={index} onChange={handleChangeInstructions}/>
                            
                            </div>
                        )
                    })
                }
                <br/>
                <br/>
                </div>
                <div className={style.image}>
                    <label>Image url: </label>
                    <input type="text"  name="image" placeholder="Image url..." value={formData.image} onChange={handleOnChange} onBlur={handleBlur}/>
                    {errors.image && <p>{errors.image}</p>}
                    <label>Image preview: </label>
                    <img src={formData.image} alt={formData.title}/>
                </div>
                <div className={style.filterdiets}>Diets: 
                {
                  diets ? diets.map( d => {
                      return (
                        <label className={style.dietsTitle} key={d}>
                        <input type="checkbox" id={d} name={d} className={style.checkbox} onChange={handleChangeCheckbox}/>
                        <span className={style.dietsF}>{d}</span> 
                        </label>
                        )
                   }) : (
                       <>
                        <h4>Loading diets...</h4>
                       </>
                   )
                }
                </div>
                <div className={style.submit}>
                    <button type="submit" disabled={disabledButton()}>Create</button>
                </div>
            </form>
            </div>
            ) : (
                <>
                    <h1>{message}</h1>
                    <Link to="/home" className={style.back}>Back to home</Link>
                </>
                 )
            }
        </div>
    )
}

export default NewRecipe
