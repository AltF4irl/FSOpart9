/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
const app = express();

app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);
    return res.json({
      height,
      weight,
      bmi: calculateBmi(height, weight),
    });
  }
  return res.status(400).json({ error: 'malformatted parameters' });
});

app.post('/exercises', (req, res) => {
    if (!isNaN(Number(req.body.target)) && req.body.daily_exercises) {
        const target: number = Number(req.body.target);
        const daily_exercises_toNumbers: number[] = [];

        req.body.daily_exercises.forEach(((e: number) => {
            if (isNaN(Number(e))) {
                res.status(400).json({error: "malformatted parameters"});
            }
            daily_exercises_toNumbers.push(e);
        }));

        res.json(calculateExercises(daily_exercises_toNumbers, target));
    }
    res.status(400).json({ error: 'Missing parameters' });
});

const PORT: number = 3003;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
