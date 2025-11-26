let display = document.getElementById('display');
let lastResult = '';

function addToDisplay(value) {
    display.value += value;
}

function addFunction(func) {
    display.value += func + '(';
}

function clearDisplay() {
    display.value = '';
}

function square() {
    try {
        let value = parseFloat(display.value);
        if (!isNaN(value)) {
            display.value = Math.pow(value, 2);
            lastResult = display.value;
        } else {
            display.value = 'Ошибка';
        }
    } catch {
        display.value = 'Ошибка';
    }
}

function cube() {
    try {
        let value = parseFloat(display.value);
        if (!isNaN(value)) {
            display.value = Math.pow(value, 3);
            lastResult = display.value;
        } else {
            display.value = 'Ошибка';
        }
    } catch {
        display.value = 'Ошибка';
    }
}

function calculate() {
    try {
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(');

        display.value = eval(expression);
        if (display.value !== 'Ошибка' && display.value !== '') {
            lastResult = display.value;
        }
    } catch {
        display.value = 'Ошибка';
    }
}

function recallLastResult() {
    if (lastResult !== '') {
        display.value = lastResult;
    }
}
