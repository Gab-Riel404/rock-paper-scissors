const btnRules = document.querySelector(".btn-rules");
const btnClose = document.querySelector(".btn-close");
const modalRules = document.querySelector(".modal");
const footerS = document.querySelector("footer");

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

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results_result");

const resultWinner = document.querySelector(".results_winner");
const resultText = document.querySelector(".results_text");

const btnPlayAgain = document.querySelector(".play_again");

const scoreNum = document.querySelector(".score_number");
let score = 0;

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name == choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
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

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScores(point){
    score += point;
    scoreNum.innerText = score;
}

btnPlayAgain.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultsDiv) => {
    resultsDiv.innerHTML = "";
    resultsDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
  footerS.classList.toggle("show-footer");
});

btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
  footerS.classList.toggle("show-footer");
});
