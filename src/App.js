import React from "react";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/NotFound";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
// FOR PUBLIC
function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  return token !== null && token !== undefined ? (
    <Navigate to="/dashboard" />
  ) : (
    children
  );
}
// FOR PRIVATE

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token !== null && token !== undefined ? children : <Navigate to="/" />;
}

// FOR PUBLIC ROUTE LIST

const publicRoutesName = [
  {
    path: "/",
    component: <Login />,
  },
];

// FOR PRIVATE ROUTE LIST

const privateRoutesName = [
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
];
function App() {
  return (
    <>
      <Routes>
        {/**************  Start public Route *********************/}
        {publicRoutesName?.map((route, index) => {
          return (
            <Route
              key={index + 1}
              exact
              path={route.path}
              element={<PublicRoute>{route.component}</PublicRoute>}
            />
          );
        })}
        {/****************** End public Route  *********************/}

        {/****************** Start Private Route  *********************/}

        {privateRoutesName?.map((route, index) => {
          return (
            <Route
              key={index + 2}
              path={route.path}
              element={<PrivateRoute>{route.component}</PrivateRoute>}
            />
          );
        })}

        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/****************** end Private Route  *********************/}

        {/**************** No page found *********************/}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
