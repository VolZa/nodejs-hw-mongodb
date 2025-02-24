import 'dotenv/config';
// import dotenv from 'dotenv';
// dotenv.config();

export function getEnv(name, defaultValue) {
  const value = process.env[name];
  //   console.log(value);

  // if (value) return value;

  // if (defaultValue) return defaultValue;

  // throw new Error(`Missing: process.env['${name}'].`);
  if (!value && defaultValue) {
    return defaultValue;
  }

  if (!value) {
    throw new Error(`Env var with name ${name} not exist!`);
  }

  return value;
}
