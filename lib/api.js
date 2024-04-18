const WP_API_URL = process.env.WORDPRESS_API_URL;
import { isValidEmail } from "@/utils/emailValidation";

export const sendContactForm = async (data) => {
  return fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });
};

async function fetchAPI(query = "", { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(WP_API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 120 },
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getAllSections(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts {
        edges {
          node {
            id
            content
            title
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.posts.edges;
}

export async function getCountry() {
  return fetch("https://api.bigdatacloud.net/data/reverse-geocode-client", {
    method: "GET",
    // body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");

    return res.json();
  });
}

export const subscribeToMailchimp = async (data) => {
  if (!data.email || !isValidEmail(data.email)) {
    throw new Error("Wrong email format at email subscription");
  }

  return fetch("/api/mailchimp", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(async (res) => {
    if (!res.ok) {
      const response = await res.json();
      throw new Error(response.message);
    }
  });
};
