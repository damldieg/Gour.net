import './App.css';
import { Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Recipes from './components/Recipes/Recipes';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import About from './components/About/About';
import NewRecipe from './components/NewRecipe/NewRecipe';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getRecipes } from './actions';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';




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
          <Navbar/>
         <RecipeDetail/>
      </Route>
      <Route path="/about" exact >
          <Navbar/>
          <About/>
      </Route>
      <Route path="/createRecipe" exact>
          <Navbar/>
          <NewRecipe/>
      </Route>
      <Footer 
      titulo="GourNet"
      instagram="https://www.instagram.com/"
      github="https://github.com/damldieg" 
      linkedin="https://www.linkedin.com/in/damianldiego/"/>
    </div>
  );
}

export default App;
