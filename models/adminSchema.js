import mongoose from "mongoose";

let adminSchema = mongoose.Schema(
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

let Admin = mongoose.model("Admin", adminSchema);

export default Admin;
