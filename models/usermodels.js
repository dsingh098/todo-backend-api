import mongoose from "mongoose";


// user schema data base structure 

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false  
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;
