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