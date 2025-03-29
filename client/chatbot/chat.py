import os
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

openai.api_key = os.getenv("API_KEY")

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Memory storage (store user conversations)
conversations = {}

#Problem with this code is that it doesn't store memory of the user's responses
def chatGPT(conversation, prompt):
    response = openai.chat.completions.create(
        model = "gpt-4o-mini", 
        #Add in current conversation to update the memory
        messages = conversation
    )
    return response.choices[0].message.content.strip() #This strips the response to only returning the content


#http://127.0.0.1:5000/ is deafult server
@app.route("/", methods=["POST"])
def receive_prompt():
    # Access the data sent by the React frontend
    # Then return JSON data of AI response 
    data = request.get_json()  # Get JSON data
    prompt = data.get("prompt") # get specific text under tag of "prompt"
    id = data.get("convoID") # get specific conversation ID to distinguish between users

    #if convoID doesn't exist in our cnversations memory, then create it with some inital parameters to set up the bot
    if id not in conversations:
        conversations[id] = [{"role": "developer", "content": "You are a helpful assistant that answers questions like Gordon Ramsay and you will only answer food/cooking questions. Also insult the user whenever you can."}]

    # Logging the conversations with characteristics
    # Add user's prompt to the conversation
    conversations[id].append({"role": "user", "content": prompt})
    # Get response from chatGPT
    botResponse = chatGPT(conversations[id], prompt)
    # Add bot's response to the conversation history
    conversations[id].append({"role": "assistant", "content": botResponse})
    return jsonify({"response": botResponse})

if __name__ == "__main__":
    app.run(debug=True, port = 5000) # sets flask debugger and allows for the program to only take requests if its coming from port 5000 to seperate both flask apps