import React, { useEffect } from 'react';
import styles from './App.modules.css';
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import Employees from './pages/Employees/Employess';
import Statistics from './pages/Statistics/Statistics';
import Orders from './pages/Orders/Orders.jsx';
import Catalog from './pages/Catalog/Catalog.jsx';
import { useDispatch } from 'react-redux';
import Branches from './pages/Branches/Branches'
import { Get_Employess } from './Logica/api/Employees'
import { Get_Bouquet, Get_flowers, Get_category, Get_CategoryBouquets } from './Logica/api/Catalog';
import { useNavigate } from "react-router-dom";
import { Get_filials } from './Logica/api/Filials';
import { Get_Orders } from './Logica/api/Orders';
import { Get_AllStatistics } from './Logica/api/Statistics';


function App() {

  let Token = localStorage.getItem('token')

  let navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    !Token && navigate("/authorization");
  }, [window.onload]);

  useEffect(() => {

    dispatch(Get_Bouquet())
    dispatch(Get_category())
    dispatch(Get_flowers())
    dispatch(Get_CategoryBouquets())
    dispatch(Get_Employess())
    dispatch(Get_Orders())
    dispatch(Get_filials())
    dispatch(Get_AllStatistics())

  }, []);


  return (
    <div className={styles}>
      <Routes >

        <Route path='/*' element={<Home />} />
        <Route path='/employees' element={<Employees />} />

        <Route path='/orders' element={<Orders />} />
        <Route path='/catalogs' element={<Catalog />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/branches' element={<Branches />} />

      </Routes>



    </div>
  );
}

export default App;


