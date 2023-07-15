var op = "";
var x = "";
var y = "";
var lastTyped = "";

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, y, op) {
    x = Number(x);
    y = Number(y);
    if (op === "+") {
        return add(x, y);
    } else if (op === "-") {
        return subtract(x, y);
    } else if (op === "×") {
        return multiply(x, y);
    } else if (op === "÷") {
        return divide(x, y);
    }
}

const tracker = document.querySelector(".tracker");

// EQUALS
var equals = document.querySelector(".equals");
equals.addEventListener('click', evaluate);

function evaluate(event) {
    lastTyped = event.target.textContent;
    y = displayValue;
    displayValue = operate(x, y, op);
    screen.innerText = displayValue;
    x = displayValue;
    y = "";
    op = "";
    console.log("after equals", `x: ${x}`, `y: ${y}`, `op: ${op}`, `lastTyped: ${lastTyped}`);
}

// NUMBER
var numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
    number.addEventListener('click', populateDisplay);
});

var displayValue = "";
const screen = document.querySelector("#calc-display");
function populateDisplay(event) {
    if (lastTyped === "=") {
        x = displayValue;
        clearAll();
    }
    lastTyped = event.target.textContent;
    if (displayValue.length > 7) {
        return;
    }
    displayValue += event.target.textContent;
    screen.innerText = displayValue;
    console.log("after number", `x: ${x}`, `y: ${y}`, `op: ${op}`, `lastTyped: ${lastTyped}`);
}

// OPERATOR
var operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
    operator.addEventListener('click', assignOperator);
});
function assignOperator(event) {
    if (lastTyped === "+" || lastTyped === "-" || lastTyped === "÷" || lastTyped === "×") {
        return;
    }
    if (x.length > 0 && y.length == 0) {
        y = displayValue;
    }
    if (x.length > 0 && y.length > 0) {
        displayValue = operate(x, y, op);
        screen.innerText = displayValue;
        x = displayValue;
        y = "";
        op = "";
    }
    lastTyped = event.target.textContent;
    op = event.target.textContent;
    x = displayValue;
    tempClear();
    console.log("after operator", `x: ${x}`, `y: ${y}`, `op: ${op}`, `lastTyped: ${lastTyped}`);
}

function tempClear() {
    displayValue = "";
}

// CLEAR
var clear = document.querySelector(".clear");
clear.addEventListener('click', clearAll);
function clearAll() {
    displayValue = "";
    x = "";
    y = "";
    op = "";
    screen.innerText = "";
}