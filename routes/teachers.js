import express from "express";
import Teacher from "../models/teacherSchema.js";
import adminCheck from "../middleware/adminCheck.js";

let route = express.Router();

route.get("/teachers", async (req, res) => {
  try {
    let teacher = await Teacher.find();
    res.send(teacher);
  } catch (err) {
    console.log(err.message);
  }
});

route.post("/teachers", adminCheck, async (req, res) => {
  let body = req.body;

  try {
    let teacher = new Teacher(body);
    await teacher.save();
    res.send("new teacher created");
  } catch (err) {
    console.log(err.message);
  }
});

route.put("/teachers/:id", adminCheck, async (req, res) => {
  let body = req.body;
  let id = req.params.id;
  try {
    let uTeacher = await Teacher.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.send({ message: "teacher updated", uTeacher });
  } catch (err) {
    console.log(err.message);
  }
});

route.delete("/teachers/:id", adminCheck, async (req, res) => {
  let id = req.params.id;
  try {
    let dTeacher = await Teacher.findByIdAndDelete(id);
    res.send({ message: "teacher deleted", dTeacher });
  } catch (err) {
    console.log(err.message);
  }
});

export default route;
