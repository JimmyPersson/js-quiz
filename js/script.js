const main = document.createElement("main");
const upperbox = document.createElement("div");
upperbox.className = "upperbox";
const startbutton = document.createElement("button");
const optionsbox = document.createElement("div");
optionsbox.className = "optionsbox";
const answerlist = document.createElement("div");
answerlist.className = "answerlist";
const answer = document.createElement("div");
answer.className = "answer";
const answer2 = document.createElement("div");
answer2.className = "answer";
const answer3 = document.createElement("div");
answer3.className = "answer";
const answer4 = document.createElement("div");
answer4.className = "answer";
const optionContainer = document.createElement("div");
optionContainer.className = "option";
const lightAndDark = document.createElement("button");
lightAndDark.className = "lod";
lightAndDark.innerHTML = "&#9788";
lightAndDark.addEventListener("click", themeSwitch);
const category = document.createElement("select");
const difficulty = document.createElement("select");
const trueOrFalse = document.createElement("select");
const numberOfQuest = document.createElement("select");
const alertBox = document.createElement("p");
alertBox.className = "alert";
const restart = document.createElement("button");
restart.innerText = "Play again!";

const categoriesArr = [
  "General",
  "Books",
  "Film",
  "Music",
  "Computers",
  "Video games",
  "Animals",
];
const categoriesValArr = ["9", "10", "11", "12", "18", "15", "27"];
const difficultyArr = ["Easy", "Medium", "Hard"];
const difficultyValArr = ["easy", "medium", "hard"];
const numberOfQuestArr = ["5", "10", "20"];
const typeArr = ["Multiple choice", "True or false"];
const typeValArr = ["multiple", "boolean"];

let answerButtons = [answer, answer2, answer3, answer4];
let answerArray = [];
let gameArr = [];

let quest;
let questionIndex = 0;
let score = 0;
let cat;
let dif;
let num;
let typ;
let count = 0;
let round = 0;
let getData = async (url) => {

    let parameters = {
        amount: num,
        category: cat,
        difficulty: dif,
        type: typ
    }

    let response = await axios.get(url, {
        params: parameters
    });
    return response.data
}

let renderActivity = async () => {
    let activityObj = await getData("https://opentdb.com/api.php?");
    gameArr = activityObj.results;
    quest = gameArr[questionIndex];
    console.log(quest);
    if (typ === "boolean") {
        if (round === 0) {
          for (let i = 0; i < answerButtons.length; i++) {
            answerButtons[i].addEventListener("click", (e) => answerFunction(e));
          }
          trueOrFalseGame();
        } else {
          trueOrFalseGame();
        }
      } else {
        if (round === 0) {
          for (let i = 0; i < answerButtons.length; i++) {
            answerButtons[i].addEventListener("click", (e) => {
              answerFunction(e);
            });
          }
          multiGame();
        } else {
          multiGame();
        }
      }
}


//Startpage with menus.
function startscreen() {
  if (round === 0) {
    main.appendChild(lightAndDark);
    upperbox.innerHTML = "<span>you're such a</span><br><h1>Know-it-all</h1>";

    startbutton.innerText = " Start ";

    document.body.appendChild(main);
    main.append(upperbox, optionContainer);
    upperbox.append(startbutton, alertBox);
    const op1 = (document.createElement("label").innertext =
      "Choose category:");
    const op2 = (document.createElement("label").innertext =
      "Choose difficulty level:");
    const op3 = (document.createElement("label").innertext =
      "Choose game type:");
    const op4 = (document.createElement("label").innertext =
      "Choose number of questions:");
    optionContainer.append(optionsbox);
    optionsbox.append(
      op1,
      category,
      op2,
      difficulty,
      op3,
      trueOrFalse,
      op4,
      numberOfQuest
    );

    for (let i = 0; i < categoriesArr.length; i++) {
      let option = document.createElement("option");
      option.value = categoriesValArr[i];
      option.text = categoriesArr[i];
      category.appendChild(option);
    }
    for (let i = 0; i < difficultyArr.length; i++) {
      let option = document.createElement("option");
      option.value = difficultyValArr[i];
      option.text = difficultyArr[i];
      difficulty.appendChild(option);
    }
    for (let i = 0; i < numberOfQuestArr.length; i++) {
      let option = document.createElement("option");
      option.value = numberOfQuestArr[i];
      option.text = numberOfQuestArr[i];
      numberOfQuest.appendChild(option);
    }
    for (let i = 0; i < typeArr.length; i++) {
      let option = document.createElement("option");
      option.value = typeValArr[i];
      option.text = typeArr[i];
      trueOrFalse.appendChild(option);
    }

    startbutton.addEventListener("click", () => {
      cat = category.value;
      dif = difficulty.value;
      num = numberOfQuest.value;
      typ = trueOrFalse.value;
      console.log(cat, dif, num, typ);
      startGame();
    });
  } else {
    main.append(upperbox, optionContainer);
  }
}

