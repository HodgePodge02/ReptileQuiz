import Data from "./data.js";

//DOM SELECTORS
const getStartedButton = document.getElementById("GetStarted");
const mainPage = document.getElementById("MainPage");
const questionsPage = document.getElementById("QuestionsPage");
const counter = document.getElementById("Counter");
const questionsText = document.getElementById("QuestionsText");
const answerButtons = document.querySelectorAll(".answer-btn");
const resultPage = document.getElementById("ResultPage");

//GLOBAL VARS
let questionIndex = 0;
let onFinalQuestion = false;

// REPTILE VAR
let alligator = 0;
let lizard = 0;
let turtle = 0;
// let snake = 0;

//Results
const animalResult = {
  alligator: {
    header_text: "",
    img: "",
    paragraph: "",
  },
  lizard: {
    header_text: "",
    img: "",
    paragraph: "",
  },
  turtle: {
    header_text: "",
    img: "turtle.png",
    paragraph: "",
  },
};

/* ------ Event Listeners ------ */
//Transition from Main page to first question
getStartedButton.addEventListener("click", (e) => {
  mainPage.style.display = "none";
  questionsPage.style.display = "flex";
  getNextQuestion();
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
  //sets buttons' text
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

      //Get next question or move to result page
      if (onFinalQuestion) GetResultPageData();
      else {
        if (getCurrentQuestionData().final_question) {
          onFinalQuestion = true;
        } else {
          questionIndex += 1;
          getNextQuestion();
        }
      }
      console.debug("Animal Points:", alligator, lizard, turtle);
    });
  });
}

//RESULT PAGE

function GetResultPageData() {
  questionsPage.style.display = "none";
  resultPage.style.display = "flex";
}
