import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';

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

const PORT: number = 3003;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
