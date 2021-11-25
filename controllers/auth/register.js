const { User } = require("../../model");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const avatarDir = path.join(__dirname, "../../public/avatars");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      res
        .status(409)
        .json({ message: `User with email: ${email} already exist` });
    }

    const avatarURL = gravatar.url(`${email}`);

    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);

    await newUser.save();
    const avatarFolder = path.join(avatarDir, String(newUser._id));
    await fs.mkdir(avatarFolder);
    res.status(201).json({
      newUser,
      status: "success",
      code: 201,
      message: "Register success",
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = register;
