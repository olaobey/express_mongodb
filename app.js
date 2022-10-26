require("dotenv").config();
const express = require("express");
const compression = require("compression");
const { connectToMongoDB } = require("./db");
const bookRouter = require("./routes/book.js");
const authorRoute = require("./routes/authors");

const app = express();

const PORT = process.env.PORT;

// Connecting to MongoDB instance
connectToMongoDB();

app.use(express.static("public"));
app.use(express.json());
app.use(compression());
app.use("/books", bookRouter);
app.use("/authors", authorRoute);

app.get("/", (req, res) => {
  res.end("Welcome Home!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
