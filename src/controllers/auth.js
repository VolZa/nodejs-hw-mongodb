import jwt from 'jsonwebtoken';
import {
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
  sendResetPasswordEmail,
} from '../services/auth.js';
import { serializeUser } from '../utils/serializeUser.js';
import { THIRTY_DAY } from '../constants/index.js';
import pkg from 'joi';
import { setupCookies } from '../utils/setupCookies.js';

const { data } = pkg;

export const registerUserController = async (req, res) => {
  const { body } = req;
  const user = await registerUser(body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: serializeUser(user),
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupCookies(res, session._id, session.refreshToken);

  res.json({
    status: 200,
    message: 'Successfully logger in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupCookies(res, session._id, session.refreshToken);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const sendResetEmailController = async (req, res) => {
  const { email } = req.body;
  //   console.log('Received request to send reset email:', req.body);
  await sendResetPasswordEmail(email);
  res.json({
    status: 200,
    message: 'Successfully sent reset password email!',
    data: { email },
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    status: 200,
    message: 'Successfully reset password!',
    data: {},
  });
  // data: { email: req.body.email },
};
