const math = require('mathjs');

/** Тестовое значение Si */
const Si_value = 1;	//неотрицательное значение

/** Дельта */
const delta = 0.5;

/**
 * Найти значение x, в котором функция максимальна
 * @param {string} derivative Текст функции
 * @param {string[]} roots Экстремумы функции
 * @returns Экстремумы
 */
module.exports = function (derivative, roots){
	let values = [];
	
	// работаем с экстремумами
	for (let i = 0; i < roots.length; i++) {
		//подставляем каждый корень
		let root = roots[i];
		parseInt()

		// определяем, максимум, минимум или это точка перегиба
		const val_minus = math.evaluate(derivative.replace(/x/g, `(${root} - ${delta})`), { Si: Si_value});
		const val_plus = math.evaluate(derivative.replace(/x/g, `(${root} + ${delta})`), { Si: Si_value});

		const val = math.evaluate(derivative.replace(/x/g, `(${root})`), { Si: Si_value});

		if (val_minus > 0 && val_plus < 0 && val == 0) {
			// точка максимума
			values.push({
				root: root,
				type: 'max'
			});
		} else if (val_minus < 0 && val_plus > 0 && val == 0) {
			// точка минимума
			values.push({
				root: root,
				type: 'min'
			});
		} if (val_minus > 0 && val_plus > 0 && val == 0 || val_minus < 0 && val_plus < 0 && val == 0) {
			// точка максимума
			values.push({
				root: root,
				type: 'peregib'
			});
		}
	}

	return values

	if (values.length == 0) {
		return null;
	}

	let val_max = values[0].val;
	let val_id = 0;
	for (let i = 1; i < values.length; i++) {
		if (values[i].val > val_max) {
			val_max = values[i].val;
			val_id = i;
		}
	}
	// return values[val_id].root;
	return [values, val_max]
}