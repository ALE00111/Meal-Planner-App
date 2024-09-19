import Card from "./Card";
import BreakfastPic from "./assets/breakfast-pic.jpg"
import LunchPic from "./assets/lunch-pic.webp"
import DinnerPic from "./assets/dinner-pic.jpg"
import Button from '@mui/material/Button';
import {Link} from "react-router-dom"


function Nutri() {
    return (
        <>
            <div className = "home-button">
                <Link to = "/">
                    <Button variant = "contained">Return To Home</Button>
                </Link>
            </div>
            <div className = "container">
                <Card mealType = "breakfast" pic = {BreakfastPic}/>
                <Card mealType = "lunch" pic = {LunchPic}/>
                <Card mealType = "dinner" pic = {DinnerPic}/>
            </div>
        </>
    )
}

export default Nutri