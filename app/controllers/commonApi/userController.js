const User = require('../../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; // Replace with a strong, secret key

const userRegister = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });
    const savedUser = await newUser.save();
    const responseUser = {
      name: savedUser.name,
      email: savedUser.email
    };

    res.send({ status: 'success', code: 200, message: "User registration successfully", user: responseUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const userWithoutPassword = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign({ user: userWithoutPassword }, secretKey, { expiresIn: '1h' }); // You can adjust the expiration time as needed

    res.send({ status: 'success', code: 200, message: 'Login successfully', token, userData: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    User.find({}, 'id name phone email')
      .then((results) => {
        res.send({ status: 'success', code: 200, message: "users data", users: results });
      })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getUserByID = async (req, res) => {
  try {
    const { _id } = req.body;
    User.findOne({ _id }).then((results) => {
      res.send({ status: 'success', code: 200, message: "user data", users: results });
    })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


const updateUser = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
module.exports = { userRegister, login, getAllUsers, getUserByID, updateUser };
