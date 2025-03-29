import {useState} from 'react';
import axios from 'axios'; // If using axios
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom"
import ListConvo from "./components/listConvo"


const Bot = () => {
    const [prompt, setPrompt] = useState("")
    const [conversation, setConvo] = useState([])
    const [showConvo, setShowConvo] = useState(false)

    const handleSubmit = async(event) => {
        event.preventDefault();
        //In here we will submit the prompt to the AI
        try {
            // Send a POST request to the Flask backend using axios
            const res = await axios.post("http://127.0.0.1:5000/", {
                convoID : 0, //Auto set to 0 so it knows theres only one conversation, but we can adjust later for different convos
                prompt: prompt
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            );
            const response = {
                id: Date.now(), //using the current date as a id
                res: res.data.response,
                pro: prompt
            }
            setConvo([...conversation, response]) //The dots repersent all that are contained within conversation and the second paramater is adding the new response to the conversation
            {!showConvo && setShowConvo(!showConvo)} //showing conversation when user prompts bot
            console.log(res.data.response)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className = "home-button">
                <Link to = "/">
                  <Button variant = "contained">Return To Home</Button>
                </Link>
            </div>
            <div className = "bot-container">
                <form onSubmit = {handleSubmit}>
                    <label>
                        Enter Prompt: &nbsp;
                        <TextField id="outlined-basic" label="Prompt"  variant="outlined" type= "text" size = "normal" value = {prompt} onChange = {(e) => setPrompt(e.target.value)} />
                    </label>
                    <br/>
                    <br/>
                    <Button variant = "contained" type = "submit">ASK FOOD BOT</Button>
                </form>
            </div>
            <br/>
            {showConvo && <ListConvo convo = {conversation}/>}
        </>
    )
}

export default Bot