Quiz App

This is a web-based quiz application built using HTML, CSS, JS and EXPRESS

The app allows users to select how many questions they'd like to answer, then dynamically presents a random quiz. Once the quiz is complete, users are shown their score and given the option to review their answers or restart the game.



Features

Home Screen

- Allows users to input how many questions they want to be  quizzed on (up to 50)

Quiz Functionality

- Random selection of questions from a JSON file each time the quiz is played

- Ensures each playthrough generates a different quiz

- Interactive multiple-choice buttons for each question

- Timer counts down for each question

Result Screen

- Displays total score out of number of selected questions

- Includes Review Answers feature that shows user's picks vs correct answers

- Option to restart the quiz using Play Again

Pause and Continue Functionality

- User can pause the timer mid-quiz and resume without losing progress

How to Run the Server

- Make sure you have Node.js installed

- Clone this repository or download the project folder

- Run the following commands in your terminal:

    ```bash
    npm install
    node server.js
