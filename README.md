# IntToRoman Converter

This repository hosts a JavaScript function named `convertIntToRoman` that efficiently converts integer numbers into their corresponding Roman numeral representations. The primary focus of this repository is to provide an efficient and accurate implementation of the conversion algorithm.

## Functionality

Roman numerals are usually written in descending order, except for the edge cases involving 4 and 9. The first step was creating a symbol mapping object for integer-to-Roman conversion.

```js
const symbol = {
    1: "I", 2: "II", 3: "III", 4: "IV", 5: "V",
    6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X",
    50: "L", 100: "C", 500: "D", 1000: "M",
    5000: "V̅", 10000: "X̅", 50000: "L̅", 100000: "C̅",
    500000: "D̅", 1000000: "M̅",
};
```

I also initialized an empty array romanNumeral where corresponding Roman numerals will be added. This array will be converted into a string to return the final result. The strNum variable is used to make the number iterable. The placeValue variable represents the place value, that will be incrementing to the power of ten each time we move from right to left.

```js
const romanNumeral = [];
const strNum = String(num);
let placeValue = 1;
```

Since numbers grow from right to left that is how we want to move in our loop.

```js
for (let i = strNum.length - 1; i >= 0; i--) {
	// Code logic goes here
}
```

## Handling an Edge:

When the current number is zero, just increment the placeValue and go to the next iteration. This is because there is no Roman representation for a standalone zero.

```js
if (strNum[i] == 0) {
  placeValue *= 10;
  continue;
}
```

We multiply the current number by the current place value to get the number to be mapped to the Roman symbol. Notice that the current digit is a string, and we need to convert it to a number before we can multiply it.

```js
let numByPlaceValue = Number(strNum[i]) * placeValue;
```

## Handling an edge case:

Roman numerals generally place the greater number to the left, except when it comes to the numbers 4 and 9.

Ex: 4: IV,     40: XL,     400: CD,     9: IX,    90: XC,     900: CM

To handle this case, we can use the current place value since it will always be the number that should go to the left. The number to the right we can get it by adding the current place value plus the current number.

Ex::
Place value = 1 (I),    current number = 4;      (4 + 1) = 5 (V)     => IV
Place value = 10 (X),   current number = 90;     (90 + 10) = 100 (C)    => XC

```js

if (strNum[i] == 9 || strNum[i] == 4) {
	const romanNum = symbol[placeValue] + symbol[NumByPlaceValue + placeValue];
	romanNumeral.unshift(romanNum);
}else{
	//code logic
}
```

else, we check if the current number to be mapped (NumByPlaceValue, initialized earlier) is a valid key in the map. Valid keys include 1, 2, 3, 50, 100, etc., but not 53, 25,etc. The approach is to subtract the current place value from the current number to be mapped until it becomes a valid key in the object. As we subtract the current place value from the number to be mapped, we unshift this current place value mapped through the object. When we find a valid key, we also unshift that value.To go to the next place value we increment the current place value by the power of 10.

Example:
Current place value = 1
Number to be mapped = 7
7 - 1 => map 1 => unshift => [I]
6 - 1 => map 1 => unshift => [II]
5 (valid key) => map 5 => unshift => [VII]

```js
while (!symbol[numByPlaceValue]) {
  numByPlaceValue -= placeValue;
  romanNumeral.unshift(symbol[placeValue]);
}

romanNumeral.unshift(symbol[numByPlaceValue]);

placeValue *= 10; // increments by the power of 10
```

Finally, we convert our result into a string:
```js
return romanNumeral.join(""); // returns a string

```

## Usage

To utilize the `convertIntToRoman` function:

1. Ensure that the function is accessible in your JavaScript environment.
2. Invoke the function with an integer argument representing the number you wish to convert.
3. The function returns the Roman numeral representation of the input integer.
