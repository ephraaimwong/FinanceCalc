import Navbar from "./Components/Navbar"
import Landingpage from "./Landingpage"
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Amortization from "./Calculators/Amortization/Amortization";
import BasicCalc from "./Calculators/BasicCalc";


function App() {
  console.log(window.location)
  return (<div>
    <Navbar/>
      <div className="Container">
        <Routes> 
          <Route path = "/" element = {<Landingpage/>} />
          <Route path = "/Calculators/Amortization/Amortization" element = {<Amortization/>} />
          <Route path = "/Calculators/BasicCalc" element = {<BasicCalc/>} /> 
        </Routes>
      </div>
  </div>
  );
}

export default App;
