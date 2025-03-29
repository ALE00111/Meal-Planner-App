import pymongo
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Enable CORS for all routes
myclient = pymongo.MongoClient("mongodb://localhost:27017/") #holds all the collections of the database
mydb = myclient["meals"] #holds all the documnts within the "meals" collection

def mealPlan(type, dish, diet, health):
    if type == "breakfast":
        mycol = mydb["breakfast"]
    elif type == "lunch":
        mycol = mydb["lunch"]
    elif type == "dinner":
        mycol = mydb["dinner"]
    else:
        return "Invalid meal choice"
    
    if dish == "Any":
        if diet == "Any": 
            if health == "Any":
                pipeline = [
                {"$sample": {"size": 1}},                            # Randomly select one document
                {"$project": {"_id": 0, "label": 1, "dietLabels": 1, "mealType": 1, "dishType": 1, "ingredientLines": 1, "healthLabels": 1, "image": 1}}  # Return only specific fields
                ]
            else:
                pipeline = [
                {"$match": {"healthLabels": {"$in":[health]}}}, # Filter based on mealType and dietLabels
                {"$sample": {"size": 1}},                            # Randomly select one document
                {"$project": {"_id": 0, "label": 1, "dietLabels": 1, "mealType": 1, "dishType": 1, "ingredientLines": 1, "healthLabels": 1, "image": 1}}  # Return only specific fields
            ]
        else:
            if health == "Any":
                pipeline = [
                    {"$match": {"dietLabels": {"$in":[diet]}}}, # Filter based on mealType and dietLabels
                    {"$sample": {"size": 1}},                            # Randomly select one document
                    {"$project": {"_id": 0, "label": 1, "dietLabels": 1, "mealType": 1, "dishType": 1, "ingredientLines": 1, "healthLabels": 1, "image": 1}}  # Return only specific fields
                ]
            else: 
                pipeline = [
                    {"$match": {"dietLabels": {"$in":[diet]}, "healthLabels": {"$in":[health]}}}, # Filter based on mealtype, healthtype, and dietLabels
                    {"$sample": {"size": 1}},                            # Randomly select one document
                    {"$project": {"_id": 0, "label": 1, "dietLabels": 1, "mealType": 1, "dishType": 1, "ingredientLines": 1, "healthLabels": 1, "image": 1}}  # Return only specific fields
                ]
    else:
        if diet == "Any": 
            if health == "Any":
                pipeline = [
                {"$match": {"dishType": {"$in":[dish]}}},
                {"$sample": {"size": 1}},                            # Randomly select one document
                {"$project": {"_id": 0, "label": 1, "dietLabels": 1, "mealType": 1, "dishType": 1, "ingredientLines": 1, "healthLabels": 1, "image": 1}}  # Return only specific fields
                ]
            else:
                pipeline = [
                {"$match": {"healthLabels": {"$in":[health]}, "dishType": {"$in":[dish]}}}, # Filter based on mealType and dietLabels
                {"$sample": {"size": 1}},                            # Randomly select one document
                {"$project": {"_id": 0, "label": 1, "dietLabels": 1, "mealType": 1, "dishType": 1, "ingredientLines": 1, "healthLabels": 1, "image": 1}}  # Return only specific fields
            ]
        else:
            if health == "Any":
                pipeline = [
                    {"$match": {"dietLabels": {"$in":[diet]}, "dishType": {"$in":[dish]}}}, # Filter based on mealType and dietLabels
                    {"$sample": {"size": 1}},                            # Randomly select one document
                    {"$project": {"_id": 0, "label": 1, "dietLabels": 1, "mealType": 1, "dishType": 1, "ingredientLines": 1, "healthLabels": 1, "image": 1}}  # Return only specific fields
                ]
            else: 
                pipeline = [
                    {"$match": {"dietLabels": {"$in":[diet]}, "healthLabels": {"$in":[health]}, "dishType": {"$in":[dish]}}}, # Filter based on mealtype, healthtype, and dietLabels
                    {"$sample": {"size": 1}},                            # Randomly select one document
                    {"$project": {"_id": 0, "label": 1, "dietLabels": 1, "mealType": 1, "dishType": 1, "ingredientLines": 1, "healthLabels": 1, "image": 1}}  # Return only specific fields
                ]
    
    result = list(mycol.aggregate(pipeline))  #turning it into a list to be easily manipulated in python

    if result:
        return result[0]
    else:
        return None
    
@app.route('/', methods=['POST'])
def receive_data():
    # Access the data sent by the React frontend
    data = request.get_json()  # Get JSON data
    user_input_type = data.get('type')  # Extract specific data field(mealType)
    user_input_dish = data.get('dish') #Extract specific data field(dishType)
    user_input_diet = data.get('diet')  # Extract specific data field(dietLabel)
    user_input_health = data.get('health') #Extract speicifid data field(healthLabel)
    
    #Checks for invalid types of type, dish, diet, and health
    if user_input_type not in ['breakfast', 'lunch', 'dinner']:
        return jsonify({'error': 'Invalid meal type'}), 400
    
    if user_input_dish not in ['drinks', 'starter', 'main course', 'Any']:
        return jsonify({'error': 'Invalid dish type'}), 400
    
    if user_input_diet not in ['Balanced','Low-Fat', 'Low-Carb', 'Low-Sodium', 'Any']:
        return jsonify({'error': 'Invalid diet type'}), 400

    if user_input_health not in ['Vegan','Pork-Free', 'Vegetarian', 'Pescatarian', 'Any']:
        return jsonify({'error': 'Invalid health type'}), 400
    

    # Process the data (for example, you could save it to a database)
    print(f"Received input from React: {user_input_type}")
    print(f"Received input from React: {user_input_dish}")
    print(f"Received input from React: {user_input_diet}")
    print(f"Received input from React: {user_input_health}")

    meal = mealPlan(user_input_type, user_input_dish, user_input_diet, user_input_health)

    print(f"Converted data: {meal}")

    if meal is None:
        return jsonify({'error': 'No meals available'}), 404

    #Send back only the fields you're interested in
    response_data = {   #grabbing all data and giving it a specific name
        'name': meal.get('label'),
        'dietLabels': meal.get('dietLabels'),
        'healthLabels': meal.get('healthLabels'),
        'dishType': meal.get('dishType'),
        'ingredientLines': meal.get('ingredientLines'),
        'mealType': meal.get('mealType'),
        'image': meal.get('image')
    }
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True, port = 5005) #sets flask debugger and only accepts requests incoming from port 5005, to seperate both flask apps