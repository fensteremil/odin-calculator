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
const btnEquals = document.querySelector("button#equals");
const btnsOperator = [...document.querySelectorAll("button.operator")];

// Basic Operation

const operations = {
    add: function(a, b) {
        return +a + +b;
    }, 
    subtract: function(a, b) {
        return a - b;
    }, 
    multiply: function(a, b) {
        return a * b;
    }, 
    divide: function(a, b) {
        return a / b;
    }
}

function operate(numA, op, numB, additionalOp = "") {
    if (numA.length === 0) {
        showWarning(true, "Please enter a number first.");
    } else if (operator.length === 0) {
        showWarning(true, "Please choose an operator first.");
    } else if (numB.length === 0) {
        showWarning(true, "Please enter a second number first.");
    } else {
        // only go here if all three parameters are given
        let result = operations[op](numA, numB);

        if (!isFinite(result)) {
            showWarning(true, "Oh, trying to divide by zero, are we?");
        } else if (result == null) {
            showWarning(true, "Please enter a valid number first.");
        } else {
            // store previous calculation and reset values
            updatePrevDisplay();
            num1 = Math.round(result * 100) / 100;
            num2 = "";

            // also check if an additional operator has already been chosen
            additionalOp.length != 0 ? operator = additionalOp : operator = "";
            updateDisplay();
}
    }
}

// Event Listeners

btnClear.addEventListener("click", function() {
    showWarning(false);

    resetVariables();
    resetDisplays();
});

btnDelete.addEventListener("click", function() {
    showWarning(false);

    if (num2.length != 0) {
        num2 = String(num2).slice(0, -1);
    } else if (operator.length != 0) {
        operator = "";
    } else {
        num1 = String(num1).slice(0, -1);
    }

    updateDisplay();
});

for (let index = 0; index < btnsNumber.length; index++) {
    btnsNumber[index].addEventListener("click", function() {
        if (String(operator).length === 0) {
            num1 += String(btnsNumber[index].textContent);
        }
        else {
            num2 += String(btnsNumber[index].textContent);
        }
        
        updateDisplay();
    });
}

for (let index = 0; index < btnsOperator.length; index++) {
    btnsOperator[index].addEventListener("click", function () {
        if (operator.length === 0) {
            if (num1.length === 0 && btnsOperator[index].id === "subtract") {
                // add a minus in front of the first number in case it is negative
                num1 += "-";
            } else if (num1 === "-") {
                // remove if user tries to add two minuses
                num1 = "";
            } else {
                operator = btnsOperator[index].id;
            }
            updateDisplay();
        } else if (num2.length === 0) {
            if (operator.length != 0 && btnsOperator[index].id === "subtract") {
                // invert operator in case the second number is negative
                if (operator === "subtract") {
                    operator = "add";
                } else if (operator === "add") {
                    operator = "subtract";
                } else {
                    num2 += "-";
                }
                updateDisplay();
            } else {
                showWarning(true, "Please only use one operator at a time.");
            }
        } else if (num2 === "-") {
            // remove if user tries to add two minuses
            num2 = "";
            updateDisplay();
        } else {
            operate(num1, operator, num2, btnsOperator[index].id);
        }
    });
}

btnEquals.addEventListener("click", function() {
    operate(num1, operator, num2);
});

// Display Updates

function updateDisplay() {
    showWarning(false);

    if (operator.length === 0) {
        display.innerHTML = num1;
    } else {
        display.innerHTML = num1 + `<span class="operator">${String.fromCharCode(unicodes[operator])}</span>` + num2;
    }
}

function updatePrevDisplay() {
    prevDisplay.innerHTML = num1 + `<span class="operator">${String.fromCharCode(unicodes[operator])}</span>` + num2;
}

// Assisting Functions

function resetVariables() {
    num1 = num2 = operator = "";
}

function resetDisplays() {
    display.innerHTML = prevDisplay.innerHTML = "";
}

function showWarning(showWarning, text = "") {
    warning.classList.toggle("hidden", !showWarning);
    warning.textContent = text;
}