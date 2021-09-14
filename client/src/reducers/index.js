//import prueba from './debug'

const initialState = {
    recipesLoaded: [],
    recipeDetail: {},
    diets: [],
    recipesOrder: [],
    recipesFiltered: []
  };


function rootReducer(state = initialState, action) {

    if (action.type === "GET_QUERY_RECIPES") {
        return {
          ...state,
          recipesLoaded: action.payload.data,
          
        };
    }

    if (action.type === "GET_RECIPES") {
        return {
          ...state,
          recipesLoaded: action.payload.data,
          recipesFiltered: action.payload.data
        };
    }

    if (action.type === "GET_RECIPE_DETAIL") {
        return {
          ...state,
          recipeDetail: action.payload
        };
    }

    if (action.type === "ORDER_RECIPES") {
      switch(action.payload){
        case 'AZ':
          let orderRecipesAZ = state.recipesLoaded?.sort(function (a, b) {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            return 0;
          })
          state.recipesOrder = orderRecipesAZ.map(r => r);
          break;
        case 'ZA':
          let orderRecipesZA = state.recipesLoaded?.sort(function (a, b) {
            if (a.title > b.title) {
              return -1;
            }
            if (a.title < b.title) {
              return 1;
            }
            return 0;
          })
          state.recipesOrder = orderRecipesZA.map(r => r);;
          break;
        case 'Lowest Score':
          let orderRecipesLS = state.recipesLoaded?.sort(function (a, b) {
            if (a.score > b.score) {
              return 1;
            }
            if (a.score < b.score) {
              return -1;
            }
            return 0;
          })
          state.recipesOrder = orderRecipesLS.map(r => r);
          break;
        case 'Highest Score':
          let orderRecipesHS = state.recipesLoaded?.sort(function (a, b) {
            if (a.score > b.score) {
              return -1;
            }
            if (a.score < b.score) {
              return 1;
            }
            return 0;
          })
          state.recipesOrder = orderRecipesHS.map(r => r);;
          break;
        case 'Less healthiness':
          let orderRecipesLH = state.recipesLoaded?.sort(function (a, b) {
            if (a.healthiness > b.healthiness) {
              return 1;
            }
            if (a.healthiness < b.healthiness) {
              return -1;
            }
            return 0;
          })
          state.recipesOrder = orderRecipesLH.map(r => r);
          break;
        case 'More healthiness':
          let orderRecipesMH = state.recipesLoaded?.sort(function (a, b) {
            if (a.healthiness > b.healthiness) {
              return -1;
            }
            if (a.healthiness < b.healthiness) {
              return 1;
            }
            return 0;
          })
          state.recipesOrder = orderRecipesMH.map(r => r);
          break;
        default:
          state.recipesOrder = state.recipesLoaded;
      }

        return {
          ...state
        };
    }

    if (action.type === "FILTER_RECIPES") {
      let copyArray = state.recipesFiltered;
      for(let i= 0; i < action.payload.length; i++) {
        copyArray = copyArray.filter(r => r.diets?.includes(action.payload[i].toLowerCase()));
     
      }

      //state.recipesFiltered = 
      return {
        ...state,
        recipesLoaded: copyArray.map( r => r)

      };

  }

    if (action.type === "GET_DIETS") {
      return {
        ...state,
        diets: action.payload.data
      };
  }

    return state;
}
  
export default rootReducer;