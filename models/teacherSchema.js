import mongoose from "mongoose";

let teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlenght: 6, 
    },
    role: {
      type: String,
    }
  },
  { timestamps: true },
);

let Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;