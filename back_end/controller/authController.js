import userModel from '../models/userModel.js';
import { hashPwd, comparePwd } from '../utils/authHelper.js';
import JWT from 'jsonwebtoken';

// post register
export const registerController = async (req, res) => {
  console.log('1233123');
  try {
    const { name, email, password, phone, address } = req.body;

    //validations
    if (!name || !email || !password || !phone || !address) {
      return res.send({ message: 'Every field is required.' });
    }

    const isExisting = await userModel.findOne({ email });
    if (isExisting) {
      return res.status(200).send({
        success: false,
        message: 'The user has registered, please login.',
      });
    }

    const hashedPwd = await hashPwd(password);
    //save

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPwd,
    }).save();

    res.status(201).send({
      success: true,
      message: 'User Register Successfully.',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in registration',
      error,
    });
  }
};

// post login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: 'Invalid email or password',
      });
    }

    //from db get user and check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Email does not exist.',
      });
    }

    const match = await comparePwd(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'Invalid Password',
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: '7d',
    });
    res.status(200).send({
      success: true,
      message: 'login successfully',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in login',
      error,
    });
  }
};

export const testCon = async (req, res) => {
  res.send('Test');
};
