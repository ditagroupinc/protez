import { getNews, getAllSections } from "@/lib/api";
import ClientSections from "@/sections/ClientSections";
import {
  parseNews,
  parseStatistics,
  // parseUpcomingEvents,
} from "@/utils/parsers";

export default async function Home() {
  const { news, statistics, upcomingEvents } = await getPosts();

  return (
    <ClientSections
      news={news}
      statistics={statistics}
      upcomingEvents={upcomingEvents}
    />
  );
}

async function getData() {
  const news = await getNews();
  return news;
}

async function getPosts() {
  const posts = await getAllSections();

  let newsData = {};
  // let upcomingEventsData = {};
  let statisticsData = {};

  posts.forEach((post, index) => {
    const node = post.node;
    if (node.title === "Statistics") {
      statisticsData = node.content;
      // } else if (node.title === "Upcoming events") {
      //   upcomingEventsData = node.content;
    } else if (node.title === "News") {
      newsData = node.content;
    }
  });

  return {
    news: parseNews(newsData),
    statistics: parseStatistics(statisticsData),
    // upcomingEvents: parseUpcomingEvents(upcomingEventsData),
  };
}
