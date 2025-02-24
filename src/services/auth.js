import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import path from 'node:path';

import createHttpError from 'http-errors';
import Handlebars from 'handlebars';
import { randomBytes } from 'crypto';

import { UsersCollection } from '../db/models/User.js';
import { FIFTEEN_MINUTES, THIRTY_DAY } from '../constants/index.js';
import { TEMPLATES_DIR_PATH } from '../constants/path.js';
import { ENV_VARS } from '../constants/env.js';
import { SessionsCollection } from '../db/models/session.js';
import { send } from 'process';
import { get } from 'http';

import { sendEmail } from '../utils/sendEmail.js';
import { getEnv } from '../utils/getEnv.js';

const resetEmailTemplate = fs
  .readFileSync(
    path.join(TEMPLATES_DIR_PATH, 'reset-password-email.html'),
    'utf-8',
  )
  .toString();
export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  });
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const sendResetPasswordEmail = async (email) => {
  //   console.log('Searching user with email:', email);
  const user = await UsersCollection.findOne({ email });
  //   console.log(user);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const template = Handlebars.compile(resetEmailTemplate);

  const token = jwt.sign(
    { sub: user._id, email },
    getEnv(ENV_VARS.JWT_SECRET),
    { expiresIn: '15m' },
    // (err, token) => { }
  );

  const html = template({ name: user.name, token });
  await sendEmail({
    to: email,
    from: getEnv(ENV_VARS.SMTP_FROM),
    subject: 'Reset Password',
    html,
  });
};
