var op = "";
var x = "";
var y = "";
var lastTyped = "";
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
        result = result.toFixed(1);
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
    lastTyped = event.target.textContent;
    y = value;
    value = `${operate(x, y, op)}`;
    if (value.length > 8) {
        displayValue = parseInt(value).toExponential(2);
        exp = true;
    } else {
        displayValue = addCommas(value);
    }
    screen.innerText = displayValue;
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
var value = ""; // without commas
const screen = document.querySelector("#calc-display");
function populateDisplay(event) {
    if (lastTyped === "=") {
        x = displayValue;
        clearAll();
    }
    lastTyped = event.target.textContent;
    if (displayValue.length > 8) {
        return;
    }
    value += event.target.textContent;
    displayValue = addCommas(value);
    screen.innerText = displayValue;
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
    if (exp) {
        clearAll();
        exp = false;
    }
    if (typeof x === "number") {
        x = `${x}`;
    }
    if (x.length > 0 && y.length == 0) {
        y = value;
    }
    if (x.length > 0 && y.length > 0) {
        value = `${operate(x, y, op)}`;
        displayValue = addCommas(value);
        screen.innerText = displayValue;
        x = value;
        y = "";
        op = "";
    }
    lastTyped = event.target.textContent;
    op = event.target.textContent;
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
    value = "";
    x = "";
    y = "";
    op = "";
    screen.innerText = "";
}