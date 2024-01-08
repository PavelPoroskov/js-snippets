export const convertNumbersToRanges = (numbers = []) => {
  const ranges = [];

  if (numbers.length) {
    const sortedNumbers = numbers.sort((a, b) => a - b);
    const firstNumber = sortedNumbers[0];
    let [from, to] = [firstNumber, firstNumber];

    for (let i = 1; i < sortedNumbers.length; i += 1) {
      const currentNumber = sortedNumbers[i];

      if (currentNumber === to + 1 || currentNumber === to) {
        to = currentNumber;
      } else {
        ranges.push([from, to]);
        ([from, to] = [currentNumber, currentNumber]);
      }
    }

    ranges.push([from, to]);
  }

  return ranges;
};

export const getNumbersForRange = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

export const convertRangesToNumbers = (ranges = []) => {
  const allNumbers = ranges.flatMap(
    ([from, to]) => getNumbersForRange(from, to),
  );
  const uniqNumbers = Array.from(new Set(allNumbers));

  return uniqNumbers.map((i) => +i).sort((a, b) => a - b);
};
