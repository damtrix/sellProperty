const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  //Remove the password from the input
  user.password = undefined;
  user.pin = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    fullName: req.body.fullName,
    username: req.body.username,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  //1. Check if email and password exits
  if (!username || !password) {
    return next(new AppError('Please provide Username and Password', 400));
  }

  //2. Check if user exists and password is correct
  const user = await User.findOne({ username }).select('+password'); //same as username : username

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }

  //3. If everything is ok, send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  // Getting token and checking if its there.
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookie.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get Access', 401)
    );
  }

  // Verification of Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  //Grant Access to protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

//Only for rendered pages, and there would be no errors
exports.isLoggedIn = async (req, res, next) => {
  try {
    //Getting token and checking if its there.
    if (req.cookies.jwt) {
      //Verification of Token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      //Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      //There is logged in user
      res.locals.user = currentUser;
      return next();
    }
  } catch (err) {
    return next();
  }
  next();
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  //Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  //Check if POSTed password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  // If so, update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // Log in the user, send JWT
  createSendToken(user, 200, res);
});

exports.updateUser = catchAsync(async (req, res, next) => {
  //Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("Your cant update a user's password", 400));
  }
  const { username } = req.body;

  let user = await User.findOne({ username });

  if (user) {
    user = await User.findByIdAndUpdate(user.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        data: user,
      },
    });
  } else {
    return next(new AppError('No document found with that username', 404));
  }
});
