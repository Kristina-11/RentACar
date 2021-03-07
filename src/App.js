import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import VehicleDetails from "./components/VehicleDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import Navbar from "./components/shared/Navbar";
import { useEffect } from "react";
import { auth, db } from "./firebase/config";
import { useContext, useState } from "react";
import { VisitorContext } from "./context/VisitorsContext";

function App() {
  const { setUser } = useContext(VisitorContext);
  
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('users').doc(user.uid).get()
        .then((res) => {
          setUser(res.data().username)
        }).catch(err => {
          console.log(err)
        })
      } else {
        // Do stuff when user is null
      }
    })
  })

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/vehicle/:id'>
          <VehicleDetails />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/admin'>
          <Admin />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
