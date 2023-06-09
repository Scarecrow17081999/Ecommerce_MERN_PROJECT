import React from "react";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) return <Navigate to="/login" />;
            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
