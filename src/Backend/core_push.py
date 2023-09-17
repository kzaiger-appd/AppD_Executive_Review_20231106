## assuming that a function receives a json object without a unique id

import json
from typing import Dict
from random_number import *
from datetime import datetime

# write code to receive json object and add a unique id
# returns json object with unique id
def add_guid_id(data: Dict):
    json_data = json.loads(data)
    #before assigning the guid_id to the json data, check if the guid_id already exists in the database
    json_data["id"] = str(guid_id())
    return json_data

## validate if the date is in the past
def validate_date(date: Dict):
    # Get the current date and time
    current_date = datetime.now()

    if date["ccoActual"] or date["ccoTarget"] or date["ccoCommit"] or date["icDate"] < current_date:
        raise Exception("The provided date is in the past.")
    
    print("Date is valid.")



print(add_guid_id('{"name": "John", "age": 30, "city": "New York"}'))