import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "prtzfndtn@gmail.com",
    pass: "sgqpmsbpbxlnyfbj",
  },
});

export const mailOptions = {
  from: "prtzfndtn@gmail.com",
  to: "bogdanleontovich@gmail.com",
};
