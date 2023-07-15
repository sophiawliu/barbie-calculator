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
    } else if (result > 99999999) {
        result = result.toExponential(2);
        exp = true;
    }
    console.log(result);
    return result;
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
    if (exp) {
        console.log("OOPS")
        clearAll();
        exp = false;
    }
    if (typeof x === "number") {
        x = `${x}`;
    }
    console.log(y, y.length, x, typeof x)
    if (x.length > 0 && y.length == 0) {
        console.log("yello")
        y = displayValue;
    }
    if (x.length > 0 && y.length > 0) {
        console.log("we're here!")
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