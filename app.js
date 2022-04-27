import Data from "./data.js";

//DOM SELECTORS
const getStartedButton = document.getElementById("GetStarted");
const mainPage = document.getElementById("MainPage");
const questionsPage = document.getElementById("QuestionsPage");
const counter = document.getElementById("Counter");
const questionsText = document.getElementById("QuestionsText");
const answerButtons = document.querySelectorAll(".answer-btn");

//GLOBAL VARS
let questionIndex = 0;

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
  counter.innerText = `${questionIndex + 1}/${Data.length}`;
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
      questionIndex += 1;
      getNextQuestion();
      console.debug("Animal Points:", alligator, lizard, turtle);
    });
  });
}

getNextQuestion();
