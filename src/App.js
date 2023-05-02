import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Money from './components/Money/Money';
import ResetPassword from './components/ResetPass/ResetPassword';
import Login from './components/Login/Login';
import Auth from './components/Auth/Auth';
import Loading from './components/Loading/Loading';
import Analytics from './components/Analytics/Analytics';
import Load from './components/Loading/Load';
import { DataContext } from './context/DataContext';
import LoadOnce from './components/Loading/LoadOnce';


function App() {
  const { loadingOnce , setLoaded } = useContext(DataContext);

console.log(1);
  useEffect(()=>{
    setLoaded(true)
  },[])
  return (
    <div className="app dark">
        
        {loadingOnce ? <LoadOnce/> : console.log('done')}
          
        <Router>
        <Nav />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/money" element={
            <Auth>
              <Money />
            </Auth> } />
            <Route path="/login" element={
            <Loading>
              <Login />
            </Loading> } />   
            <Route path="/analytics" element={
            <Auth>
              <Analytics />
            </Auth> } />       
        </Routes>
      </Router>
      

    </div>
  );
}

export default App;
