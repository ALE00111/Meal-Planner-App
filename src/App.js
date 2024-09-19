import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./home"
import Calc from "./calc"
import Nutri from "./nutri"

function App() {
  return (
    <div className = "slider-thumb">
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/calc" element = {<Calc/>}/>
        <Route path = "/nutri" element = {<Nutri/>}/>
      </Routes>
    </div>
  );
}

export default App;
