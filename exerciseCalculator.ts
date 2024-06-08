interface Stats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
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
  } else if (progression > 0.85) {
    return 3;
  }
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
