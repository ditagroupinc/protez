import style from "./MailingList.module.css";
import { useContext, forwardRef, useState } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import Image from "next/image";
import { icons } from "./icons";
import SquareButton from "@/components/SquareButton";
import texts from "@/texts&svg";
import { sendContactForm } from "@/lib/api";

const veteransImages = [
  "/veterans/mailingList/soldiers1.png",
  "/veterans/mailingList/soldiers2.png",
  "/veterans/mailingList/soldiers3.png",
  "/veterans/mailingList/soldiers4.png",
  "/veterans/mailingList/soldiers5.png",
  "/veterans/mailingList/soldiers6.png",
  "/veterans/mailingList/soldiers7.png",
  "/veterans/mailingList/soldiers8.png",
  "/veterans/mailingList/soldiers9.png",
  "/veterans/mailingList/soldiers10.png",
  "/veterans/mailingList/soldiers11.png",
  "/veterans/mailingList/soldiers12.png",
];

const SpinnerButton = () => (
  <button type="button" className={`${style.button} ${style.spinnerButton}`}>
    <Image src={"/spinner.gif"} alt="spinner" width={40} height={40} />
  </button>
);

const SuccessButton = () => (
  <button type="button" className={`${style.button} ${style.successButton}`}>
    Sent
  </button>
);

const MailingList = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const [formStatus, setFormStatus] = useState("");

  const handleClick = () => {};

  const getButton = () => {
    if (formStatus === "isLoading") {
      return <SpinnerButton />;
    } else if (formStatus === "error") {
      return <SpinnerButton />;
    } else if (formStatus === "sent") {
      return <SuccessButton />;
    } else {
      return (
        <SquareButton
          pink
          onClick={handleClick}
          text={texts.mailingList.subscribe[lang]}
        />
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("isLoading");
    const data = {
      email: e.target[0].value,
    };

    try {
      await sendContactForm(data);
      setFormStatus("sent");
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <section
      className={`${style.section} ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      {/* <SmokeBackground /> */}
      <div className={`${style.images}`}>
        {veteransImages.map((path, i) => {
          return (
            <div key={i}>
              <Image
                src={path}
                alt="troops"
                priority
                width={2560}
                height={1440}
                // ${addClass(i)}
                className={`${style.image} ${visible ? style.show : ""}`}
              />
            </div>
          );
        })}
      </div>
      <div className={`${style.title} h6`}>
        <div className="textContainer">
          {icons.mailingListLogo[lang]("svgTextBlock")}
        </div>
        <div className="textContainer">
          <form
            className={`${style.form} h6 `}
            action="POST"
            onSubmit={handleSubmit}
          >
            <input
              className="p"
              placeholder={texts.mailingList.email[lang]}
              type="email"
              name="email"
              id="email"
              required
            />
            {getButton()}
          </form>
        </div>
      </div>
    </section>
  );
});

MailingList.displayName = "MailingList";
export default MailingList;
