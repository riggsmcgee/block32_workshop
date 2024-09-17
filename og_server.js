const express = require('express');
const app = express();
app.use(express.json());
const pg = require('pg');
const port = 3000;
const client = new pg.Client('postgres://localhost:5432/block_31');
console.log("I'm here");

app.get('/', async (req, res) => {
  await client.connect();
  const response = await client.query('SELECT * FROM test');
  console.table(response.rows);
  res.json(response.rows);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
