interface Arguments {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): Arguments => {
  if (args.length > 4) throw new Error('Too many argguments');
  if (args.length < 4) throw new Error('not enough arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Arguments must be numbers');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow(height / 100, 2);
  if (bmi <= 18.4) {
    return 'Underweight (unhealthy weight)';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi <= 39.9) {
    return 'Overweight (unhealthy weight)';
  }

  return 'Obese (dangerous weight)';
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log(err.message);
  }
}
