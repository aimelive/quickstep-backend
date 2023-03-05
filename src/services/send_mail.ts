import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import * as dotenv from "dotenv";

dotenv.config();

export function sendEmail(email: string, otp: number) {
  const FROM_EMAIL: string = process.env.SENDER_MAIL!;
  const FROM_MAIL_PASSWORD: string = process.env.SENDER_MAIL_PASSWORD!;
  const TO_EMAIL: string = email;

  //Creating transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: FROM_EMAIL,
      pass: FROM_MAIL_PASSWORD,
    },
  });

  const MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Quick step App",
      link: "https://aimelive.netlify.app/",
    },
  });
  const response = {
    body: {
      name: email,
      intro: "Verify your email by entering OTP below",
      table: {
        data: [
          {
            "OTP Verification Number": otp,
          },
        ],
      },
      outro: "Please note that this OTP will expire in two hours.",
    },
  };

  const mail = MailGenerator.generate(response);

  // Define the message to be sent
  const mailMessage = {
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: `Quick step App - Verify OTP`,
    html: mail,
  };
  // // Send the message using the created transport object
  transporter.sendMail(mailMessage, (error) => {
    if (error) {
      console.log("Email service not working ", error);
    } else {
      // console.log("Email sent successfully");
    }
  });
}
