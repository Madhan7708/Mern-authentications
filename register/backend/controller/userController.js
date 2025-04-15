const RegisterSchema = require("../models/UserModel");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { Name, EmailId, Phoneno, Password } = req.body;
  try {
    const checkmail = await RegisterSchema.findOne({ email: EmailId });
    if (checkmail) {
      return res.status(200).json({ message: "EmailId already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const HashPassword = await bcrypt.hash(Password, salt);
    const Register = await RegisterSchema.create({
      name: Name,
      email: EmailId,
      phoneno: Phoneno,
      password: HashPassword,
    });
    console.log(Register);
    res.status(200).json({ message: "User Register Success", Register });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createUser };
