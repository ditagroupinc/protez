"use client";

import { TestmailchimpAPI } from "@/lib/api";
import { useEffect } from "react";

export default function Donate() {
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await TestmailchimpAPI({
        email: "DITAtetestEmail123456@gmail.com",
      });
      response = await response.json();
      console.log(response);
    }

    fetchMyAPI();
  }, []);
  return <div>huy</div>;
}
