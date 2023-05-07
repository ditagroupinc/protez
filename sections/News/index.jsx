import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import style from "./news.module.css";
import NewsCard from "@/components/NewsCard";
import { icons } from "./icons";
import Slider from "react-slick";

const wereInNews = {
  cards: [
    {
      link: "https://nytimes.com",
      photo: "nyt-pic.png",
      time: "16.03.2023",
      adress: "nytimes.com",
      logo: "nyt",
      title:
        "How Minnesotans are helping meet the demand for prosthetics in Ukraine",
      text: "Delegates from Ukraine are in Minnesota this week. The topic? The huge demand for limb prosthetics d ...",
    },
    {
      link: "https://1plus1.ua",
      photo: "1plus1-pic.png",
      time: "19.03.2023",
      adress: "plus1.ua",
      logo: "onePlusOne",
      title: "Oakdale foundation helps hurt Ukrainian soldiers walk again",
      text: "Some plan to return and fight: “To protect our country and protect my family and live my life to its full poten ...",
    },
    {
      link: "https://globalminnesota.org",
      photo: "globalminesota-pic.png",
      time: "27.03.2023",
      adress: "globalminnesota.org",
      logo: "cbs",
      title: "Global Minnesota Welcomes Ukrainian Prosthetics Experts",
      text: "In mid-March, Global Minnesota had the honor of welcoming five prosthetics experts from Ukraine for ...",
    },
    {
      link: "https://eplocalnews.org",
      photo: "eplocalnews-pic.png",
      time: "27.03.2023",
      adress: "eplocalnews.org",
      logo: "onePlusOne",
      title: "Standing with Ukraine in MN",
      text: "Hundreds gather in Northeast Minneapolis to thank local and refugee volunteers ...",
    },
    {
      link: "https://nytimes.com",
      photo: "nyt-pic.png",
      time: "16.03.2023",
      adress: "nytimes.com",
      logo: "nyt",
      title:
        "How Minnesotans are helping meet the demand for prosthetics in Ukraine",
      text: "Delegates from Ukraine are in Minnesota this week. The topic? The huge demand for limb prosthetics d ...",
    },
    {
      link: "https://1plus1.ua",
      photo: "1plus1-pic.png",
      time: "19.03.2023",
      adress: "plus1.ua",
      logo: "onePlusOne",
      title: "Oakdale foundation helps hurt Ukrainian soldiers walk again",
      text: "Some plan to return and fight: “To protect our country and protect my family and live my life to its full poten ...",
    },
    {
      link: "https://globalminnesota.org",
      photo: "globalminesota-pic.png",
      time: "27.03.2023",
      adress: "globalminnesota.org",
      logo: "cbs",
      title: "Global Minnesota Welcomes Ukrainian Prosthetics Experts",
      text: "In mid-March, Global Minnesota had the honor of welcoming five prosthetics experts from Ukraine for ...",
    },
    {
      link: "https://eplocalnews.org",
      photo: "eplocalnews-pic.png",
      time: "27.03.2023",
      adress: "eplocalnews.org",
      logo: "onePlusOne",
      title: "Standing with Ukraine in MN",
      text: "Hundreds gather in Northeast Minneapolis to thank local and refugee volunteers ...",
    },
    // -------------
  ],
};

const News = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    // slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      <div className={style.container}>
        <div className={style.logoContainer + " textContainer"}>
          {icons.wereInNews("svgTextBlock")}
        </div>
        <div className={style.newsContainer}>
          <Slider {...settings} className={style.slickSlider}>
            {wereInNews.cards.map((card, index) => (
              <div key={index}>
                <NewsCard cardData={card} short={index % 2 === 0} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
});

News.displayName = "News";
export default News;
