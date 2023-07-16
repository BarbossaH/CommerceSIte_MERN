import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const isLogin = async (req, res, next) => {
  console.log('is Login', req.headers.authorization);

  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_TOKEN);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  console.log('is Admin');
  try {
    const user = await userModel.findById(req.user._id);
    if (user?.role !== 1) {
      return res.status(401).send({
        success: false,
        message: 'UnAuthorized Access',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: 'Error in admin middleware',
    });
  }
};
