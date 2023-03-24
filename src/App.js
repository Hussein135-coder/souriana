import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Money from './components/Money/Money';
import ResetPass from './components/ResetPass/ResetPass';
import Login from './components/Login/Login';
import Auth from './components/Auth/Auth';
import Loading from './components/Loading/Loading';

function App() {
  return (
    <div className="app dark">
      <Router>
        <Nav />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/money" element={
            <Auth>
              <Money />
            </Auth> } />
            <Route path="/login" element={
            <Loading>
              <Login />
            </Loading> } />       
            <Route path="/resetpass" element={
            <Auth>
              <ResetPass />
            </Auth> } />         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
