// Импорт бизнес-логики из calculator.js
// В браузере функции будут доступны глобально через script тег
let display = document.getElementById('display');

// Используем функции из calculator.js (если доступны в глобальной области)
// Для браузера создадим обертки, которые работают с DOM

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
    const result = calculateSquare(display.value);
    display.value = result;
}

function cube() {
    const result = calculateCube(display.value);
    display.value = result;
}

function roundResult() {
    const result = calculateRound(display.value);
    display.value = result;
}

function calculate() {
    const result = calculateExpression(display.value);
    display.value = result;
}

function recallLastResult() {
    const result = getLastResult();
    if (result !== '') {
        display.value = result;
    }
}
