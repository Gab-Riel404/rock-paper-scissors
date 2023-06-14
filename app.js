//DOM
const btnRules = document.querySelector(".btn-rules");
const btnAdvanced = document.querySelector(".btn-advanced");
const btnClose = document.querySelector(".btn-close");
const modalRules = document.querySelector(".modal");
<<<<<<< HEAD
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results_result");
const footerS = document.querySelector("footer");

const resultWinner = document.querySelector(".results_winner");
const resultText = document.querySelector(".results_text");
const gameDivAdvanced = document.querySelector(".game-advanced");
const btnPlayAgain = document.querySelector(".play_again");
const logoAd = document.querySelector(".logo-advanced");
const logoNormal = document.querySelector(".logo");
const rulesImage = document.querySelector(".rules_image");
const rulesImageBonus = document.querySelector(".rules_image_bonus");

const scoreNum = document.querySelector(".score_number");
let score = 0;
let isAdvancedMode = false;
=======
const footerS = document.querySelector("footer");
>>>>>>> 4e96a1040dec198de93f2dcb558073d116570277

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

const ADCHOICES = [
  {
    name: "scissors",
    beats: ["paper", "lizard"],
  },
  {
    name: "paper",
    beats: ["rock", "spock"],
  },
  {
    name: "rock",
    beats: ["lizard", "scissors"],
  },
  {
    name: "lizard",
    beats: ["spock", "paper"],
  },
  {
    name: "spock",
    beats: ["scissors", "rock"],
  },
];

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    if (isAdvancedMode) {
      const choice = ADCHOICES.find((choice) => choice.name == choiceName);
      chooseAdvanced(choice);
    } else {
      const choice = CHOICES.find((choice) => choice.name == choiceName);
      choose(choice);
    }
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function chooseAdvanced(choice) {
  const aichoice = aiChooseAdvanced();
  displayResultsAdvanced([choice, aichoice]);
  displayWinnerAdvanced([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function aiChooseAdvanced() {
  const rand = Math.floor(Math.random() * ADCHOICES.length);
  return ADCHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultsDiv, idx) => {
    setTimeout(() => {
      resultsDiv.innerHTML = `
            <div class = "${results[idx].name} choice">
                <img src ="./images/icon-${results[idx].name}.svg" alt = "${results[idx].name}">
            </div>
        `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayResultsAdvanced(results) {
  resultDivs.forEach((resultsDiv, idx) => {
    setTimeout(() => {
      resultsDiv.innerHTML = `
            <div class = "${results[idx].name} choice">
                <img src ="./images/icon-${results[idx].name}.svg" alt = "${results[idx].name}">
            </div>
        `;
    }, idx * 1000);
  });

  gameDivAdvanced.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

//function to display winner
function displayWinnerAdvanced(results) {
  setTimeout(() => {
    const winner = isWinnerAdvanced(results);

    if (winner === true) {
      resultText.innerHTML = "you win";
      resultDivs[0].classList.toggle("winner");
      keepScores(1);
    } else if (winner === false) {
      resultText.innerHTML = "you lose";
      resultDivs[1].classList.toggle("winner");
      keepScores(-1);
    } else {
      resultText.innerHTML = "draw";
    }

    resultWinner.classList.remove("hidden");
    resultsDiv.classList.add("show-winner");
  }, 1000);
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerHTML = "you win";
      resultDivs[0].classList.toggle("winner");
      keepScores(1);
    } else if (aiWins) {
      resultText.innerHTML = "you lose";
      resultDivs[1].classList.toggle("winner");
      keepScores(-1);
    } else {
      resultText.innerHTML = "draw";
    }

    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

//function to check winner
function isWinnerAdvanced(results) {
  const userChoice = results[0];
  const aiChoice = results[1];

  if (userChoice.name === aiChoice.name) {
    return "draw";
  }
  return (
    userChoice.beats[0] === aiChoice.name ||
    userChoice.beats[1] === aiChoice.name
  );
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScores(point) {
  score += point;
  scoreNum.innerText = score;
}

function resetScores() {
  score = 0;
  scoreNum.innerText = score;
}

btnPlayAgain.addEventListener("click", () => {
  if (!isAdvancedMode) {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");

    resultDivs.forEach((resultsDiv) => {
      resultsDiv.innerHTML = "";
      resultsDiv.classList.remove("winner");
    });

    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }else if (isAdvancedMode){
    gameDivAdvanced.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
    resultDivs.forEach((resultsDiv) => {
      resultsDiv.innerHTML = "";
      resultsDiv.classList.remove("winner");
    });

    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }
});

btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
  footerS.classList.toggle("show-footer");
});

btnAdvanced.addEventListener("click", () => {
  resetScores();

  isAdvancedMode = !isAdvancedMode;

  logoAd.classList.toggle("hidden");
  logoNormal.classList.toggle("hidden");
  rulesImage.classList.toggle("hidden");
  rulesImageBonus.classList.toggle("hidden");

  resultDivs.forEach((resultsDiv) => {
    resultsDiv.innerHTML = "";
    resultsDiv.classList.remove("winner");
  });

  if (isAdvancedMode) {
    btnAdvanced.innerText = "Normal";

<<<<<<< HEAD
    gameDiv.classList.add("hidden");
    gameDivAdvanced.classList.remove("hidden");
    resultsDiv.classList.remove("show-winner");
    resultsDiv.classList.add("hidden");
    resultWinner.classList.add("hidden");
  } else {
    btnAdvanced.innerText = "Advanced";

    gameDiv.classList.remove("hidden");
    gameDivAdvanced.classList.add("hidden");
    resultsDiv.classList.remove("show-winner");
    resultsDiv.classList.add("hidden");
    resultWinner.classList.add("hidden");
  }
=======
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
  footerS.classList.toggle("show-footer");
>>>>>>> 4e96a1040dec198de93f2dcb558073d116570277
});

btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
  footerS.classList.toggle("show-footer");
});
