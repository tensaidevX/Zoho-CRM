import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import jwt from "jwt-decode";

function PrivateRoute(props) {
  if (props.user) {
    return props.children;
  } else {
    return <Navigate to='/' />;
  }
}

function RestrictedRoute(props) {
  if (props.user) {
    return <Navigate to='/dashboard' />;
  } else {
    return props.children;
  }
}

function App() {
  let user;
  let token = localStorage.getItem("token");
  if (token) {
    user = jwt(token);
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <RestrictedRoute user={user}>
                <Home />
              </RestrictedRoute>
            }
          />
          <Route
            exact
            path='/dashboard'
            element={
              <PrivateRoute user={user}>
                <Dashboard user={user} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
