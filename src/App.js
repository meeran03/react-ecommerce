import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Checkout from './screens/Checkout';
import HomePage from './screens/HomePage';
import ProductDetail from './screens/ProductDetail';


function App() {
  return (
    <Switch>
      <Route exact path="/" >
        <HomePage/>
      </Route>
      <Route exact path="/product/:id" >
        <ProductDetail/>
      </Route>
      <Route exact path="/checkout" >
        <Checkout/>
      </Route>
    </Switch>
  );
}

export default App;
