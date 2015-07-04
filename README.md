# Turing Survey
This was built during the Web Development Immersive course at General Assembly and was my first app using Node.js, Express.js, and MongoDB.

The static JS (main.js in public directory) was thrown together quickly and needs refactoring.  There are also a few features that need to be added, such as the ability to add questions to an existing survey (currently the user can only edit existing questions).

##User Stories & Wireframes
Both of these are available at our group Trello Board: https://trello.com/b/ycwVZYKo/team-turing

##Explanation of App
The app allows users to create custom surveys and then view the collected responses on a Dashboard. A new user is first prompted to register a username and password where as a returning user can login (if expired session). From the Dashboard view, users have the following options: create new surveys, add questions to a survey, edit questions within an existing survey, delete a question from a survey, and delete an entire survey.

There are three different types of questions:
1. Multiple Choice - a user creates a question title and a list of 5 options for the survey taker to select a single choice.
2. Scale - a user creates a question title and all questions display options ranging only from 1-5.
3. Text - a user creates a question title and the survey taker is given a text field to compose an answer, rather than selecting from a list.

##Future Features
1. Being able to add a question to an existing survey
2. Giving ownership of surveys to a particular User, so only the User sees their surveys.
