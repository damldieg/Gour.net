import axios from 'axios';

export function getQueryRecipes(name) {
    return function(dispatch) {
       axios.get(`http://localhost:3001/home/recipes?name=${name}` )
        .then(data => {
          dispatch({ type: "GET_QUERY_RECIPES", payload: data });
        });
    };
}

export function getRecipes() {
    return function(dispatch) {
       axios.get("http://localhost:3001/home/recipes")
        .then(data => {
          dispatch({ type: "GET_RECIPES", payload: data });
        });
    };
}
  
export function getRecipeDetail(id) {
    return function(dispatch) {
       axios.get(`http://localhost:3001/home/recipes/${id}`)
        .then(data => {
          dispatch({ type: "GET_RECIPE_DETAIL", payload: data });
        }).catch(error => console.error(error));
    };
}



export function getDiets() {
    return function(dispatch) {
       axios.get("http://localhost:3001/home/types")
        .then(data => {
          dispatch({ type: "GET_DIETS", payload: data });
        });
    };
}

export function orderRecipes(payload) {
  return function(dispatch) {
   dispatch({ type: "ORDER_RECIPES", payload});
  };
}

export function filterRecipes(payload) {
  return function(dispatch) {
   dispatch({ type: "FILTER_RECIPES", payload});
  };
}