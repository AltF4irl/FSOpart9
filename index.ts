import express from 'express';
const app = express();

app.get('/hello', async (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT: number = 3003;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
