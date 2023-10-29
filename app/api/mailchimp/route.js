// pages/api/subscribe.js
// import axios from "axios";

// import { mailOptions, transporter } from "@/config/nodemailer";
const mailchimpAPIkey = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;

const dc = "us8";

const audienceId = "87c86ae64d";

// import NextResponse from "next/server";
import { NextResponse } from "next/server";

// async function run() {
//   const response = await mailchimp.ping.get();
//   console.log(response);
// }

const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: mailchimpAPIkey,
  server: dc,
});

// async function run() {
//   const response = await client.lists.addListMember("list_id", {
//     email_address: "Ebony_Brekke@gmail.com",
//     status: "pending",
//   });
//   console.log(response);
// }

const run = async () => {
  const response = await client.lists.getListMembersInfo(audienceId);
  console.log(response);
};

export async function POST(request) {
  const data = await request.json();
  // const apiKey = "YOUR_MAILCHIMP_API_KEY";
  // const audienceId = "YOUR_MAILCHIMP_AUDIENCE_ID";
  const requestData = {
    email_address: data.email,
    status: "subscribed",
  };
  run();
  return new NextResponse(JSON.stringify({ success: true, mailchimp: "ok" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
  // if (!data.email) {
  //   return new NextResponse(JSON.stringify({ message: "Bad request" }), {
  //     status: 400,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }
}