//Function to clean the slate before publishing the questions and answers. Also removes two divs if the player chooses trueorfalse.
function startGame() {
  upperbox.innerHTML = "";
  main.removeChild(optionContainer);
  main.appendChild(answerlist);
  if (typ === "boolean") {
    upperbox.appendChild(alertBox);
    answerlist.append(answer, answer2);
    renderActivity();
  } else {
    answerlist.append(answer, answer2, answer3, answer4);
    upperbox.appendChild(alertBox);
    renderActivity();
  }
}

//Function to shuffle the answer array so that the answers are placed randomly on the answerdivs.
function answerShuffle() {
  let one = quest.correct_answer;
  let two = quest.incorrect_answers[0];
  let three = quest.incorrect_answers[1];
  let four = quest.incorrect_answers[2];
  answerArray = [one, two, three, four];
  shuffle(answerArray);
}

//Function to handle the multiple answer part of the game.
function multiGame() {
  if (questionIndex < gameArr.length) {
    quest = gameArr[questionIndex];
    answerShuffle();
    alertBox.innerText = "";
    upperbox.innerHTML = `<h3> ${quest.question} <h3>`;
    upperbox.appendChild(alertBox);
    answer.innerHTML = answerArray[0];
    answer2.innerHTML = answerArray[1];
    answer3.innerHTML = answerArray[2];
    answer4.innerHTML = answerArray[3];
  } else {
    endGameCalc();
  }
}

//Function to start the true-or-false-game.
function trueOrFalseGame() {
  answer.innerText = "True";
  answer2.innerText = "False";
  quest = gameArr[questionIndex];

  if (questionIndex < gameArr.length) {
    alertBox.innerText = "";
    upperbox.innerHTML = `<h3> ${quest.question} <h3>`;
    upperbox.appendChild(alertBox);
  } else {
    endGameCalc();
  }
}

// Function to reset all values for another round.
function reset() {
  alertBox.innerText = "";
  count = 0;
  questionIndex = 0;
  score = 0;
  answerlist.remove();
  round++;
}

//Shuffle function to be able to shift around values in an array.
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

//Endgame function to calculate the score and present it accordingly.
function endGameCalc() {
  upperbox.innerText = "";
  answerlist.innerHTML = "";
  upperbox.appendChild(alertBox);
  restart.addEventListener("click", () => {
    reset();
    startscreen();
    upperbox.removeChild(restart);
    upperbox.innerHTML = "<span>you're such a</span><br><h1>Know-it-all</h1>";
    upperbox.appendChild(startbutton);
    alertBox.className = "";
  });
  upperbox.appendChild(restart);
  if (score / num > 0.75) {
    alertBox.className = "great";
    alertBox.innerText =
      "Well done! Your score is: " + score + " out of " + num;
  } else if (score / num > 0.5) {
    alertBox.className = "good";
    alertBox.innerText =
      "You made it! Your score is: " + score + " out of " + num;
  } else {
    alertBox.className = "bad";
    alertBox.innerText = "Too bad! Your score is: " + score + " out of " + num;
  }
}

//Function for switching themes.
function themeSwitch() {
  let theme = document.getElementsByTagName("link")[0];
  if (theme.getAttribute("href") == "css/light.css") {
    theme.setAttribute("href", "css/dark.css");
    lightAndDark.innerHTML = "&#9788";
  } else {
    theme.setAttribute("href", "css/light.css");
    lightAndDark.innerHTML = "&#9790;";
  }
}

function answerFunction(event) {
  if (typ === "boolean") {
    if (quest.correct_answer === event.target.innerText) {
      score++;
      questionIndex++;
      alertBox.innerText = "Correct answer!";
      setTimeout(trueOrFalseGame, 800);
    } else {
      questionIndex++;
      alertBox.innerText = "Wrong answer!";
      setTimeout(trueOrFalseGame, 800);
    }
  } else {
    if (quest.correct_answer === event.target.innerText) {
      score++;
      questionIndex++;
      alertBox.innerText = "Correct answer!";
      setTimeout(multiGame, 800);
    } else {
      questionIndex++;
      alertBox.innerText = "Wrong answer!";
      setTimeout(multiGame, 800);
    }
  }
}

startscreen();
