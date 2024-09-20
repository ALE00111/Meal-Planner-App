import AddCal from "./components/calcAdding"
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom"

const Calc = () => {
    const [calories, setCalories] = useState("");
    const [inputValue, setInputValue] = useState("");  // Stores the current input value
    const [showAdd, setShowAdd] = useState(false)

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        setCalories(inputValue); //sets calories with the inputValue obtained

        //Checks if empty input
        if (!inputValue) {
            alert("Please add a number for calories!");
            return;
        }
        else {
            {!showAdd && setShowAdd(!showAdd)} //This is short hand for a if then statement
        }


        // Read the form data
        // const form = e.target;
        // const formData = new FormData(form);
    
        // You can pass formData as a fetch body directly:
        // fetch('/some-api', { method: form.method, body: formData });
    
        
        // Or you can work with it as a plain object:
        // const formJson = Object.fromEntries(formData.entries());
        
    
        
        // console.log(formJson);
      }

    return (
        <>
            <div className = "home-button">
                <Link to = "/">
                  <Button variant = "contained">Return To Home</Button>
                </Link>
            </div>
            <div className = "page-container"> 
                <div className = "container-calc" onSubmit={handleSubmit}> 
                    <h2>Calculator</h2>
                    <form>
                        <label>
                            Calorie Goal:&nbsp;
                            <TextField id="outlined-basic" label="Calories" variant="outlined" type = "number" size = "small" value = {inputValue} //places the value typed into inputValue
                            onChange={(e) => setInputValue(e.target.value)}/>
                        </label>
                        <br/>
                        &nbsp; {/*creates a space */}
                        <Button variant="contained" type = "submit" color = "orange">Submit</Button>
                        <br/>
                    </form>
                    {showAdd && <AddCal totalCal = {calories} />}
                </div>
            </div>
        </>
    )
}

export default Calc;