const catchError = require("../utils/catchError");
const User = require("../models/User");
const EmailCode = require("../models/EmailCode");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const getAll = catchError(async (req, res) => {
  const results = await User.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const { email, password, firstName, lastName, address, phone, frontBaseUrl } =
    req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  const code = crypto.randomBytes(32).toString("hex");
  const newUser = await User.create({
    email,
    password: encryptedPassword,
    firstName,
    lastName,
    address,
    phone,
  });
  try {
    await sendEmail({
      to: email,
      subject: "Verification email",
      html: `
				<h1>Hi ${firstName} ${lastName}</h1>
				<p>To validate your email, click on the following link</p>
				<br>
				${frontBaseUrl}/auth/verify_email/${code}
			`,
    });
  } catch (error) {
    console.error("error sending email:", error);
  }
  const resulEmailCode = await EmailCode.create({
    code,
    userId: newUser.id,
  });

  return res
    .status(201)
    .json({ newUser, message: "email successfully", resulEmailCode });
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await User.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const { email, firstName, lastName, address, phone } = req.body;
  const result = await User.update(
    { email, firstName, lastName, address, phone },
    { where: { id }, returning: true }
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const verifyEmailUser = catchError(async (req, res) => {
  const { code } = req.params;

  const verifyCode = await EmailCode.findOne({ where: { code } });
  if (!verifyCode) return res.status(401).json({ message: "Code not found" });

  const user = await User.update(
    { isVerified: true },
    { where: { id: verifyCode.userId }, returning: true }
  );

  await EmailCode.destroy({ where: { id: verifyCode.id } });

  return res.status(200).json({ user, message: "User verified successfully" });
});

const login = catchError(async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: "Credentials invalid" });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Credentials invalid" });
  if (user.isVerified !== true)
    return res.status(401).json({ message: "email not validated" });

  const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return res.json({ user, token });
});

const getMe = catchError(async (req, res) => {
  const user = req.user;
  return res.json(user);
});

const resetPassword = catchError(async (req, res) => {
  const { email, frontBaseUrl } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: "User not found" });
  const code = crypto.randomBytes(32).toString("hex");
  try {
    await sendEmail({
      to: email,
      subject: "Change Password",
      html: `
				<h1>Hi ${user.firstName} ${user.lastName}</h1>
				<p>In the following link you can change your password</p>
				<br>
				${frontBaseUrl}/auth/reset_password/${code}
			`,
    });
  } catch (error) {
    console.error("EFailed to send email: ", error);
  }
  const resulEmailCode = await EmailCode.create({
    code,
    userId: user.id,
  });

  return res
    .status(201)
    .json({ user, message: "email succesfull", resulEmailCode });
});

const updatePasswordUser = catchError(async (req, res) => {
  const { code } = req.params;
  const { password } = req.body;

  const verifyCode = await EmailCode.findOne({ where: { code } });
  if (!verifyCode) return res.status(401).json({ message: "Code not valid" });

  const encryptedNewPassword = await bcrypt.hash(password, 10);

  const result = await User.update(
    { password: encryptedNewPassword },
    { where: { id: verifyCode.userId } }
  );

  if (result[0] === 0) return res.sendStatus(404);

  await EmailCode.destroy({ where: { id: verifyCode.id } });

  return res.json({ message: "New Password applied" });
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  verifyEmailUser,
  login,
  getMe,
  resetPassword,
  updatePasswordUser,
};
