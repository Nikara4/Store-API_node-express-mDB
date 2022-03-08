require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

// express json middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});

app.use("/api/v1/products", productsRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT), console.log(`Server is listening to the port: ${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

start();
