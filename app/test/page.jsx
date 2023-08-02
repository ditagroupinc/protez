"use client";
import Image from "next/image";

import { useContext, useState, useEffect, useRef } from "react";

export default function Home() {
  // ---- WP
  const fetcher = async () => {
    const { data } = await fetch("https://protez.wpengine.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query NewQuery {
          posts {
            edges {
              node {
                id
                title
                uri
                postId
              }
            }
          }
        }
    `,
      }),
      next: { revalidate: 10 },
    }).then((res) => {
      // res.json()
    });
    console.log(data);
  };

  useEffect(() => {
    fetcher();
  }, []);
  // ____ WP

  // console.log(isVisible("upcomingEvents"));

  return <>huy</>;
}
