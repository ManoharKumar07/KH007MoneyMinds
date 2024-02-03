const express = require("express");
const app = express();
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./db/db");
const cors = require("cors");
const env = require("dotenv");
env.config();

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//user routes
app.use("/api/v1/user", require("./routes/userRoutes"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is Running on port ${port}`.bgCyan.white);
});
