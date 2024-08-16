require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/router");
const connectDB = require("./db/connectDB");
const cookieParser = require("cookie-parser");


app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials:true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", router);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server listening at PORT and connected to DB", port);
    });
  } catch (error) {
    console.log("error occurred : ", error);
  }
};
start();
