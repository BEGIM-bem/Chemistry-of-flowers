import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import App from './App';
import { Provider } from 'react-redux'
import { store } from "./Logica/reducers";
import { Routes, Route } from 'react-router-dom';
import Authorization from './pages/Authorization/Authorization';


ReactDOM.render(

  <Router>
    <Provider store={store}>
      <Routes>
        <Route path='/authorization' element={<Authorization />} />
        <Route path='/*' element={<App />} />
      </Routes>

    </Provider>
  </Router>,
  document.getElementById('root')
);
