interface Stats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Argumentsv2 {
    target: number,
    dailyExHours: number[]
}

const parseArgumentsv2 = (args: string[]): Argumentsv2 => {
    if (args.length < 4) throw new Error('not enough arguments')
    
    const [_one, _two, t, ...deh] = args
    const dehToNumbers: number[] = []

    if (!isNaN(Number(t))) {
        deh.forEach(s => {
            if (isNaN(Number(s))) {
                throw new Error('arguments must be numbers')
            }
            dehToNumbers.push(Number(s))
        })
    } else {
        throw new Error('arguments must be numbers')
    }

    return {
        target: Number(t),
        dailyExHours: dehToNumbers
    }
}

const setAverage = (dailyExerciseHours: number[]): number => {
  let everageExerciseHours: number = 0;
  dailyExerciseHours.forEach((exercise) => {
    everageExerciseHours += exercise;
  });

  return everageExerciseHours / dailyExerciseHours.length;
};

const setSuccess = (dailyExerciseHours: number[], target: number): boolean => {
  return setAverage(dailyExerciseHours) === target;
};

const setRating = (dailyExerciseHours: number[], target: number): number => {
  const progression = setAverage(dailyExerciseHours) / target;
  if (progression <= 0.5) {
    return 1;
  } else if (progression > 0.5 && progression <= 0.85) {
    return 2;
  }
  return 3;
};

const setRatingDescription = (
  dailyExerciseHours: number[],
  target: number
): string => {
  const rating = setRating(dailyExerciseHours, target);

  switch (rating) {
    case 1:
      return 'are you even trying?';
    case 2:
      return 'skill issue';
    case 3:
      return 'GGs';
  }

  return "is not within scope"
};

const setTrainingDays = (dailyExerciseHours: number[]): number => {
  let noTrainingDays = 0;
  dailyExerciseHours.forEach((exercise) => {
    if (exercise === 0) noTrainingDays++;
  });

  return dailyExerciseHours.length - noTrainingDays;
};

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): Stats => {
  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: setTrainingDays(dailyExerciseHours),
    success: setSuccess(dailyExerciseHours, target),
    rating: setRating(dailyExerciseHours, target),
    ratingDescription: setRatingDescription(dailyExerciseHours, target),
    target,
    average: setAverage(dailyExerciseHours),
  };
};

try {
    const {target, dailyExHours} = parseArgumentsv2(process.argv)
    console.log(calculateExercises(dailyExHours, target));
} catch (err: unknown) {
    if (err instanceof Error) {
        console.log('Something went wrong:', err.message);
    }
}
