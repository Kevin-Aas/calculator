// Variables for first number, operator and second number:
let num1;
let num2;
let operator;

let display_val;

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
        case '+': add(num1, num2);
        case '-': subtract(num1, num2);
        case '*': multiply(num1, num2);
        case '/': divide(num1, num2);
    }
};

//
let numbers = document.querySelectorAll(".num");
numbers.forEach(function (btn) {
    btn.addEventListener('click', (e) => {
        display_val = e.target.textContent;
        updateDisplay(display_val);
    });
});

function updateDisplay (value) {
    let display = document.querySelector(".display");
    display.textContent = value;
};