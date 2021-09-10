import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDiets } from '../../actions/index';
import { createRecipe } from '../../actions/services';




function NewRecipe() {

    const [formData, setFormData] = useState({title: '', score: '', healthiness: '', resume: '', instructions: [], diets: [], image: ''});
    const diets = useSelector((state) => state.diets);
    const dispatch = useDispatch();

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
        }).catch(err => console.error(err));
      }

    return (
        <div>

            <h1>Create your own recipe</h1>
            <form onSubmit={handleSubmit}>
                <label>Title: </label>
                <input type="text"  placeholder="Title" name="title" value={formData.title} onChange={handleOnChange}/>
                <br/>
                <br/>
                <label>Score: </label>
                <input type="number"  placeholder="Score"  name="score"  value={formData.score}onChange={handleOnChange}/>
                <br/>
                <br/>
                <label>Healthiness: </label>
                <input type="number"  name="healthiness" placeholder="Healthiness" value={formData.healthiness} onChange={handleOnChange}/>
                <br/>
                <br/>
                <label>Resume: </label>
                <textarea type="text"  name="resume" placeholder="Resume" value={formData.resume} onChange={handleOnChange}/>
                <br/>
                <br/>
                <label>Add instructions:  </label><button type="button" onClick={handleAddCount}>+</button> <button type="button" onClick={handleRemoveCount}>-</button>
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
                <label>Image url: </label>
                <input type="text"  name="image" placeholder="Image" value={formData.image} onChange={handleOnChange}/>
                <br/>
                <br/>
                <label>Image preview: </label>
                <br/>
                <img src={formData.image} alt={formData.title}/>
                <br/>
                <br/>
                <label>Diets: </label>
                {
                  diets.data ? diets.data.map( d => {
                      return (
                            <label key={d}>{d}  <input type="checkbox" name={d} onChange={handleChangeCheckbox}/></label>
                        )
                   }) : (
                       <>
                        <h4>Loading diets...</h4>
                       </>
                   )
                }
                <br/>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default NewRecipe
