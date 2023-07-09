const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, confirm } = req.body;
  const isvalied = User.findOne({ email: email });
  // console.log(isvalied);
  if (!isvalied.name) {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const newuser = new User({
      name: name,
      email: email,
      password: hashedpassword,
    });
    newuser
      .save()
      .then((re) => {
        console.log("then");
        return res.json(re);
      })
      .catch((err) => {
        console.log("err");
        return res.status(401);
      });
  } else {
    console.log("else");
    return res.json("User email exist!");
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const payload = { name: user.name, id: user._id };
    const token = await jwt.sign(payload, "secret", { expiresIn: "3600" });
    return res.json("Bearer " + token);
  }
};
