import './App.css';
import { Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Recipes from './components/Recipes/Recipes';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import Diets from './components/Diets/Diets';
import NewRecipe from './components/NewRecipe/NewRecipe';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getRecipes } from './actions';
import Navbar from './components/Navbar/Navbar';




function App() {
  const dispatch = useDispatch();
  
  

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch])

  return (
    <div className="App">
      <Route path="/" exact>
          <Home/>
      </Route>
      <Route path="/home" exact>
          <Navbar/>
          <Recipes/>
      </Route>
      <Route path="/home/:id" exact>
         <RecipeDetail/>
      </Route>
      <Route path="/types" exact >
          <Diets/>
      </Route>
      <Route path="/createRecipe" exact>
          <NewRecipe/>
      </Route>
    </div>
  );
}

export default App;
