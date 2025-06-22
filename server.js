const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/questions', (req, res) => {
  const num = parseInt(req.query.num) || 10;
  fs.readFile('questions.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error loading questions');
    let questions = JSON.parse(data);
    const selected = questions.sort(() => 0.5 - Math.random()).slice(0, num);
    res.json(selected);
  });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
