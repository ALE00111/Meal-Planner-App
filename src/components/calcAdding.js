import { useState } from 'react';
import ListFood from "./listFood"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Adding = ({totalCal}) => {
    const [inputValue1, setInputValue1] = useState("");  // Stores the current input value for food name
    const [inputValue2, setInputValue2] = useState("");  // Stores the current input value for quantity
    const [inputValue3, setInputValue3] = useState("");  // Stores the current input value for calories
    const [showAdd, setShowAdd] = useState(false)
    const [food, setListFood] = useState([])
    const [remainingCal, setRemainingCal] = useState(totalCal); // Track remaining calories

    
    function handleUpdate(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        
        
        if(!inputValue1) {
            alert("Please add a food name")
        }

        if(!inputValue2) {
            alert("Please add a quantity")
        }

        if(!inputValue2) {
            alert("Please add a number of calories per item")
        }

        
        if(inputValue1 && inputValue2 && inputValue3) {
            {!showAdd && setShowAdd(!showAdd)} //showAdd for the list of foods
            // Create a new food item object
            const newCal = inputValue3 * inputValue2
            const newFood = {
                id: Date.now(), //using the current date as a id
                foodName: inputValue1,
                quantity: inputValue2,
                cal: newCal,
            };

            setInputValue1("");
            setInputValue2("");
            setInputValue3("");

            setRemainingCal(remainingCal - newCal);
            setListFood([...food, newFood]); //The dots repersent all that are contained within food and the second paramater is adding newFood to food
        }
    }

    const deleteFood = (id) => {
        const calBack = food.find((item) => item.id === id) //finds the food that needs to be deleted
        setRemainingCal(remainingCal +calBack.cal)  //adds the calories back for the food 
        setListFood(food.filter((food) => food.id !== id)) //filters through the whole list of foods and only adds back the food that don't match the id
        console.log("delete", id)
    }



    return (
    <>
        My Total Calories: {remainingCal} 
        <br/>
        Enter Food Items: <br/>
            <form  onSubmit = {handleUpdate}> 

                <label>  
                    Name:&nbsp; {/*creates a space */}
                    
                    <TextField id="outlined-basic" label="Name" variant="outlined" size="small" value = {inputValue1} 
                    onChange={(e) => setInputValue1(e.target.value)} />
                    
                    &nbsp; {/*creates a space */}
                </label>
                <br/>
                <br/>
                <label> 
                    Quantity:&nbsp; {/*creates a space */}

                    <TextField id="outlined-basic" label="Quantity" variant="outlined" size="small" type = "number" value = {inputValue2} 
                    onChange={(e) => setInputValue2(e.target.value)} />
                    
                </label>
                <br/>
                <br/>
                <label> 
                    Num. of Calories:&nbsp; {/*creates a space */}

                    <TextField id="outlined-basic" label="Calories" variant="outlined" size="small"  type= "number" value = {inputValue3} 
                    onChange={(e) => setInputValue3(e.target.value)} />
                    
                </label>
                <br/>
                &nbsp; {/*creates a space */}
                <Button variant="contained" type = "submit">Submit</Button>
            </form>

            {showAdd && <ListFood food = {food} onDelete = {deleteFood}/>}
    </>
    );
}

export default Adding