// Юнит-тесты для калькулятора
const {
    calculateSquare,
    calculateCube,
    calculateRound,
    calculateExpression,
    getLastResult,
    resetLastResult
} = require('./calculator.js');

// Сброс состояния перед каждым тестом
beforeEach(() => {
    resetLastResult();
});

describe('calculateSquare', () => {
    test('должен вычислять квадрат положительного числа', () => {
        expect(calculateSquare('5')).toBe('25');
        expect(calculateSquare(5)).toBe('25');
    });

    test('должен вычислять квадрат отрицательного числа', () => {
        expect(calculateSquare('-3')).toBe('9');
        expect(calculateSquare(-3)).toBe('9');
    });

    test('должен вычислять квадрат десятичного числа', () => {
        expect(calculateSquare('2.5')).toBe('6.25');
        expect(calculateSquare(2.5)).toBe('6.25');
    });

    test('должен возвращать ошибку для невалидного ввода', () => {
        expect(calculateSquare('abc')).toBe('Ошибка');
        expect(calculateSquare('')).toBe('Ошибка');
        expect(calculateSquare('12abc')).toBe('Ошибка');
    });

    test('должен сохранять результат в lastResult', () => {
        calculateSquare('4');
        expect(getLastResult()).toBe('16');
    });
});

describe('calculateCube', () => {
    test('должен вычислять куб положительного числа', () => {
        expect(calculateCube('3')).toBe('27');
        expect(calculateCube(3)).toBe('27');
    });

    test('должен вычислять куб отрицательного числа', () => {
        expect(calculateCube('-2')).toBe('-8');
        expect(calculateCube(-2)).toBe('-8');
    });

    test('должен вычислять куб десятичного числа', () => {
        expect(calculateCube('2.5')).toBe('15.625');
    });

    test('должен возвращать ошибку для невалидного ввода', () => {
        expect(calculateCube('xyz')).toBe('Ошибка');
        expect(calculateCube('')).toBe('Ошибка');
    });

    test('должен сохранять результат в lastResult', () => {
        calculateCube('2');
        expect(getLastResult()).toBe('8');
    });
});

describe('calculateRound', () => {
    test('должен округлять вверх при дробной части >= 0.5', () => {
        expect(calculateRound('2.5')).toBe('3');
        expect(calculateRound('2.7')).toBe('3');
        expect(calculateRound('2.6')).toBe('3');
    });

    test('должен округлять вниз при дробной части < 0.5', () => {
        expect(calculateRound('2.4')).toBe('2');
        expect(calculateRound('2.1')).toBe('2');
        expect(calculateRound('2.49')).toBe('2');
    });

    test('должен корректно обрабатывать целые числа', () => {
        expect(calculateRound('5')).toBe('5');
        expect(calculateRound('0')).toBe('0');
    });

    test('должен корректно обрабатывать отрицательные числа', () => {
        expect(calculateRound('-2.5')).toBe('-2');
        expect(calculateRound('-2.7')).toBe('-3');
    });

    test('должен возвращать ошибку для невалидного ввода', () => {
        expect(calculateRound('abc')).toBe('Ошибка');
        expect(calculateRound('')).toBe('Ошибка');
    });

    test('должен сохранять результат в lastResult', () => {
        calculateRound('3.7');
        expect(getLastResult()).toBe('4');
    });
});

describe('calculateExpression', () => {
    test('должен вычислять простые арифметические операции', () => {
        expect(calculateExpression('2 + 3')).toBe('5');
        expect(calculateExpression('10 - 4')).toBe('6');
        expect(calculateExpression('3 * 4')).toBe('12');
        expect(calculateExpression('15 / 3')).toBe('5');
    });

    test('должен обрабатывать символы × и ÷', () => {
        expect(calculateExpression('3 × 4')).toBe('12');
        expect(calculateExpression('15 ÷ 3')).toBe('5');
    });

    test('должен вычислять сложные выражения', () => {
        expect(calculateExpression('2 + 3 * 4')).toBe('14');
        expect(calculateExpression('(2 + 3) * 4')).toBe('20');
    });

    test('должен вычислять тригонометрические функции', () => {
        // sin(0) = 0
        expect(parseFloat(calculateExpression('sin(0)'))).toBeCloseTo(0, 5);
        // cos(0) = 1
        expect(parseFloat(calculateExpression('cos(0)'))).toBeCloseTo(1, 5);
        // tan(0) = 0
        expect(parseFloat(calculateExpression('tan(0)'))).toBeCloseTo(0, 5);
    });

    test('должен вычислять комбинированные выражения', () => {
        expect(calculateExpression('2 + sin(0)')).toBe('2');
        expect(calculateExpression('cos(0) * 5')).toBe('5');
    });

    test('должен возвращать ошибку для невалидных выражений', () => {
        expect(calculateExpression('2 +')).toBe('Ошибка');
        expect(calculateExpression('abc')).toBe('Ошибка');
    });

    test('должен обрабатывать деление на ноль', () => {
        const result = calculateExpression('2 / 0');
        expect(result).toBe('Infinity');
    });

    test('должен сохранять результат в lastResult', () => {
        calculateExpression('2 + 2');
        expect(getLastResult()).toBe('4');
    });
});

describe('getLastResult и resetLastResult', () => {
    test('должен возвращать пустую строку при отсутствии результата', () => {
        resetLastResult();
        expect(getLastResult()).toBe('');
    });

    test('должен сохранять и возвращать последний результат', () => {
        calculateSquare('5');
        expect(getLastResult()).toBe('25');
        
        calculateCube('3');
        expect(getLastResult()).toBe('27');
    });

    test('должен сбрасывать результат', () => {
        calculateSquare('4');
        expect(getLastResult()).toBe('16');
        
        resetLastResult();
        expect(getLastResult()).toBe('');
    });
});

describe('Интеграционные тесты', () => {
    test('последовательные операции должны корректно обновлять lastResult', () => {
        calculateSquare('3');
        expect(getLastResult()).toBe('9');
        
        calculateCube('2');
        expect(getLastResult()).toBe('8');
        
        calculateRound('3.7');
        expect(getLastResult()).toBe('4');
    });

    test('выражения с разными операторами', () => {
        expect(calculateExpression('2 + 3 * 4 - 1')).toBe('13');
        expect(calculateExpression('10 / 2 + 5')).toBe('10');
    });
});

