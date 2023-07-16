// // as a function
// const fetcher = async () => {
//   const { data } = await fetch("", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query: `
//     query getPosts {
//       posts {
//         edges {
//           node {
//             title
//             excerpt
//             slug
//             date
//           }
//         }
//       }
//     }
//   `,
//     }),
//     next: { revalidate: 10 },
//   }).then((res) => res.json());
//   console.log(data);
// };

// useEffect(() => {
//   fetcher();
// }, []);

// // Whole page
// export default async function AllBlogPosts() {
//   const { data } = await fetch("", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query: `
//         query getPosts {
//           posts {
//             edges {
//               node {
//                 title
//                 excerpt
//                 slug
//                 date
//               }
//             }
//           }
//         }
//       `,
//     }),
//     next: { revalidate: 10 },
//   }).then((res) => res.json());

//   let blogPosts = data?.posts?.edges;

//   console.log(blogPosts);

//   return (
//     <>
//       <div>
//         {blogPosts?.map((post) => (
//           <div key={post.node.title}>{post.node.title}</div>
//         ))}
//       </div>
//     </>
//   );
// }
