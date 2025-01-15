// HTML Variables

let displayValue = "";
let num1 = "";
let num2 = "";
let operator = "";

const unicodes = {
    divide: "0x00F7", 
    multiply: "0x00D7", 
    add: "0x002B", 
    subtract: "0x2212"
}

const display = document.querySelector("#calc-display");
const prevDisplay = document.querySelector("#calc-previous");

const warning = document.querySelector("#warning");

const btnsNumber = [...document.querySelectorAll("button.number")];
const btnClear = document.querySelector("button#clear");
const btnDelete = document.querySelector("button#delete");
// const btnDiv = document.querySelector("button#divide");
// const btnMult = document.querySelector("button#multiply");
// const btnSub = document.querySelector("button#subtract");
// const btnAdd = document.querySelector("button#add");
const btnEquals = document.querySelector("button#equals");
const btnsOperator = [...document.querySelectorAll("button.operator")];

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
    
    if (!isFinite(displayValue)) {
        showWarning(false, "Oh, trying to divide by zero, are we?");
    } else if (displayValue == null) {
        showWarning(false, "Please enter a valid number first.");
    } else {
        updatePrevDisplay(num1, operator, num2);
        updateDisplay();
        console.log(displayValue);
    }
}

// Event Listeners

for (let index = 0; index < btnsNumber.length; index++) {
    btnsNumber[index].addEventListener("click", function() {
        if (String(operator).length === 0) {
            num1 += String(btnsNumber[index].textContent);
        }
        else {
            num2 += String(btnsNumber[index].textContent);
        }

        // displayValue += String(btnsNumber[index].textContent);
        updateDisplay();
    });
}

for (let index = 0; index < btnsOperator.length; index++) {
    btnsOperator[index].addEventListener("click", function() {
        if (operator.length === 0) {
            operator = btnsOperator[index].id;
            updateDisplay();
        }
    });
}

// btnDiv.addEventListener("click", function() {
//     operator = "divide";
//     updateDisplay();
//     // if another operator is already there, calculate and add next to result
// });

// for (let index = 0; index < btnsOperator.length; index++) {
//     btnsOperator[index].addEventListener("click", function() {
//         if (displayValue == undefined) {
//             if (btnsOperator[index].textContent == "−") {
//                 displayValue += "-";
//             } else {
//                 showWarning(false, "Please choose a number first.");
//             }
//         } else if (splitDisplayString[1] != null) {
//             console.log("alert");
//             let [num1, operator, num2] = splitDisplayString();
//             operate(num1, operator, num2);
//             displayValue += String(btnsOperator[index].textContent);
//         }
//         else {
//             displayValue += String(btnsOperator[index].textContent);
//         }

//         updateDisplay();

//     });
// }

btnClear.addEventListener("click", function() {
    showWarning(true);
    display.textContent = prevDisplay.textContent = displayValue = "";
});

btnDelete.addEventListener("click", function() {
    console.log(displayValue);
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
});

btnEquals.addEventListener("click", function() {
    let [num1, operator, num2] = splitDisplayString();
    operate(num1, operator, num2);
});

// Display Updates

function splitDisplayString() {
    try {
        return [num1, operator, num2] = (displayValue.split(/([^\d\w\s\-\.])/));
    } catch (error) {
        showWarning(false, "Please submit a valid term.");
        return null;
    }
}

function updateDisplay() {
    operator.length === 0 ? display.textContent = num1 : 
        display.textContent = num1 + String.fromCharCode(unicodes[operator]) + num2;
}

function updatePrevDisplay(value1, operator, value2) {
    prevDisplay.querySelector(".number1").textContent = String(value1);
    prevDisplay.querySelector(".operator").textContent = operator;
    prevDisplay.querySelector(".number2").textContent = String(value2);
}

// btnEquals.addEventListener("click", equalsPressed, false);

// Assisting Functions

function showWarning(remove = false, text = "") {
    warning.classList.toggle("hidden", remove);
    warning.textContent = text;
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