// import Image from "next/image";
import OurMissionSection from "@/sections/OurMission/OurMission";
import "../../styles/fonts.css";
import "../../styles/resetCSS.css";

export default function Huy() {
  return (
    <>
      <OurMissionSection />
    </>
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
