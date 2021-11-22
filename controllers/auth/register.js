const { User } = require("../../model");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      res
        .status(409)
        .json({ message: `User with email: ${email} already exist` });
    }
    const newUser = new User({ email });

    newUser.setPassword(password);

    await newUser.save();
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
