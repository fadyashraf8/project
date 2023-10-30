import './App.css';
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './Component/Home/Home';
import MasterLayout from './Component/MasterLayout/MasterLayout';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import NotFound from './Component/NotFound/NotFound.jsx';
import jwt_decode from 'jwt-decode';

function App() {

  let [user, setUser] = useState(null)


  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      saveUserData()
    }
  }, [])

  function saveUserData() {
    let token = localStorage.getItem("token")
   
    setUser(token)
  }


  function ProtectedRouter(props) {

    if (localStorage.getItem("token") === null) {
      return <Navigate to="/login" />

    } else {
      return props.children
    }
  }
  function ProtectedRouter2(props) {

    if (localStorage.getItem("token") != null) {
      return <Navigate to="/home" />

    } else {
      return props.children
    }
  }

  function logOut() {
    localStorage.removeItem("token")
    setUser(null)
    return <Navigate to="/login" />
  }

  let router = createHashRouter([
    {
      path: '/', element: <MasterLayout user={user} logOut={logOut} />, children: [
        { path: '/', element: <ProtectedRouter><Home/></ProtectedRouter> },
        { path: 'home', element: <ProtectedRouter><Home/></ProtectedRouter> },
        { path: 'login', element: <ProtectedRouter2><Login saveUserData={saveUserData} /></ProtectedRouter2> },
        { path: 'register', element: <ProtectedRouter2><Register/></ProtectedRouter2> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])



  return (
    <RouterProvider router={router} />

  );
}

export default App;
