export default async function AllBlogPosts() {
  const { data } = await fetch("https://protez.wpengine.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query getPosts {
        posts {
          edges {
            node {
              title
              excerpt
              slug
              date
            }
          }
        }
      }
    `,
    }),
    next: { revalidate: 10 },
  }).then((res) => res.json());

  let blogPosts = data?.posts?.edges;

  console.log(blogPosts);

  return (
    <>
      <div>
        {blogPosts?.map((post) => (
          <div key={post.node.title}>{post.node.title}</div>
        ))}
      </div>
    </>
  );
}
