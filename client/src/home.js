import './App.css';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom"
function Calc(){
    return (
        <>
            <h1> Welcome To My Nutri App!</h1> 
            <p>
                How it works: <br/>
                1.You can input your calorie goals and keep track of all the items you will eat.
                <br/>
                2.You can create a random meal plan based on your specific dietary and health restrictions. 
            </p>
            <div className = "container">
            <Link to = "/calc">
                <Button variant="contained" type = "submit">GO TO CALORIE CALCULATOR</Button>
            </Link>
            <Link to = "./nutri">
                <Button variant="contained" type = "submit">GO TO MEAL RECOMMENDER</Button>
            </Link>
            </div>
        </>
    )
}
export default Calc
