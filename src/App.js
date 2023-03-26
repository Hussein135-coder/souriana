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
import ResetPassword from './components/ResetPass/ResetPassword';
import Login from './components/Login/Login';
import Auth from './components/Auth/Auth';
import Loading from './components/Loading/Loading';
import Analytics from './components/Analytics/Analytics';

function App() {
  return (
    <div className="app dark">
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
