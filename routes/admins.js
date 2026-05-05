import express from "express";
import Admin from "../models/adminSchema.js";

let route = express.Router();

route.get("/admins", async (req, res) => {
  try {
    let admin = await Admin.find();
    res.send(admin);
  } catch (err) {
    console.log(err.message);
  }
});

route.post("/admins", async (req, res) => {
  let body = req.body;

  try {
    let admin = new Admin(body);
    await admin.save();
    res.send("new admin created");
  } catch (err) {
    console.log(err.message);
  }
});

route.put("/admins/:id", async (req, res) => {
  let body = req.body;
  let id = req.params.id;
  try {
    let uAdmin = await Admin.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.send({ message: "admin updated", uAdmin });
  } catch (err) {
    console.log(err.message);
  }
});

route.delete("/admins/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let dAdmin = await Admin.findByIdAndDelete(id);
    res.send({ message: "admin deleted", dAdmin });
  } catch (err) {
    console.log(err.message);
  }
});

export default route;
