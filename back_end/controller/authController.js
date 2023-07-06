import userModel from '../models/userModel.js';
import { handleHashPwd, comparePwd } from '../utils/authHelper.js';
import JWT from 'jsonwebtoken';

// post register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, answer, address } = req.body;

    //validations
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.send({ message: 'Every field is required.' });
    }

    const isExisting = await userModel.findOne({ email });
    if (isExisting) {
      return res.status(200).send({
        success: false,
        message: 'The user has registered, please login.',
      });
    }

    const hashedPwd = await handleHashPwd(password);
    //save

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      answer,
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
        role: user.role,
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

export const forgetPwdController = async (req, res) => {
  try {
    //check the body of request
    const { email, answer, password } = req.body;
    if (!email || !answer || !password) {
      res.status(400).send({
        success: false,
        message: 'email,answer, and new password are all required.',
      });
    }
    //check the data exists or not in db
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Email or answer are incorrect.',
      });
    }

    const hashedPwd = await handleHashPwd(password);

    await userModel.findByIdAndUpdate(user._id, { password: hashedPwd });
    res.status(200).send({
      success: true,
      message: 'Password has reset.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Request is invalid.',
      error,
    });
  }
};
export const testCon = async (req, res) => {
  res.send('Test');
};
