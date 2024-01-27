const romanNum = document
	.querySelector(".input")
	.addEventListener("keyup", getRomanNum);

function getRomanNum(event) {
	const roman = convertIntToRoman(event.target.value);
	document.querySelector(".roman-num").innerHTML = roman;
}

function convertIntToRoman(num) {
	const symbol = {
		1: "I",
		2: "II",
		3: "III",
		4: "IV",
		5: "V",
		6: "VI",
		7: "VII",
		8: "VIII",
		9: "IX",
		10: "X",
		50: "L",
		100: "C",
		500: "D",
		1000: "M",
		5000: "V̅",
		10000: "X̅",
		50000: "L̅",
		100000: "C̅",
		500000: "D̅",
		1000000: "M̅",
	};

	const romanNumeral = [];
	const strNum = String(num);
	let placeValue = 1;

	for (let i = strNum.length - 1; i >= 0; i--) {
		if (strNum[i] == 0) {
			placeValue *= 10;
			continue;
		}
		let NumByPlaceValue = Number(strNum[i]) * placeValue;

		if (strNum[i] == 9 || strNum[i] == 4) {
			const romanNum =
				symbol[placeValue] + symbol[NumByPlaceValue + placeValue];
			romanNumeral.unshift(romanNum);

		} else {
			console.log(NumByPlaceValue, "NumByPlaceValue");
			while (!symbol[NumByPlaceValue]) {
				console.log(i);
				NumByPlaceValue -= placeValue;
				romanNumeral.unshift(symbol[placeValue]);
			}
			romanNumeral.unshift(symbol[NumByPlaceValue]);
		}

		placeValue *= 10;
	}

	return romanNumeral.join("");
}
