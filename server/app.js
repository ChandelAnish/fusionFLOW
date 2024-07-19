require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router/router");
const connectDB = require("./db/connectDB");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server listening at PORT and connected to DB", port);
    });
  } catch (error) {
    console.log("error occurred : ",error);
  }
};
start();
