#### 1. Why NoSQL and SQL has scalability difference?
#### 2. Does SQL joins are expensive?
#### 3. Does too much indexes hurts performance in MongoDB?

#### 4. where should I validate Domain models data?

    > From martin flower's article    
    
    But one thing that I think constantly trips people up is 
    when they think object validity on a context independent 
    way such as an isValid method implies.

    I think it's much more useful to think of validation as 
    something that's bound to a context - typically an action 
    that you want to do. Is this order valid to be filled, is 
    this customer valid to check in to the hotel. So rather 
    than have methods like isValid have methods like 
    isValidForCheckIn.

    > it does make sense but i'm not gonna use this in this project
    
   [Article from EnterpriceCraftmanship]https://enterprisecraftsmanship.com/posts/validation-and-ddd/]

#### 5. Can i run single fields query on compound indexed in mongodb ? 
    As long as you are querying by fields that are a left subset 
    of the indexed fields, MongoDB will automatically use the 
    index. That is, if you have an index like {a:1, b:1, c:1}, 
    all the 3 queries db.coll.find({a:"xxx"}), 
    db.coll.find({a:"xxx", b:"yyy"}) and 
    db.coll.find({a:"xxx", b:"yyy", c:"zzz"}) 
    will make use of this index, assuming there are no other 
    indexes.
   [Stackoverflow]https://stackoverflow.com/questions/22376741/can-a-compound-index-be-used-in-searching-a-single-field-in-mongodb
   
   
### Errors and REST Response schemas
    Response : {
        status : "success" | "error"
        data : {} | [{}] | null
        error : {
            type : "invalidParams" | "Unauthorised" | "other"
            message : {} | [{}]
        }
    }
    
    
    {
      "error": {
        "code": 400,
        "message": "API key not valid. Please pass a valid API key.",
        "status": "INVALID_ARGUMENT",
        "details": [
          {
            "@type": "type.googleapis.com/google.rpc.ErrorInfo",
            "reason": "API_KEY_INVALID",
            "domain": "googleapis.com",
            "metadata": {
              "service": "translate.googleapis.com"
            }
          }
        ]
      }
    }
