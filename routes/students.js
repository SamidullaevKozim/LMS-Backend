import express from "express";
import Student from "../models/studentSchema.js";
import adminCheck from "../middleware/adminCheck.js";


let route = express.Router();

route.get("/students", async (req, res) => {
  try {
    let student = await Student.find()
      .populate({
        path: "group",
        populate: {
          path: "teacher",
          select: "name email",
        },
      });
    res.send(student);
  } catch (err) {
    console.log(err.message);
  }
});

route.post("/students", adminCheck, async (req, res) => {
  let body = req.body;

  try {
    let student = new Student(body);
    await student.save();
    res.send("new student created");
  } catch (err) {
    console.log(err.message);
  }
});

route.put("/students/:id", adminCheck, async (req, res) => {
  let body = req.body;
  let id = req.params.id;
  try {
    let uStudent = await Student.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.send({ message: "Student updated", uStudent });
  } catch (err) {
    console.log(err.message);
  }
});

route.delete("/students/:id", adminCheck, async (req, res) => {
  let id = req.params.id;
  try {
    let dStudent = await Student.findByIdAndDelete(id);
    res.send({ message: "Student deleted", dStudent });
  } catch (err) {
    console.log(err.message);
  }
});

export default route;
