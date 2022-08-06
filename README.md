# LAB: Authentication Lab 06
Assignment:
Authentication System Phase 1: Deploy an Express server that implements Basic Authentication, with signup and signin capabilities, using a Postgres database for storage.

# Lab: Bearer Authorization 07
Assignment:
Authentication Server Phase 2: Token (Bearer) Authentication
At this point, our auth-server is able to allow a user to create an account as well as to handle Basic Authentication (user provides a username + password). When a “good” login happens, the user is considered to be “authenticated” and our auth-server generates a JWT signed “Token” which is returned to the application
We will now be using that Token to re-authenticate users to shield access to any route that requires a valid login to access.

# Pull Request
- [Github-Action]()


# Starting up
ensure you have your .env file set up
exapmle PORT=(enter in port number here)
- In terminal run npm i to install dependencies and then run npm test to run all test.
- In terminal run npm i jsonwebtoken to install and be able to utilize JWTs
- In terminal run brew install sqlite3, sequalize
- Add DATABASE_URL with heroku postgres link to .env file.
- Use thunderclient for testing locally.


# Notes:
- worked on lab 06 with a bunch of classmates and reviewed demo/lecture video.
- I think I completed Lab 07, test are passing and I was able to implement security measure with a timer. Added it to .env

### Testing
I tested routes and JWT in Thunderclient, Postman, Insomnia and it worked.


# UML

- ![UML](./src//UML.png)

### Collaborators:
- Lab 06 - Zoom Video(David), Luis, Danny, Sarah, Jim, Tony.
