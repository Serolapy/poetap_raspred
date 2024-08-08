const math = require('mathjs');
const find_equation_roots = require('./functions/find_equation_roots.js');
const find_extreme_function = require('./functions/find_extreme_function.js');

/**
 * Решение задачи поэтапного распределения ресурсов
 * @param {number} S0 Начальная сумма
 * @param {number} n Количество этапов
 * @param {string} gx Формула доходов предприятия I 
 * @param {string} hx Формула доходов предприятия II
 * @param {string} ax Коэффициент интенсивности трат средств предприятия I
 * @param {string} bx Коэффициент интенсивности трат средств предприятия II 
 */
module.exports = function (S0, n, gx, hx, ax, bx) {
	/** Тексты функций с последнего этапа к первому */
	let f = ['0'];
	/** Сумма выделяемых средств с последнего этапа к первому */
	let S = [];

	hx = hx.replace(/x/g, '(Si-x)');	// меняем переменную, т.к. g(x), а h(S-x)
	bx = bx.replace(/x/g, '(Si-x)');	// меняем переменную, т.к. a(x), а b(S-x)

	// Для каждого этапа...
	for (let i = 0; i < n; i++) {
		// сотавляем функцию
		let f_pred = f[i].replace(/Si/g, `(${ax} + ${bx})`);						// вставляем предыдущую функцию как f(Si-x)
		let func = math.simplify(`${gx} + ${hx} + (${f_pred})`);					// собираем функцию и упрощаем её
		console.log(func.toString());
		
		// ищем её производную
		let derivative = math.derivative(func, 'x').toString();

		// ищем экстремумы
		let equation_roots = ['0', 'Si']; //крайние точки
		if (derivative.indexOf('x') != -1){
			// символы "x" в уравнении есть => заданная функция НЕ была линейной, и помимо крайних точек есть другие точки-экстремумы. Ищем их
			let other_equation_roots = find_equation_roots(derivative, S0).map(function (num) {
				return num.toString();
			});
			equation_roots = equation_roots.concat(other_equation_roots);

			//оставим уникальные значения
			equation_roots = [... new Set(equation_roots)];
		}

		console.log(equation_roots);
		console.log(find_extreme_function(derivative, equation_roots));
		// console.log(find_extreme_function('x*x-4', [-3, -2, 0, 2, 3]))
	}
}