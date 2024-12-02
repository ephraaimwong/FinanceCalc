import { Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./Landingpage.css"


export default function Landingpage(){
    return(
        <div className="landing-page">
            {/* <Navbar/> */}
            <section className = "Hero">
                <h1>All Calculators and Finance Tools </h1>
                <p>The one stop shop for all things money. From those void of knowledge to those cursed with too much, this website surely has a tool for you!</p>
                <Link to ="/Calculators/BasicCalc"><button>Basic Calculator</button></Link>
                    <Link to=""><button>Simple Interest Calculator</button></Link>
                    <Link to=""><button>Compound Interest Calculator</button></Link> 
                    <Link to ="/Calculators/Amortization/Amortization" ><button>Amortization Schedule</button></Link>
                    <Link to=""><button>etc</button></Link>
            </section>
        </div>

    )

}