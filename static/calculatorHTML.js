document.getElementById('calculator-minus').addEventListener('click', function(e){
	document.getElementById('calculator').classList.toggle('hide');
});

const display = document.getElementById('calculator-display');

Array.prototype.forEach.call(document.getElementsByClassName('calculator-button'), element => {
	element.addEventListener('click', function(){
		const btnValue = element.dataset.btn;
		switch (btnValue) {
			case 'clear':
				display.value = '';
				break;
			case 'backspace':
				display.value = display.value.slice(0, -1);
				break;
			default:
				display.value += btnValue;
				break;
		}
	});
});