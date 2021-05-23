const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

let repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const likes = 0;
  
  const id = uuid();

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found!' });
  }

  const likes = repositories[repositoryIndex].likes;

  const repository = {
    id,
    title, 
    url,
    techs,
    likes
  };

  repositories[repositoryIndex] = repository;

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found!' });
  }

  repositories = repositories.filter(repository => repository.id !== id);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found!' });
  }

  repositories[repositoryIndex].likes += 1;

  return response.status(200).json(repositories[repositoryIndex]);
});

module.exports = app;
