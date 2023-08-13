import cheerio from "cheerio";
export function parseNews(postContent) {
  const $ = cheerio.load(postContent);

  const news = [];

  $(".wp-block-group.newsCard").each((index, element) => {
    const $element = $(element);

    const image = $element.find(".newsCardImage img").attr("src");

    const date = $element.find(".newsCardDate").text().trim();
    const address = $element.find(".newsCardAddress").text().trim();

    const link = $element.find(".newsCardLink a").attr("href"); // New line to extract the 'link' value

    const logo = $element.find(".newsCardLogo img").attr("src");
    const title = $element.find(".newsCardTitle").text().trim();
    const text = $element.find(".newsCardText").text().trim();

    news.push({
      image,
      date,
      address,
      link,
      logo,
      title,
      text,
    });
  });

  return news;
}

export function parseStatistics(statisticsContent) {
  const $ = cheerio.load(statisticsContent);

  const statistics = {};

  // Parse statisticsDate
  const statisticsDate = {
    english: $(".statisticsDateEnglish p").text().trim(),
    ukrainian: $(".statisticsDateUkrainian p").text().trim(),
  };
  statistics.statisticsDate = statisticsDate;

  // Parse statisticsData
  statistics.statisticsData = [];

  $(".wp-block-columns.statisticsDataItem").each((index, element) => {
    const $element = $(element);

    const statisticsDataLabel = {
      english: $element.find(".statisticsDataLabelEnglish p").text().trim(),
      ukrainian: $element.find(".statisticsDataLabelUkrainian p").text().trim(),
    };

    const statisticsDataValue = $element
      .find(".statisticsDataValue p")
      .text()
      .trim();

    statistics.statisticsData.push({
      statisticsDataLabel,
      statisticsDataValue,
    });
  });

  return statistics;
}

export function parseUpcomingEvents(upcomingEventsContent) {
  const $ = cheerio.load(upcomingEventsContent);

  const upcomingEvents = [];

  $(".upcomingEventsCard").each((index, element) => {
    const $card = $(element);

    const imageSrc = $card.find(".upcomingEventsCardImage img").attr("src");
    const date = $card.find(".upcomingEventsCardDate p").text();
    const title = $card.find(".upcomingEventsCardTitle h3").text();
    const location = $card.find(".upcomingEventsCardLocation p").text();
    const link = $card.find(".upcomingEventsCardLink a").attr("href");

    const event = {
      image: imageSrc,
      date,
      title,
      location,
      link,
    };

    upcomingEvents.push(event);
  });
  return upcomingEvents;
}
