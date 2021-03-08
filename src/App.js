import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
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
  const { user, setUser } = useContext(VisitorContext);
  const [ userObject, setUserObject ] = useState(null);
  
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('users').doc(user.uid).get()
        .then((res) => {
          setUser(res.data().username)
        }).catch(err => {
          console.log(err)
        })
        setUserObject(user);
      } else {
        // Do stuff when user is null
      }
    })
  })

  return (
    <div className="App">
      <Navbar userObject={userObject} setUserObject={setUserObject} />
      <Switch>
        <Route exact path='/'>
          <Home user={userObject} />
        </Route>
        <Route path='/login'>
          <Login user={userObject} />
        </Route>
        <Route path='/signup'>
          <Signup user={userObject} />
        </Route>
        <Route path='/profile'>
          <Profile userObject={userObject} visitor={user} />
        </Route>
        <Route path='/admin'>
          <Admin userObject={userObject} visitor={user}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
