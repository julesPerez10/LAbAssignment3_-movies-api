// 1. Import Express and the file system module (fs)
const express = require("express");
const fs = require("fs");

// 2. Create an Express application
const app = express();

// 3. Read the JSON file
const data = JSON.parse(fs.readFileSync("./data/data.json", "utf8"));

// 4. Create a route to display the JSON data in the browser
app.get("/movies", (req, res) => {
  res.json(data);
});

// 5. Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
