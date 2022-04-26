import Data from "./data.js";

//Animals Scores
let TURTLE = 0;

//GLOBAL VARS
let questionIndex = 0;

//DOM SELCTORS
const getStartedButton = document.getElementById("GetStarted");
const mainPage = document.getElementById("MainPage");
const questionsPage = document.getElementById("QuestionsPage");
const counter = document.getElementById("Counter");
const questionsText = document.getElementById("QuestionsText");
const answerButtons = document.querySelectorAll(".answer-btn");

// REPTILE VAR
let alligator = 0;
let lizard = 0;
let turtle = 0;
// let snake = 0;

/* ------ Event Listeners ------ */
//Transition from Main page to first question
getStartedButton.addEventListener("click", (e) => {
  mainPage.style.display = "none";
  questionsPage.style.display = "flex";
});

function getCurrentQuestionData() {
  return Data.find((obj, i) => i === questionIndex);
}

function getNextQuestion() {
  questionsText.innerText = getCurrentQuestionData().text;
  buttons();
}

function buttons() {
  answerButtons.forEach((button) => {
    getCurrentQuestionData().answers.forEach((answer, i) => {
      if (button.classList[1] == i) {
        button.innerText = answer.text;
      }
    });

    button.addEventListener("click", (e) => {
      getCurrentQuestionData().answers.forEach((answer, i) => {
        if (button.classList[1] == i) {
          alligator += answer.weights.alligator;
          lizard += answer.weights.lizard;
          turtle += answer.weights.turtle;
        }
      });
      console.debug("Animal Points:", alligator, lizard, turtle);
    });
  });
}

// counter.innerText = questionIndex + 1;

getNextQuestion();
