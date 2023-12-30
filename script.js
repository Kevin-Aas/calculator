// Variables for first number, operator and second number:
let num1;
let num2;
let operator;

let display_val = 0;

// Basic math operations:
function add(a, b) {
    return a+b;
};
function subtract(a, b) {
    return a-b;
};
function multiply(a, b) {
    return a*b;
};
function divide(a, b) {
    return a/b;
};

// Operation function:
function operate(num1, num2, operator) {
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
    }
};

// Add listeners to the number buttons
let numbers = document.querySelectorAll(".num");
numbers.forEach(function (btn) {
    btn.addEventListener('click', (e) => {
        if (display_val === 0) {
            display_val = e.target.textContent;
        }
        else {
            display_val = display_val + e.target.textContent;
        }
        updateDisplay(display_val);
    });
});

// Add listeners to the operation buttons
let operations = document.querySelectorAll(".operation");
operations.forEach(function (btn) {
    btn.addEventListener('click', (e) => {
        if (num1 == null) {
            num1 = display_val;
            operator = e.target.textContent;
            display_val = display_val + operator;
            updateDisplay(display_val);
        }
        else {
            let values = display_val.split('+').join(',').split('-').join(',').split('*').join(',').split('/').join(',').split(',');
            num2 = values[1];
            display_val = operate(parseInt(num1), parseInt(num2), operator);
            num1 = display_val;
            new_operator = e.target.textContent;
            display_val = display_val + operator;
            updateDisplay(display_val);
        }
    });
});

// Add equals listener
let equals = document.querySelector("#equals");
equals.addEventListener('click', (e) => {
    let values = display_val.split('+').join(',').split('-').join(',').split('*').join(',').split('/').join(',').split(',');
    num2 = values[1];
    display_val = operate(parseInt(num1), parseInt(num2), operator);
    updateDisplay(display_val);
    reset();
});

// Add clear listener
let clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    updateDisplay(0);
    reset();
});

function updateDisplay (value) {
    let display = document.querySelector(".display");
    display.textContent = value;
};

function reset () {
    num1 = null;
    num2 = null;
    operator = null;
    display_val = 0;
}