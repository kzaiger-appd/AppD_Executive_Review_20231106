# Python3 code to generate
# id using uuid4()
  
import uuid
  
def guid_id():
    # make a random UUID
    id = uuid.uuid4()
    return id
  
# Id generated using uuid4()
# print ("The id generated using uuid4() : ",end="")
# guid_id()