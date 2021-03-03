import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import VehicleDetails from "./components/VehicleDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import Navbar from "./components/shared/Navbar";

function App() {
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
