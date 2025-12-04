// Чистая бизнес-логика калькулятора (тестируемая часть)

let lastResult = '';

/**
 * Вычисляет квадрат числа
 * @param {string|number} value - входное значение
 * @returns {string} результат или 'Ошибка'
 */
function calculateSquare(value) {
    try {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            const result = Math.pow(numValue, 2);
            lastResult = String(result);
            return lastResult;
        } else {
            return 'Ошибка';
        }
    } catch {
        return 'Ошибка';
    }
}

/**
 * Вычисляет куб числа
 * @param {string|number} value - входное значение
 * @returns {string} результат или 'Ошибка'
 */
function calculateCube(value) {
    try {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            const result = Math.pow(numValue, 3);
            lastResult = String(result);
            return lastResult;
        } else {
            return 'Ошибка';
        }
    } catch {
        return 'Ошибка';
    }
}

/**
 * Округляет число до ближайшего целого
 * @param {string|number} value - входное значение
 * @returns {string} результат или 'Ошибка'
 */
function calculateRound(value) {
    try {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            return 'Ошибка';
        }

        const lower = Math.floor(numValue);
        const upper = Math.ceil(numValue);
        const fractional = numValue - lower;

        const result = fractional >= 0.5 ? upper : lower;
        lastResult = String(result);
        return lastResult;
    } catch {
        return 'Ошибка';
    }
}

/**
 * Вычисляет математическое выражение
 * @param {string} expression - строка с выражением
 * @returns {string} результат или 'Ошибка'
 */
function calculateExpression(expression) {
    try {
        let processedExpression = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(');

        const result = eval(processedExpression);
        // Проверяем, что результат - валидное число (включая Infinity)
        if (typeof result === 'number' && !isNaN(result)) {
            lastResult = String(result);
            return lastResult;
        } else {
            return 'Ошибка';
        }
    } catch {
        return 'Ошибка';
    }
}

/**
 * Получает последний сохраненный результат
 * @returns {string} последний результат или пустая строка
 */
function getLastResult() {
    return lastResult;
}

/**
 * Сбрасывает последний результат
 */
function resetLastResult() {
    lastResult = '';
}

// Экспорт для Node.js (для тестов)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateSquare,
        calculateCube,
        calculateRound,
        calculateExpression,
        getLastResult,
        resetLastResult
    };
}

