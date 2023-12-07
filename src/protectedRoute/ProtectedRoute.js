import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';

const ProtectedRoute = (props) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Route {...props} /> : <Navigate to="/" />;
};
export default ProtectedRoute;