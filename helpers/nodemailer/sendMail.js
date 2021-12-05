const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "dimagorga@meta.ua",
    pass: META_PASSWORD,
  },
};

const sendMail = async (data) => {
  const transporter = nodemailer.createTransport(config);
  const email = { from: "dimagorga@meta.ua", ...data };
  await transporter
    .sendMail(email)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
  return true;
};

module.exports = sendMail;
