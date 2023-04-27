"use client";
import Image from "next/image";
import "@/styles/fonts.css";
import "@/styles/resetCSS.css";
import { throttle } from "@/utils";
import { useContext, useState, createContext, useEffect } from "react";

import Header from "@/sections/Header";
import LetsGiveHope from "@/sections/LetsGiveHope";

import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./index.module.css";
import OurMission from "@/sections/OurMission";
import OurResults from "@/sections/OurResults";

export default function Home() {
  const [lang, setLang] = useState("eng");
  const [windowSizes, setWindowSizes] = useState({ width: null, height: null });
  useEffect(() => {
    const getSize = () => {
      const win = window;
      const doc = document;
      const docElem = doc.documentElement;
      const body = doc.getElementsByTagName("body")[0];
      const windowWidth =
        win.innerWidth || docElem.clientWidth || body.clientWidth;
      const windowHeight =
        win.innerHeight || docElem.clientHeight || body.clientHeight;
      setWindowSizes({
        width: windowWidth,
        height: windowHeight,
        mobile: false,
      });
    };
    getSize();
    window.addEventListener("resize", throttle(getSize, 150));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang: lang, changeLang: setLang }}>
      <ScreenModeAndSizeContext.Provider value={windowSizes}>
        <Header />
        <main>
          <div className={style.flagsBlock}>
            <LetsGiveHope />
            <Image
              src="/flag-usa.png"
              object-fit="contain"
              priority
              alt="Picture of the author"
              width={1306}
              height={1890}
              className={style.americanFlag}
            />
          </div>
        </main>
        <OurMission />
        <OurResults />
      </ScreenModeAndSizeContext.Provider>
    </LanguageContext.Provider>
  );
}

//
//
//
//
//
////
//
////
//
////
//
////
//
////
//
////
//
////
//
////
//
////
//
//
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "./page.module.css";
// import language

// const inter = Inter({ subsets: ["latin"] });

// co

// const ourResults = {
//     header:  {eng:' prosthetics for UkrainianS', ua: 'huy'},
//     content: 'Our current project is Prosthetics for Ukrainians. The goal of the project is to help Ukrainian children, soldiers and civilians who have lost their limbs during the war to get free quality prosthetics in the USA.'
// }

// const huyText = ()=> {

// }

// export default function Home() {
//   return (
//     <div>
//     {mobile ? <p class='text desktop mobile'><span><i></i></span></p> : <p class='text desktop mobile'>{textFromContext.ourResults.header[language]}</p>}

//     </div>
//   );
// }

// "use client";
// import styles from "./Card.module.css";
// import "../../app/globals.css";
// import { useEffect, useRef } from "react";

// const Card = ({ text, icon, style = "" }) => {
//   // create a ref and declare an instance for each countUp animation
//   const countupRef = useRef(null);
//   let countUpAnim;

//   useEffect(() => {
//     // create an intersection observer
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             // start the countUp animation

//             setTimeout(() => {
//               initCountUp();
//             }, 2000);
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     // observe the countupRef
//     observer.observe(countupRef.current);

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   // dynamically import and initialize countUp, sets value of `countUpAnim`
//   // you don't have to import this way, but this works best for next.js
//   async function initCountUp() {
//     const countUpModule = await import("countup.js");
//     countUpAnim = new countUpModule.CountUp(countupRef.current, 1000);
//     if (!countUpAnim.error) {
//       countUpAnim.start();
//     } else {
//       console.error(countUpAnim.error);
//     }
//   }

//   return (
//     <div className={`${styles.block} ${styles.style}`}>
//       <h5 className={`h5 desktop `}>{text}</h5>
//       {icon}
//       <h1 className={`h5 desktop `} ref={countupRef}>
//         0
//       </h1>
//     </div>
//   );
// };

// export default Card;
