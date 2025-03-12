import { THIRTY_DAY } from '../constants/index.js';

export const setupCookies = (res, sessionId, refreshToken) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAY),
  });
  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAY),
  });
};
