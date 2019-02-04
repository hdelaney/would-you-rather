# Would You Rather Project

This is the code for the final assessment project for Udacity's React & Redux course. The application lets a user play the "Would You Rather?" game, and viewing and answering other users' questions, positing new questions, and viewing overall polling results and leader scores.

<h2>Running the application</h2>

Clone or download the repo. Navigate to the directory in terminal.

Install all project dependencies with `npm install`.

```
npm install
```

Start the development server with `npm start`.

```
npm start
```

Would You Rather has a simple dropdown login functionality to select a user. After logging in, answered and unanswered "would you rather" questions are displayed on the home page. Unaswered questions are displayed by default. The user can click to show only answered questions. In the application, the user can answer unanswered questions, view polling results for answered questions, and see user standing on the Leader Board. The user can also create and add new "would you rather" questions.

The `_DATA.js` file represents a fake database and methods that let you access the data. The ` _DATA.js` file has been updated with path values for `avatarURL` for each user. Attribute `authedUser` has also been changed to `loggedUser`. 

This is a React/Redux front end application.  [Create React App](https://github.com/facebook/create-react-app) was used to bootstrap the project.

## About the Data in _DATA.js

There are two types of objects stored in the database:

- Users
- Questions

### Users

Users include:

| Attribute | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| id        | String | The user’s unique identifier                                 |
| name      | String | The user’s first name  and last name                         |
| avatarURL | String | The path to the image file                                   |
| questions | Array  | A list of ids of the polling questions this user created     |
| answers   | Object | The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options. |

### Questions

Questions include:

| Attribute | Type   | Description                            |
| --------- | ------ | -------------------------------------- |
| id        | String | The question’s unique identifier       |
| author    | String | The author’s unique identifier         |
| timestamp | String | The time when the question was created |
| optionOne | Object | The first voting option                |
| optionTwo | Object | The second voting option               |

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| votes     | Array  | A list that contains the id of each user who voted for that option |
| text      | String | The text of the option                                       |

The code talks to the database via **four** methods:

- `_getUsers()`
- `_getQuestions()`
- `_saveQuestion(question)`
- `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute     | Type   | Description                                |
| ------------- | ------ | ------------------------------------------ |
| author        | String | The id of the user who posted the question |
| optionOneText | String | The text of the first option               |
| optionTwoText | String | The text of the second option              |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| id        | String | The id of the question that was posted                       |
| author    | String | The id of the user who posted the question                   |
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| timestamp | String | The time when the question was created                       |

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute  | Type   | Description                                                  |
| ---------- | ------ | ------------------------------------------------------------ |
| authedUser | String | The id of the user who answered the question                 |
| qid        | String | The id of the question that was answered                     |
| answer     | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"` |