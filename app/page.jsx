import { getNews, getAllSections } from "@/lib/api";
import ClientSections from "@/sections/ClientSections";
import { parseNews, parseStatistics, parseEvents } from "@/utils/parsers";

export default async function Home() {
  const { news, statistics, events } = await getPosts();

  return <ClientSections news={news} statistics={statistics} events={events} />;
}

async function getPosts() {
  const posts = await getAllSections();

  let newsData = {};
  let eventsData = {};
  let statisticsData = {};

  posts.forEach((post, index) => {
    const node = post.node;
    if (node.title === "Statistics") {
      statisticsData = node.content;
    } else if (node.title === "Events") {
      eventsData = node.content;
    } else if (node.title === "News") {
      newsData = node.content;
    }
  });

  return {
    news: parseNews(newsData),
    statistics: parseStatistics(statisticsData),
    events: parseEvents(eventsData),
  };
}
