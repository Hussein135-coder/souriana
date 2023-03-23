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
// const LazyLoading = React.lazy(()=> import('./components/Money/Money'));
import ResetPass from './components/ResetPass/ResetPass';
import Login from './components/Login/Login';
import { useContext } from 'react';
import { DataContext } from './context/DataContext';
import Auth from './components/Auth/Auth';
import Loading from './components/Loading/Loading';
import Test from './components/Test';

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
            <Route path="/resetPass" element={<ResetPass />} />     
            <Route path="/test" element={<Test />} />     
        </Routes>
      </Router>
    </div>
  );
}

export default App;
