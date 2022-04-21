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

/* ------ Event Listeners ------ */
//Transition from Main page to first question
getStartedButton.addEventListener("click", (e) => {
  mainPage.style.display = "none";
  questionsPage.style.display = "flex";
});

function getNextQuestion() {
  Data.forEach((obj, i) => {
    if (i === questionIndex) {
      questionsText.innerText = obj.text;
    }
  });
}

// counter.innerText = questionIndex + 1;

getNextQuestion();
