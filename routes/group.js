import express from "express";
import Group from "../models/groupSchema.js";
import adminCheck from "../middleware/adminCheck.js";

let route = express.Router();

route.get("/groups", async (req, res) => {
  try {
    let group = await Group.find().populate("teacher", "name email");
    res.send(group);
  } catch (err) {
    console.log(err.message);
  }
});

route.post("/groups", adminCheck, async (req, res) => {
  let body = req.body;

  try {
    let group = new Group(body);
    await group.save();
    res.send("new group created");
  } catch (err) {
    console.log(err.message);
  }
});

route.put("/groups/:id", adminCheck, async (req, res) => {
  let body = req.body;
  let id = req.params.id;
  try {
    let uGroup = await Group.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.send({ message: "group updated", uGroup });
  } catch (err) {
    console.log(err.message);
  }
});

route.delete("/groups/:id", adminCheck, async (req, res) => {
  let id = req.params.id;
  try {
    let dGroup = await Group.findByIdAndDelete(id);
    res.send({ message: "group deleted", dGroup });
  } catch (err) {
    console.log(err.message);
  }
});

export default route;
