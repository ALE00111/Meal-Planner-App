import React, {useState } from 'react';
import axios from 'axios'; // If using axios
import { TiArrowSortedDown } from "react-icons/ti";

const MealComponent = ({mealPref}) => {
    const [mealName, setMealName] = useState(null);
    const [type, setType] = useState(mealPref);
    const [dish, setDish] = useState("Any")
    const [diet, setDiet] = useState("Any");
    const [health, setHealth] = useState("Any");

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior

        try {
            // Send a POST request to the Flask backend using axios
            const res = await axios.post('http://127.0.0.1:5000/', {
                type: type,  // Send input as a JSON object
                dish: dish, // Send input as a JSON object
                diet: diet, // Send input as a JSON object
                health: health, // Send input as a JSON object 
            },
            {
                headers: { 'Content-Type': 'application/json' }  // Ensure JSON content type
            });

            // Extract the response data from the Flask server
            setMealName(res.data);  // Set the response message from Flask
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
            <div>
                <form onSubmit = {handleSubmit}>

                    <label>Select Dish Type: </label>
                    <div className= "select-container">
                        <select className = "select-box" value={dish} onChange={(e) => setDish(e.target.value)}>
                            <option value="Any">No Preference</option>
                            <option value="starter">Starter</option>
                            <option value="main course">Main Course</option>
                            <option value="drinks">Drinks</option>
                        </select>
                        <div className = "icon-container">
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    
                    <label>Select Diet Restrictions: </label>
                    <div className= "select-container">
                        <select className = "select-box" value={diet} onChange={(e) => setDiet(e.target.value)}>
                            <option value="Any">No Preference</option>
                            <option value="Balanced">Balanced</option>
                            <option value="Low-Carb">Low-carb</option>
                            <option value="Low-Sodium">Low-Sodium</option>
                            <option value="Low-Fat">Low-fat</option>
                        </select>
                        <div className = "icon-container">
                            <TiArrowSortedDown />
                        </div>
                    </div>

                    <label>Select Specific Health Restricitions: </label>
                    <div className= "select-container">
                        <select className = "select-box" value={health} onChange={(e) => setHealth(e.target.value)}>
                            <option value="Any">No Preference</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Pescatarian">Pescatarian</option>
                            <option value="Pork-free">Pork-Free</option>
                        </select>
                        <div className = "icon-container">
                            <TiArrowSortedDown />
                        </div>
                    </div>

                    <br/>
                    <button type = "submit"> Randomize</button>
                    {/*Apparently to turn off the color we need to provide any text without the theme class??*/}
                
                </form>
                
                <h2 style={{ textTransform: 'capitalize' }}>Random Recipe {mealPref}:</h2>
                {mealName ? (
                    <div>
                        <h2 style={{ textTransform: 'capitalize' }}>Name: {mealName.name}</h2>
                        <p style={{ textTransform: 'capitalize' }}><strong>Meal Type:</strong> {mealName.mealType.join(', ')}</p>
                        <p style={{ textTransform: 'capitalize' }}><strong>Dish Type:</strong> {mealName.dishType.join(', ')}</p>
                        <p style={{ textTransform: 'capitalize' }}><strong>Diet Labels:</strong> {mealName.dietLabels.join(', ')}</p>
                        <p style={{ textTransform: 'capitalize' }}><strong>Health Labels:</strong> {mealName.healthLabels.join(', ')}</p>
                        <p style={{ textTransform: 'capitalize' }}><strong>Ingredients:</strong> {mealName.ingredientLines.join(', ')}</p>
                        {/* {mealName.image}
                        {mealName.image && (
                            <img
                            src={`https://cors-anywhere.herokuapp.com/${mealName.image}`}
                            alt={mealName.name}
                            style={{ width: '300px', height: 'auto' }}
                            />
                        )} */}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
    );
};

export default MealComponent;