const math = require('mathjs');

/**
 * Поиск корней уравнения на участке (0; S0)
 * @param {string} func Уравнение
 * @param {number} S0 Верхняя граница
 * @returns Массив корней
 *
 */
module.exports = function (func, S0){
	/** Точность */
	const E = 0.001;
	/**	Шаг в рублях */
	const step = 101;

	let a = 0,
		b = S0,
		result = [];

	/**
	 * Считает значение функции
	 * @param {number} x 
	 * @returns Значение функции
	 */
	const f = function(x) {
		return math.evaluate(func, {x:x});
	}
	
	/** Считает корень на участке методом половинного деления */
	const polovinnoe_delenie = function(ai, bi) {
		let xi;
		while (bi - ai > E) {
			xi = (ai + bi) / 2;
			if (f(ai) * f(xi) < 0) {
				bi = xi;
			}
			else {
				ai = xi;
			}
		}
		return xi;
	}

	// проверяем крайние значения
	if (f(a) == 0) {
		result.push(a);
	}
	if (f(S0) == 0) {
		result.push(S0);
	}

	while (a < b) {
		if (f(a) * f(a + step) < 0){
			result.push(math.round(polovinnoe_delenie(a, a + step)));
		}
		a += step;
	}

	return result;
}