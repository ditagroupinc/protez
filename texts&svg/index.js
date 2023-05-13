import icons from "./icons";

const socialMediaLinks = [
  {
    adress: "https://www.youtube.com/@Protezfoundation",
    icon: icons.iconYoutube,
  },
  {
    adress: "https://www.facebook.com/prostheticsforukrainians/",
    icon: icons.iconFaceBook,
  },
  {
    adress: "https://www.instagram.com/protezfoundation/?igshid=YmMyMTA2M2Y%3D",
    icon: icons.iconInstagram,
  },
  {
    adress: "https://www.linkedin.com/company/protez-foundation/",
    icon: icons.iconLinkedin,
  },
];

const ourMission = {
  blockInfo: {
    ourGoal: {
      eng: `Our goal is to help people who
      have lost limbs to restore their quality of life`,
    },
    providingState: {
      eng: `We provide state of the art prosthetics with personalized training and support in the US and follow-up care in Ukraine.`,
    },
    providePsychological: {
      eng: `We provide mental health and emotional support during recovery.`,
    },
    unite: {
      eng: `We bring people together to help support victims of war.`,
    },
  },
  titleText: {
    our: {
      eng: "Our",
    },
    mission: {
      eng: "MISSION",
    },
  },
};

const ourResults = {
  results: {
    prosthetics: {
      eng: `Individuals served`,
      number: "76",
    },
    prostheses: {
      eng: `Prosthetic limbs`,
      number: "196",
    },
    volunteers: {
      eng: `Volunteers`,
      number: "150",
    },
    moneySpent: {
      eng: `Money spent`,
      number: "1300000",
    },
  },
  titleText: {
    our: {
      eng: "Our",
    },
    results: {
      eng: "Results",
    },
  },
};

const texts = {
  socialMediaLinks: socialMediaLinks,
  ourMission: ourMission,
  ourResults: ourResults,
};

export default texts;
