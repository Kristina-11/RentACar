import { Route, Switch } from "react-router-dom";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/'></Route>
        <Route path='/login'></Route>
        <Route path='/signup'></Route>
      </Switch>
    </div>
  );
}

export default App;
