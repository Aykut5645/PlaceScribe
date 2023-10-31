# PlaceScribe App

PlaceScribe is your passport to a world of exploration and sharing. With app you can effortlessly share your favorite places and their unique descriptions with the global community, while also discovering incredible destinations curated by fellow users.
 
 
## Tech Stack

**Client-Side**
 - Angular
 - HTML
 - SCSS
 - RxJS
 - NG-ZORRO-ANTD
 
**Server-Side**
 - NodeJS
 - ExpressJS
 - MongoDB Atlas
 - Mongoose
 - Axios
 - Multer
 - Bcrypt
 - JSON Web Token
 - Google Maps Geocoding API


## API Endpoints

### Users endpoints:
|/api/users...   |Description                                      
|----------------|-------------------------------
|GET …/          |`Retrieve list of all users`            
|POST …/signup   |`Create new user + log user in`            
|POST …/login    |`Log user in`

### Places endpoints:

|/api/places/…   	   |Description                    
|----------------------|-----------------------------------------------------------------------|
|GET …/user/:userId    |`Retrieve list of all places for a given user id (userId)`             |
|GET …/:placeId   	   |`Get a specific place by place id (placeId)`                           |
|POST …/    		   |`Create a new place`                                                   |
|PATCH …/:placeId      |`Update a place by id (placeId)`                                       |
|DELETE …/:placeId     |`Delete a place by id (placeId)`                                       |


## SPA Pages

|Routes                     |Description                           |HTML                       |
|---------------------------|--------------------------------------|---------------------------|
|**/auth/users**            |`List of Users`                       |always reachable           |
|**/places/user/:userId**   |`List of Places for Selected User`    |always reachable           |
|**/places/create**         |`New Place Form`                      |only authenticated         |
|**/auth/login**            |`Login Form`                          |only unauthenticated       |
|**/auth/register**         |`Register Form`                       |only unauthenticated       |


## Licence

Distributed under the MIT License. See `LICENSE` for more information.