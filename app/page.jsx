import { getNews } from "@/lib/api";
import ClientSections from "@/sections/ClientSections";
import { parseNews } from "@/utils/parsers";

export default async function Home() {
  const news = await getData();
  const parsedNews = parseNews(news);
  return <ClientSections news={parsedNews} />;
}

async function getData() {
  const allPosts = await getNews();

  return allPosts;
}
