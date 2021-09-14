import rootReducer from '../reducers/index';
import React from 'react';
import { Link } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from '../components/Navbar/Navbar';

configure({adapter: new Adapter()});

describe('reducer', () => {
    it('Deberia retornar el estado inicial', () => {
      expect(rootReducer(undefined, [])).toEqual({recipesLoaded: [],
        recipeDetail: {},
        diets: [],
        recipesOrder: [],
        recipesFiltered: []})
    })
  
    describe('<Nav />', () => {
        let wrapper
        beforeEach(() => {
          wrapper = shallow(<NavBar />)
        })
      
        it('Deberia renderizar Tres <Link />', () => {
          expect(wrapper.find(Link)).toHaveLength(3);
        });
        it('El primer Link debe tener el texto "New Recipe" y cambiar la ruta hacia "/createRecipe".', () => {
          //el orden donde declaran los Links es importante
          expect(wrapper.find(Link).at(0).prop('to')).toEqual('/createRecipe');
          // Tiene que ser literal! ojo con los espacios.
          expect(wrapper.find(Link).at(0).text()).toEqual('New Recipe');
        });
        it('El segundo Link debe tener el texto "GourNet" y cambiar la ruta hacia "/home"', () => {
          expect(wrapper.find(Link).at(1).prop('to')).toEqual('/home');
          // Tiene que ser literal! ojo con los espacios.
          expect(wrapper.find(Link).at(1).text()).toEqual('GourNet');
        });
        it('El tercer Link debe tener el texto "About" y cambiar la ruta hacia "/about"', () => {
          expect(wrapper.find(Link).at(2).prop('to')).toEqual('/about');
          // Tiene que ser literal! ojo con los espacios.
          expect(wrapper.find(Link).at(2).text()).toEqual('About');
        });
      })
      

  
})






