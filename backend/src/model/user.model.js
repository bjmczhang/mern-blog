const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// TODO: Modify this after user created
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving to database

UserSchema.pre("save", async function () {
  const user = this;

  if (!user.isModified("password")) return;

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

UserSchema.methods.comparePassword = function (givenPassword) {
  return bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
