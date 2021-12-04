const { User } = require("../../model");
const sendMail = require("../../helpers/sendGrid/sendMail.js");

const verifyResending = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "missing required field email" });
    } else if (user.verify) {
      res.status(400).json({ message: "Verification has already been passed" });
    } else if (!user.verify) {
      const mail = {
        to: email,
        subject: "Подтверждение регистрации",
        html: `<a href="http://localhost:8086/api/auth/users/verify/${user.verificationToken}">Перейдите по ссылке для подтверждения</a>`,
      };

      await sendMail(mail);
      res.status(200).json({ message: "Verification email sent" });
    }
  } catch (error) {
    next(error.message);
  }
};

module.exports = verifyResending;
