const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json()); // Enable JSON parsing

// Function to read data from the JSON file
const getData = () => JSON.parse(fs.readFileSync("./data/data.json", "utf8"));

// READ (GET) - Get all movies
app.get("/movies", (req, res) => {
  res.json(getData());
});

// CREATE (POST) - Add a new movie
app.post("/movies", (req, res) => {
  const movies = getData();
  const newMovie = req.body;
  newMovie.id = movies.length + 1; 
  movies.push(newMovie);

  fs.writeFileSync("./data/data.json", JSON.stringify(movies, null, 2));
  res.status(201).json(newMovie);
});

// UPDATE (PUT) - Update a movie by ID
app.put("/movies/:id", (req, res) => {
  const movies = getData();
  const movieIndex = movies.findIndex(m => m.id == req.params.id);

  if (movieIndex !== -1) {
    movies[movieIndex] = { ...movies[movieIndex], ...req.body };
    fs.writeFileSync("./data/data.json", JSON.stringify(movies, null, 2));
    res.json(movies[movieIndex]);
  } else {
    res.status(404).send("Movie not found");
  }
});

// DELETE (DELETE) - Remove a movie by ID
app.delete("/movies/:id", (req, res) => {
  let movies = getData();
  const newMovies = movies.filter(m => m.id != req.params.id);

  if (movies.length !== newMovies.length) {
    fs.writeFileSync("./data/data.json", JSON.stringify(newMovies, null, 2));
    res.send("Movie deleted successfully");
  } else {
    res.status(404).send("Movie not found");
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
