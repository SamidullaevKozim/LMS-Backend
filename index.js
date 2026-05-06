import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import teahcersRoute from "./routes/teachers.js";
import adminsRoute from "./routes/admins.js";
import groupsRoute from "./routes/group.js";
import studentsRoute from "./routes/students.js";
import chekToken from "./middleware/checkToken.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(authRoute);
app.use(chekToken);
app.use(studentsRoute);
app.use(teahcersRoute);
app.use(adminsRoute);
app.use(groupsRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.json([{ name: "test" }]);
});

export default app;
