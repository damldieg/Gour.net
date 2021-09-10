//import prueba from './debug'

const initialState = {
    recipesLoaded: [],
    recipeDetail: {},
    diets: [],
  };


function rootReducer(state = initialState, action) {

    if (action.type === "GET_QUERY_RECIPES") {
        return {
          ...state,
          recipesLoaded: action.payload
        };
    }

    if (action.type === "GET_RECIPES") {
        return {
          ...state,
          recipesLoaded: action.payload
        };
    }

    if (action.type === "GET_RECIPE_DETAIL") {
        return {
          ...state,
          recipeDetail: action.payload
        };
    }

    if (action.type === "GET_DIETS") {
        return {
          ...state,
          diets: action.payload
        };
    }

    return state;
}
  
export default rootReducer;