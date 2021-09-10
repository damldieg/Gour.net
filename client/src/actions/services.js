import axios from 'axios';


export  function createRecipe(data) {
    return  axios.post(`http://localhost:3001/home/recipe`, data)
}
