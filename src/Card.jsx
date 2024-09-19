import RandoMeal from "./meal";

function Card({mealType, pic}){
    return (
        <div className = 'card'>
            <h1 style={{ textTransform: 'capitalize' }}>{mealType}</h1>
            <img className = "card-image" src = {pic} alt = "Meal Picture"></img>
            <RandoMeal mealPref ={mealType}/>
        </div>
    );
}

export default Card; 