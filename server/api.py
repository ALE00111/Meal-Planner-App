import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

#MAKE SURE YOU HAVE YOUR OWN KEYS.ENV FILE WITH YOUR OWN EDMAM API KEYS AND YOUR OWN MONGODB DATABASE NEEDS TO BE SET UP
#I RECOMMEND USING COMPASS FOR MONGODB
#WARNING: I HAVE A SLIGHT BUT IN MINE THAT DOESN'T PROCESS THE ENV FILE, SO I JUST TYPED IN MY CODE, BUT IT MIGHT WORK FOR YOU

EDAMAM_APP_ID = os.getenv("EDAMAM_APP_ID")  #NOT GOOD PRACTICE BUT YOU CAN JSUT STRAIGHT UP TYPE THE KEYS INTO HERE
EDAMAM_APP_KEY =  os.getenv("EDAMAM_APP_KEY") 
MONGODB_URI = os.getenv("MONGODB_URI")

print(f"EDAMAM_APP_ID: {EDAMAM_APP_ID}")
print(f"EDAMAM_APP_KEY: {EDAMAM_APP_KEY}")
print(os.environ)
# Connect to MongoDB
client = MongoClient(MONGODB_URI)
db = client["meals"] #or the name of waht ever databse you're trying to connect to
collection = db['dinner'] #make sure you create serperate databases for each meal i.e breakfast, lunch, dinner 

def fetch_data_from_edamam(mealType = "dinner", max_results = 300): #place any meal type you want to grab from the edmam api
    all_hits = []
    start = 0
    results_per_page = 20  # Edamam API returns 20 results per page
    while start < max_results:
        try:
            url = f"https://api.edamam.com/api/recipes/v2"
            params = {
                'type': 'public',
                'mealType': mealType,
                'app_id': EDAMAM_APP_ID,
                'app_key': EDAMAM_APP_KEY
            }
            response = requests.get(url, params = params)
            response.raise_for_status()
            data = response.json()
            hits = data.get('hits', [])
            if not hits:
                break  # Exit loop if no more results are returned

            all_hits.extend(hits)
            start += results_per_page

        except requests.exceptions.RequestException as e:
            print(f"Error fetching data from Edamam: {e}")
    return all_hits

def save_to_mongodb(data):
    try:
        if data:
            formatted_data = [hit['recipe'] for hit in data]  # Extracting only the recipe details
            result = collection.insert_many(formatted_data)
            print(f"{len(result.inserted_ids)} documents were inserted")
        else:
            print("No data to insert")
    except Exception as e:
        print(f"Error saving to MongoDB: {e}")

def main():
    data = fetch_data_from_edamam()
    save_to_mongodb(data)

if __name__ == "__main__":
    main()