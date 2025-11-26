let display = document.getElementById('display');

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
    } catch {
        display.value = 'Ошибка';
    }
}
