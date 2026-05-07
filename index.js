import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";

import authRoute from "./routes/auth.js";
import teahcersRoute from "./routes/teachers.js";
import adminsRoute from "./routes/admins.js";
import groupsRoute from "./routes/group.js";
import studentsRoute from "./routes/students.js";
import chekToken from "./middleware/checkToken.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// важный middleware
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use(authRoute);
app.use(chekToken);
app.use(studentsRoute);
app.use(teahcersRoute);
app.use(adminsRoute);
app.use(groupsRoute);

app.get("/", (req, res) => {
  res.json([{ name: "test" }]);
});

export default app;
