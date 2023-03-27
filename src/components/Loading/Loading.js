import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext'
import Load from './Load';

const Loading = ({children}) => {
  const {loading, user} = useContext(DataContext)

  const login = loading ? <Load /> : user?  <Navigate to="/money" /> : children

  return login
}

export default Loading