// Basic Operations

function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return Math.round(((a / b) * 100)) / 100;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case "÷":
            displayValue = divide(num1, num2);
            break;
        case "×":
            displayValue = multiply(num1, num2);
            break;
        case "−":
            displayValue = subtract(num1, num2);
            break;
        case "+":
            displayValue = add(num1, num2);
            break;
        default:
            showWarning(false, "Please select an operator.");
            // clear everything?
            break;
    }
    
    if (isFinite(displayValue) && displayValue != null) {
        updateDisplay();
        updatePrevDisplay(num1, operator, num2);
    } else {
        console.log(displayValue);
    }
}

// HTML Variables

let displayValue = "";
const display = document.querySelector("#calc-display");
const prevDisplay = document.querySelector("#calc-previous");
const warningPara = document.querySelector("#warning");
const btnClear = document.querySelector("button.clear");
const btnDelete = document.querySelector("button.delete");
const btnEquals = document.querySelector("button.equals");
const btnsNumber = [...document.querySelectorAll("button.number")];
const btnsOperator = [...document.querySelectorAll("button.operator")];

// Event Listeners

for (let index = 0; index < btnsNumber.length; index++) {
    btnsNumber[index].addEventListener("click", (e) => {
        displayValue += String(btnsNumber[index].textContent);
        updateDisplay();
    }, false);
}

for (let index = 0; index < btnsOperator.length; index++) {
    btnsOperator[index].addEventListener("click", (e) => {
        if (displayValue == "") {
            if (btnsOperator[index].textContent == "−") {
                displayValue += "-";
            } else {
                showWarning(false, "Please choose a number first.");
            }
        } else if (splitDisplayString[1] != null) {
            console.log("alert");
            let [num1, operator, num2] = splitDisplayString();
            operate(num1, operator, num2);
            displayValue += String(btnsOperator[index].textContent);
        }
        else {
            displayValue += String(btnsOperator[index].textContent);
        }

        updateDisplay();

    }, false);
}

btnClear.addEventListener("click", () => {
    showWarning(true);
    display.textContent = prevDisplay.textContent = displayValue = "";
}, false);

btnEquals.addEventListener("click", () => {
    let [num1, operator, num2] = splitDisplayString();
    operate(num1, operator, num2);
}, false);

// Display Updates

function splitDisplayString() {
    return [num1, operator, num2] = (displayValue.split(/([^\d\w\s\-\.])/));
}

function updateDisplay() {
    display.textContent = displayValue;
}

function updatePrevDisplay(value1, operator, value2) {
    prevDisplay.querySelector(".number1").textContent = String(value1);
    prevDisplay.querySelector(".operator").textContent = operator;
    prevDisplay.querySelector(".number2").textContent = String(value2);
}

// btnEquals.addEventListener("click", equalsPressed, false);

// Assisting Functions

function showWarning(remove = false, text = "") {
    warningPara.classList.toggle("hidden", remove);
    warningPara.textContent = text;
}

// function updateDisplay() {
//     display.textContent = displayValue;
// }

// function equalsPressed() {

//     // try {
//     const [num1, operator, num2] = String(displayValue).split(/([+\-\*/])+/g);
//     console.log(num2 == undefined || num2 == NaN);
//     console.log(num2);
// // }
// // catch (error) {
// //     alert(error);
// // }
// prevDisplay.textContent = displayValue;
// displayValue = operate(operator, +num1, +num2);
// updateDisplay();
// }

// press number, add to display string
// until operator is pressed
// then first number and operator get saved
// if another number gets added, add this to display string

// number or operator or clear or . input
// display update
// DONE

// equals input
// success or error
// do have at least 3 components
// do not divide by zero
// else show warning