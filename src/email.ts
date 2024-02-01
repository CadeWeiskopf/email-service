import {
  EMAIL_ID,
  EMAIL_SECRET,
  EMAIL_SERVICE,
  EMAIL_TO,
} from "./data/env-vars";
import nodemailer from "nodemailer";
import { EmailData } from "./data/shared-types/types";
import { readFile } from "fs";
import path from "path";

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_SECRET,
  },
});

let emailTemplate: string | undefined;

const mapDataAndSendEmail = (emailData: EmailData) => {
  if (!emailTemplate) {
    throw Error(
      "mapDataAndSendEmail should not be called without emailTemplate set"
    );
  }

  const html = emailTemplate
    .replaceAll("{{ first_name }}", emailData.firstName)
    .replaceAll("{{ last_name }}", emailData.lastName)
    .replaceAll("{{ company_name }}", emailData.companyName)
    .replaceAll("{{ email }}", emailData.email)
    .replaceAll("{{ phone }}", emailData.phone)
    .replaceAll("{{ priority }}", emailData.priority)
    .replaceAll("{{ details }}", emailData.details);

  transporter.sendMail(
    {
      from: EMAIL_ID,
      to: EMAIL_TO,
      subject: `NEW Inquiry (${emailData.priority}): ${emailData.firstName} ${emailData.lastName} ${emailData.companyName}`,
      html,
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

export const sendEmail = (emailData: EmailData) => {
  if (emailTemplate === undefined) {
    readFile(
      path.resolve(__dirname, "./data/email-template.html"),
      (err, data) => {
        if (err) {
          throw err;
        }

        emailTemplate = data.toString();
        mapDataAndSendEmail(emailData);
      }
    );
  } else {
    mapDataAndSendEmail(emailData);
  }
};
