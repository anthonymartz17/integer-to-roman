# IntToRoman Converter

This repository hosts a JavaScript function named `convertIntToRoman` that efficiently converts integer numbers into their corresponding Roman numeral representations. The primary focus of this repository is to provide an efficient and accurate implementation of the conversion algorithm.

## Functionality

The `convertIntToRoman` function is designed to accurately convert integer numbers to their equivalent Roman numeral representations. Here's how the function works:

1. **Input Handling**: The function accepts an integer input and processes it to generate the corresponding Roman numeral.

2. **Symbol Mapping**: It utilizes a symbol mapping object that associates integer values with their respective Roman numeral symbols. This mapping is crucial for constructing the Roman numeral representation.

```js
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

```
3. **Conversion Algorithm**:
   - The function iterates through the digits of the integer from right to left, starting from the least significant digit.
   - For each digit, it determines the appropriate Roman numeral representation based on its place value.
   - It constructs the Roman numeral representation by appending the corresponding Roman numeral symbols.
   - Special cases such as 4, 9, and their multiples are handled to ensure accurate representation.

```js
	const romanNumeral = [];
	const strNum = String(num); //makes number iterable by converting it to string.
	let placeValue = 1;  // represents the place value that will increment to the power of ten

	for (let i = strNum.length - 1; i >= 0; i--) {

		if (strNum[i] == 0) { // when zero,just increments the placeValue and goes to the next iteration
			placeValue *= 10;
			continue;
		}

		let NumByPlaceValue = Number(strNum[i]) * placeValue;  // the current number to be mapped

  // handling the case for no more than 3 symbols for a number. ex: instead of IIII => IV or VIIII => IX, and so on.
		if (strNum[i] == 9 || strNum[i] == 4) {

    //grabs the roman symbol for the placeValue ex: place value 1 => I || placeValue 10 => x,
   // adds the current num plus place value ex: 9 + 1 = 10 => X  || 90 + 10 = 100 => C
  // then the values get concatenated: 9 => IX || 90 => XC
			const romanNum =
				symbol[placeValue] + symbol[NumByPlaceValue + placeValue]; 
			romanNumeral.unshift(romanNum);
			
		} else {
/*
 checks if the NumByPlaceValue is a valid key in the map, if it's not, it subtracts the current
   placeValue and unshifts the placeValue subtracted to the romanNumeral array until
it finds a valid key in the map.

placeValue = 10
NumByPlaceValue = 70
romanNumeral = []
80 is undefined in the symbol object => 70 - 10 = 60
unshift 10 => romanNumeral.unshift(symbol[placeValue]);
romanNumeral = [x]
60 is undefined in the symbol object => 60 - 10 = 50
unshift 10 => romanNumeral.unshift(symbol[placeValue]);
romanNumeral = [xx]
50 is a valid key in the symbol object
unshift 50 => romanNumeral.unshift(symbol[placeValue]);
romanNumeral = [LXX]
*/
			
			while (!symbol[NumByPlaceValue]) {
				NumByPlaceValue -= placeValue;
				romanNumeral.unshift(symbol[placeValue]);
			}
			romanNumeral.unshift(symbol[NumByPlaceValue]);
		}
     
		placeValue *= 10; // increments by the power of 10
	}

	return romanNumeral.join("");// returns a string
```




4. **Output Generation**: The function generates the final Roman numeral representation by joining the individual symbols.

## Usage

To utilize the `convertIntToRoman` function:

1. Ensure that the function is accessible in your JavaScript environment.
2. Invoke the function with an integer argument representing the number you wish to convert.
3. The function returns the Roman numeral representation of the input integer.

