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
