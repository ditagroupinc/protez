import { isValidEmail } from "@/utils/emailValidation";
import { NextResponse } from "next/server";

const client = require("@mailchimp/mailchimp_marketing");

const mailchimpAPIkey = process.env.MAILCHIMP_API_KEY;
const dc = "us8";
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

client.setConfig({
  apiKey: mailchimpAPIkey,
  server: dc,
});

export async function POST(request) {
  const data = await request.json();

  if (!data || !data.email || !isValidEmail(data.email)) {
    return new NextResponse(JSON.stringify({ message: "Bad request" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const requestData = {
    email_address: data.email,
    status: "subscribed",
  };

  try {
    const response = await client.lists.addListMember(audienceId, requestData);
    return new NextResponse(
      JSON.stringify({ success: true, response: response }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    const parsedError = JSON.parse(error.response.text);
    return new NextResponse(JSON.stringify({ message: parsedError.title }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
