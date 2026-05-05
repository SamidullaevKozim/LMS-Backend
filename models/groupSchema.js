import mongoose from "mongoose";

let groupSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  { timestamps: true },
);

let Group = mongoose.model("Group", groupSchema);

export default Group;
