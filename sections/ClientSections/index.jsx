'use client'
import Image from 'next/image'

import { throttle } from '@/utils'
import { useContext, useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import Header from '@/sections/Header'
import LetsGiveHope from '@/sections/LetsGiveHope'
import Veterans from '@/sections/Veterans'
import PressRelease from '@/sections/PressRelease'
import Events from '@/sections/Events'
import OurMission from '@/sections/OurMission'
import OurTeam from '@/sections/OurTeam'
import OurPartners from '@/sections/OurPartners'

import News from '@/sections/News'
import InNeed from '@/sections/InNeed'
import OurResults from '@/sections/OurResults'

import MailingList from '@/sections/MailingList'
import Merch from '@/sections/Merch'
import Prosthetics from '@/sections/Prosthetics'
import ThankYou from '@/sections/ThankYou'

import { LanguageContext } from '@/contexts/LanguageContext'

import BackToTopButton from '@/components/BackToTopButton'
import style from './clientSections.module.scss'
import SmokeBackground from '@/components/SmokeBackground'

import CompanyDataNonProfit from '@/components/CompanyDataNonProfit'

const homeText = {
  backToTop: {
    english: 'back to top  →',
  },
  exploreMore: {
    english: '← Explore more about us',
  },
}

export default function ClientSections({ news, statistics, events, pressReleases, country }) {
  const { lang, setLang } = useContext(LanguageContext)

  const [visitedSections, setVisitedSections] = useState({})

  // const [sectionInViewPort, setSectionInViewPort] = useState("letsGiveHope");

  const showCompanyData = !(sectionInViewPort === 'merch' || sectionInViewPort === 'thankYou')

  const [ref, inView] = useInView({
    triggerOnce: false, // Change this to false if you want the callback to be invoked every time the visibility changes
  })

  const [refOurTeam, inViewOurTeam] = useInView({ triggerOnce: true })
  const [refOurPartners, inViewOurPartners] = useInView({ triggerOnce: true })
  const [refMerch, inViewMerch] = useInView({ triggerOnce: true })
  const [refThankYou, inViewThankYou] = useInView({ triggerOnce: true })
  const bgIsWhite = () => inViewOurTeam || inViewOurPartners || inViewMerch || inViewThankYou

  // const sectionRefs = {
  //   letsGiveHope: useRef(null),
  //   ourResults: useRef(null),
  //   inNeed: useRef(null),
  //   ourMission: useRef(null),
  //   prosthetics: useRef(null),
  //   veterans: useRef(null),
  //   pressRelease: useRef(null),
  //   ourTeam: useRef(null),
  //   ourPartners: useRef(null),
  //   news: useRef(null),
  //   mailingList: useRef(null),
  //   thankYou: useRef(null),
  //   merch: useRef(null),
  //   events: useRef(null),
  // };

  // const isVisible = (id) => {
  //   if (visitedSections[id]) {
  //     return true;
  //   }
  //   return false;
  // };

  // const sectionIsVisible = (margin = 500) => {
  //   Object.keys(sectionRefs).forEach((key, index) => {
  //     const { top, bottom } = sectionRefs[key]?.current.getBoundingClientRect();

  //     const notVisited = !visitedSections[key];
  //     const notInViewPort = key !== sectionInViewPort;
  //     const sectionChecker = top <= margin && bottom >= margin;

  //     if (key === "thankYou") {
  //       if (top <= window.innerHeight - margin && notInViewPort) {
  //         setSectionInViewPort("thankYou");
  //         // showCompanyData && setShowCompanyData(false);
  //         notVisited &&
  //           setVisitedSections((prevState) => {
  //             return { ...prevState, thankYou: true };
  //           });
  //       } else if (top >= window.innerHeight - margin) {
  //         // !showCompanyData && setShowCompanyData(true);
  //       }
  //     } else if (sectionChecker && notInViewPort) {
  //       setSectionInViewPort(key);
  //       notVisited &&
  //         setVisitedSections((prevState) => {
  //           return { ...prevState, [key]: true };
  //         });
  //     }
  //   });
  // };
  // const throttledSectionIsVisible = throttle((e) => {
  //   sectionIsVisible();
  // }, 100);

  useEffect(() => {
    if (country === 'Ukraine') setLang('ukrainian')
    sectionIsVisible()
  }, [])

  // useEffect(() => {
  //   window.removeEventListener("scroll", throttledSectionIsVisible);
  //   window.addEventListener("scroll", throttledSectionIsVisible);
  //   return () => {
  //     window.removeEventListener("scroll", throttledSectionIsVisible);
  //   };
  // }, []);

  // const bgIsWhite = () =>
  //   sectionInViewPort === "ourTeam" ||
  //   sectionInViewPort === "ourPartners" ||
  //   sectionInViewPort === "merch" ||
  //   sectionInViewPort === "thankYou";
  return (
    <>
      <Header black={bgIsWhite()} />
      <main className={style.main}>
        <CompanyDataNonProfit
          black={bgIsWhite()}
          bgIsPink={sectionInViewPort === 'inNeed'}
          className={`${style.companyDataNonProfit} ${showCompanyData ? '' : 'hidden'}`}
        />

        <div className={style.smokeBlock}>
          <SmokeBackground className={style.smokeTop} />
          <div className={style.flagsBlock}>
            <LetsGiveHope
              id={'letsGiveHope'}
              visible={isVisible('letsGiveHope')}
              ref={sectionRefs.letsGiveHope}
            />
            <OurMission
              ref={sectionRefs.ourMission}
              id="ourMission"
              visible={isVisible('ourMission')}
            />
            <Image
              src="/flag-usa.png"
              object-fit="contain"
              alt="Picture of the author"
              width={1306}
              height={1890}
              className={style.americanFlag}
            />
          </div>
          <OurResults
            results={statistics}
            ref={sectionRefs.ourResults}
            visible={isVisible('ourResults')}
            id="ourResults"
          />
        </div>

        <InNeed ref={sectionRefs.inNeed} visible={isVisible('inNeed')} id="inNeed" />

        <Prosthetics
          ref={sectionRefs.prosthetics}
          id="prosthetics"
          visible={isVisible('prosthetics')}
        />
        <div className={`${style.smokeBlock} ${style.veteransAndEventsBlock}`}>
          <SmokeBackground className={style.smoke} />
          <Veterans ref={sectionRefs.veterans} id="veterans" visible={isVisible('veterans')} />
          <PressRelease
            ref={sectionRefs.pressRelease}
            id="pressRelease"
            visible={isVisible('pressRelease')}
            pressReleases={pressReleases}
          />
          <Events
            events={events}
            ref={sectionRefs.events}
            id="events"
            visible={isVisible('events')}
          />
        </div>
        <OurTeam ref={sectionRefs.ourTeam} id="ourTeam" visible={isVisible('ourTeam')} />
        <OurPartners
          ref={sectionRefs.ourPartners}
          id="ourPartners"
          visible={isVisible('ourPartners')}
        />
        <div className={style.smokeBlock}>
          <SmokeBackground className={style.smoke} />
          <News ref={sectionRefs.news} id="news" news={news} visible={isVisible('news')} />
          <MailingList
            ref={sectionRefs.mailingList}
            id="mailingList"
            visible={isVisible('mailingList')}
          />
        </div>
        <Merch ref={sectionRefs.merch} visible={isVisible('merch')} id="merch" />
        {sectionInViewPort !== 'letsGiveHope' && (
          <BackToTopButton
            text={homeText.backToTop[lang]}
            href={'letsGiveHope'}
            onClick={sectionIsVisible}
            black={bgIsWhite()}
          />
        )}
      </main>
      <ThankYou ref={sectionRefs.thankYou} id="thankYou" visible={isVisible('thankYou')} />
    </>
  )
}
