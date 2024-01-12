// Variables for first number, operator and second number:
let num1;
let num2;
let operator;

let display_val;
let answer;
let full = false;

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
    return Math.round(a/b * 1e9)/1e9;
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
        if (display_val == null) {
            if (e.target.textContent == '0') {
                // No starting zero
                return;
            }
            display_val = e.target.textContent;
        }
        else if (!full) {
            display_val = display_val + e.target.textContent;
        }
        updateDisplay(display_val);
    });
});

// Add listeners to the operation buttons
let operations = document.querySelectorAll(".operation");
operations.forEach(function (btn) {
    btn.addEventListener('click', (e) => {
        if (answer != null && display_val == null) {
            num1 = answer;
            operator = e.target.textContent;
            display_val = 'Ans' + operator;
            updateDisplay(display_val);
            answer = null;
            return;
        }
        if (display_val == null) {
            // do nothing if no number is set
            return;
        }
        if (num1 == null) {
            num1 = display_val;
            operator = e.target.textContent;
            display_val = display_val + operator;
            updateDisplay(display_val);
        }
        else {
            let values = display_val.split('+').join(',').split('-').join(',').split('*').join(',').split('/').join(',').split(',');
            num2 = values[1];
            if (isNaN(parseFloat(num2))) {
                // If a new operation is pressed before a new number
                operator = e.target.textContent;
                display_val = display_val.slice(0, -1) + operator;
                updateDisplay(display_val);
            }
            else {
                display_val = operate(parseFloat(num1), parseFloat(num2), operator);
                num1 = display_val;
                operator = e.target.textContent; // the new operator
                if (display_val.toString().length > 12) {
                    display_val = parseFloat(display_val).toExponential(2);
                }
                display_val = display_val + operator;
                updateDisplay(display_val);
            }
        }
        if (display_val.toString().length < 13) {
            full = false;
        }
        else {
            display_val = parseFloat(display_val).toExponential(2);
            updateDisplay(display_val);
        }
    });
});

// Add equals listener
let equals = document.querySelector("#equals");
equals.addEventListener('click', (e) => {
    if (num1 == null) {
        if (display_val == null) {
            if (answer != null) {
                updateDisplayAnswer(answer);
            }
        }
        else {
            updateDisplayAnswer(display_val);
            answer = display_val;
        }
        reset();
        return;
    }
    let values = display_val.split('+').join(',').split('-').join(',').split('*').join(',').split('/').join(',').split(',');
    num2 = values[1];
    display_val = operate(parseFloat(num1), parseFloat(num2), operator);
    // Round the final value
    if (display_val.toString().length < 12) {
        display_val = Math.round(display_val * 1e9)/1e9;
    }
    else {
        display_val = Math.round(display_val);
    }
    if (display_val.toString().length > 12) {
        display_val = parseFloat(display_val).toExponential(2);
    }
    // Updated display and answer
    updateDisplayAnswer(display_val);
    answer = display_val;
    reset();
});

// Add clear listener
let clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    updateDisplay(0);
    reset();
});

function updateDisplay (value) {
    if (value.toString().length > 10) {
        full = true;
    }
    let display = document.querySelector("#top_display_value");
    display.textContent = value;
    display.style.color = 'black';
};

function updateDisplayAnswer (value) {
    let display = document.querySelector("#top_display_value");
    display.textContent = value;
    display.style.color = 'gray';
}

function reset () {
    num1 = null;
    num2 = null;
    operator = null;
    display_val = null;
    full = false;
}

let buttons = document.querySelectorAll('button');
buttons.forEach(function(btn) {
    btn.addEventListener('mousedown', () => {
        btn.style.backgroundColor = '#d5d5d5';
    });
    btn.addEventListener('mouseup', () => {
        btn.style.backgroundColor = '';
    });
    btn.addEventListener('mouseout', () => {
        btn.style.backgroundColor = '';
    });
});