let display = document.getElementById('display');

function addToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        // Заменяем символы для корректного вычисления
        let expression = display.value.replace('×', '*').replace('÷', '/');
        display.value = eval(expression);
    } catch (error) {
        display.value = 'Ошибка';
    }
}