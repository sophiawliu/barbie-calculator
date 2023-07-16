var op = "";
var x = "";
var y = "";
var lastTyped = "clear";
var exp = false;

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
    if (y === 0) {
        return "nope!";
    }
    return x / y;
}

function operate(x, y, op) {
    x = Number(x);
    y = Number(y);
    if (op === "+") {
        result = add(x, y);
    } else if (op === "-") {
        result = subtract(x, y);
    } else if (op === "×") {
        result = multiply(x, y);
    } else if (op === "÷") {
        result = divide(x, y);
    }
    if (typeof result == "number" && result % 1 != 0) {
        resultArr = `${result}`.split("");
        decimalPlaces = 7 - resultArr.indexOf(".");
        result = parseFloat(result.toFixed(decimalPlaces));
    }
    return result;
}

function addCommas(val) {
    if (val.length > 3 || val.length > 3 && val.length % 3 > 0) {
        val = `${Number(val).toLocaleString()}`;
    }
    return val;
}

const tracker = document.querySelector(".tracker");

// EQUALS
var equals = document.querySelector(".equals");
equals.addEventListener('click', evaluate);

function evaluate(event) {
    if (exp) {
        clearAll();
        return;
    }
    if (x.length == 0) {
        return;
    }
    lastTyped = event.target.textContent;
    y = value;
    value = `${operate(x, y, op)}`;
    if (value.length > 7 && !value.includes(".")) {
        displayValue = parseInt(value).toExponential(2);
        exp = true;
    } else {
        displayValue = addCommas(value);
    }
    screen.innerText = displayValue;
    operationDisplay += " " + "=";
    currOperation.innerText = operationDisplay;
    x = value;
    y = "";
    op = "";
}

// NUMBER
var numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
    number.addEventListener('click', populateDisplay);
});

var displayValue = "";
var operationDisplay = "";
var value = ""; // without commas
const screen = document.querySelector("#calc-display");
const currOperation = document.querySelector("#current-operation");
function populateDisplay(event) {
    if (lastTyped === "=") {
        x = displayValue;
        clearAll();
    }
    if (displayValue.length > 8) {
        return;
    }
    exp = false;
    value += event.target.textContent;
    displayValue = addCommas(value);
    if (lastTyped === "+" || lastTyped === "-" || lastTyped === "÷" || lastTyped === "×") { 
        operationDisplay += " " + displayValue; // first digit of y
    } else if (operationDisplay.includes("+") || operationDisplay.includes("-") || operationDisplay.includes("×") || operationDisplay.includes("÷")) { // rest of y
        strArr = operationDisplay.split(" ");
        operationDisplay = strArr[0] + " " + strArr[1] + " " + displayValue;
    } else { // restart operation
        operationDisplay = displayValue;
    }
    screen.innerText = displayValue;
    currOperation.innerText = operationDisplay;
    lastTyped = event.target.textContent;
}

// OPERATOR
var operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
    operator.addEventListener('click', assignOperator);
});
function assignOperator(event) {
    if (lastTyped === "clear" || lastTyped === "+" || lastTyped === "-" || lastTyped === "÷" || lastTyped === "×") {
        lastTyped = event.target.textContent;
        return;
    } 
    if (exp) {
        clearAll();
        return;
    }
    if (typeof x === "number") {
        x = `${x}`;
    }
    if (x.length > 0 && y.length == 0) { // operation on answer
        operationDisplay = displayValue;
        currOperation.innerText = operationDisplay;
        y = value;
    }
    if (x.length > 0 && y.length > 0) { // "2 + 2 +"
        value = `${operate(x, y, op)}`;
        displayValue = addCommas(value);
        if (parseInt(lastTyped)) {
            operationDisplay = displayValue;
        }
        screen.innerText = displayValue;
        x = value;
        y = "";
        op = "";
    }
    lastTyped = event.target.textContent;
    op = event.target.textContent;
    operationDisplay += ` ${event.target.textContent}`;
    currOperation.innerText = operationDisplay;
    x = value; // redundant?
    tempClear();
}

function tempClear() {
    displayValue = "";
    value = "";
}

// CLEAR
var clear = document.querySelector(".clear");
clear.addEventListener('click', clearAll);
function clearAll() {
    displayValue = "";
    operationDisplay = "";
    value = "";
    x = "";
    y = "";
    op = "";
    screen.innerText = "";
    currOperation.innerText = "";
    lastTyped = "clear";
}