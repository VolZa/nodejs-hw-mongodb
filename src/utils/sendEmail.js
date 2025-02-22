import nodemailer from 'nodemailer';
import { getEnv } from "../utils/getEnv.js";
import { ENV_VARS } from '../constants/env.js';
import createHttpError from 'http-errors';
const transporter = nodemailer.createTransport({
    host: getEnv(ENV_VARS.SMTP_HOST),
    port: Number(getEnv(ENV_VARS.SMTP_PORT)),
    auth: {
        user: getEnv(ENV_VARS.SMTP_USER),
        pass: getEnv(ENV_VARS.SMTP_PASSWORD),
    },
});

export const sendEmail = async (options) => {
    try {
        await transporter.sendMail({
            to: options.to,
            subject: options.subject,
            from: options.from,
            html: options.html,
        });
    } catch (error) {
        console.error('Error while sending email', error);
        throw createHttpError(500, 'Failed to send email');
    }
};