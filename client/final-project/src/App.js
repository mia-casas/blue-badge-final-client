import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Col, Row } from 'reactstrap'
import Auth from './components/Auth/Auth'
import RecipeCarousel from './components/carousel.component';
import HomePage from './components/Home/Home';
import HeaderNav from './components/site/HeaderNav';
import SavedRecipes from './components/site/SavedRecipes'
import Footer from './components/site/Footer';
import RecipeSearch from './components/site/RecipeSearch';
require("dotenv").config();

function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }
  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }
  const protectedViews = () => {
    return (sessionToken ===localStorage.getItem('token') ? <HomePage token={sessionToken}/>
    : <Auth updateToken={updateToken}/>)
  }

  return (

    <div className="App">

        <HeaderNav clickLogout={clearToken}/>
  
       <Col>
          <Row>
          <Col>
          {protectedViews()}
          <RecipeSearch />
          </Col>
            <Col xs="4">
              <br/>
            <RecipeCarousel/>
            <br/>
            <Row>
              <SavedRecipes />
            </Row>
            </Col>
          </Row>     
       <br/>
       <br/>
      </Col>
      <Footer />
    </div>
  );
}

export default App;
