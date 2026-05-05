import express, { Router } from "express";
import Student from "../models/studentSchema.js";
import Teacher from "../models/teacherSchema.js";
import Admin from "../models/adminSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

let route = express.Router();

route.post("/register", async (req, res) => {
  try {
    let { name, email, password, role, teacher, group } = req.body;
    let eUser =
      (await Student.findOne({ email })) ||
      (await Teacher.findOne({ email })) ||
      (await Admin.findOne({ email }));

    if (eUser) {
      return res.status(409).send("user is alerady exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hPassword = await bcrypt.hash(password, salt);

    let user;

    if (role === "STUDENT") {
      user = await Student.create({
        name,
        email,
        password: hPassword,
        group,
        teacher,
        role,
      });
    }

    if (role === "TEACHER") {
      user = await Teacher.create({ name, email, password: hPassword, role });
    }

    if (role === "ADMIN") {
      user = await Admin.create({ name, email, password: hPassword, role });
    }

    return res.send({ message: "User created", userID: user._id });
  } catch (err) {
    return res.send({ message: err.message });
  }
});

route.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    let user =
      (await Student.findOne({ email })) ||
      (await Teacher.findOne({ email })) ||
      (await Admin.findOne({ email }));

    if (!user) return res.status(400).send({ message: "email incorrect" });

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).send({ message: "password incorrect" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      },
    );

    return res.send({ message: "login succses", token });
  } catch (err) {
    return res.send({ message: err.message });
  }
});

export default route;
