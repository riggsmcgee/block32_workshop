const express = require('express');
const pg = require('pg');
const app = express();
const port = 3000;
const client = new pg.Client('postgres://localhost:5432/block_31');

app.use(express.json());

app.get('/', async (req, res) => {
  const response = await client.query('SELECT * FROM flavors');
  res.json(response.rows);
});

app.post('/', async (req, res) => {
  const { id, flavor, is_favorite } = req.body;
  const response = await client.query(
    'INSERT INTO students (id, flavor, is_favorite)',
    [id, flavor, is_favorite]
  );
  res.json(`succesfully added flavor: ${flavor}`);
});

app.delete('/:id', async (req, res) => {
  await client.connect();
  const { id } = req.params;
  const response = await client.query('DELETE FROM flavors WHERE id = $1', [
    id,
  ]);
  res.json(`succesfully deleted flavor: ${id}`);
});

app.listen(port, async () => {
  await client.connect();
  console.log(`Example app listening on port ${port}`);
});
