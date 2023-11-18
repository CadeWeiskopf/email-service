import {
  EMAIL_ID,
  EMAIL_SECRET,
  EMAIL_SERVICE,
  EMAIL_TO,
} from "./data/env-vars";
import nodemailer from "nodemailer";
import { EmailData } from "./data/shared-types/types";

export const sendEmail = (emailData: EmailData) => {
  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_ID,
      pass: EMAIL_SECRET,
    },
  });
  transporter.sendMail(
    {
      from: EMAIL_ID,
      to: EMAIL_TO,
      subject: `Test ${new Date()}`,
      text: "testing",
    },
    (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
};
