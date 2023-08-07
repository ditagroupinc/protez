import cheerio from "cheerio";
export function parseNews(postContent) {
  const $ = cheerio.load(postContent);

  const news = [];

  $(".wp-block-group.newsCard").each((index, element) => {
    const $element = $(element);

    const image = $element.find(".newsCardImage img").attr("src");
    const dateTimeText = $element.find(".newsCardDate").text().trim();
    const [dateText, addressText] = dateTimeText
      .split("|")
      .map((text) => text.trim());

    const link = $element.find(".newsCardLink a").attr("href"); // New line to extract the 'link' value

    const logo = $element.find(".newsCardLogo img").attr("src");
    const title = $element.find(".newsCardTitle").text().trim();
    const text = $element.find(".newsCardText").text().trim();

    news.push({
      image,
      date: dateText,
      address: addressText,
      link,
      logo,
      title,
      text,
    });
  });

  return news;
}
