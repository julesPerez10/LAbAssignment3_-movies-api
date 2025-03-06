// 1. Import Express
const express = require("express");

// 2. Create an Express application
const app = express();

// 3. Define a route that displays the group members
app.get("/", (req, res) => {
  res.send("<h1>Team: Julian and Carlos</h1>");
});

// 4. Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
