# Polling App with MERN Stack

This project allows users to post polls that other users can vote on.

## Backend Endpoints:

Base URL is http://localhost:5000/users

GET /
gets data of all users in database

GET /id
gets data of specific user

POST /add
adds a user to the database

POST /newpoll/id
adds a new polls to the polls posted by a specific user

POST /updatepoll/id
adds a vote to one of the options for a poll

DELETE /id
deletes a specific user
