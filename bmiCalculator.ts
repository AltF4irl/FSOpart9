const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow(height / 100, 2);
  if (bmi <= 18.4) {
    return 'Underweight (unhealthy weight)';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi <= 39.9) {
    return 'Overweight (unhealthy weight)';
  } else if (bmi >= 40) {
    return 'Obese (dangerous weight)';
  }
};

console.log(calculateBmi(180, 74));