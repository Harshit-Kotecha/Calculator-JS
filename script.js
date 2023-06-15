const output = document.querySelector(".output");
const calcContainer = document.querySelector(".container");
const maxAcceptedDigits = 8;

let first = 0;
let second = 0;
let op = "";
let equalAgain = false;
let savedResult = 0;
let savedOp = "";
let savedSecond = 0;
let dmyVal = "";

const displayOutput = function (arg) {
  if (arg.toString().length > 12) arg = "NaN";
  output.textContent = `${arg}`;
};
const init = function () {
  first = second = 0;
  op = "";
  equalAgain = false;
  savedOp = "";
  savedResult = savedSecond = 0;
  dmyVal = "";
  displayOutput(0);
};

document.addEventListener("keydown", function (e) {
  const key = e.key;
  console.log(key);

  if (/^[0-9]+$/.test(key)) {
    dmyVal += key;
    displayOutput(Number(dmyVal));
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    first = Number(dmyVal);

    op = key;
    dmyVal = "";
  } else if (key === "=" || key === "Enter") {
    // const result = eval(`first key dmyVal`);
    if (op === "+") {
      first = first + Number(dmyVal);
    } else if (op === "-") {
      first = first - Number(dmyVal);
    } else if (op === "*") {
      first = first * Number(dmyVal);
    } else {
      first = first / Number(dmyVal);
    }
    // console.log(result);
    displayOutput(first);
    first = dmyVal = "";
    op = "";
  } else if (key === "Backspace") {
    dmyVal = dmyVal.slice(0, dmyVal.length - 1);
    displayOutput(Number(dmyVal));
  }
});

calcContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("btn")) return;

  const clicked = e.target;
  //   console.log(clicked);

  if (equalAgain && clicked.classList.contains("calculate")) {
    op = savedOp;
    first = savedResult;
    second = savedSecond;
  } else if (!clicked.classList.contains("calculate")) {
    equalAgain = false;
  }

  document
    .querySelectorAll(".operation")
    .forEach((op) => op.classList.remove("active"));

  // Number
  if (clicked.classList.contains("number")) {
    // 1. If first === 0
    if (op.length === 0) {
      if (String(first).length > maxAcceptedDigits) return;
      if (first === 0) {
        first = Number(clicked.textContent);
      } else {
        first = first * 10 + Number(clicked.textContent);
      }
      displayOutput(first);
      // 2. else
    } else {
      if (String(second).length > maxAcceptedDigits) return;
      if (second === 0) {
        second = Number(clicked.textContent);
      } else {
        second = second * 10 + Number(clicked.textContent);
      }
      displayOutput(second);
    }
  } else if (clicked.classList.contains("operation")) {
    clicked.classList.add("active");
    op = clicked.textContent;
  } else if (clicked.classList.contains("calculate")) {
    if (op.length === 0) {
      displayOutput(first);
      return;
    } else if (second === 0 && op === "/") {
      console.log("div by 0", second === 0 && op === "/");
      displayOutput("NaN");
      first = second = 0;
      op = "";
      //   init();
      return;
    } else if (op === "+") {
      first = first + second;
    } else if (op === "-") {
      first = first - second;
    } else if (op === "*") {
      first = first * second;
    } else {
      first = first / second;
    }
    displayOutput(first);
    console.log(first);
    equalAgain = true;
    savedOp = op;
    savedResult = first;
    savedSecond = second;
    op = "";
    first = 0;
    second = 0;
  } else if (clicked.classList.contains("ac")) {
    init();
  } else if (clicked.classList.contains("plus-minus")) {
    first *= -1;
    displayOutput(first);
  } else if (clicked.classList.contains("percent")) {
    first /= 100;
    displayOutput(first);
  }
});
