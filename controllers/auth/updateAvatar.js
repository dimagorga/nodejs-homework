const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../model");

const avatarDir = path.join(__dirname, "../../public/avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      res.status(401).json({ message: "Not authorized" });
    }

    const resultUpload = path.join(avatarDir, id, `${id}${originalname}`);
    console.log(resultUpload);
    Jimp.read(resultUpload, (err, image) => {
      if (err) throw err;
      image.resize(250, 250).write(`${id}${originalname}`);
    });
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("/public/avatars", id, `${id}${originalname}`);
    const result = await User.findByIdAndUpdate(
      id,
      { avatarURL },
      { new: true }
    );
    if (!result) {
      res.status(401).json({ message: "Not authorized" });
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    console.log(error.message);
    await fs.unlink(tempUpload);
    next(error.message);
  }
};

module.exports = updateAvatar;
