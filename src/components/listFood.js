import {FaTimes} from 'react-icons/fa'
import { useEffect} from 'react'

const ListFood = ({food, onDelete}) => {

    useEffect(() => { //Storing data as object in local storage
        window.localStorage.setItem("HELLO WORLD", JSON.stringify(food))
    })

    return(
        <>
            <br/>
            Lists of Food: <br/>
            {food.map((item, index) => (
                <div key={index}>
                {index +1}. Name: {item.foodName}, Quantity: {item.quantity}, Calories: {item.cal} 
                <FaTimes style = {{color: 'red', cursor: 'pointer'}} onClick = {() => onDelete(item.id)}/>
                <br />
                </div>
            ))}
        </>
    )
}

export default ListFood;