// Create web server
// similar code: https://github.com/github-copilot/code_referencing?cursor=25606d20c330496c8da04c24443c7827&editor=vscode

const express = require('express');
const app = express();
app.use(express.json());
const comments = [];

// Create a new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.status(201).send(comment);
});

// Get all comments
app.get('/comments', (req, res) => {
  res.send(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    res.send(comment);
  } else {
    res.status(404).send();
  }
});

// Update a comment
app.patch('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    Object.assign(comment, req.body);
    res.send(comment);
  } else {
    res.status(404).send();
  }
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const index = comments.findIndex(comment => comment.id === id);
  if (index >= 0) {
    comments.splice(index, 1);
    res.send();
  } else {
    res.status(404).send();
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});