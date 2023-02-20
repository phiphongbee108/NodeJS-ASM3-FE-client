export default function convertMoney(money) {
	const str = money + "";
	let output = ""

	let count = 0;
	for (let i = str.length - 1; i >= 0; i--) {
		count++;
		output = str[i] + output

		if (count % 3 === 0 && i !== 0) {
			output = "." + output
			count = 0;
		}
	}

	return output;
}
