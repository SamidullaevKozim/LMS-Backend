import mongoose from "mongoose";

let studentSchema = mongoose.Schema(
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
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    role: {
      type: String,
    }
  },
  { timestamps: true },
);

let Student = mongoose.model("Student", studentSchema);

export default Student;
