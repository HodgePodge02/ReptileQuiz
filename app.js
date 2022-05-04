import Data from "./data.js";

//DOM SELECTORS
const getStartedButton = document.getElementById("GetStarted");
const mainPage = document.getElementById("MainPage");
const questionsPage = document.getElementById("QuestionsPage");
const counter = document.getElementById("Counter");
const questionsText = document.getElementById("QuestionsText");
const answerButtons = document.querySelectorAll(".answer-btn");
const resultPage = document.getElementById("ResultPage");
const resultHeader = document.getElementById("ResultHeader");
const resultImage = document.getElementById("ResultImage");
const resultText = document.getElementById("ResultText");
const replayButton = document.getElementById("ReplayButton");
//GLOBAL VARS
let questionIndex = 0;

// REPTILE VAR
const reptiles = {
  alligator: {
    value: 0,
    header_text: "Alligator (mississippiensis)",
    img: "alligator.png",
    paragraph:
      "This behemoth of a lizard is the apex predator of it's territories with nothing to fear except... other gators (and the ever growing human expansion which destroys their habitats.) Often easier to appreciate when they're contributing to the oil fields rather than devouring your dog from your back yard. The largest recorded Alligator in America was discovered in 2014, from ther Alabama river. Homie was a whopping 15 feet and 9.25 inches (every inch counts!) and weighed in at an astounding 1,011.14 pounds!",
  },
  lizard: {
    value: 0,
    header_text: "Lizard",
    img: "lizard.png",
    paragraph:
      "Containing almost 6 thousand species makes lizards one of the most diverse reptiles. These slippery buggers have interesting ways of defending themselves from detaching their tales to squirting blood from their eyes, or enabling bipedal motion and running on water for 15 feet! personally, I don't know which strategy is more disturbing, just... abandoning a body part or squirting blood from your eyeballs (I mean what about contacts?) speaking of the senses, lizards often lick the air to smell their environment, very similiar to snakes. As you may have already guessed, these are not very bold creatures, they often blend in to their environements, and try and stay very still while basking in the sun.",
  },
  turtle: {
    value: 0,
    header_text: "Turtle",
    img: "turtle.png",
    paragraph:
      "These shelled dinosaurs have bragging rights about being one of the oldest species of reptiles in the world! a turtles shell is part of it's skeleton. It's made up of over 50 bones. Similiar to other reptiles, the temperature of the turtle egg is the deciding factor of the gender of the turtle. Some turtle species will stay in the same lake, river, or pond for most of their lives while others (sea turtle) will travel as much as 10,000 miles! ",
  },
};

/* ------ Event Listeners ------ */
//Transition from Main page to first question
getStartedButton.addEventListener("click", (e) => {
  mainPage.style.display = "none";
  questionsPage.style.display = "flex";
  getNextQuestion();
});

answerButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    getCurrentQuestionData().answers.forEach((answer, i) => {
      if (button.classList[1] == i) {
        reptiles.alligator.value += answer.weights.alligator;
        reptiles.lizard.value += answer.weights.lizard;
        reptiles.turtle.value += answer.weights.turtle;
      }
    });

    //Get next question or move to result page
    if (Data.length - 1 === questionIndex) {
      GetResultPageData();
    } else {
      questionIndex += 1;
      getNextQuestion();
    }
  });
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
  });
}

function getWinner() {
  let animals = [
    reptiles.alligator.value,
    reptiles.lizard.value,
    reptiles.turtle.value,
  ];
  const winNumber = animals.reduce((accumulatedValue, currentValue) => {
    return Math.max(accumulatedValue, currentValue);
  });

  const winningReptile = Object.keys(reptiles).find(
    (rep) => reptiles[rep].value === winNumber
  );
  return reptiles[winningReptile];
}

//RESULT PAGE

function GetResultPageData() {
  questionsPage.style.display = "none";
  resultPage.style.display = "flex";
  resultHeader.innerText = getWinner().header_text;
  resultText.innerText = getWinner().paragraph;
  resultImage.src = `/img/animals/${getWinner().img}`;
}

replayButton.addEventListener("click", (e) => {
  window.location.reload();
});

//getStartedButton.addEventListener("click", (e) => {
//   mainPage.style.display = "none";
//   questionsPage.style.display = "flex";
//   getNextQuestion();
// });
